const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'blog', 'articles-data.js');
const SLUGS_TO_REMOVE = new Set([
    'vpn-vs-proxy',
    'what-is-ad-personalization',
    'advertising-signals-explained',
    'everyday-leakables-explained'
]);

function loadArticles() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const startIndex = content.indexOf('const ARTICLES_DATA =');
    const tailIndex = content.indexOf('const getBlogCategories');

    if (startIndex === -1 || tailIndex === -1) {
        throw new Error('Unable to locate ARTICLES_DATA declaration or helper functions.');
    }

    const header = content.slice(0, startIndex);
    const dataBlock = content.slice(startIndex, tailIndex);
    const dataMatch = dataBlock.match(/const ARTICLES_DATA = ([\s\S]*);/);

    if (!dataMatch) {
        throw new Error('Unable to extract ARTICLES_DATA array.');
    }

    const articles = eval(dataMatch[1]); // eslint-disable-line no-eval
    const tail = content.slice(tailIndex);
    return { articles, header, tail };
}

function saveArticles(header, articles, tail) {
    const dataString = JSON.stringify(articles, null, 4);
    const output = `${header}const ARTICLES_DATA = ${dataString};\n\n${tail}`;
    fs.writeFileSync(DATA_FILE, output, 'utf8');
}

function main() {
    const { articles, header, tail } = loadArticles();
    const filtered = articles.filter(article => !SLUGS_TO_REMOVE.has(article.slug));

    const removedCount = articles.length - filtered.length;
    if (removedCount === 0) {
        console.log('No matching articles found to remove.');
        return;
    }

    filtered.forEach(article => {
        if (Array.isArray(article.relatedArticles)) {
            article.relatedArticles = article.relatedArticles.filter(slug => !SLUGS_TO_REMOVE.has(slug));
        }
    });

    saveArticles(header, filtered, tail);
    console.log(`Removed ${removedCount} articles and cleaned related lists.`);
}

if (require.main === module) {
    main();
}


