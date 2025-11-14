const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build', 'static');
fs.mkdirSync(buildDir, { recursive: true });

const { ARTICLES_DATA = [] } = require(path.join(rootDir, 'blog', 'articles-data.js'));
const glossaryData = loadGlossaryData(path.join(rootDir, 'glossary-data.js'));
const glossaryUtils = loadGlossaryUtils(path.join(rootDir, 'glossary-utils.js'));

function resolveFirstExistingPath(candidates) {
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return candidates[0];
}

const insightsHtmlPath = resolveFirstExistingPath([
    path.join(rootDir, 'insights', 'index.html'),
    path.join(rootDir, 'insights.html')
]);
const glossaryHtmlPath = resolveFirstExistingPath([
    path.join(rootDir, 'glossary', 'index.html'),
    path.join(rootDir, 'glossary.html')
]);

const SITE_ORIGIN = 'https://thewebknows.com';
const HOME_URL = `${SITE_ORIGIN}/`;
const INSIGHTS_URL = `${SITE_ORIGIN}/insights/`;
const GLOSSARY_URL = `${SITE_ORIGIN}/glossary/`;
const OG_IMAGE_URL = `${SITE_ORIGIN}/og-image.png`;

const ARTICLE_THEME_SCRIPT = `    <script>
        (function() {
            var storageKey = 'thewebknows-theme';
            var mode = 'light';
            try {
                var stored = window.localStorage ? localStorage.getItem(storageKey) : null;
                if (stored === 'dark' || stored === 'light') {
                    mode = stored;
                } else if (window.matchMedia) {
                    mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
            } catch (error) {
                try {
                    mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                } catch (ignore) {
                    mode = 'light';
                }
            }
            document.documentElement.setAttribute('data-mode', mode);
        })();
    </script>`;

const ARTICLE_FOOTER_SCRIPTS = [
    '    <script src="/glossary-data.js"></script>',
    '    <script src="/glossary-utils.js"></script>',
    '    <script src="/blog/articles-data.js"></script>',
    '    <script src="/blog/article.js"></script>',
    '    <script src="/app.js" defer></script>',
    '    <script>',
    '        // Defer AdSense script loading until after page load',
    '        window.addEventListener(\'load\', function() {',
    '            var script = document.createElement(\'script\');',
    '            script.src = \'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9160600423347839\';',
    '            script.async = true;',
    '            script.crossOrigin = \'anonymous\';',
    '            document.head.appendChild(script);',
    '        });',
    '    </script>'
];

const TOOL_SECTIONS_CONFIG = [
    { id: 'ipv4', title: 'Public IP (IPv4)', keywords: ['ipv4 address', 'public ip', 'ip address'] },
    { id: 'ipv6', title: 'Public IP (IPv6)', keywords: ['ipv6 address', 'ipv6', 'temporary ipv6'] },
    { id: 'isp', title: 'ISP / ASN', keywords: ['internet service provider', 'asn', 'autonomous system'] },
    { id: 'location', title: 'Location (IP-based)', keywords: ['ip geolocation', 'geoip', 'location'] },
    { id: 'referrer', title: 'Referrer', keywords: ['referer header', 'referrer header'] },
    { id: 'network-type', title: 'Network type (guess)', keywords: ['network type', 'vpn detection'] },
    { id: 'reverse-dns', title: 'Reverse DNS', keywords: ['ptr record', 'reverse dns'] },
    { id: 'browser', title: 'Browser & version', keywords: ['browser', 'user agent'] },
    { id: 'os', title: 'Operating system', keywords: ['operating system', 'os'] },
    { id: 'languages', title: 'Preferred languages', keywords: ['accept-language', 'browser languages'] },
    { id: 'timezone', title: 'Time zone', keywords: ['timezone', 'time zone'] },
    { id: 'local-time', title: 'Local time', keywords: ['local time'] },
    { id: 'device-type', title: 'Device type', keywords: ['device type'] },
    { id: 'screen-size', title: 'Screen size', keywords: ['screen size', 'display size'] },
    { id: 'viewport', title: 'Viewport', keywords: ['viewport size'] },
    { id: 'pixel-ratio', title: 'Pixel ratio', keywords: ['device pixel ratio', 'pixel ratio'] },
    { id: 'color-depth', title: 'Color depth', keywords: ['color depth'] },
    { id: 'cpu-threads', title: 'CPU threads', keywords: ['cpu threads', 'hardware concurrency'] },
    { id: 'ram', title: 'RAM estimate', keywords: ['ram', 'device memory'] },
    { id: 'graphics', title: 'Graphics', keywords: ['graphics', 'gpu', 'webgl'] },
    { id: 'microphones', title: 'Microphones detected', keywords: ['microphones', 'audio inputs'] },
    { id: 'speakers', title: 'Audio outputs detected', keywords: ['speakers', 'audio outputs'] },
    { id: 'webcams', title: 'Cameras detected', keywords: ['webcams', 'cameras'] },
    { id: 'geolocation-support', title: 'Geolocation API', keywords: ['geolocation api', 'geolocation support'] },
    { id: 'geolocation-precise', title: 'Device geolocation', keywords: ['precise location', 'latitude longitude'] },
    { id: 'touch-support', title: 'Touch support', keywords: ['touch support', 'max touch points'] },
    { id: 'pointer-support', title: 'Pointer input', keywords: ['pointer input'] },
    { id: 'fonts', title: 'Fonts (tested set)', keywords: ['fonts', 'font enumeration'] },
    { id: 'java-enabled', title: 'Java plugin', keywords: ['java plugin'] },
    { id: 'plugins', title: 'Browser plugins', keywords: ['plugins', 'browser plugins'] },
    { id: 'connection-type', title: 'Connection type', keywords: ['connection type', 'network information'] },
    { id: 'effective-type', title: 'Effective type', keywords: ['effective connection type'] },
    { id: 'downlink', title: 'Download speed', keywords: ['downlink', 'bandwidth'] },
    { id: 'rtt', title: 'Round-trip time', keywords: ['latency', 'round trip time', 'rtt'] },
    { id: 'save-data', title: 'Data saver mode', keywords: ['save-data', 'data saver'] },
    { id: 'dnt', title: 'Do Not Track', keywords: ['do not track', 'dnt'] },
    { id: 'gpc', title: 'Global Privacy Control', keywords: ['global privacy control', 'gpc'] },
    { id: 'cookies', title: 'Cookies enabled', keywords: ['cookies'] },
    { id: 'local-storage', title: 'Local storage', keywords: ['localstorage', 'local storage'] },
    { id: 'dark-mode', title: 'Dark mode preference', keywords: ['dark mode'] },
    { id: 'reduced-motion', title: 'Reduced motion', keywords: ['reduced motion'] }
];

const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/\s+/g, ' ').trim();
}

function truncateText(value, maxLength) {
    const text = String(value ?? '').trim();
    if (!text) {
        return '';
    }
    if (text.length <= maxLength) {
        return text;
    }
    const truncated = text.slice(0, maxLength);
    return truncated.replace(/\s+\S*$/, '').trimEnd() + '...';
}

function toIsoDate(dateValue) {
    if (!dateValue) {
        return null;
    }
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString();
}

function getLatestIsoDate(items, selector) {
    if (!Array.isArray(items) || typeof selector !== 'function') {
        return null;
    }
    let latest = null;
    items.forEach(item => {
        const candidate = selector(item);
        const iso = toIsoDate(candidate);
        if (iso) {
            if (!latest || iso > latest) {
                latest = iso;
            }
        }
    });
    return latest;
}

function buildJsonLdScript(jsonObject, indentSize = 4) {
    const indent = ' '.repeat(indentSize);
    const json = JSON.stringify(jsonObject, null, 2);
    const indentedJson = json.split('\n').map(line => `${indent}${line}`).join('\n');
    return `${indent}<script type="application/ld+json">\n${indentedJson}\n${indent}</script>`;
}

function loadGlossaryData(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const context = { window: {}, console };
    context.window.window = context.window;
    vm.createContext(context);
    vm.runInContext(code, context, { filename: 'glossary-data.js' });
    const data = context.window.glossaryData;
    if (!Array.isArray(data)) {
        throw new Error('Failed to load glossary data');
    }
    return data;
}

function loadGlossaryUtils(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const context = { window: {}, console };
    context.window.window = context.window;
    vm.createContext(context);
    vm.runInContext(code, context, { filename: 'glossary-utils.js' });
    const utils = context.window.GlossaryUtils;
    if (!utils) {
        throw new Error('Failed to load GlossaryUtils');
    }
    return utils;
}

function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return escapeHtml(dateString);
    }
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function replaceSection(html, startMarker, endMarker, replacement) {
    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker, startIndex + startMarker.length);
    if (startIndex === -1 || endIndex === -1) {
        throw new Error(`Markers ${startMarker} / ${endMarker} not found`);
    }
    const before = html.slice(0, startIndex + startMarker.length);
    const after = html.slice(endIndex);
    return `${before}\n${replacement.trimEnd()}\n${after}`;
}

function ensureMarkerContent(html, marker) {
    if (!html.includes(marker)) {
        throw new Error(`Marker ${marker} not found`);
    }
}

function renderArticleCard(article) {
    const href = `/insights/${encodeURIComponent(article.slug)}/`;
    const dateDisplay = formatDate(article.lastUpdated);
    const dateAttribute = article.lastUpdated ? ` datetime="${escapeAttribute(article.lastUpdated)}"` : '';
    const readingTime = Number.isFinite(article.readingTime)
        ? `${article.readingTime} min read`
        : '';
    return [
        '<article class="blog-article-card" data-category="', escapeAttribute(article.category || 'General'), '">',
        '    <div class="blog-article-card__category">', escapeHtml(article.category || 'General'), '</div>',
        '    <h2 class="blog-article-card__title">',
        '        <a href="', escapeAttribute(href), '">', escapeHtml(article.title || 'Untitled article'), '</a>',
        '    </h2>',
        '    <p class="blog-article-card__excerpt">', escapeHtml(article.excerpt || ''), '</p>',
        '    <div class="blog-article-card__meta">',
        '        <time', dateAttribute, '>', escapeHtml(dateDisplay), '</time>',
        readingTime ? `        <span class="blog-article-card__reading-time">${escapeHtml(readingTime)}</span>` : '',
        '    </div>',
        '</article>'
    ].filter(Boolean).join('\n');
}

function buildInsightsStaticMarkup() {
    if (!Array.isArray(ARTICLES_DATA) || !ARTICLES_DATA.length) {
        return { categoriesMarkup: '', articlesMarkup: '', count: 0 };
    }

    const articles = ARTICLES_DATA.slice();
    const categories = Array.from(new Set(articles.map(article => article.category).filter(Boolean))).sort((a, b) => a.localeCompare(b));

    const categoriesMarkup = [
        '<div class="blog-categories__list" aria-label="Article categories">',
        '    <button class="blog-category-btn" type="button" data-category="all">All Articles</button>',
        ...categories.map(category => `    <button class="blog-category-btn" type="button" data-category="${escapeAttribute(category)}">${escapeHtml(category)}</button>`),
        '</div>'
    ].join('\n');

    const articlesMarkup = articles.map(renderArticleCard).join('\n\n');

    return {
        categoriesMarkup,
        articlesMarkup,
        count: articles.length,
        articlesList: articles
    };
}

function normalizeAlphaNumeric(value) {
    return glossaryUtils.normalizeAlphaNumeric
        ? glossaryUtils.normalizeAlphaNumeric(value)
        : String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function aliasMatchesNormalized(aliasNorm, sectionNorm) {
    if (!aliasNorm || !sectionNorm) {
        return false;
    }
    if (aliasNorm === sectionNorm) {
        return true;
    }
    if (aliasNorm.length >= sectionNorm.length + 2 && aliasNorm.includes(sectionNorm)) {
        return true;
    }
    if (sectionNorm.length >= aliasNorm.length + 2 && sectionNorm.includes(aliasNorm) && aliasNorm.length >= 3) {
        return true;
    }
    return false;
}

function buildToolSections() {
    return TOOL_SECTIONS_CONFIG.map(section => {
        const aliasSet = new Set();
        aliasSet.add(section.id);
        aliasSet.add(section.id.replace(/-/g, ' '));
        aliasSet.add(section.title);
        aliasSet.add(section.title.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s{2,}/g, ' '));
        if (Array.isArray(section.keywords)) {
            section.keywords.forEach(keyword => aliasSet.add(keyword));
        }
        const aliases = Array.from(aliasSet).filter(Boolean);
        const normalizedAliases = aliases.map(alias => normalizeAlphaNumeric(alias)).filter(Boolean);
        return {
            id: section.id,
            title: section.title,
            aliases,
            normalizedAliases
        };
    });
}

function prepareGlossaryEntries() {
    if (!glossaryUtils || typeof glossaryUtils.createEntries !== 'function') {
        throw new Error('Glossary utilities not available');
    }

    const rawEntries = glossaryUtils.createEntries(glossaryData);
    const entries = rawEntries.map((entry, index) => {
        const source = glossaryData[index] || {};
        const term = entry.term || source.term || '';
        const definition = entry.definition || source.definition || '';
        const topic = entry.topic || source.topic || 'General';
        const firstCharMatch = (term || '').trim().match(/[A-Za-z0-9]/);
        const firstChar = firstCharMatch ? firstCharMatch[0].toUpperCase() : '';
        const searchParts = [term, definition].concat(entry.aliases || []);
        const searchText = searchParts.join(' ').trim().toLowerCase();
        return {
            ...entry,
            term,
            definition,
            topic,
            firstChar,
            searchText,
            relatedArticles: [],
            toolReferences: []
        };
    });

    const toolSections = buildToolSections();
    const articles = Array.isArray(ARTICLES_DATA) ? ARTICLES_DATA : [];
    const preparedArticles = articles.map(article => ({
        meta: article,
        text: [article.title, article.excerpt, article.category].filter(Boolean).join(' ').toLowerCase()
    }));

    const MAX_RELATED = 5;

    entries.forEach(entry => {
        const normalizedNames = Array.isArray(entry.normalizedNames) ? entry.normalizedNames : [];
        entry.toolReferences = toolSections.filter(section => {
            return section.normalizedAliases.some(sectionNorm => {
                return normalizedNames.some(aliasNorm => aliasMatchesNormalized(aliasNorm, sectionNorm));
            });
        });

        const patterns = Array.isArray(entry.patterns) ? entry.patterns : [];
        if (!patterns.length) {
            entry.relatedArticles = [];
            return;
        }
        const matches = [];
        const seen = new Set();
        preparedArticles.forEach(article => {
            const hasMatch = patterns.some(pattern => pattern && pattern.test(article.text));
            if (hasMatch) {
                const slug = article.meta.slug || article.meta.id || article.meta.title;
                if (!seen.has(slug)) {
                    seen.add(slug);
                    matches.push(article.meta);
                }
            }
        });
        entry.relatedArticles = matches.slice(0, MAX_RELATED);
    });

    entries.sort((a, b) => {
        if (a.sortKey === b.sortKey) {
            return a.term.localeCompare(b.term);
        }
        return a.sortKey.localeCompare(b.sortKey);
    });

    return entries;
}

function renderGlossaryEntry(entry) {
    const aliases = Array.isArray(entry.aliases) ? entry.aliases : [];
    const aliasHtml = aliases.length
        ? `<p class="glossary-item__aliases">Also known as: ${aliases.map(escapeHtml).join(', ')}</p>`
        : '<p class="glossary-item__aliases" hidden></p>';

    const relatedArticles = Array.isArray(entry.relatedArticles) ? entry.relatedArticles : [];
    const relatedListItems = relatedArticles.map(article => {
        if (!article) return '';
        const slug = article.slug || article.id || '';
        const href = slug ? `/insights/${encodeURIComponent(slug)}/` : '/insights/';
        const title = article.title || slug || 'View article';
        return `                <li><a href="${escapeAttribute(href)}">${escapeHtml(title)}</a></li>`;
    }).filter(Boolean).join('\n');

    const relatedSection = relatedListItems
        ? [
            '        <section class="glossary-item__section glossary-item__section--articles">',
            '            <h3 class="glossary-item__section-title">Related articles</h3>',
            '            <ul class="glossary-item__list">',
            relatedListItems,
            '            </ul>',
            '        </section>'
        ].join('\n')
        : '        <section class="glossary-item__section glossary-item__section--articles" hidden>\n            <h3 class="glossary-item__section-title">Related articles</h3>\n            <ul class="glossary-item__list"></ul>\n        </section>';

    const toolReferences = Array.isArray(entry.toolReferences) ? entry.toolReferences : [];
    const toolListItems = toolReferences.map(section => {
        if (!section || !section.id) return '';
        return `                <li><a href="/#${escapeAttribute(section.id)}">${escapeHtml(section.title || section.id)}</a></li>`;
    }).filter(Boolean).join('\n');

    const toolSection = toolListItems
        ? [
            '        <section class="glossary-item__section glossary-item__section--tool">',
            '            <h3 class="glossary-item__section-title">Main tool references</h3>',
            '            <ul class="glossary-item__list">',
            toolListItems,
            '            </ul>',
            '        </section>'
        ].join('\n')
        : '        <section class="glossary-item__section glossary-item__section--tool" hidden>\n            <h3 class="glossary-item__section-title">Main tool references</h3>\n            <ul class="glossary-item__list"></ul>\n        </section>';

    const connectionsHidden = relatedListItems || toolListItems ? '' : ' hidden';

    return [
        `<article class="glossary-item" id="glossary-${escapeAttribute(entry.slug)}" data-entry-slug="${escapeAttribute(entry.slug)}" data-topic="${escapeAttribute(entry.topic)}" data-first-letter="${escapeAttribute(entry.firstChar || '')}" role="listitem" aria-hidden="false">`,
        '    <header class="glossary-item__header">',
        `        <h2 class="glossary-item__term">${escapeHtml(entry.term)}</h2>`,
        '    </header>',
        `    ${aliasHtml}`,
        `    <p class="glossary-item__definition">${escapeHtml(entry.definition)}</p>`,
        `    <div class="glossary-item__connections"${connectionsHidden}>`,
        relatedSection,
        toolSection,
        '    </div>',
        '</article>'
    ].join('\n');
}

function formatSitemapDate(value, fallbackIso) {
    const iso = value ? toIsoDate(value) : null;
    const source = iso || fallbackIso;
    if (!source) {
        return null;
    }
    return source.split('T')[0];
}

function buildSitemapXml(articles) {
    const todayIso = new Date().toISOString();
    const todayDate = formatSitemapDate(null, todayIso);
    const urls = [
        {
            loc: HOME_URL,
            lastmod: todayDate,
            changefreq: 'weekly',
            priority: '1.0'
        },
        {
            loc: `${SITE_ORIGIN}/privacy/`,
            lastmod: todayDate,
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            loc: `${SITE_ORIGIN}/about/`,
            lastmod: todayDate,
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            loc: INSIGHTS_URL,
            lastmod: todayDate,
            changefreq: 'weekly',
            priority: '0.9'
        },
        {
            loc: GLOSSARY_URL,
            lastmod: todayDate,
            changefreq: 'weekly',
            priority: '0.85'
        }
    ];

    (articles || []).forEach(article => {
        if (!article || !article.slug) {
            return;
        }
        const loc = `${INSIGHTS_URL}${encodeURIComponent(article.slug)}/`;
        const lastmod = formatSitemapDate(article.lastUpdated, todayIso) || todayDate;
        urls.push({
            loc,
            lastmod,
            changefreq: 'monthly',
            priority: '0.7'
        });
    });

    const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ];

    urls.forEach(url => {
        lines.push('  <url>');
        lines.push(`    <loc>${url.loc}</loc>`);
        if (url.lastmod) {
            lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
        }
        if (url.changefreq) {
            lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
        }
        if (url.priority) {
            lines.push(`    <priority>${url.priority}</priority>`);
        }
        lines.push('  </url>');
    });

    lines.push('</urlset>');
    return lines.join('\n');
}

function buildGlossaryStaticMarkup() {
    const entries = prepareGlossaryEntries();
    const markup = entries.map(renderGlossaryEntry).join('\n\n');
    return {
        entriesMarkup: markup,
        count: entries.length,
        entries
    };
}

function buildInsightsStructuredData(articles) {
    if (!Array.isArray(articles) || !articles.length) {
        return '';
    }
    const MAX_ITEMS = 24;
    const itemListElements = articles.slice(0, MAX_ITEMS).map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${INSIGHTS_URL}${encodeURIComponent(article.slug)}/`,
        "name": article.title
    }));
    const latestIso = getLatestIsoDate(articles, article => article.lastUpdated);
    const graph = [
        {
            "@type": "CollectionPage",
            "@id": `${INSIGHTS_URL}#page`,
            "url": INSIGHTS_URL,
            "name": "Insights – Plain-English Privacy Guides",
            "description": "Discover over 100 plain-English guides covering IP addresses, VPNs, browser fingerprinting, tracking cookies, and mobile privacy.",
            "inLanguage": "en",
            "isPartOf": { "@id": `${HOME_URL}#website` },
            "mainEntity": { "@id": `${INSIGHTS_URL}#item-list` }
        },
        {
            "@type": "ItemList",
            "@id": `${INSIGHTS_URL}#item-list`,
            "name": "Insights Guides",
            "itemListOrder": "https://schema.org/ItemListUnordered",
            "numberOfItems": articles.length,
            "itemListElement": itemListElements
        }
    ];
    if (latestIso) {
        graph[0].dateModified = latestIso;
    }
    return buildJsonLdScript({
        "@context": "https://schema.org",
        "@graph": graph
    });
}

function buildGlossaryStructuredData(entries) {
    if (!Array.isArray(entries) || !entries.length) {
        return '';
    }
    const MAX_TERMS = 50;
    const hasDefinedTerm = entries.slice(0, MAX_TERMS).map(entry => ({
        "@type": "DefinedTerm",
        "@id": `${GLOSSARY_URL}#glossary-${entry.slug}`,
        "name": entry.term,
        "description": entry.definition,
        "url": `${GLOSSARY_URL}#glossary-${entry.slug}`
    }));
    const graph = [
        {
            "@type": "CollectionPage",
            "@id": `${GLOSSARY_URL}#page`,
            "url": GLOSSARY_URL,
            "name": "Privacy Glossary – 400+ Tracking & Security Terms",
            "description": "Explore definitions of 400 privacy, security, and advertising terms. Filter by topic, letter, or acronym and discover aliases instantly.",
            "inLanguage": "en",
            "isPartOf": { "@id": `${HOME_URL}#website` },
            "mainEntity": { "@id": `${GLOSSARY_URL}#terms` }
        },
        {
            "@type": "DefinedTermSet",
            "@id": `${GLOSSARY_URL}#terms`,
            "name": "The Web Knows Privacy Glossary",
            "hasDefinedTerm": hasDefinedTerm
        }
    ];
    return buildJsonLdScript({
        "@context": "https://schema.org",
        "@graph": graph
    });
}

function buildArticleHead(article) {
    const title = article && article.title ? String(article.title) : 'Insights';
    const slug = article && article.slug ? String(article.slug) : '';
    const canonicalUrl = slug ? `${INSIGHTS_URL}${encodeURIComponent(slug)}/` : INSIGHTS_URL;
    const descriptionSource = article && article.excerpt ? article.excerpt : '';
    const description = truncateText(descriptionSource, 155);
    const articleSection = article && article.category ? article.category : 'Privacy';
    const isoDate = article && article.lastUpdated ? toIsoDate(article.lastUpdated) : null;

    const articleGraph = [
        {
            "@type": "Article",
            "@id": `${canonicalUrl}#article`,
            "headline": title,
            "description": description,
            "inLanguage": "en",
            "isPartOf": { "@id": `${INSIGHTS_URL}#page` },
            "mainEntityOfPage": { "@id": canonicalUrl },
            "articleSection": articleSection,
            "image": OG_IMAGE_URL,
            "author": {
                "@type": "Organization",
                "name": "The Web Knows"
            },
            "publisher": {
                "@type": "Organization",
                "name": "The Web Knows",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_ORIGIN}/favicon.svg`
                }
            }
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumbs`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": HOME_URL
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Insights",
                    "item": INSIGHTS_URL
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": canonicalUrl
                }
            ]
        }
    ];

    if (isoDate) {
        articleGraph[0].datePublished = isoDate;
        articleGraph[0].dateModified = isoDate;
    }

    const structuredScript = buildJsonLdScript({
        "@context": "https://schema.org",
        "@graph": articleGraph
    });

    return [
        '<head>',
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        "    <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://static.cloudflareinsights.com https://ep2.adtrafficquality.google; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.ipify.org https://api64.ipify.org https://ipapi.co https://ipinfo.io https://dns.google https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://*.google.com https://*.doubleclick.net https://*.googlesyndication.com; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep2.adtrafficquality.google https://*.google.com; base-uri 'self'; form-action 'self';\" />",
        '    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />',
        '    <meta http-equiv="Permissions-Policy" content="geolocation=(), camera=(), microphone=(), browsing-topics=(self)" />',
        '    <meta http-equiv="X-Content-Type-Options" content="nosniff" />',
        '',
        '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
        '',
        `    <title>${escapeHtml(`${title} | Insights | The Web Knows`)}</title>`,
        `    <meta name="description" content="${escapeAttribute(description)}" />`,
        '    <meta name="robots" content="index, follow" />',
        '',
        `    <link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`,
        '',
        '    <!-- Google AdSense - Loaded after page load to avoid blocking render -->',
        '',
        '    <meta property="og:type" content="article" />',
        '    <meta property="og:site_name" content="The Web Knows" />',
        `    <meta property="og:url" content="${escapeAttribute(canonicalUrl)}" />`,
        `    <meta property="og:title" content="${escapeAttribute(title)}" />`,
        `    <meta property="og:description" content="${escapeAttribute(description)}" />`,
        `    <meta property="og:image" content="${escapeAttribute(OG_IMAGE_URL)}" />`,
        `    <meta property="article:section" content="${escapeAttribute(articleSection)}" />`,
        isoDate ? `    <meta property="article:published_time" content="${escapeAttribute(isoDate)}" />` : '',
        isoDate ? `    <meta property="article:modified_time" content="${escapeAttribute(isoDate)}" />` : '',
        '',
        '    <meta name="twitter:card" content="summary_large_image" />',
        `    <meta name="twitter:title" content="${escapeAttribute(title)}" />`,
        `    <meta name="twitter:description" content="${escapeAttribute(description)}" />`,
        `    <meta name="twitter:image" content="${escapeAttribute(OG_IMAGE_URL)}" />`,
        `    <meta name="twitter:url" content="${escapeAttribute(canonicalUrl)}" />`,
        '',
        ARTICLE_THEME_SCRIPT,
        '',
        '    <link rel="stylesheet" href="/styles.css" />',
        '',
        structuredScript,
        '</head>'
    ].filter(Boolean).join('\n');
}

function applyArticleLinkUpdates(html) {
    return html
        .replace(/<html lang="en-GB">/g, '<html lang="en">')
        .replace(/class="brand" href="\.\.\/"/g, 'class="brand" href="/"')
        .replace(/class="nav-link" href="\.\.\/">Report/g, 'class="nav-link" href="/">Report')
        .replace(/class="nav-link" href="\.\.\/insights\.html"/g, 'class="nav-link" href="/insights/"')
        .replace(/class="nav-link" href="\.\.\/glossary\.html"/g, 'class="nav-link" href="/glossary/"')
        .replace(/<li><a href="\.\.\/">Home<\/a><\/li>/g, '<li><a href="/">Home</a></li>')
        .replace(/<li><a href="\.\.\/insights\.html">Insights<\/a><\/li>/g, '<li><a href="/insights/">Insights</a></li>')
        .replace(/href="\.\.\/privacy\.html"/g, 'href="/privacy/"')
        .replace(/href="\.\.\/about\.html"/g, 'href="/about/"')
        .replace(/href="\.\.\/glossary\.html"/g, 'href="/glossary/"')
        .replace(/href="\.\.\/insights\.html"/g, 'href="/insights/"')
        .replace(/Â©/g, '&copy;');
}

function applyArticleFooterScripts(html) {
    const scriptsBlock = '\n' + ARTICLE_FOOTER_SCRIPTS.join('\n') + '\n';
    const patterns = [
        /<script src="\.\.\/glossary-data\.js"><\/script>[\s\S]*?<script src="\.\.\/app\.js" defer><\/script>/,
        /<script src="(\.\.\/){2}glossary-data\.js"><\/script>[\s\S]*?<script src="(\.\.\/){2}app\.js" defer><\/script>/
    ];
    let updated = html;
    let replaced = false;
    patterns.forEach(pattern => {
        if (pattern.test(updated)) {
            updated = updated.replace(pattern, scriptsBlock.trimStart());
            replaced = true;
        }
    });
    if (!replaced) {
        const insertionPoint = updated.lastIndexOf('</body>');
        if (insertionPoint !== -1) {
            updated = `${updated.slice(0, insertionPoint)}${scriptsBlock}${updated.slice(insertionPoint)}`;
        }
    }
    return updated;
}

function updateArticleHead(article) {
    if (!article || !article.slug) {
        return;
    }
    const legacyPath = path.join(rootDir, 'blog', `${article.slug}.html`);
    const outputDir = path.join(rootDir, 'insights', article.slug);
    const outputPath = path.join(outputDir, 'index.html');

    let sourcePath = outputPath;
    if (!fs.existsSync(sourcePath)) {
        if (fs.existsSync(legacyPath)) {
            sourcePath = legacyPath;
        } else {
            return;
        }
    }

    const fileContent = fs.readFileSync(sourcePath, 'utf8');
    const headStart = fileContent.indexOf('<head>');
    const headEnd = fileContent.indexOf('</head>');
    if (headStart === -1 || headEnd === -1) {
        return;
    }
    const newHead = buildArticleHead(article);
    let updated = `${fileContent.slice(0, headStart)}${newHead}\n${fileContent.slice(headEnd + '</head>'.length)}`;
    updated = applyArticleLinkUpdates(updated);
    updated = applyArticleFooterScripts(updated);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, updated, 'utf8');

    if (sourcePath === legacyPath && fs.existsSync(legacyPath)) {
        fs.unlinkSync(legacyPath);
    }
}

function updateArticlePages(articles) {
    if (!Array.isArray(articles) || !articles.length) {
        return;
    }
    articles.forEach(article => {
        try {
            updateArticleHead(article);
        } catch (error) {
            console.warn(`Failed to update article head for ${article && article.slug}`, error);
        }
    });
}

function writeOutputFile(fileName, content) {
    const filePath = path.join(buildDir, fileName);
    fs.writeFileSync(filePath, content.trimStart() + '\n', 'utf8');
}

function updateHtmlFile(filePath, replacements) {
    let html = fs.readFileSync(filePath, 'utf8');
    Object.entries(replacements).forEach(([key, value]) => {
        const [startMarker, endMarker] = key.split('|');
        ensureMarkerContent(html, startMarker);
        ensureMarkerContent(html, endMarker);
        html = replaceSection(html, startMarker, endMarker, value);
    });
    fs.writeFileSync(filePath, html, 'utf8');
}

// Build Insights markup
const insights = buildInsightsStaticMarkup();
writeOutputFile('insights-categories.html', insights.categoriesMarkup);
writeOutputFile('insights-articles.html', insights.articlesMarkup);

const insightsResultsText = insights.count === 1
    ? 'Showing 1 article'
    : `Showing ${insights.count} articles`;
const insightsJsonLdScript = buildInsightsStructuredData(insights.articlesList || []);
if (insightsJsonLdScript) {
    writeOutputFile('insights.jsonld', insightsJsonLdScript);
}

updateHtmlFile(insightsHtmlPath, {
    '<!-- SSR:CATEGORIES:START -->|<!-- SSR:CATEGORIES:END -->': insights.categoriesMarkup,
    '<!-- SSR:ARTICLES:START -->|<!-- SSR:ARTICLES:END -->': insights.articlesMarkup,
    '<!-- SSR:RESULTS:START -->|<!-- SSR:RESULTS:END -->': insightsResultsText,
    '<!-- SSR:INSIGHTS-LD:START -->|<!-- SSR:INSIGHTS-LD:END -->': insightsJsonLdScript || '    <script type="application/ld+json">\n    {}\n    </script>'
});

// Build Glossary markup
const glossary = buildGlossaryStaticMarkup();
writeOutputFile('glossary-entries.html', glossary.entriesMarkup);
const glossaryJsonLdScript = buildGlossaryStructuredData(glossary.entries || []);
if (glossaryJsonLdScript) {
    writeOutputFile('glossary.jsonld', glossaryJsonLdScript);
}

updateHtmlFile(glossaryHtmlPath, {
    '<!-- SSR:GLOSSARY:START -->|<!-- SSR:GLOSSARY:END -->': glossary.entriesMarkup,
    '<!-- SSR:GLOSSARY-LD:START -->|<!-- SSR:GLOSSARY-LD:END -->': glossaryJsonLdScript || '    <script type="application/ld+json">\n    {}\n    </script>'
});

updateArticlePages(ARTICLES_DATA);

const sitemapXml = buildSitemapXml(ARTICLES_DATA);
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml + '\n', 'utf8');

console.log(`Prebuild complete. Generated ${insights.count} articles and ${glossary.count} glossary entries.`);

