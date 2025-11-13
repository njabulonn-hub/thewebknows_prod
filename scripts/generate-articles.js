const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'blog', 'articles-data.js');
const SOURCE_MARKDOWN = path.join(__dirname, '..', 'blog', 'articles-expanded.md');
const OUTPUT_DIR = path.join(__dirname, '..', 'privacy-insights');
const SITE_ORIGIN = 'https://thewebknows.pages.dev';

const THEME_PREFLIGHT_SCRIPT = `    <script>
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

function loadArticlesData() {
    const content = fs.readFileSync(DATA_PATH, 'utf8');
    const match = content.match(/const ARTICLES_DATA = (\[[\s\S]*?\]);/);
    if (!match) {
        throw new Error('Unable to parse ARTICLES_DATA in articles-data.js');
    }
    return eval(match[1]);
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

function convertMarkdownToHtml(markdown) {
    const lines = markdown.split(/\r?\n/);
    const html = [];
    let inUl = false;
    let inOl = false;

    const closeLists = () => {
        if (inUl) {
            html.push('</ul>');
            inUl = false;
        }
        if (inOl) {
            html.push('</ol>');
            inOl = false;
        }
    };

    const wrapStrong = (text) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    for (let rawLine of lines) {
        const line = rawLine.trimEnd();
        if (!line.trim()) {
            closeLists();
            continue;
        }

        if (line.startsWith('1. ') || line.match(/^\d+\.\s/)) {
            if (inUl) {
                html.push('</ul>');
                inUl = false;
            }
            if (!inOl) {
                html.push('<ol>');
                inOl = true;
            }
            html.push(`<li>${wrapStrong(line.replace(/^\d+\.\s*/, ''))}</li>`);
            continue;
        }

        if (line.startsWith('- ')) {
            if (inOl) {
                html.push('</ol>');
                inOl = false;
            }
            if (!inUl) {
                html.push('<ul>');
                inUl = true;
            }
            html.push(`<li>${wrapStrong(line.replace(/^-+\s*/, ''))}</li>`);
            continue;
        }

        closeLists();

        if (line.startsWith('**') && line.includes('**:')) {
            const [label, ...rest] = line.split('**:');
            const strong = `<strong>${label.replace(/\*\*/g, '')}:</strong>`;
            const remainder = rest.join('**:').trim();
            html.push(`<p>${strong} ${wrapStrong(remainder)}</p>`);
            continue;
        }

        if (line === '---') {
            html.push('<hr />');
            continue;
        }

        html.push(`<p>${wrapStrong(line)}</p>`);
    }

    closeLists();
    return html.join('\n');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function escapeAttribute(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function truncateDescription(value, maxLength = 155) {
    const text = String(value ?? '').trim();
    if (!text) {
        return '';
    }
    if (text.length <= maxLength) {
        return text;
    }
    const truncated = text.slice(0, maxLength);
    const cleaned = truncated.replace(/\s+[^\s]*$/, '').trimEnd();
    return cleaned.length ? `${cleaned}...` : text;
}

function toIsoDateString(value) {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString();
}

function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function slugToFilename(slug) {
    return path.join(slug, 'index.html');
}

function generateArticleHtml(article, bodyHtml) {
    const {
        title,
        category,
        slug,
        lastUpdated,
        readingTime,
    } = article;

    const safeTitleText = escapeHtml(title || 'Privacy Insights');
    const safeCategoryText = escapeHtml(category || 'Privacy Insights');
    const canonicalUrl = `${SITE_ORIGIN}/privacy-insights/${encodeURIComponent(slug)}/`;
    const descriptionSource = article.summary || article.seoDescription || article.excerpt || '';
    const description = truncateDescription(descriptionSource, 155);
    const safeDescriptionAttr = escapeAttribute(description);
    const isoDate = toIsoDateString(lastUpdated);
    const publishedDate = new Date(lastUpdated);
    const formattedDate = Number.isNaN(publishedDate.getTime())
        ? escapeHtml(lastUpdated || '')
        : publishedDate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    const datetimeAttribute = isoDate ? isoDate.split('T')[0] : escapeAttribute(lastUpdated || '');
    const readingTimeLabel = typeof readingTime === 'number'
        ? `${readingTime} min read`
        : escapeHtml(String(readingTime || ''));

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `${canonicalUrl}#article`,
                headline: title || '',
                description,
                inLanguage: 'en',
                isPartOf: {
                    '@id': `${SITE_ORIGIN}/privacy-insights/#page`
                },
                mainEntityOfPage: {
                    '@id': canonicalUrl
                },
                articleSection: category || '',
                image: `${SITE_ORIGIN}/og-image.png`,
                author: {
                    '@type': 'Organization',
                    name: 'The Web Knows'
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'The Web Knows',
                    logo: {
                        '@type': 'ImageObject',
                        url: `${SITE_ORIGIN}/favicon.svg`
                    }
                },
                datePublished: isoDate || undefined,
                dateModified: isoDate || undefined
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${canonicalUrl}#breadcrumbs`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: `${SITE_ORIGIN}/`
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Privacy Insights',
                        item: `${SITE_ORIGIN}/privacy-insights/`
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: title || '',
                        item: canonicalUrl
                    }
                ]
            }
        ]
    };

    const structuredDataJson = JSON.stringify(structuredData, null, 2)
        .split('\n')
        .map(line => `    ${line}`)
        .join('\n');

    const articleSectionMeta = category
        ? `    <meta property="article:section" content="${escapeAttribute(category)}" />\n`
        : '';
    const publishedMeta = isoDate
        ? `    <meta property="article:published_time" content="${isoDate}" />\n    <meta property="article:modified_time" content="${isoDate}" />\n`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.ipify.org https://api64.ipify.org https://ipapi.co https://ipinfo.io https://dns.google https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://*.google.com https://*.doubleclick.net https://*.googlesyndication.com; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; base-uri 'self'; form-action 'self';" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${safeTitleText} | Privacy Insights | The Web Knows</title>
    <meta name="description" content="${safeDescriptionAttr}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9160600423347839" crossorigin="anonymous"></script>
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="The Web Knows" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeAttribute(title || '')}" />
    <meta property="og:description" content="${safeDescriptionAttr}" />
    <meta property="og:image" content="${SITE_ORIGIN}/og-image.png" />
    <meta property="og:locale" content="en_US" />
${articleSectionMeta}${publishedMeta}    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(title || '')}" />
    <meta name="twitter:description" content="${safeDescriptionAttr}" />
    <meta name="twitter:image" content="${SITE_ORIGIN}/og-image.png" />
    <meta name="twitter:image:alt" content="${escapeAttribute(title || '')}" />
    <meta name="twitter:url" content="${canonicalUrl}" />
${THEME_PREFLIGHT_SCRIPT}
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">
${structuredDataJson}
    </script>
</head>
<body>
    <header class="site-header" role="banner">
        <div class="header-inner">
            <a class="brand" href="/">
                <span class="brand-text" aria-hidden="true">The Web Knows</span>
                <span class="brand-badge" aria-hidden="true">W</span>
                <span class="sr-only brand-badge__label">The Web Knows</span>
            </a>
            <nav class="nav-row" aria-label="Primary">
                <a class="nav-link" href="/">Report</a>
                <a class="nav-link" href="/privacy-insights/" aria-current="page">Insights</a>
                <a class="nav-link" href="/glossary/">Glossary</a>
            </nav>
            <button type="button" id="theme-toggle" class="theme-toggle" aria-pressed="false" aria-label="Toggle dark mode">
                <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true"></span>
                <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true"></span>
                <span class="theme-toggle__label">Dark</span>
            </button>
        </div>
    </header>

    <main class="app-shell">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol class="breadcrumb-list">
                <li><a href="/">Home</a></li>
                <li><a href="/privacy-insights/">Insights</a></li>
                <li aria-current="page">${safeTitleText}</li>
            </ol>
        </nav>

        <article class="blog-article">
            <header class="blog-article__header">
                <p class="blog-article__category">${safeCategoryText}</p>
                <h1 class="blog-article__title">${safeTitleText}</h1>
                <div class="blog-article__meta">
                    <time datetime="${datetimeAttribute}">${formattedDate}</time>
                    <span class="blog-article__reading-time">${readingTimeLabel}</span>
                </div>
            </header>
            <section class="blog-article__content">
                ${bodyHtml}
            </section>
        </article>
    </main>

    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-column">
                <p class="footer-trust">Plain-English diagnostics for modern privacy.</p>
                <p class="footer-copyright">&copy; 2025 The Web Knows. All rights reserved.</p>
            </div>
            <nav class="footer-nav" aria-label="Footer navigation">
                <a href="/privacy/">Privacy Policy</a>
                <a href="/about/">About</a>
                <a href="/glossary/">Glossary</a>
                <a href="/privacy-insights/">Privacy Insights</a>
            </nav>
        </div>
    </footer>

    <script src="/app.js" defer></script>
</body>
</html>`;
}

function main() {
    const articles = loadArticlesData();
    const markdown = fs.readFileSync(SOURCE_MARKDOWN, 'utf8');
    const sections = parseMarkdownSections(markdown);
    const outputCount = { success: 0, missing: 0 };

    articles.forEach((article) => {
        const target = normaliseTitle(article.title);
        const heading = Object.keys(sections).find((key) => {
            const normalised = normaliseTitle(key);
            return normalised.startsWith(target) || target.startsWith(normalised) || normalised.includes(target);
        });

        if (!heading) {
            outputCount.missing += 1;
            console.warn(`Missing content for "${article.title}" (${article.slug})`);
            return;
        }

        const htmlBody = convertMarkdownToHtml(sections[heading]);
        const articleHtml = generateArticleHtml(article, htmlBody);
        const articleDirectory = path.join(OUTPUT_DIR, article.slug);
        ensureDirectory(articleDirectory);
        const outputPath = path.join(articleDirectory, 'index.html');
        fs.writeFileSync(outputPath, articleHtml, 'utf8');
        outputCount.success += 1;
    });

    console.log(`Generated ${outputCount.success} articles.`);
    if (outputCount.missing) {
        console.warn(`${outputCount.missing} articles were missing expanded content.`);
    }
}

if (require.main === module) {
    main();
}


