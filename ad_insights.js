/**
 * ad_insights.js
 * Advertising-focused signals & inference (privacy-friendly).
 * - Builds on the data The Web Knows already collects.
 * - Avoids extra network calls unless absolutely necessary.
 * - Produces categories we can highlight plus a human summary.
 */
(function () {
    'use strict';

    const sanitizeValue = (value) => {
        if (value === undefined || value === null) return null;
        if (typeof value === 'string' && value.trim() === '') return null;
        if (value === '—') return null;
        return value;
    };

    const parseNumeric = (value) => {
        if (!value) return null;
        const match = String(value).match(/-?\d+(\.\d+)?/);
        return match ? Number(match[0]) : null;
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const STOP_WORDS = new Set(('a an the and or but if to of in on for with this that those these is are was were be been being i you your our their can will would should could from at as about by into over under it they them we us more less most least not no'.split(' ')));

    const extractKeywords = (text, max = 20) => {
        if (!text || typeof text !== 'string') {
            return [];
        }
        const words = text
            .toLowerCase()
            .replace(/[\u2019']/g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter((word) => word && !STOP_WORDS.has(word) && word.length > 2);

        const frequency = new Map();
        words.forEach((word) => {
            frequency.set(word, (frequency.get(word) || 0) + 1);
        });

        return [...frequency.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, max)
            .map(([term, count]) => ({ term, count }));
    };

    const getTopicsFromBrowser = async () => {
        if (typeof document === 'undefined' || typeof document.browsingTopics !== 'function') {
            return [];
        }

        try {
            const topics = await document.browsingTopics();
            if (Array.isArray(topics)) {
                return topics;
            }
        } catch (err) {
            console.warn('Chrome Topics API unavailable:', err);
        }
        return [];
    };

    const buildContext = (existingData = {}) => {
        const network = existingData.network || {};
        const browser = existingData.browser || {};
        const connection = existingData.connection || {};
        const privacy = existingData.privacy || {};

        const languages = Array.isArray(browser.languages) && browser.languages.length
            ? browser.languages
            : (navigator.languages && navigator.languages.length ? Array.from(navigator.languages) : [navigator.language || null]);

        const primaryLanguage = languages && languages.length ? sanitizeValue(languages[0]) : null;
        const referrerRaw = sanitizeValue(network.referrer);
        const referrer = referrerRaw === 'None' ? null : referrerRaw;
        let referrerHost = null;
        if (referrer) {
            try {
                referrerHost = new URL(referrer).hostname;
            } catch (e) {
                referrerHost = referrer;
            }
        }

        const downlinkNumeric = parseNumeric(connection.downlink);
        const rttNumeric = parseNumeric(connection.rtt);
        const saveDataFlag = typeof connection.saveData === 'string'
            ? connection.saveData.toLowerCase() === 'enabled'
            : !!connection.saveData;

        const geoParts = [network.city, network.region, network.country]
            .map((part) => sanitizeValue(part))
            .filter(Boolean);

        const networkType = sanitizeValue(network.networkType);
        let networkGuess = null;
        if (networkType) {
            const lower = networkType.toLowerCase();
            if (lower.includes('data-center') || lower.includes('vpn')) {
                networkGuess = 'Data-centre/VPN (guess)';
            } else if (lower.includes('home') || lower.includes('office')) {
                networkGuess = 'Home/office ISP (guess)';
            }
        }

        const contextGuess = (() => {
            if (!referrerHost) return null;
            const low = referrerHost.toLowerCase();
            if (/(vpn|privacy|proxy|security)/.test(low)) return 'Privacy/VPN contextual ads';
            if (/(game|gaming|steam|xbox|playstation)/.test(low)) return 'Gaming contextual ads';
            if (/(finance|bank|crypto|stock|money)/.test(low)) return 'Finance contextual ads';
            if (/(travel|hotel|flight|booking)/.test(low)) return 'Travel contextual ads';
            return null;
        })();

        return {
            ip4: sanitizeValue(network.ipv4),
            ip6: sanitizeValue(network.ipv6),
            isp: sanitizeValue(network.isp),
            asn: sanitizeValue(network.asn),
            reverseDns: sanitizeValue(network.reverseDns),
            geo: geoParts.length ? {
                city: sanitizeValue(network.city),
                region: sanitizeValue(network.region),
                country: sanitizeValue(network.country),
                string: geoParts.join(', ')
            } : null,
            languages,
            primaryLanguage,
            browserLabel: sanitizeValue(browser.browser),
            userAgent: sanitizeValue(browser.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : null)),
            platform: sanitizeValue(browser.platform || browser.os),
            osLabel: sanitizeValue(browser.os),
            deviceType: sanitizeValue(browser.deviceType),
            timezone: sanitizeValue(browser.timezone),
            timezoneOffset: sanitizeValue(browser.timezoneOffset),
            screen: browser.screenWidth && browser.screenHeight
                ? `${browser.screenWidth}×${browser.screenHeight}`
                : null,
            viewport: browser.viewportWidth && browser.viewportHeight
                ? `${browser.viewportWidth}×${browser.viewportHeight}`
                : null,
            connection: {
                type: sanitizeValue(connection.type),
                effectiveType: sanitizeValue(connection.effectiveType),
                downlinkMbps: downlinkNumeric,
                rttMs: rttNumeric,
                saveData: saveDataFlag
            },
            referrer,
            referrerHost,
            contextGuess,
            networkType,
            networkGuess,
            privacy: {
                dnt: privacy.doNotTrack === '1',
                gpc: !!privacy.globalPrivacyControl,
                cookiesEnabled: typeof privacy.cookiesEnabled === 'boolean'
                    ? privacy.cookiesEnabled
                    : !!navigator.cookieEnabled,
                localStorage: sanitizeValue(privacy.localStorage),
                darkMode: !!privacy.darkMode,
                reducedMotion: !!privacy.reducedMotion
            },
            adBlock: existingData.fingerprints ? !!existingData.fingerprints.adBlock : null,
            privateMode: existingData.fingerprints && typeof existingData.fingerprints.privateMode?.private === 'boolean'
                ? existingData.fingerprints.privateMode.private
                : null,
            canvasHash: existingData.fingerprints?.canvas?.hash || null,
            webglHash: existingData.fingerprints?.webgl?.hash || null,
            audioHash: existingData.fingerprints?.audio?.hash || null,
            webgl: existingData.fingerprints?.webgl || null,
            topics: []
        };
    };

    const CATEGORY_LABELS = {
        vpn: 'VPN & Privacy Tools',
        adblock: 'Ad Blockers & Anti-Tracking',
        password: 'Password Managers & 2FA',
        security: 'Security Suites (AV/Firewall)',
        secureMail: 'Secure Email & Encrypted Cloud',
        browser: 'Secure/Private Browsers',
        fintech: 'Privacy-Focused Finance',
        devtools: 'Developer Tools',
        travel: 'Travel & Roaming eSIMs',
        streaming: 'Streaming/Media Bundles'
    };

    const applyRuleSet = (facts) => {
        const contextText = (facts.contextText || '').toLowerCase();
        const ctxHit = (...terms) => terms.some((term) => contextText.includes(term));
        const results = new Map();

        const pushResult = (id, scoreDelta, reason) => {
            if (!scoreDelta) return;
            const current = results.get(id) || { score: 0, reasons: [] };
            current.score += scoreDelta;
            if (reason) {
                current.reasons.push(reason);
            }
            results.set(id, current);
        };

        // VPN & Privacy Tools
        (() => {
            let score = 0;
            if (facts.privacy?.dnt) {
                score += 8;
                pushResult('vpn', 8, 'Do Not Track is enabled');
            }
            if (facts.adBlock) {
                score += 12;
                pushResult('vpn', 12, 'Possible ad blocker detected');
            }
            if (facts.connection?.effectiveType && /2g/.test(facts.connection.effectiveType)) {
                score += 4;
                pushResult('vpn', 4, 'Slow network often used to pitch VPN speed boosts');
            }
            if (facts.connection?.saveData) {
                score += 4;
                pushResult('vpn', 4, 'Data saver enabled — privacy tools often highlight compression');
            }
            if (facts.privateMode === true) {
                score += 10;
                pushResult('vpn', 10, 'Private/Incognito mode heuristics detected');
            }
            if (ctxHit('vpn', 'privacy', 'encrypted', 'tunnel', 'tracker', 'fingerprint', 'cookieless', 'ip address', 'dns leak')) {
                score += 22;
                pushResult('vpn', 22, 'Context mentions privacy/VPN keywords');
            }
        })();

        // Ad blockers
        (() => {
            let score = 0;
            if (facts.adBlock) {
                score += 24;
                pushResult('adblock', 24, 'Ad elements appear blocked');
            }
            if (facts.privacy?.dnt) {
                score += 6;
                pushResult('adblock', 6, 'Do Not Track aligns with blocking interests');
            }
            if (ctxHit('adblock', 'ad blocker', 'block ads', 'tracking protection')) {
                score += 16;
                pushResult('adblock', 16, 'Context mentions ad-block keywords');
            }
        })();

        // Password managers & 2FA
        (() => {
            let score = 0;
            if (ctxHit('password manager', 'passwords', 'breach', '2fa', 'passkey', 'multi factor', 'credential', 'phishing')) {
                score += 18;
                pushResult('password', 18, 'Security login keywords present');
            }
            if ((facts.platform || '').toLowerCase().includes('mac') && facts.languages?.includes('en-US')) {
                score += 4;
                pushResult('password', 4, 'macOS + EN locale skew toward passkey UX campaigns');
            }
        })();

        // Security suites
        (() => {
            let score = 0;
            if (ctxHit('antivirus', 'malware', 'ransomware', 'endpoint', 'firewall', 'threat')) {
                score += 16;
                pushResult('security', 16, 'Security threat keywords in context');
            }
            if (facts.webglHash && facts.webgl?.vendor && /intel/i.test(facts.webgl.vendor)) {
                score += 3;
                pushResult('security', 3, 'Typical office hardware profile (WebGL vendor)');
            }
        })();

        // Secure mail / encrypted cloud
        (() => {
            let score = 0;
            if (ctxHit('encrypted email', 'pgp', 'end-to-end', 'zero knowledge', 'private email', 'secure cloud', 'encrypted storage')) {
                score += 18;
                pushResult('secureMail', 18, 'Encrypted comms/storage keywords detected');
            }
            if (facts.privacy?.dnt) {
                score += 4;
                pushResult('secureMail', 4, 'Privacy-forward signal detected');
            }
        })();

        // Private browsers
        (() => {
            let score = 0;
            if (ctxHit('private browser', 'privacy browser', 'tor', 'brave', 'firefox', 'tracking prevention')) {
                score += 18;
                pushResult('browser', 18, 'Private browser keywords detected');
            }
            if (facts.userAgent && /firefox|brave/i.test(facts.userAgent)) {
                score += 8;
                pushResult('browser', 8, 'User agent suggests privacy-oriented browser');
            }
        })();

        // Privacy-first fintech
        (() => {
            if (ctxHit('privacy card', 'virtual card', 'masked card', 'identity theft', 'chargeback', 'bank privacy')) {
                pushResult('fintech', 14, 'Finance + privacy keywords detected');
            }
        })();

        // Developer tools
        (() => {
            let score = 0;
            if (ctxHit('api', 'open source', 'github', 'terminal', 'ssh', 'docker', 'kubernetes', 'npm', 'typescript')) {
                score += 18;
                pushResult('devtools', 18, 'Developer-centric keywords detected');
            }
            if ((facts.platform || '').toLowerCase().includes('linux')) {
                score += 6;
                pushResult('devtools', 6, 'Linux platform detected');
            }
        })();

        // Travel / eSIM
        (() => {
            let score = 0;
            if (ctxHit('esim', 'roaming', 'travel data', 'international plan', 'airport wifi', 'airplane wifi')) {
                score += 18;
                pushResult('travel', 18, 'Travel connectivity keywords detected');
            }
            if (facts.connection?.effectiveType && /(3g|4g|5g)/.test(facts.connection.effectiveType)) {
                score += 4;
                pushResult('travel', 4, 'Cellular-like connection detected');
            }
        })();

        // Streaming
        (() => {
            let score = 0;
            if (ctxHit('streaming', 'netflix', 'disney', 'prime video', 'hulu', 'stream faster', 'unblock')) {
                score += 14;
                pushResult('streaming', 14, 'Streaming media keywords detected');
            }
            if (facts.vpnScorePrelim && facts.vpnScorePrelim >= 10) {
                score += 6;
                pushResult('streaming', 6, 'VPN interest often pairs with unblocking content');
            }
        })();

        return results;
    };

    const normaliseCategories = (results) => {
        let maxScore = 0;
        results.forEach((value) => {
            if (value.score > maxScore) {
                maxScore = value.score;
            }
        });

        const categories = [];
        results.forEach((value, id) => {
            if (!value.score) {
                return;
            }
            const norm = maxScore ? Math.round((value.score / maxScore) * 100) : value.score;
            categories.push({
                id,
                label: CATEGORY_LABELS[id] || id,
                score: value.score,
                norm,
                because: value.reasons
            });
        });

        categories.sort((a, b) => b.norm - a.norm);
        return categories;
    };

    const buildSummary = (ctx, categories, keywords, contextMeta) => {
        const ranked = categories.filter((c) => c.norm != null).sort((a, b) => b.norm - a.norm);
        const topLabels = ranked.slice(0, 4).map((c) => `${c.label} (${c.norm})`);
        const topicsLine = ctx.topics && ctx.topics.length
            ? `Chrome Topics returned ${ctx.topics.length} id(s).`
            : 'Chrome Topics not available (browser has not exposed them).';

        const privacyParts = [];
        privacyParts.push(`DNT ${ctx.privacy.dnt ? 'on' : 'off'}`);
        privacyParts.push(`GPC ${ctx.privacy.gpc ? 'on' : 'off'}`);
        privacyParts.push(`Cookies ${ctx.privacy.cookiesEnabled ? 'enabled' : 'disabled'}`);
        if (ctx.connection.saveData) {
            privacyParts.push('Data Saver on');
        }
        if (typeof ctx.adBlock === 'boolean') {
            privacyParts.push(ctx.adBlock ? 'Ad blocker detected' : 'Ad blocker not detected');
        }
        if (typeof ctx.privateMode === 'boolean') {
            privacyParts.push(ctx.privateMode ? 'Private mode likely' : 'Private mode unlikely');
        }

        const keywordPreview = keywords && keywords.length
            ? `Context keywords: ${keywords.slice(0, 5).map((k) => k.term).join(', ')}`
            : 'Context keywords: none detected yet.';

        const summaryLines = [
            `Location & language: ${ctx.geo ? ctx.geo.string : 'not shared'}, ${ctx.primaryLanguage || 'language unknown'}.`,
            `Device & connection: ${ctx.browserLabel || 'browser unknown'} on ${ctx.osLabel || 'OS unknown'} (${ctx.deviceType || 'device unknown'}), connection ${ctx.connection.type || '—'} ${ctx.connection.effectiveType ? `(${ctx.connection.effectiveType})` : ''}, downlink ≈ ${ctx.connection.downlinkMbps ?? '—'} Mbps.`,
            `Top ad categories: ${topLabels.length ? topLabels.join(', ') : 'None yet – signals too limited.'}`,
            topicsLine,
            keywordPreview,
            `Privacy signals: ${privacyParts.join(' • ')}.`
        ];

        if (contextMeta && contextMeta.hasUserText) {
            summaryLines.push('User context: custom copy supplied in textarea.');
        }
        if (ctx.referrerHost) {
            summaryLines.push(`Referrer context: ${ctx.referrerHost}`);
        }

        return summaryLines.join('\n');
    };

    const buildStatus = (ctx) => {
        return {
            ip: {
                v4: ctx.ip4 ? 'Known' : 'Missing',
                v6: ctx.ip6 ? 'Known' : 'Missing'
            },
            geo: ctx.geo ? 'Estimated' : 'Unavailable',
            language: ctx.primaryLanguage ? 'Known' : 'Unknown',
            topics: ctx.topics && ctx.topics.length ? 'Known' : 'Not available',
            network: ctx.networkGuess || 'Unknown',
            connection: ctx.connection.downlinkMbps != null ? 'Estimated' : 'Unknown',
            privacy: {
                dnt: ctx.privacy.dnt ? 'Enabled' : 'Disabled',
                gpc: ctx.privacy.gpc ? 'Enabled' : 'Disabled',
                cookies: ctx.privacy.cookiesEnabled ? 'Enabled' : 'Disabled'
            }
        };
    };

    window.buildAdInsights = async function buildAdInsights(existingData, overrides = {}) {
        const ctx = buildContext(existingData || {});
        ctx.topics = await getTopicsFromBrowser();

        const baseText = (existingData && existingData.context && existingData.context.baseText) || '';
        const userTextOverride = Object.prototype.hasOwnProperty.call(overrides, 'userText')
            ? overrides.userText || ''
            : ((existingData && existingData.context && existingData.context.userText) || '');
        const combinedContextText = `${baseText}\n${userTextOverride}`.trim().slice(0, 100000);
        ctx.contextText = combinedContextText;

        const keywordSource = (userTextOverride && userTextOverride.trim()) ? userTextOverride : baseText;
        const keywords = extractKeywords(keywordSource, 20);
        ctx.keywords = keywords;

        const preliminaryResults = applyRuleSet({
            ...ctx,
            vpnScorePrelim: 0
        });
        const vpnScorePrelim = preliminaryResults.get('vpn')?.score || 0;
        const ruleResults = applyRuleSet({
            ...ctx,
            vpnScorePrelim
        });
        const categories = normaliseCategories(ruleResults).slice(0, 8);

        const contextMeta = {
            hasUserText: Boolean(userTextOverride && userTextOverride.trim()),
            combinedText: combinedContextText,
            userTextLength: userTextOverride.length,
            baseTextLength: baseText.length
        };

        const summary = buildSummary(ctx, categories, keywords, contextMeta);
        const status = buildStatus(ctx);

        const signals = {
            ip: {
                v4: ctx.ip4,
                v6: ctx.ip6
            },
            isp: ctx.isp,
            asn: ctx.asn,
            reverseDns: ctx.reverseDns,
            geo: ctx.geo,
            browser: ctx.browserLabel,
            os: ctx.osLabel,
            deviceType: ctx.deviceType,
            languages: {
                primary: ctx.primaryLanguage,
                all: ctx.languages
            },
            timezone: ctx.timezone,
            timezoneOffset: ctx.timezoneOffset,
            screen: ctx.screen,
            viewport: ctx.viewport,
            connection: ctx.connection,
            referrer: ctx.referrer,
            topics: ctx.topics,
            privacy: ctx.privacy,
            networkGuess: ctx.networkGuess,
            adBlock: ctx.adBlock,
            privateMode: ctx.privateMode,
            canvasHash: ctx.canvasHash,
            webglHash: ctx.webglHash,
            audioHash: ctx.audioHash
        };

        if (existingData && existingData.context) {
            existingData.context.userText = userTextOverride;
            existingData.context.combinedText = combinedContextText;
            existingData.context.keywords = keywords;
        }

        return {
            signals,
            status,
            categories,
            summary,
            keywords,
            context: contextMeta
        };
    };
})();


