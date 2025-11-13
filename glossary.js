(function () {
    const data = Array.isArray(window.glossaryData) ? window.glossaryData : [];
    if (!data.length) {
        console.warn('Glossary data is empty or missing.');
        return;
    }

    const glossaryList = document.getElementById('glossary-list');
    const emptyEl = document.getElementById('glossary-empty');
    const searchInput = document.getElementById('glossary-search-input');
    const searchClearButton = document.querySelector('.search-clear-button[data-target="glossary-search-input"]');
    const topicSelect = document.getElementById('glossary-topic-select');
    const letterFieldset = document.querySelector('.glossary-alpha');

    if (!glossaryList || !emptyEl || !searchInput || !topicSelect || !letterFieldset) {
        console.warn('Glossary UI elements are missing.');
        return;
    }

    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const emptyMessage = emptyEl.dataset.emptyMessage || 'No terms match your filters yet. Try a different letter, topic, or keyword.';
    let emptyRendered = false;

    function getCanonicalDetails() {
        const defaults = {
            origin: 'https://thewebknows.pages.dev',
            canonicalUrl: 'https://thewebknows.pages.dev/glossary/'
        };
        const head = document.head || null;
        let href = null;
        if (head) {
            const canonical = head.querySelector('link[rel="canonical"]');
            if (canonical && canonical.href) {
                href = canonical.href;
            }
        }
        try {
            if (!href) {
                href = window.location ? window.location.href : defaults.canonicalUrl;
            }
            const url = new URL(href, window.location && window.location.href ? window.location.href : defaults.canonicalUrl);
            if (!url.pathname.endsWith('/')) {
                url.pathname = `${url.pathname}/`;
            }
            return {
                origin: url.origin || defaults.origin,
                canonicalUrl: url.toString()
            };
        } catch (error) {
            return defaults;
        }
    }

    const CANONICAL_DETAILS = getCanonicalDetails();

    function findGlossaryLdScript() {
        const head = document.head;
        if (!head) {
            return null;
        }
        const scripts = head.querySelectorAll('script[type="application/ld+json"]');
        for (let i = 0; i < scripts.length; i += 1) {
            const script = scripts[i];
            if (script.textContent && script.textContent.includes('/glossary/#page')) {
                return script;
            }
        }
        return null;
    }

    function injectGlossaryStructuredData(entriesList) {
        if (!Array.isArray(entriesList) || !entriesList.length) {
            return;
        }
        const head = document.head;
        if (!head) {
            return;
        }

        const pageTitle = (document.title || 'Privacy Glossary').trim();
        const descriptionMeta = head.querySelector('meta[name="description"]');
        const pageDescription = descriptionMeta && descriptionMeta.getAttribute('content')
            ? descriptionMeta.getAttribute('content').trim()
            : 'Explore definitions of privacy, security, and advertising terms.';

        const collectionPageId = `${CANONICAL_DETAILS.canonicalUrl}#page`;
        const definedTermSetId = `${CANONICAL_DETAILS.canonicalUrl}#terms`;
        const itemListId = `${CANONICAL_DETAILS.canonicalUrl}#item-list`;
        const websiteId = `${CANONICAL_DETAILS.origin}/#website`;

        const listElements = entriesList.map((entry, index) => {
            if (!entry || !entry.term) {
                return null;
            }
            const termUrl = `${CANONICAL_DETAILS.canonicalUrl}#glossary-${entry.slug}`;
            return {
                '@type': 'ListItem',
                position: index + 1,
                name: entry.term,
                url: termUrl
            };
        }).filter(Boolean);

        const definedTerms = entriesList.map(entry => {
            if (!entry || !entry.term) {
                return null;
            }
            const termUrl = `${CANONICAL_DETAILS.canonicalUrl}#glossary-${entry.slug}`;
            const termData = {
                '@type': 'DefinedTerm',
                '@id': termUrl,
                name: entry.term,
                description: entry.definition || '',
                url: termUrl,
                inDefinedTermSet: definedTermSetId
            };
            if (Array.isArray(entry.aliases) && entry.aliases.length) {
                termData.alternateName = entry.aliases.slice(0, 8);
            }
            if (entry.topic) {
                termData.subjectOf = termData.subjectOf || [];
                termData.subjectOf.push({
                    '@type': 'Thing',
                    name: entry.topic
                });
            }
            if (Array.isArray(entry.relatedArticles) && entry.relatedArticles.length) {
                const relatedArticles = entry.relatedArticles.slice(0, 3).map(article => {
                    const slug = article && (article.slug || article.id);
                    if (!slug) {
                        return null;
                    }
                    const articleUrl = `${CANONICAL_DETAILS.origin}/privacy-insights/${slug}/`;
                    return {
                        '@type': 'Article',
                        '@id': `${articleUrl}#article`,
                        name: article.title || '',
                        url: articleUrl
                    };
                }).filter(Boolean);
                if (relatedArticles.length) {
                    termData.subjectOf = (termData.subjectOf || []).concat(relatedArticles);
                }
            }
            if (!termData.subjectOf || !termData.subjectOf.length) {
                delete termData.subjectOf;
            }
            return termData;
        }).filter(Boolean);

        const payload = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'CollectionPage',
                    '@id': collectionPageId,
                    url: CANONICAL_DETAILS.canonicalUrl,
                    name: pageTitle,
                    description: pageDescription,
                    inLanguage: 'en',
                    isPartOf: {
                        '@id': websiteId
                    }
                },
                {
                    '@type': 'ItemList',
                    '@id': itemListId,
                    name: 'Privacy Glossary Terms',
                    itemListOrder: 'https://schema.org/ItemListUnordered',
                    numberOfItems: entriesList.length,
                    itemListElement: listElements
                },
                {
                    '@type': 'DefinedTermSet',
                    '@id': definedTermSetId,
                    name: 'The Web Knows Privacy Glossary',
                    inLanguage: 'en',
                    hasDefinedTerm: definedTerms
                }
            ]
        };

        let script = findGlossaryLdScript();
        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            head.appendChild(script);
        }
        script.setAttribute('data-glossary-ld', 'true');
        script.textContent = JSON.stringify(payload, null, 2);
    }

    const state = {
        letters: new Set(['all']),
        topic: 'all',
        query: '',
        tokens: []
    };

    const helpers = {
        escapeHtml(str) {
            return str.replace(/[&<>"']/g, function (match) {
                switch (match) {
                    case '&': return '&amp;';
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '"': return '&quot;';
                    case "'": return '&#39;';
                    default: return match;
                }
            });
        },
        escapeRegExp(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },
        highlight(text, tokens) {
            if (!tokens.length || !text) {
                return helpers.escapeHtml(text || '');
            }
            const uniqueTokens = Array.from(new Set(tokens.filter(Boolean)));
            if (!uniqueTokens.length) {
                return helpers.escapeHtml(text || '');
            }
            const pattern = new RegExp(uniqueTokens.map(helpers.escapeRegExp).join('|'), 'gi');
            let lastIndex = 0;
            let result = '';
            let match;

            while ((match = pattern.exec(text)) !== null) {
                if (match.index > lastIndex) {
                    result += helpers.escapeHtml(text.slice(lastIndex, match.index));
                }
                result += `<mark>${helpers.escapeHtml(match[0])}</mark>`;
                lastIndex = pattern.lastIndex;
            }

            if (lastIndex < text.length) {
                result += helpers.escapeHtml(text.slice(lastIndex));
            }

            return result;
        },
        normalise(str) {
            return (str || '').trim().toLowerCase();
        },
        getInitialChar(str) {
            const match = (str || '').trim().match(/[A-Za-z0-9]/);
            return match ? match[0].toUpperCase() : '';
        }
    };

    const glossaryUtils = (typeof GlossaryUtils !== 'undefined' && GlossaryUtils) || null;
    const normaliseAlphaNumeric = glossaryUtils && typeof glossaryUtils.normalizeAlphaNumeric === 'function'
        ? glossaryUtils.normalizeAlphaNumeric
        : function (value) {
            return (value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
        };
    const createGlossaryEntries = glossaryUtils && typeof glossaryUtils.createEntries === 'function'
        ? glossaryUtils.createEntries
        : null;
    const buildArticleUrl = glossaryUtils && typeof glossaryUtils.buildArticleUrl === 'function'
        ? glossaryUtils.buildArticleUrl
        : function (slug) {
            if (!slug) return '/privacy-insights/';
            return `/privacy-insights/${encodeURIComponent(slug)}/`;
        };

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

    function prepareToolSections() {
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
            const normalizedAliases = aliases
                .map(alias => normaliseAlphaNumeric(alias))
                .filter(Boolean);
            return {
                id: section.id,
                title: section.title,
                aliases,
                normalizedAliases
            };
        });
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

    const TOOL_SECTIONS = prepareToolSections();

    function getAliases(term) {
        if (glossaryUtils && typeof glossaryUtils.extractAliases === 'function') {
            return glossaryUtils.extractAliases(term);
        }
        const aliases = new Set();
        if (!term) {
            return [];
        }
        const trimmed = term.trim();
        const lower = trimmed.toLowerCase();
        const addAlias = (value) => {
            if (!value) return;
            const alias = value.trim();
            if (!alias) return;
            if (alias.toLowerCase() === lower) return;
            aliases.add(alias);
        };
        const parenthesisPattern = /\(([^)]+)\)/g;
        let match;
        while ((match = parenthesisPattern.exec(term)) !== null) {
            match[1].split(/[,/]| or | and /i).forEach(segment => addAlias(segment));
        }
        const withoutParens = term.replace(parenthesisPattern, ' ');
        [term, withoutParens].forEach(source => {
            if (!source) return;
            source.split('/').forEach(segment => addAlias(segment));
            source.split(',').forEach(segment => addAlias(segment));
        });
        return Array.from(aliases);
    }

    const baseEntries = createGlossaryEntries
        ? createGlossaryEntries(data)
        : data.map((item, index) => {
            const term = item.term || '';
            const aliases = getAliases(term);
            const allNames = [term].concat(aliases);
            const patterns = allNames
                .map(name => {
                    const trimmed = (name || '').trim();
                    if (!trimmed) {
                        return null;
                    }
                    const escaped = helpers.escapeRegExp(trimmed);
                    const needsBoundary = /^[a-z0-9]+$/i.test(trimmed);
                    let patternSource = escaped.replace(/\s+/g, '\\s+');
                    if (needsBoundary) {
                        patternSource = `\\b${escaped}\\b`;
                    }
                    try {
                        return new RegExp(patternSource, 'i');
                    } catch (error) {
                        return null;
                    }
                })
                .filter(Boolean);
            const normalizedNames = allNames
                .map(name => normaliseAlphaNumeric(name))
                .filter(Boolean);
            return {
                id: index,
                term,
                definition: item.definition || '',
                topic: item.topic || 'General',
                aliases,
                allNames,
                patterns,
                normalizedNames,
                slug: helpers.normalise(term || `term-${index + 1}`).replace(/\s+/g, '-')
            };
        });

    const entries = baseEntries.map((entry, index) => {
        const searchParts = [entry.term, entry.definition].concat(entry.aliases || []);
        const searchText = helpers.normalise(searchParts.join(' '));
        return {
            id: index,
            term: entry.term,
            definition: entry.definition,
            topic: entry.topic,
            aliases: Array.isArray(entry.aliases) ? entry.aliases : [],
            allNames: Array.isArray(entry.allNames) ? entry.allNames : [entry.term],
            patterns: Array.isArray(entry.patterns) ? entry.patterns : [],
            normalizedNames: Array.isArray(entry.normalizedNames) ? entry.normalizedNames : [],
            slug: entry.slug,
            searchText,
            sortKey: helpers.normalise(entry.term).replace(/^[^a-z0-9]+/i, ''),
            firstChar: helpers.getInitialChar(entry.term),
            element: null,
            dom: null,
            relatedArticles: [],
            toolReferences: [],
            isVisible: false
        };
    });

    function augmentEntriesWithToolReferences(entriesList) {
        if (!Array.isArray(entriesList) || !entriesList.length) {
            return;
        }
        entriesList.forEach(entry => {
            const normalizedNames = Array.isArray(entry.normalizedNames) ? entry.normalizedNames : [];
            const matches = TOOL_SECTIONS.filter(section => {
                return section.normalizedAliases.some(sectionNorm => {
                    return normalizedNames.some(aliasNorm => aliasMatchesNormalized(aliasNorm, sectionNorm));
                });
            });
            entry.toolReferences = matches;
        });
    }

    function augmentEntriesWithRelatedArticles(entriesList) {
        if (!Array.isArray(entriesList) || !entriesList.length) {
            return;
        }
        const articles = (typeof ARTICLES_DATA !== 'undefined' && Array.isArray(ARTICLES_DATA))
            ? ARTICLES_DATA
            : (Array.isArray(window.ARTICLES_DATA) ? window.ARTICLES_DATA : []);
        if (!articles.length) {
            return;
        }
        const preparedArticles = articles.map(article => {
            const combined = [article.title, article.excerpt, article.category]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return {
                meta: article,
                text: combined
            };
        });
        const MAX_RELATED = 5;
        entriesList.forEach(entry => {
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
    }

    augmentEntriesWithToolReferences(entries);
    augmentEntriesWithRelatedArticles(entries);

    entries.sort((a, b) => {
        if (a.sortKey === b.sortKey) {
            return a.term.localeCompare(b.term);
        }
        return a.sortKey.localeCompare(b.sortKey);
    });

    injectGlossaryStructuredData(entries);

    const topics = Array.from(new Set(entries.map(entry => entry.topic))).sort((a, b) => a.localeCompare(b));
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });

    const letterButtons = new Map();
    const filterDefinitions = LETTERS.map(letter => ({
        value: letter,
        label: letter
    })).concat([
        { value: 'all', label: 'All' },
        { value: 'numeric', label: '0–9' }
    ]);

    filterDefinitions.forEach(definition => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'glossary-alpha__btn';
        button.dataset.letter = definition.value;
        button.textContent = definition.label;
        letterFieldset.appendChild(button);
        letterButtons.set(definition.value, button);
    });

    function collectDomRefs(item) {
        const relatedContainer = item.querySelector('.glossary-item__section--articles');
        const toolContainer = item.querySelector('.glossary-item__section--tool');
        return {
            termHeading: item.querySelector('.glossary-item__term'),
            aliasParagraph: item.querySelector('.glossary-item__aliases'),
            definitionParagraph: item.querySelector('.glossary-item__definition'),
            connectionsWrapper: item.querySelector('.glossary-item__connections'),
            relatedContainer,
            relatedList: relatedContainer ? relatedContainer.querySelector('.glossary-item__list') : null,
            toolContainer,
            toolList: toolContainer ? toolContainer.querySelector('.glossary-item__list') : null
        };
    }

    const existingItems = new Map();
    if (glossaryList && glossaryList.dataset && glossaryList.dataset.ssr === 'true') {
        const existingNodes = glossaryList.querySelectorAll('.glossary-item');
        existingNodes.forEach(node => {
            const explicitSlug = node.getAttribute('data-entry-slug');
            const fallbackSlug = (node.id || '').startsWith('glossary-')
                ? node.id.slice('glossary-'.length)
                : '';
            const slug = explicitSlug || fallbackSlug;
            if (slug) {
                existingItems.set(slug, node);
            }
        });
    }

    entries.forEach(entry => {
        const existingNode = existingItems.get(entry.slug);
        if (existingNode) {
            existingNode.dataset.topic = entry.topic;
            existingNode.dataset.firstLetter = entry.firstChar || '';
            existingNode.setAttribute('role', 'listitem');
            existingNode.setAttribute('data-entry-slug', entry.slug);
            existingNode.removeAttribute('hidden');
            existingNode.setAttribute('aria-hidden', 'false');

            const domRefs = collectDomRefs(existingNode);
            entry.element = existingNode;
            entry.dom = domRefs;
            glossaryList.appendChild(existingNode);
            return;
        }

        const item = document.createElement('article');
        item.className = 'glossary-item';
        item.dataset.topic = entry.topic;
        item.dataset.firstLetter = entry.firstChar || '';
        item.dataset.entrySlug = entry.slug;
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-hidden', 'true');
        if (entry.slug) {
            item.id = `glossary-${entry.slug}`;
        }

        const header = document.createElement('header');
        header.className = 'glossary-item__header';

        const termHeading = document.createElement('h2');
        termHeading.className = 'glossary-item__term';
        termHeading.textContent = entry.term;

        header.append(termHeading);

        const aliasParagraph = document.createElement('p');
        aliasParagraph.className = 'glossary-item__aliases';
        aliasParagraph.hidden = entry.aliases.length === 0;

        const definitionParagraph = document.createElement('p');
        definitionParagraph.className = 'glossary-item__definition';
        definitionParagraph.textContent = entry.definition;

        const connectionsWrapper = document.createElement('div');
        connectionsWrapper.className = 'glossary-item__connections';

        const relatedSection = document.createElement('section');
        relatedSection.className = 'glossary-item__section glossary-item__section--articles';
        relatedSection.hidden = true;

        const relatedHeading = document.createElement('h3');
        relatedHeading.className = 'glossary-item__section-title';
        relatedHeading.textContent = 'Related articles';

        const relatedList = document.createElement('ul');
        relatedList.className = 'glossary-item__list';

        relatedSection.append(relatedHeading, relatedList);

        const toolSection = document.createElement('section');
        toolSection.className = 'glossary-item__section glossary-item__section--tool';
        toolSection.hidden = true;

        const toolHeading = document.createElement('h3');
        toolHeading.className = 'glossary-item__section-title';
        toolHeading.textContent = 'Main tool references';

        const toolList = document.createElement('ul');
        toolList.className = 'glossary-item__list';

        toolSection.append(toolHeading, toolList);

        connectionsWrapper.append(relatedSection, toolSection);

        item.append(header, aliasParagraph, definitionParagraph, connectionsWrapper);
        glossaryList.appendChild(item);

        entry.element = item;
        entry.dom = {
            termHeading,
            aliasParagraph,
            definitionParagraph,
            connectionsWrapper,
            relatedContainer: relatedSection,
            relatedList,
            toolContainer: toolSection,
            toolList
        };
    });

    if (glossaryList && glossaryList.dataset && glossaryList.dataset.ssr === 'true') {
        glossaryList.dataset.ssr = 'hydrated';
    }

    function updateActiveButtons() {
        letterButtons.forEach((button, value) => {
            if (state.letters.has(value)) {
                button.classList.add('is-active');
            } else {
                button.classList.remove('is-active');
            }
        });
    }

    function renderRelatedArticles(entry) {
        if (!entry.dom || !entry.dom.relatedContainer || !entry.dom.relatedList) {
            return;
        }
        const container = entry.dom.relatedContainer;
        const list = entry.dom.relatedList;
        const articles = Array.isArray(entry.relatedArticles) ? entry.relatedArticles : [];
        list.textContent = '';
        if (!articles.length) {
            container.hidden = true;
            return;
        }
        articles.forEach(article => {
            if (!article) return;
            const li = document.createElement('li');
            const link = document.createElement('a');
            const targetSlug = article.slug || article.id || '';
            if (targetSlug) {
                link.href = buildArticleUrl(targetSlug);
            } else {
                link.href = '#';
                link.setAttribute('aria-disabled', 'true');
            }
            link.textContent = article.title || targetSlug || 'View article';
            li.appendChild(link);
            list.appendChild(li);
        });
        container.hidden = false;
    }

    function renderToolReferences(entry) {
        if (!entry.dom || !entry.dom.toolContainer || !entry.dom.toolList) {
            return;
        }
        const container = entry.dom.toolContainer;
        const list = entry.dom.toolList;
        const references = Array.isArray(entry.toolReferences) ? entry.toolReferences : [];
        list.textContent = '';
        if (!references.length) {
            container.hidden = true;
            return;
        }
        references.forEach(section => {
            if (!section) return;
             if (!section.id) return;
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/#${section.id}`;
            link.textContent = section.title || section.id;
            li.appendChild(link);
            list.appendChild(li);
        });
        container.hidden = false;
    }

    function renderEntry(entry, tokens) {
        if (!entry.element) {
            return;
        }
        const dom = entry.dom || {};
        const termEl = dom.termHeading || entry.element.querySelector('.glossary-item__term');
        const aliasEl = dom.aliasParagraph || entry.element.querySelector('.glossary-item__aliases');
        const definitionEl = dom.definitionParagraph || entry.element.querySelector('.glossary-item__definition');

        if (termEl) {
            termEl.innerHTML = helpers.highlight(entry.term, tokens);
        }
        if (definitionEl) {
            definitionEl.innerHTML = helpers.highlight(entry.definition, tokens);
        }

        if (aliasEl) {
            if (entry.aliases.length) {
                const highlightedAliases = entry.aliases.map(alias => helpers.highlight(alias, tokens));
                aliasEl.innerHTML = `Also known as: ${highlightedAliases.join(', ')}`;
                aliasEl.hidden = false;
            } else {
                aliasEl.hidden = true;
                aliasEl.textContent = '';
            }
        }

        renderRelatedArticles(entry);
        renderToolReferences(entry);
        if (dom.connectionsWrapper) {
            const relatedHidden = !dom.relatedContainer || dom.relatedContainer.hidden;
            const toolsHidden = !dom.toolContainer || dom.toolContainer.hidden;
            dom.connectionsWrapper.hidden = relatedHidden && toolsHidden;
        }
    }

    function letterMatches(entry) {
        const selectedLetters = state.letters;

        if (!selectedLetters || selectedLetters.has('all') || selectedLetters.size === 0) {
            return true;
        }

        const firstChar = entry.firstChar || '';

        if (/^[0-9]/.test(firstChar)) {
            return selectedLetters.has('numeric');
        }

        if (!firstChar) {
            return false;
        }

        return selectedLetters.has(firstChar);
    }

    function applyFilters() {
        let visibleCount = 0;

        entries.forEach(entry => {
            const matchesTopic = state.topic === 'all' || entry.topic === state.topic;
            const matchesLetter = letterMatches(entry);
            const matchesQuery = state.tokens.every(token => entry.searchText.includes(token));
            const shouldShow = matchesTopic && matchesLetter && matchesQuery;

            if (!entry.element) {
                return;
            }

            if (shouldShow) {
                renderEntry(entry, state.tokens);
                entry.element.style.display = '';
                entry.element.removeAttribute('hidden');
                entry.element.setAttribute('aria-hidden', 'false');
                entry.isVisible = true;
                visibleCount += 1;
            } else {
                entry.element.style.display = 'none';
                entry.element.setAttribute('hidden', 'true');
                entry.element.setAttribute('aria-hidden', 'true');
                entry.isVisible = false;
            }
        });

        if (visibleCount === 0) {
            if (!emptyRendered) {
                emptyEl.textContent = emptyMessage;
                emptyRendered = true;
            }
            emptyEl.hidden = false;
            emptyEl.setAttribute('aria-hidden', 'false');
        } else {
            if (emptyRendered) {
                emptyEl.textContent = '';
                emptyRendered = false;
            }
            emptyEl.hidden = true;
            emptyEl.setAttribute('aria-hidden', 'true');
        }
    }

    function syncSearchClearButton() {
        if (!searchInput || !searchClearButton) {
            return;
        }
        const wrapper = searchClearButton.closest('.search-input-wrapper');
        if (wrapper) {
            wrapper.dataset.hasValue = searchInput.value.trim() !== '' ? 'true' : 'false';
        }
    }

    searchInput.addEventListener('input', function () {
        state.query = searchInput.value.trim();
        syncSearchClearButton();
        state.tokens = state.query ? state.query.toLowerCase().split(/\s+/).filter(Boolean) : [];
        applyFilters();
    });

    searchInput.addEventListener('change', syncSearchClearButton);

    if (searchClearButton && searchInput) {
        searchClearButton.addEventListener('click', function () {
            searchInput.value = '';
            syncSearchClearButton();
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.focus();
        });
        syncSearchClearButton();
    }
    topicSelect.addEventListener('change', function () {
        state.topic = topicSelect.value;
        applyFilters();
    });

    function handleLetterClick(event) {
        const button = event.target;
        if (!(button instanceof HTMLButtonElement)) {
            return;
        }
        const letter = button.dataset.letter;
        if (!letter) {
            return;
        }

        if (letter === 'all') {
            state.letters = new Set(['all']);
            updateActiveButtons();
            applyFilters();
            return;
        }

        const nextLetters = new Set(state.letters);
        if (nextLetters.has('all')) {
            nextLetters.delete('all');
        }

        if (nextLetters.has(letter)) {
            nextLetters.delete(letter);
        } else {
            nextLetters.add(letter);
        }

        if (nextLetters.size === 0) {
            nextLetters.add('all');
        }

        state.letters = nextLetters;
        updateActiveButtons();
        applyFilters();
    }

    letterFieldset.addEventListener('click', handleLetterClick);

    updateActiveButtons();
    state.tokens = [];
    applyFilters();
})();

