const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'blog', 'articles-data.js');
const SOURCE_MARKDOWN = path.join(__dirname, '..', 'blog', 'articles-expanded.md');
const OUTPUT_FILE = path.join(__dirname, '..', 'ALL_ARTICLES_REVIEW.md');

function loadArticlesData() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    // Extract the array from let ARTICLES_DATA=[...], ... ]
    // The array ends with ], before any function definitions
    const match = content.match(/let ARTICLES_DATA=\[([\s\S]*?)\],/);
    if (!match) {
        throw new Error('Unable to parse ARTICLES_DATA in articles-data.js');
    }
    // Use eval to parse the JavaScript object literals
    try {
        const articlesArray = eval('[' + match[1] + ']');
        return articlesArray;
    } catch (e) {
        // If eval fails, try loading as a module
        delete require.cache[require.resolve(DATA_PATH)];
        const module = require(DATA_PATH);
        return module.ARTICLES_DATA || [];
    }
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

function findArticleContent(article, sections) {
    const target = normaliseTitle(article.title);
    const slugWords = article.slug.split('-').filter(w => w.length > 2);
    
    // Strategy 1: Direct title match
    let heading = Object.keys(sections).find(key => {
        const normalised = normaliseTitle(key);
        return normalised === target || 
               normalised.startsWith(target) || 
               target.startsWith(normalised) ||
               normalised.includes(target) ||
               target.includes(normalised);
    });
    
    if (heading) return { heading, content: sections[heading] };
    
    // Strategy 2: Match by slug keywords - improved
    if (slugWords.length > 0) {
        heading = Object.keys(sections).find(key => {
            const normalised = normaliseTitle(key);
            const keyWords = normalised.split(/\s+/);
            // Check if key slug words appear in the heading
            const matches = slugWords.filter(slugWord => 
                keyWords.some(keyWord => {
                    const kw = keyWord.toLowerCase();
                    const sw = slugWord.toLowerCase();
                    return kw.includes(sw) || sw.includes(kw) || kw === sw;
                })
            );
            // For short slugs (2-3 words), require all; for longer, require at least 2
            const requiredMatches = slugWords.length <= 3 ? slugWords.length : Math.max(2, Math.floor(slugWords.length * 0.6));
            return matches.length >= requiredMatches;
        });
        
        if (heading) return { heading, content: sections[heading] };
    }
    
    // Strategy 3: Match by significant keywords from title
    const titleKeyWords = target.split(/\s+/).filter(w => w.length > 3);
    if (titleKeyWords.length > 0) {
        heading = Object.keys(sections).find(key => {
            const normalised = normaliseTitle(key);
            const keyWords = normalised.split(/\s+/);
            const matches = titleKeyWords.filter(titleWord => 
                keyWords.some(keyWord => {
                    const kw = keyWord.toLowerCase();
                    const tw = titleWord.toLowerCase();
                    return kw.includes(tw) || tw.includes(kw) || kw === tw;
                })
            );
            // Require at least 2 matching significant words
            return matches.length >= Math.min(2, titleKeyWords.length);
        });
        
        if (heading) return { heading, content: sections[heading] };
    }
    
    // Strategy 4: Special cases - exact slug-to-title mapping for known variations
    const specialMappings = {
        'topics-api-privacy-sandbox': ['google topics api', 'topics api', 'topics'],
        'global-privacy-control': ['global privacy control', 'gpc'],
        'global-privacy-control': ['global privacy control', 'gpc'],
        'mobile-privacy-webviews': ['mobile privacy', 'webviews'],
        'asn-bgp-for-humans': ['asn', 'bgp', 'autonomous system'],
        'ipv4-vs-ipv6-privacy': ['ipv4', 'ipv6', 'privacy'],
        'reverse-dns': ['reverse dns', 'ptr'],
        'webrtc-leaks': ['webrtc', 'leaks'],
        'vpn-detection-how-it-works': ['vpn detection', 'vpn'],
        'http-headers-client-hints': ['http headers', 'client hints'],
        'cookies-and-storage-tracking': ['cookies storage', 'storage tracking']
    };
    
    if (specialMappings[article.slug]) {
        const searchTerms = specialMappings[article.slug];
        heading = Object.keys(sections).find(key => {
            const normalised = normaliseTitle(key);
            // Check if ANY of the search terms appear in the heading
            return searchTerms.some(term => {
                const normalisedTerm = normaliseTitle(term);
                return normalised.includes(normalisedTerm);
            });
        });
        
        if (heading) return { heading, content: sections[heading] };
    }
    
    return null;
}

function main() {
    console.log('Loading articles data...');
    const articles = loadArticlesData();
    console.log(`Found ${articles.length} articles`);

    console.log('Loading expanded markdown content...');
    const markdown = fs.readFileSync(SOURCE_MARKDOWN, 'utf8');
    const sections = parseMarkdownSections(markdown);
    console.log(`Found ${Object.keys(sections).length} sections in markdown`);

    // Group articles by category
    const articlesByCategory = {};
    articles.forEach(article => {
        if (!articlesByCategory[article.category]) {
            articlesByCategory[article.category] = [];
        }
        articlesByCategory[article.category].push(article);
    });

    // Build the review document
    let output = '# All Articles Review\n\n';
    output += `**Generated:** ${new Date().toISOString()}\n`;
    output += `**Total Articles:** ${articles.length}\n`;
    output += `**Total Categories:** ${Object.keys(articlesByCategory).length}\n\n`;
    output += '---\n\n';

    // Table of Contents by Category
    output += '## Table of Contents by Category\n\n';
    const sortedCategories = Object.keys(articlesByCategory).sort();
    sortedCategories.forEach(category => {
        const count = articlesByCategory[category].length;
        output += `- [${category}](#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}) (${count} articles)\n`;
    });
    output += '\n---\n\n';

    // Articles grouped by category
    sortedCategories.forEach(category => {
        output += `## ${category}\n\n`;
        
        articlesByCategory[category].forEach((article, index) => {
            const articleNum = index + 1;
            output += `### ${articleNum}. ${article.title}\n\n`;
            output += `**Slug:** \`${article.slug}\`  \n`;
            output += `**Reading Time:** ${article.readingTime} min  \n`;
            output += `**Last Updated:** ${article.lastUpdated}  \n`;
            output += `**Related Articles:** ${article.relatedArticles ? article.relatedArticles.length : 0}\n\n`;
            
            output += `**Excerpt:**\n${article.excerpt}\n\n`;

            // Try to find matching content in markdown using multiple strategies
            const match = findArticleContent(article, sections);

            if (match && match.content) {
                output += `**Content:**\n\n`;
                output += `${match.content}\n\n`;
            } else {
                output += `**Content:** *No expanded content found in markdown*\n\n`;
            }

            output += '---\n\n';
        });
    });

    // Summary statistics
    output += '## Summary Statistics\n\n';
    output += '### By Category:\n\n';
    sortedCategories.forEach(category => {
        const count = articlesByCategory[category].length;
        const totalTime = articlesByCategory[category].reduce((sum, a) => sum + (a.readingTime || 0), 0);
        output += `- **${category}**: ${count} articles, ${totalTime} min total reading time\n`;
    });

    output += '\n### By Reading Time:\n\n';
    const timeGroups = {
        'Quick Reads (1-3 min)': articles.filter(a => a.readingTime <= 3).length,
        'Medium Reads (4-6 min)': articles.filter(a => a.readingTime >= 4 && a.readingTime <= 6).length,
        'Long Reads (7+ min)': articles.filter(a => a.readingTime >= 7).length
    };
    Object.entries(timeGroups).forEach(([group, count]) => {
        output += `- **${group}**: ${count} articles\n`;
    });

    console.log('Writing review document...');
    fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
    console.log(`Review document written to: ${OUTPUT_FILE}`);
    console.log(`Total size: ${(output.length / 1024).toFixed(2)} KB`);
}

if (require.main === module) {
    main();
}

