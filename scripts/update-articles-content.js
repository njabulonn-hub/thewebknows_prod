const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'blog', 'articles-data.js');
const SOURCE_MARKDOWN = path.join(__dirname, '..', 'blog', 'articles-expanded.md');
const TODAY = '2025-11-14';

// Mapping of slugs to their revised content
// This will be populated from the user's provided content
const revisedContent = {};

function loadArticlesData() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    const match = content.match(/let ARTICLES_DATA=\[([\s\S]*?)\],/);
    if (!match) {
        throw new Error('Unable to parse ARTICLES_DATA in articles-data.js');
    }
    try {
        return eval('[' + match[1] + ']');
    } catch (e) {
        throw new Error('Failed to parse articles data: ' + e.message);
    }
}

function updateArticlesDataWithToday() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    // Update all lastUpdated dates to today
    const updated = content.replace(/lastUpdated:"(\d{4}-\d{2}-\d{2})"/g, `lastUpdated:"${TODAY}"`);
    fs.writeFileSync(DATA_PATH, updated, 'utf8');
    console.log('Updated all lastUpdated dates to', TODAY);
}

function parseMarkdownSections(markdown) {
    const sections = {};
    const lines = markdown.split(/\r?\n/);
    let currentHeading = '';
    let buffer = [];

    const flush = () => {
        if (currentHeading) {
            sections[currentHeading.trim()] = buffer.join('\n').trim();
        }
        buffer = [];
    };

    for (const line of lines) {
        if (line.startsWith('### ')) {
            flush();
            currentHeading = line.replace(/^###\s*/, '').trim();
        } else {
            buffer.push(line);
        }
    }
    flush();
    return sections;
}

function normaliseTitle(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function findMatchingHeading(title, sections) {
    const target = normaliseTitle(title);
    return Object.keys(sections).find(key => {
        const normalised = normaliseTitle(key);
        return normalised === target || 
               normalised.startsWith(target) || 
               target.startsWith(normalised) ||
               normalised.includes(target) ||
               target.includes(normalised);
    });
}

// Parse the user's provided content and extract article content by slug
function parseUserContent(userContent) {
    const articles = {};
    const lines = userContent.split(/\r?\n/);
    let currentSlug = null;
    let inContent = false;
    let contentLines = [];
    let currentTitle = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Match slug line: **Slug:** `slug-name`
        const slugMatch = line.match(/\*\*Slug:\*\*\s*`([^`]+)`/);
        if (slugMatch) {
            // Save previous article
            if (currentSlug && contentLines.length > 0) {
                articles[currentSlug] = {
                    title: currentTitle,
                    content: contentLines.join('\n').trim()
                };
            }
            currentSlug = slugMatch[1];
            contentLines = [];
            inContent = false;
            continue;
        }

        // Match title: ### Number. Title
        const titleMatch = line.match(/^###\s+\d+\.\s+(.+)$/);
        if (titleMatch) {
            currentTitle = titleMatch[1].trim();
            continue;
        }

        // Start capturing content after **Content:**
        if (line.includes('**Content:**')) {
            inContent = true;
            continue;
        }

        // Stop capturing if we hit another article or section
        if (inContent && (line.match(/^###\s+\d+\./) || line.match(/^##\s+/))) {
            if (currentSlug && contentLines.length > 0) {
                articles[currentSlug] = {
                    title: currentTitle,
                    content: contentLines.join('\n').trim()
                };
            }
            currentSlug = null;
            inContent = false;
            contentLines = [];
            continue;
        }

        // Capture content lines
        if (inContent && currentSlug) {
            contentLines.push(line);
        }
    }

    // Save last article
    if (currentSlug && contentLines.length > 0) {
        articles[currentSlug] = {
            title: currentTitle,
            content: contentLines.join('\n').trim()
        };
    }

    return articles;
}

function updateMarkdownWithRevisedContent(revisedArticles) {
    let markdown = fs.readFileSync(SOURCE_MARKDOWN, 'utf8');
    const sections = parseMarkdownSections(markdown);
    const articles = loadArticlesData();
    
    let updatedCount = 0;

    // Update each section that has revised content
    articles.forEach(article => {
        if (revisedArticles[article.slug]) {
            const revised = revisedArticles[article.slug];
            const heading = findMatchingHeading(article.title, sections) || 
                          findMatchingHeading(revised.title, sections);
            
            if (heading && sections[heading]) {
                // Replace the content of this section
                const headingPattern = new RegExp(`(###\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?)(?=\\n###\\s+|\\n##\\s+|$)`);
                const newSection = `### ${heading}\n\n${revised.content}`;
                markdown = markdown.replace(headingPattern, newSection);
                updatedCount++;
            }
        }
    });

    fs.writeFileSync(SOURCE_MARKDOWN, markdown, 'utf8');
    console.log(`Updated ${updatedCount} articles in markdown file`);
    return updatedCount;
}

function main() {
    console.log('Starting article update process...');
    console.log('Today\'s date:', TODAY);
    
    // Step 1: Update lastUpdated dates in articles-data.js
    updateArticlesDataWithToday();
    
    console.log('\nTo complete the update:');
    console.log('1. Update blog/articles-expanded.md with revised content');
    console.log('2. Run: node scripts/generate-articles.js');
    console.log('3. Run: node scripts/extract-articles-for-review.js');
    console.log('\nNote: The user provided content needs to be manually added to articles-expanded.md');
    console.log('      in the correct format (### heading followed by content)');
}

if (require.main === module) {
    main();
}

