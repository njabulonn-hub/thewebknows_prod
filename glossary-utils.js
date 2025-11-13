(function (global) {
    'use strict';

    function normalizeAlphaNumeric(value) {
        if (!value) {
            return '';
        }
        return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
    }

    function slugify(value) {
        if (!value) {
            return '';
        }
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-{2,}/g, '-');
    }

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function extractAliasesFromTerm(term) {
        const aliases = new Set();
        if (!term) {
            return [];
        }

        const trimmedTerm = term.trim();
        const lowerTerm = trimmedTerm.toLowerCase();

        const addAlias = (candidate) => {
            if (!candidate) return;
            const alias = candidate.trim();
            if (!alias) return;
            if (alias.toLowerCase() === lowerTerm) return;
            aliases.add(alias);
        };

        const parenthesisPattern = /\(([^)]+)\)/g;
        let parenthesisMatch;
        while ((parenthesisMatch = parenthesisPattern.exec(term)) !== null) {
            const inner = parenthesisMatch[1];
            inner.split(/[,/]| or | and /i).forEach(segment => addAlias(segment));
        }

        const withoutParens = term.replace(parenthesisPattern, ' ');

        [term, withoutParens].forEach(source => {
            if (!source) return;
            source.split('/').forEach(part => addAlias(part));
            source.split(',').forEach(part => addAlias(part));
        });

        // Splits phrases like "X vs Y" or "X & Y"
        [term, withoutParens].forEach(source => {
            if (!source) return;
            source.split(/ vs | & | and /i).forEach(part => addAlias(part));
        });

        return Array.from(aliases);
    }

    function createMatchPattern(phrase) {
        if (!phrase) {
            return null;
        }
        const trimmed = phrase.trim();
        if (!trimmed) {
            return null;
        }

        const needsWordBoundary = /^[a-z0-9]+$/i.test(trimmed);
        const escaped = escapeRegExp(trimmed);
        let patternSource;

        if (needsWordBoundary) {
            patternSource = `\\b${escaped}\\b`;
        } else {
            patternSource = escaped.replace(/\s+/g, '\\s+');
        }

        try {
            return new RegExp(patternSource, 'i');
        } catch (error) {
            return null;
        }
    }

    function dedupeStrings(values) {
        const ordered = [];
        const seen = new Set();
        values.forEach(value => {
            const trimmed = (value || '').trim();
            if (!trimmed) return;
            const key = trimmed.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);
            ordered.push(trimmed);
        });
        return ordered;
    }

    function ensureUniqueSlug(base, slugRegistry) {
        let candidate = base || 'term';
        if (!slugRegistry.has(candidate)) {
            slugRegistry.set(candidate, 1);
            return candidate;
        }
        let counter = slugRegistry.get(candidate);
        let uniqueSlug = `${candidate}-${counter}`;
        while (slugRegistry.has(uniqueSlug)) {
            counter += 1;
            uniqueSlug = `${candidate}-${counter}`;
        }
        slugRegistry.set(candidate, counter + 1);
        slugRegistry.set(uniqueSlug, 1);
        return uniqueSlug;
    }

    function createEntries(data) {
        if (!Array.isArray(data)) {
            return [];
        }

        const slugRegistry = new Map();

        return data.map((item, index) => {
            const term = (item && item.term) ? String(item.term) : '';
            const definition = (item && item.definition) ? String(item.definition) : '';
            const topic = (item && item.topic) ? String(item.topic) : 'General';
            const providedAliases = Array.isArray(item && item.aliases) ? item.aliases : [];

            const derivedAliases = extractAliasesFromTerm(term);

            const termWithoutParens = term.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
            const aliasCandidates = dedupeStrings([
                term,
                termWithoutParens,
                ...providedAliases,
                ...derivedAliases
            ]);

            const primaryTerm = term.trim();
            const aliasList = aliasCandidates.filter(alias => alias && alias.toLowerCase() !== primaryTerm.toLowerCase());

            const allNames = dedupeStrings([
                primaryTerm,
                ...aliasList
            ]);

            const patterns = allNames
                .map(createMatchPattern)
                .filter((pattern) => pattern !== null);

            const normalizedNames = allNames
                .map(normalizeAlphaNumeric)
                .filter(Boolean);

            const slugBase = slugify(primaryTerm || `term-${index + 1}`);
            const slug = ensureUniqueSlug(slugBase, slugRegistry);

            return {
                id: index,
                term: primaryTerm,
                definition,
                topic,
                aliases: aliasList,
                allNames,
                patterns,
                normalizedNames,
                slug
            };
        });
    }

    function matchText(entries, text) {
        if (!Array.isArray(entries) || !entries.length) {
            return [];
        }
        const source = (text || '').toString();
        if (!source.trim()) {
            return [];
        }

        const lowerSource = source.toLowerCase();
        const matches = [];
        const seen = new Set();

        entries.forEach(entry => {
            if (!entry || !Array.isArray(entry.patterns)) {
                return;
            }
            const hasMatch = entry.patterns.some(pattern => pattern && pattern.test(lowerSource));
            if (hasMatch && !seen.has(entry.id)) {
                seen.add(entry.id);
                matches.push(entry);
            }
        });

        return matches;
    }

    function buildArticleUrl(slug, options = {}) {
        if (!slug) {
            return '/privacy-insights/';
        }
        const prefix = typeof options.prefix === 'string' ? options.prefix : '/privacy-insights/';
        const suffix = typeof options.suffix === 'string' ? options.suffix : '/';
        return `${prefix}${encodeURIComponent(slug)}${suffix}`;
    }

    global.GlossaryUtils = {
        normalizeAlphaNumeric,
        slugify,
        extractAliases: extractAliasesFromTerm,
        createEntries,
        matchText,
        buildArticleUrl
    };
})(window);



