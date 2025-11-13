(function () {
    'use strict';

    const dynamicRoot = document.getElementById('article-root');
    const staticArticle = dynamicRoot ? null : document.querySelector('.blog-article');

    if (!dynamicRoot && !staticArticle) {
        return;
    }

    const glossaryUtils = (typeof GlossaryUtils !== 'undefined' && GlossaryUtils) || null;
    const glossaryEntries = (glossaryUtils && typeof glossaryUtils.createEntries === 'function' && Array.isArray(window.glossaryData))
        ? glossaryUtils.createEntries(window.glossaryData)
        : [];
    const matchGlossaryEntries = glossaryUtils && typeof glossaryUtils.matchText === 'function'
        ? glossaryUtils.matchText
        : null;

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttribute(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function buildLink(slug) {
        if (!slug) {
            return '/privacy-insights/';
        }
        return `/privacy-insights/${encodeURIComponent(slug)}/`;
    }

    function cssEscape(value) {
        if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
            return CSS.escape(value);
        }
        return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
    }

    function getCanonicalOrigin() {
        const canonicalLink = document.head.querySelector('link[rel="canonical"]');
        if (canonicalLink && canonicalLink.href) {
            try {
                const url = new URL(canonicalLink.href, window.location.href);
                if (url.origin && url.origin !== 'null') {
                    return url.origin;
                }
            } catch (error) {
                // fall back to other methods
            }
        }

        try {
            if (window.location && window.location.origin && window.location.origin !== 'null') {
                return window.location.origin;
            }
        } catch (error) {
            // ignore origin errors
        }

        return 'https://thewebknows.pages.dev';
    }

    const CANONICAL_ORIGIN = getCanonicalOrigin();

    function ensureMetaName(name, content) {
        if (!name || typeof content !== 'string') {
            return;
        }
        let meta = document.head.querySelector(`meta[name="${cssEscape(name)}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    function ensureMetaProperty(property, content) {
        if (!property || typeof content !== 'string') {
            return;
        }
        let meta = document.head.querySelector(`meta[property="${cssEscape(property)}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    function ensureLinkRel(rel, href) {
        if (!rel || typeof href !== 'string') {
            return;
        }
        let link = document.head.querySelector(`link[rel="${cssEscape(rel)}"]`);
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', rel);
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }


    function buildMetaDescription(meta) {
        const source = (meta && (meta.summary || meta.excerpt)) ? String(meta.summary || meta.excerpt).trim() : '';
        if (!source) {
            return '';
        }
        if (source.length <= 155) {
            return source;
        }
        const truncated = source.slice(0, 155);
        const cleaned = truncated.replace(/\s+[^\s]*$/, '');
        return cleaned.length ? `${cleaned}...` : source;
    }

    function toIsoTimestamp(dateString) {
        if (!dateString) {
            return null;
        }
        const isoCandidate = `${dateString}T00:00:00.000Z`;
        if (!Number.isNaN(Date.parse(isoCandidate))) {
            return isoCandidate;
        }
        const parsed = new Date(dateString);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toISOString();
        }
        return null;
    }

    function updateStructuredData(meta, canonicalUrl, description) {
        if (!meta || !canonicalUrl) {
            return;
        }
        const graph = [];
        const articleId = `${canonicalUrl}#article`;
        const hubUrl = `${CANONICAL_ORIGIN}/privacy-insights/`;
        const isoDate = toIsoTimestamp(meta.lastUpdated);

        graph.push({
            '@type': 'Article',
            '@id': articleId,
            headline: meta.title || '',
            description: description || '',
            inLanguage: 'en',
            isPartOf: {
                '@id': `${hubUrl}#page`
            },
            mainEntityOfPage: {
                '@id': canonicalUrl
            },
            articleSection: meta.category || '',
            image: `${CANONICAL_ORIGIN}/og-image.png`,
            author: {
                '@type': 'Organization',
                name: 'The Web Knows'
            },
            publisher: {
                '@type': 'Organization',
                name: 'The Web Knows',
                logo: {
                    '@type': 'ImageObject',
                    url: `${CANONICAL_ORIGIN}/favicon.svg`
                }
            },
            datePublished: isoDate || undefined,
            dateModified: isoDate || undefined
        });

        graph.push({
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumbs`,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: `${CANONICAL_ORIGIN}/`
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Privacy Insights',
                    item: hubUrl
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: meta.title || '',
                    item: canonicalUrl
                }
            ]
        });

        let ldScript = document.head.querySelector('script[data-dynamic-article-ld]');
        if (!ldScript) {
            ldScript = document.createElement('script');
            ldScript.type = 'application/ld+json';
            ldScript.setAttribute('data-dynamic-article-ld', 'true');
            document.head.appendChild(ldScript);
        }
        ldScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': graph
        }, null, 2);
    }

    function applyHeadMetadata(meta) {
        if (!meta || !meta.slug) {
            return;
        }

        const canonicalUrl = `${CANONICAL_ORIGIN}${buildLink(meta.slug)}`;
        const description = buildMetaDescription(meta);
        const isoDate = toIsoTimestamp(meta.lastUpdated);

        document.title = `${meta.title || 'Privacy Insights'} | Privacy Insights | The Web Knows`;

        ensureMetaName('description', description || 'Explore privacy diagnostics and guides from The Web Knows.');
        ensureLinkRel('canonical', canonicalUrl);

        ensureMetaProperty('og:type', 'article');
        ensureMetaProperty('og:site_name', 'The Web Knows');
        ensureMetaProperty('og:url', canonicalUrl);
        ensureMetaProperty('og:title', meta.title || 'Privacy Insights');
        ensureMetaProperty('og:description', description || '');
        ensureMetaProperty('og:image', `${CANONICAL_ORIGIN}/og-image.png`);

        ensureMetaProperty('article:section', meta.category || '');
        if (isoDate) {
            ensureMetaProperty('article:published_time', isoDate);
            ensureMetaProperty('article:modified_time', isoDate);
        }

        ensureMetaName('twitter:card', 'summary_large_image');
        ensureMetaName('twitter:title', meta.title || 'Privacy Insights');
        ensureMetaName('twitter:description', description || '');
        ensureMetaName('twitter:image', `${CANONICAL_ORIGIN}/og-image.png`);
        ensureMetaName('twitter:url', canonicalUrl);

        updateStructuredData(meta, canonicalUrl, description);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function findGlossaryMatches(meta, additionalText = '') {
        if (!matchGlossaryEntries || !glossaryEntries.length || !meta) {
            return [];
        }
        const sources = [
            meta.title,
            meta.excerpt,
            Array.isArray(meta.keywords) ? meta.keywords.join(' ') : '',
            meta.summary,
            additionalText
        ].filter(Boolean);
        if (!sources.length) {
            return [];
        }
        const combined = sources.join(' ');
        const matches = matchGlossaryEntries(glossaryEntries, combined);
        if (!Array.isArray(matches) || !matches.length) {
            return [];
        }
        const unique = [];
        const seen = new Set();
        matches.forEach(entry => {
            if (!entry) return;
            const key = entry.slug || entry.id || entry.term;
            if (!key || seen.has(key)) return;
            seen.add(key);
            unique.push(entry);
        });
        unique.sort((a, b) => a.term.localeCompare(b.term));
        return unique.slice(0, 8);
    }

    function buildGlossarySection(matches) {
        if (!Array.isArray(matches) || !matches.length) {
            return '';
        }

        const items = matches.map(entry => {
            const slug = entry.slug || entry.id || '';
            const aliases = Array.isArray(entry.aliases) ? entry.aliases : [];
            const aliasText = aliases.length
                ? `<span class="article-glossary-term__aliases">Also known as: ${escapeHtml(aliases.join(', '))}</span>`
                : '';
            const glossaryHref = slug
                ? `/glossary/#glossary-${escapeAttribute(slug)}`
                : '/glossary/';

            return `
                <details class="article-glossary-term" data-term="${escapeAttribute(slug)}">
                    <summary>
                        <span class="article-glossary-term__name">${escapeHtml(entry.term)}</span>
                        ${aliasText}
                    </summary>
                    <div class="article-glossary-term__body">
                        <p>${escapeHtml(entry.definition)}</p>
                        <p class="article-glossary-term__actions"><a href="${glossaryHref}">View in glossary</a></p>
                    </div>
                </details>
            `;
        }).join('');

        return `
            <section class="blog-article__glossary">
                <h2>Glossary Terms Mentioned</h2>
                <div class="article-glossary-list">
                    ${items}
                </div>
            </section>
        `;
    }

    function buildRelatedSection(relatedSlugs) {
        const relatedList = Array.isArray(relatedSlugs) ? relatedSlugs : [];
        const items = [];
        const seen = new Set();

        if (Array.isArray(ARTICLES_DATA)) {
            relatedList.forEach(slug => {
                if (!slug || seen.has(slug)) {
                    return;
                }
                const related = ARTICLES_DATA.find(article => article.slug === slug);
                if (!related) {
                    return;
                }
                seen.add(slug);
                const href = glossaryUtils && typeof glossaryUtils.buildArticleUrl === 'function'
                    ? glossaryUtils.buildArticleUrl(related.slug, { prefix: './' })
                    : buildLink(related.slug);
                items.push(`<li><a href="${escapeAttribute(href)}">${escapeHtml(related.title)}</a></li>`);
            });
        }

        if (!items.length) {
            return '';
        }

        return `
            <aside class="blog-article__related">
                <h2>Related Articles</h2>
                <ul class="related-articles-list">
                    ${items.join('')}
                </ul>
            </aside>
        `;
    }

    function renderError(message) {
        if (!dynamicRoot) {
            return;
        }
        dynamicRoot.innerHTML = `
            <div class="blog-article__content">
                <h1>Article not found</h1>
                <p>${message}</p>
                <p><a href="/privacy-insights/" class="btn btn-primary">Back to Privacy Insights</a></p>
            </div>
        `;
        dynamicRoot.classList.remove('placeholder-article');
        dynamicRoot.setAttribute('aria-busy', 'false');
    }

    function enhanceStaticArticle(meta) {
        if (!staticArticle || !meta) {
            return;
        }
        const contentEl = staticArticle.querySelector('.blog-article__content');
        const bodyText = contentEl ? contentEl.textContent || '' : '';
        const glossaryMatches = findGlossaryMatches(meta, bodyText);
        const glossaryMarkup = buildGlossarySection(glossaryMatches);
        const relatedMarkup = buildRelatedSection(meta.relatedArticles || []);

        if (glossaryMarkup && !staticArticle.querySelector('.blog-article__glossary')) {
            staticArticle.insertAdjacentHTML('beforeend', glossaryMarkup);
        }

        if (relatedMarkup && !staticArticle.querySelector('.blog-article__related')) {
            staticArticle.insertAdjacentHTML('beforeend', relatedMarkup);
        }
    }

    function renderDynamicArticle(meta) {
        if (!dynamicRoot) {
            return;
        }
        applyHeadMetadata(meta);
        const { title, category, lastUpdated, readingTime, excerpt, relatedArticles = [] } = meta;
        const safeTitle = escapeHtml(title);
        const safeCategory = escapeHtml(category);
        const safeExcerpt = escapeHtml(excerpt);
        const glossaryMatches = findGlossaryMatches(meta);
        const glossarySection = buildGlossarySection(glossaryMatches);
        const relatedSection = buildRelatedSection(relatedArticles);

        dynamicRoot.innerHTML = `
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    <li><a href="../">Home</a></li>
                <li><a href="/privacy-insights/">Insights</a></li>
                    <li aria-current="page">${safeTitle}</li>
                </ol>
            </nav>

            <header class="blog-article__header">
                <p class="blog-article__category">${safeCategory}</p>
                <h1 class="blog-article__title">${safeTitle}</h1>
                <div class="blog-article__meta">
                    <time datetime="${lastUpdated}">${formatDate(lastUpdated)}</time>
                    <span class="blog-article__reading-time">${readingTime} min read</span>
                </div>
            </header>

            <section class="blog-article__content">
                <h2>Summary</h2>
                <p>${safeExcerpt}</p>
                <div class="info-card-note">
                    <p><strong>Full article coming soon.</strong></p>
                    <p>We're still polishing the deep dive for this topic. Check back shortly or explore the related guides below.</p>
                </div>
            </section>

            ${glossarySection}
            ${relatedSection}
        `;

        dynamicRoot.classList.remove('placeholder-article');
        dynamicRoot.setAttribute('aria-busy', 'false');
    }

    function init() {
        if (!dynamicRoot && staticArticle) {
            if (typeof ARTICLES_DATA === 'undefined') {
                return;
            }
            const pathMatch = window.location.pathname.match(/\/privacy-insights\/([^/]+)\/?$/) ||
                window.location.pathname.match(/\/blog\/([^/.]+)\.html?$/);
            const slug = pathMatch ? pathMatch[1] : null;
            if (!slug) {
                return;
            }
            const meta = ARTICLES_DATA.find(article => article.slug === slug);
            if (meta) {
                enhanceStaticArticle(meta);
            }
            return;
        }

        if (!dynamicRoot) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (!slug) {
            renderError('No article was specified. Please choose a guide from the Privacy Insights section.');
            return;
        }

        if (typeof ARTICLES_DATA === 'undefined') {
            renderError('Article data failed to load. Please refresh the page.');
            return;
        }

        const meta = ARTICLES_DATA.find(article => article.slug === slug);
        if (!meta) {
            renderError('We couldn’t find that article. It may have moved or been renamed.');
            return;
        }

        renderDynamicArticle(meta);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

