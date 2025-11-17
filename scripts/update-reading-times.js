const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'blog', 'articles-data.js');
const INSIGHTS_DIR = path.join(__dirname, '..', 'insights');
const WORDS_PER_MINUTE = 200; // Standard reading speed

function loadArticlesData() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    const match = content.match(/(?:const|let)\s+ARTICLES_DATA\s*=\s*(\[[\s\S]*?\])\s*,/);
    if (!match) {
        throw new Error('Unable to parse ARTICLES_DATA in articles-data.js');
    }
    return eval(match[1]);
}

function extractTextFromHtml(html) {
    // Remove script and style tags
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // Extract content from blog-article__content section
    const contentMatch = html.match(/<section\s+class="blog-article__content">([\s\S]*?)<\/section>/i);
    if (!contentMatch) {
        return '';
    }
    
    let content = contentMatch[1];
    
    // Remove HTML tags
    content = content.replace(/<[^>]+>/g, ' ');
    
    // Decode HTML entities
    content = content
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
    
    // Clean up whitespace
    content = content.replace(/\s+/g, ' ').trim();
    
    return content;
}

function countWords(text) {
    if (!text || text.trim().length === 0) {
        return 0;
    }
    // Split by whitespace and filter out empty strings
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

function calculateReadingTime(wordCount) {
    if (wordCount === 0) {
        return 1; // Minimum 1 minute for any article
    }
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return Math.max(1, minutes); // Minimum 1 minute
}

function updateReadingTimes() {
    const articles = loadArticlesData();
    const updates = [];
    
    console.log('Scanning article files and calculating reading times...\n');
    
    articles.forEach((article) => {
        const articlePath = path.join(INSIGHTS_DIR, article.slug, 'index.html');
        
        if (!fs.existsSync(articlePath)) {
            console.warn(`⚠️  File not found: ${articlePath}`);
            return;
        }
        
        const html = fs.readFileSync(articlePath, 'utf8');
        const text = extractTextFromHtml(html);
        const wordCount = countWords(text);
        const newReadingTime = calculateReadingTime(wordCount);
        const oldReadingTime = article.readingTime || 0;
        
        if (newReadingTime !== oldReadingTime) {
            updates.push({
                slug: article.slug,
                title: article.title,
                oldTime: oldReadingTime,
                newTime: newReadingTime,
                wordCount: wordCount
            });
            article.readingTime = newReadingTime;
        } else {
            console.log(`✓ ${article.slug}: ${newReadingTime} min (unchanged, ${wordCount} words)`);
        }
    });
    
    if (updates.length === 0) {
        console.log('\n✅ No reading time updates needed.');
        return;
    }
    
    console.log(`\n📊 Found ${updates.length} articles with reading time changes:\n`);
    updates.forEach(update => {
        const change = update.newTime > update.oldTime ? '↑' : '↓';
        console.log(`${change} ${update.slug}: ${update.oldTime} → ${update.newTime} min (${update.wordCount} words)`);
    });
    
    // Update the articles-data.js file
    const originalContent = fs.readFileSync(DATA_PATH, 'utf8');
    let updatedContent = originalContent;
    
    // Replace each article's readingTime value
    updates.forEach(update => {
        // Match the article object and update readingTime
        const articlePattern = new RegExp(
            `(\\{[^}]*id:"${update.slug}"[^}]*readingTime:)\\d+([^}]*\\})`,
            'g'
        );
        updatedContent = updatedContent.replace(
            articlePattern,
            `$1${update.newTime}$2`
        );
    });
    
    // Write the updated file
    fs.writeFileSync(DATA_PATH, updatedContent, 'utf8');
    console.log(`\n✅ Updated ${updates.length} reading times in ${DATA_PATH}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the changes above');
    console.log('   2. Run: node scripts/generate-articles.js (to regenerate HTML files)');
    console.log('   3. Run: node scripts/prebuild-content.js (to update card listings)');
}

if (require.main === module) {
    try {
        updateReadingTimes();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

module.exports = { updateReadingTimes, calculateReadingTime, countWords };

