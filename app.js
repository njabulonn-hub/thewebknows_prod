/**
 * The Web Knows - Main Application
 * Privacy-first client-side data collection
 */

(function() {
    'use strict';

    function cssEscape(value) {
        if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
            return CSS.escape(value);
        }
        return String(value || '').replace(/[^a-zA-Z0-9_-]/g, '\\$&');
    }

    function getCanonicalOrigin() {
        try {
            const canonical = document.head && document.head.querySelector('link[rel="canonical"]');
            if (canonical && canonical.href) {
                const resolved = new URL(canonical.href, window.location.href);
                if (resolved.origin && resolved.origin !== 'null') {
                    return resolved.origin;
                }
            }
        } catch (error) {
            // ignore canonical parsing errors
        }

        try {
            if (window.location && window.location.origin && window.location.origin !== 'null') {
                return window.location.origin;
            }
        } catch (error) {
            // ignore window.location origin errors
        }

        return 'https://thewebknows.pages.dev';
    }

    const CANONICAL_ORIGIN = getCanonicalOrigin();

    function getCanonicalUrl() {
        try {
            const canonical = document.head && document.head.querySelector('link[rel="canonical"]');
            if (canonical && canonical.href) {
                return canonical.href;
            }
        } catch (error) {
            // ignore canonical read errors
        }
        try {
            return `${CANONICAL_ORIGIN}${window.location.pathname}${window.location.search}${window.location.hash}`;
        } catch (error) {
            return `${CANONICAL_ORIGIN}/`;
        }
    }

    function ensureMetaName(name, content) {
        if (!name || typeof content !== 'string' || !content.trim()) {
            return;
        }
        const head = document.head;
        if (!head) {
            return;
        }
        let meta = head.querySelector(`meta[name="${cssEscape(name)}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            head.appendChild(meta);
        } else if (!meta.hasAttribute('content') || meta.getAttribute('content').trim() === '') {
            meta.setAttribute('content', content);
        }
    }

    function ensureMetaProperty(property, content) {
        if (!property || typeof content !== 'string' || !content.trim()) {
            return;
        }
        const head = document.head;
        if (!head) {
            return;
        }
        let meta = head.querySelector(`meta[property="${cssEscape(property)}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            meta.setAttribute('content', content);
            head.appendChild(meta);
        } else if (!meta.hasAttribute('content') || meta.getAttribute('content').trim() === '') {
            meta.setAttribute('content', content);
        }
    }

    function ensureWebSiteStructuredData() {
        const head = document.head;
        if (!head || head.querySelector('script[data-webknows-website]')) {
            return;
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-webknows-website', 'true');

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${CANONICAL_ORIGIN}/#website`,
            'url': `${CANONICAL_ORIGIN}/`,
            'name': 'The Web Knows',
            'description': 'Plain-English privacy diagnostics & guides.',
            'inLanguage': 'en',
            'publisher': {
                '@type': 'Organization',
                'name': 'The Web Knows',
                'url': `${CANONICAL_ORIGIN}/`,
                'logo': {
                    '@type': 'ImageObject',
                    'url': `${CANONICAL_ORIGIN}/favicon.svg`
                }
            },
            'potentialAction': {
                '@type': 'SearchAction',
                'target': `${CANONICAL_ORIGIN}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
            }
        };

        script.textContent = JSON.stringify(structuredData, null, 2);
        head.appendChild(script);
    }

    function ensureDefaultSocialMeta() {
        const head = document.head;
        if (!head) {
            return;
        }

        const pageTitle = document.title && document.title.trim()
            ? document.title.trim()
            : 'The Web Knows';
        const descriptionMeta = head.querySelector('meta[name="description"]');
        const pageDescription = descriptionMeta && descriptionMeta.getAttribute('content')
            ? descriptionMeta.getAttribute('content').trim()
            : 'Plain-English privacy diagnostics & guides.';
        const canonicalUrl = getCanonicalUrl();

        ensureMetaProperty('og:type', 'website');
        ensureMetaProperty('og:site_name', 'The Web Knows');
        ensureMetaProperty('og:title', pageTitle);
        ensureMetaProperty('og:description', pageDescription);
        ensureMetaProperty('og:url', canonicalUrl);
        ensureMetaProperty('og:image', `${CANONICAL_ORIGIN}/og-image.png`);

        ensureMetaName('twitter:card', 'summary_large_image');
        ensureMetaName('twitter:title', pageTitle);
        ensureMetaName('twitter:description', pageDescription);
        ensureMetaName('twitter:url', canonicalUrl);
        ensureMetaName('twitter:image', `${CANONICAL_ORIGIN}/og-image.png`);
    }

    ensureWebSiteStructuredData();
    ensureDefaultSocialMeta();

    // Timeout helper for fetch requests
    function timeout(promise, ms = 7000) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
        ]);
    }

    // Safe fetch with timeout and no-cache
    async function safeFetch(url, options = {}) {
        try {
            const response = await timeout(
                fetch(url, { ...options, cache: 'no-store' }),
                7000
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn(`Failed to fetch ${url}:`, error);
            return null;
        }
    }

    // Update element text content safely
    function updateElement(id, text, hint = '') {
        const el = document.getElementById(id);
        if (el) {
            const content = (text === null || text === undefined || text === '') ? '—' : text;
            el.textContent = content;
            el.removeAttribute('data-loading');
            el.setAttribute('aria-busy', 'false');
            if (hint && el.nextElementSibling?.classList.contains('info-help')) {
                el.nextElementSibling.textContent = hint;
            } else if (!hint && el.nextElementSibling?.classList.contains('info-help') && el.nextElementSibling.dataset?.defaultHelp) {
                el.nextElementSibling.textContent = el.nextElementSibling.dataset.defaultHelp;
            }
        }
    }

    function cacheDefaultHelpText() {
        document.querySelectorAll('.info-help').forEach((node) => {
            if (node) {
                node.dataset.defaultHelp = node.textContent || '';
            }
        });
    }

    function setInitialLoadingStates() {
        document.querySelectorAll('.info-value[aria-live]').forEach((node) => {
            const current = (node.textContent || '').trim();
            if (!current || current === '—') {
                node.textContent = 'Detecting…';
                node.setAttribute('data-loading', 'true');
                node.setAttribute('aria-busy', 'true');
            }
        });
    }

    // Format bytes to GB
    function formatGB(bytes) {
        if (!bytes) return '—';
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }

    function formatDeviceMemory(memoryInGb) {
        if (!memoryInGb || Number.isNaN(memoryInGb)) return '—';
        const rounded = Math.round(memoryInGb * 2) / 2;
        return `${rounded} GB (est.)`;
    }

    async function sha256Hex(str) {
        if (typeof str !== 'string') {
            str = String(str ?? '');
        }
        try {
            if (window.crypto && window.crypto.subtle && typeof TextEncoder !== 'undefined') {
                const encoder = new TextEncoder();
                const data = encoder.encode(str);
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
                return Array.from(new Uint8Array(hashBuffer))
                    .map((b) => b.toString(16).padStart(2, '0'))
                    .join('');
            }
        } catch (error) {
            // fall back to non-crypto hash
        }

        let hash = 5381;
        for (let i = 0; i < str.length; i += 1) {
            hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
        }
        return (`00000000${(hash >>> 0).toString(16)}`).slice(-8);
    }

    // Guess network type from ISP/ASN
    function guessNetworkType(isp, asn) {
        if (!isp) return '—';
        const ispLower = isp.toLowerCase();
        const cloudProviders = ['aws', 'amazon', 'google', 'gcp', 'azure', 'microsoft', 'cloudflare', 'ovh', 'hetzner', 'digitalocean', 'linode', 'vultr', 'rackspace', 'oracle cloud'];
        const isCloud = cloudProviders.some(provider => ispLower.includes(provider));
        return isCloud ? 'Likely data-center/VPN' : 'Likely home/office ISP';
    }

    // Reverse IPv4 for PTR lookup
    function reverseIPv4(ip) {
        return ip.split('.').reverse().join('.');
    }

    // Get browser info from UA-CH or userAgent
    function getBrowserInfo() {
        const ua = navigator.userAgent || '';
        const getVersion = (regex) => {
            const match = ua.match(regex);
            return match ? match[1] : '';
        };

        let browserName = 'Unknown';
        let browserVersion = '';
        let os = 'Unknown';

        if (/Edg\//.test(ua)) {
            browserName = 'Microsoft Edge';
            browserVersion = getVersion(/Edg\/([\d.]+)/);
        } else if (/OPR\//.test(ua) || /Opera/.test(ua)) {
            browserName = 'Opera';
            browserVersion = getVersion(/(?:OPR|Opera)\/([\d.]+)/);
        } else if (/Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua)) {
            browserName = 'Google Chrome';
            browserVersion = getVersion(/Chrome\/([\d.]+)/);
        } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
            browserName = 'Safari';
            browserVersion = getVersion(/Version\/([\d.]+)/);
        } else if (/Firefox\//.test(ua)) {
            browserName = 'Firefox';
            browserVersion = getVersion(/Firefox\/([\d.]+)/);
        } else if (/MSIE /.test(ua) || /Trident\//.test(ua)) {
            browserName = 'Internet Explorer';
            browserVersion = getVersion(/(?:MSIE |rv:)([\d.]+)/);
        }

        if (/Android/.test(ua)) {
            os = 'Android';
        } else if (/iPhone|iPad|iPod/.test(ua)) {
            os = 'iOS';
        } else if (/Windows/.test(ua)) {
            os = 'Windows';
        } else if (/Mac/.test(ua)) {
            os = 'macOS';
        } else if (/Linux/.test(ua)) {
            os = 'Linux';
        }

        if (navigator.userAgentData) {
            const platform = navigator.userAgentData.platform;
            if (platform) {
                os = platform;
            }

            const brands = navigator.userAgentData.brands || [];
            const meaningfulBrand = brands.find((b) => b.brand && !/not.?a.?brand/i.test(b.brand)) || brands[0];
            if (meaningfulBrand) {
                if (browserName === 'Unknown') {
                    browserName = meaningfulBrand.brand || browserName;
                }
                if (!browserVersion && meaningfulBrand.version) {
                    browserVersion = meaningfulBrand.version;
                }
            }
        }

        const browser = browserVersion ? `${browserName} ${browserVersion}`.trim() : browserName;
        return {
            browser,
            os
        };
    }

    // Guess device type
    function guessDeviceType() {
        const width = window.screen.width;
        const ua = navigator.userAgent.toLowerCase();
        
        if (ua.includes('mobile') || ua.includes('android') || width < 768) {
            return 'Phone';
        } else if (ua.includes('tablet') || (width >= 768 && width < 1024)) {
            return 'Tablet';
        }
        return 'Desktop';
    }

    function mapWindowsPlatformVersion(versionStr = '') {
        const major = parseInt(versionStr.split('.')[0], 10);
        if (Number.isNaN(major)) return null;
        if (major >= 13) return 'Windows 11';
        if (major >= 10) return 'Windows 10';
        return null;
    }

    function mapWindowsNTVersionFromUA(ua = '') {
        const match = /Windows NT (\d+\.\d+)/i.exec(ua);
        if (!match) return null;
        const version = match[1];
        const map = {
            '11.0': 'Windows 11',
            '10.0': 'Windows 10 or later',
            '6.3': 'Windows 8.1',
            '6.2': 'Windows 8',
            '6.1': 'Windows 7',
            '6.0': 'Windows Vista',
            '5.2': 'Windows XP (64-bit)',
            '5.1': 'Windows XP',
            '5.0': 'Windows 2000',
            '4.0': 'Windows 95/98/NT'
        };
        return map[version] || null;
    }

    async function getEnhancedOSLabel(baseOS) {
        const ua = navigator.userAgent || '';
        let osLabel = baseOS;
        const lowerBase = (baseOS || '').toLowerCase();

        if (!lowerBase.includes('windows')) {
            return osLabel;
        }

        let versionName = null;

        if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
            try {
                const { platform, platformVersion } = await navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion']);
                if ((platform || '').toLowerCase().includes('windows')) {
                    versionName = mapWindowsPlatformVersion(platformVersion);
                }
            } catch (error) {
                // ignore high-entropy errors, continue with UA fallback
            }
        }

        if (!versionName) {
            versionName = mapWindowsNTVersionFromUA(ua);
        }

        if (versionName) {
            osLabel = versionName;
        } else if (osLabel === 'Windows') {
            osLabel = 'Windows (version unknown)';
        }

        return osLabel;
    }

    function simplifyGpuInfo(vendorValue, rendererValue) {
        const tidy = (value) => {
            if (!value) return '';
            let result = value.trim();

            const angleMatch = result.match(/^ANGLE\s*\((.+)\)$/i);
            if (angleMatch) {
                result = angleMatch[1];
            }

            result = result
                .replace(/Google Inc\.?/gi, '')
                .replace(/Direct3D.*$/i, '')
                .replace(/\(0x[0-9a-fA-F]+\)/g, '')
                .replace(/,\s*$/g, '')
                .replace(/,\s*/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim();

            if (/^\(.*\)$/.test(result)) {
                result = result.slice(1, -1).trim();
            }

            return result;
        };

        const normalizeVendor = (value) => {
            if (!value) return '';
            return value
                .replace(/\b(corporation|corp\.|inc\.|inc|ltd\.|ltd|llc|co\.|company|technologies)\b/gi, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
        };

        let vendor = tidy(vendorValue);
        let renderer = tidy(rendererValue);

        const normalizedVendor = normalizeVendor(vendor);

        if (renderer && normalizedVendor && renderer.toLowerCase().includes(normalizedVendor.toLowerCase())) {
            vendor = '';
        }

        if (!renderer && vendor) {
            renderer = vendor;
            vendor = '';
        }

        const combined = [vendor, renderer].filter(Boolean).join(' ');
        if (combined) {
            return combined;
        }

        const fallback = [vendorValue, rendererValue].filter(Boolean).join(' / ');
        return fallback || '';
    }

    // Get WebGL fingerprint info
    async function getWebGLFingerprint() {
        const result = {
            supported: false,
            label: 'Not available',
            vendor: null,
            renderer: null,
            hash: null,
            details: null
        };

        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                return result;
            }

            result.supported = true;

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
            const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
            const simplified = simplifyGpuInfo(vendor, renderer);

            const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            const shading = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
            const aliased = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);

            const hashSource = [
                vendor || '',
                renderer || '',
                maxTexture || '',
                shading || '',
                Array.isArray(aliased) ? aliased.join(',') : aliased || ''
            ].join('|');

            const hash = await sha256Hex(hashSource);

            result.vendor = vendor || '';
            result.renderer = renderer || '';
            result.label = simplified || `${vendor || ''} ${renderer || ''}`.trim() || 'Available';
            result.hash = hash;
            result.details = {
                maxTexture: typeof maxTexture === 'number' ? maxTexture : null,
                shadingLanguageVersion: shading || null,
                aliasedLineWidthRange: aliased || null
            };

            return result;
        } catch (error) {
            return result;
        }
    }

    async function getCanvasFingerprint() {
        const result = {
            supported: false,
            hash: null,
            sample: null
        };

        try {
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 150;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return result;
            }

            result.supported = true;
            ctx.textBaseline = 'top';
            ctx.font = "16px 'Segoe UI', Tahoma, sans-serif";
            ctx.fillStyle = '#f60';
            ctx.fillRect(130, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('canvas-fp', 4, 32);
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = '#0a0';
            ctx.beginPath();
            ctx.arc(75, 75, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = '#00f';
            ctx.beginPath();
            ctx.arc(120, 75, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            const dataURL = canvas.toDataURL();
            result.hash = await sha256Hex(dataURL);
            result.sample = `${dataURL.slice(0, 48)}...`;
            return result;
        } catch (error) {
            return result;
        }
    }

    async function getAudioFingerprint() {
        const result = {
            supported: false,
            hash: null,
            error: null
        };

        try {
            const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            if (typeof OfflineCtx !== 'function') {
                result.error = 'Unsupported';
                return result;
            }

            const audioCtx = new OfflineCtx(1, 44100, 44100);
            const oscillator = audioCtx.createOscillator();
            const compressor = audioCtx.createDynamicsCompressor();
            oscillator.type = 'triangle';
            oscillator.frequency.value = 1000;
            oscillator.connect(compressor);
            compressor.connect(audioCtx.destination);
            oscillator.start(0);

            const buffer = await audioCtx.startRendering();
            const channelData = buffer.getChannelData(0).slice(0, 512);
            const signature = Array.from(channelData).map((value) => value.toFixed(3)).join(',');
            result.supported = true;
            result.hash = await sha256Hex(signature);
            return result;
        } catch (error) {
            result.error = error && error.message ? error.message : 'Unavailable';
            return result;
        }
    }

    function detectAdBlocker() {
        return new Promise((resolve) => {
            try {
                const bait = document.createElement('div');
                bait.className = 'adsbox adsbygoogle banner-ad ad-unit';
                bait.style.cssText = 'position:absolute; left:-9999px; top:-9999px; width:1px; height:1px; pointer-events:none;';
                document.body.appendChild(bait);
                requestAnimationFrame(() => {
                    const styles = window.getComputedStyle(bait);
                    const blocked = bait.offsetParent === null
                        || styles.display === 'none'
                        || styles.visibility === 'hidden'
                        || bait.clientHeight === 0
                        || bait.clientWidth === 0;
                    bait.remove();
                    resolve(blocked);
                });
            } catch (error) {
                resolve(false);
            }
        });
    }

    // Check local storage availability
    function checkLocalStorage() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return 'Available';
        } catch (e) {
            return 'Not available';
        }
    }

    // Format connection info
    function formatConnection(conn) {
        if (!conn) return null;
        return {
            type: conn.type || '—',
            effectiveType: conn.effectiveType || '—',
            downlink: conn.downlink ? `${conn.downlink} Mbps` : '—',
            rtt: conn.rtt ? `${conn.rtt} ms` : '—',
            saveData: conn.saveData ? 'Enabled' : 'Disabled'
        };
    }

    const BASE_FONT_FAMILIES = ['monospace', 'sans-serif', 'serif'];
    const RAW_FONT_CANDIDATES = `
Arial
Verdana
Times New Roman
Courier New
Georgia
Segoe UI
Helvetica
Trebuchet MS
Tahoma
Palatino
Gill Sans
Calibri
Cambria
Candara
Consolas
Comic Sans MS
Lucida Console
Lucida Sans Unicode
Arial Narrow
Courier
Impact
Franklin Gothic Medium
Century Gothic
Garamond
Bookman
Avant Garde
Baskerville
Optima
American Typewriter
Andale Mono
Apple Chancery
Big Caslon
Didot
Charter
Hoefler Text
Menlo
Monaco
Noteworthy
Skia
Geneva
Chicago
New York
Lucida Grande
Symbol
Wingdings
Wingdings 2
Wingdings 3
Segoe Print
Segoe Script
Segoe UI Emoji
Segoe UI Symbol
Segoe UI Historic
Lucida Sans
Lucida Calligraphy
Brush Script MT
Rockwell
Perpetua
Book Antiqua
Century Schoolbook
Elephant
Footlight MT Light
Kristen ITC
Wide Latin
Tempus Sans ITC
Monotype Corsiva
Copperplate
Futura
Avenir
DIN Alternate
DIN Condensed
Gill Sans MT
Palatino Linotype
Aparajita
Kalinga
Shonar Bangla
Vrinda
Mangal
Kokila
Raavi
Tunga
Vani
Shruti
Latha
Gautami
Iskoola Pota
Nirmala UI
Leelawadee UI
Myanmar Text
Khmer UI
Ebrima
Nyala
Euphemia UCAS
Malgun Gothic
Batang
Gulim
Dotum
SimSun
SimHei
NSimSun
FangSong
KaiTi
Songti SC
Songti TC
STHeiti
STKaiti
STSong
Heiti SC
Heiti TC
PingFang SC
PingFang TC
Hiragino Sans
Hiragino Kaku Gothic ProN
Hiragino Mincho ProN
Yu Gothic
Yu Gothic UI
Yu Mincho
Meiryo
Meiryo UI
Kozuka Gothic Pro
Kozuka Mincho Pro
Kozuka Gothic Pr6N
Kozuka Mincho Pr6N
Apple SD Gothic Neo
Apple Myungjo
Microsoft YaHei
Microsoft YaHei UI
Microsoft JhengHei
Microsoft JhengHei UI
Microsoft Uighur
Microsoft Himalaya
Microsoft PhagsPa
Microsoft New Tai Lue
Microsoft Tai Le
Microsoft Yi Baiti
Estrangelo Edessa
Gisha
Levenim MT
David
FrankRuehl
Miriam
Aharoni
Simplified Arabic
Traditional Arabic
Arabic Typesetting
Urdu Typesetting
Adobe Arabic
Roboto
Roboto Condensed
Roboto Mono
Roboto Slab
Roboto Flex
Open Sans
Open Sans Condensed
Lato
Oswald
Source Sans Pro
Source Serif Pro
Source Code Pro
Montserrat
Montserrat Alternates
Poppins
Merriweather
Merriweather Sans
Nunito
Nunito Sans
Raleway
PT Sans
PT Serif
PT Mono
Ubuntu
Ubuntu Mono
Ubuntu Condensed
Titillium Web
Work Sans
Inconsolata
Fira Sans
Fira Sans Condensed
Fira Sans Extra Condensed
Fira Code
Noto Sans
Noto Serif
Noto Sans JP
Noto Sans KR
Noto Sans SC
Noto Sans TC
Noto Sans Arabic
Noto Sans Devanagari
Noto Sans Hebrew
Noto Sans Thai
Noto Sans Georgian
Noto Sans Armenian
Noto Sans Bengali
Noto Sans Gujarati
Noto Sans Kannada
Noto Sans Malayalam
Noto Sans Tamil
Noto Sans Telugu
Noto Sans Sinhala
Noto Sans Lao
Noto Serif JP
Noto Serif KR
Noto Serif SC
Noto Serif TC
Barlow
Barlow Condensed
Barlow Semi Condensed
Jost
Manrope
Mulish
Quicksand
Rubik
Heebo
Karla
Cabin
Cabin Condensed
Comfortaa
Crimson Pro
Crimson Text
Domine
EB Garamond
Exo
Exo 2
Francois One
Hind
Hind Madurai
Hind Siliguri
Hind Vadodara
Bitter
Cairo
Candal
Catamaran
Chivo
Chivo Mono
Cormorant
Cormorant Garamond
Cormorant Infant
Cormorant SC
Cormorant Unicase
DM Sans
DM Serif Display
DM Serif Text
Encode Sans
Encode Sans Condensed
Encode Sans Semi Condensed
Gothic A1
IBM Plex Sans
IBM Plex Serif
IBM Plex Mono
Inter
Istok Web
Josefin Sans
Josefin Slab
Kanit
Khand
Lora
M PLUS 1
M PLUS Rounded 1c
Maven Pro
Metropolis
Mukta
Mukta Malar
Mukta Mahee
Nanum Gothic
Nanum Gothic Coding
Nanum Myeongjo
Nanum Pen Script
News Cycle
Old Standard TT
Orbitron
Overpass
Overpass Mono
Play
Playfair Display
Playfair Display SC
Prata
Righteous
Sarala
Signika
Signika Negative
Sintony
Slabo 13px
Slabo 27px
Space Grotesk
Space Mono
Teko
Tinos
Trirong
Varela Round
Zilla Slab
Public Sans
Red Hat Display
Red Hat Text
Be Vietnam Pro
Plus Jakarta Sans
Epilogue
Lexend
Lexend Deca
Lexend Mega
Lexend Tera
Urbanist
Atkinson Hyperlegible
Sora
Chakra Petch
Baloo 2
Baloo Bhai 2
Baloo Tamma 2
Baloo Tammudu 2
Baloo Thambi 2
Balsamiq Sans
Bevan
BioRhyme
Bungee
Bungee Inline
Bungee Outline
Bungee Shade
Carter One
Chewy
Changa
Cinzel
Cinzel Decorative
Coda
Concert One
Cookie
Courgette
Cousine
Crete Round
Creepster
Dancing Script
Fjalla One
Gudea
Kalam
Kaushan Script
Lobster
Lobster Two
Pacifico
Passion One
Patua One
Permanent Marker
Poiret One
Questrial
Rokkitt
Satisfy
Shadows Into Light
Staatliches
Tangerine
Vidaloka
Volkhov
Yellowtail
Adamina
Advent Pro
Alegreya
Alegreya Sans
Alegreya Sans SC
Alfa Slab One
Allerta
Allerta Stencil
Amaranth
Amatic SC
Amiri
Andika
Anton
Archivo
Archivo Narrow
Arimo
Arsenal
Arvo
Asap
Asap Condensed
Asul
Athiti
Average
Balthazar
Bangers
BenchNine
Biryani
Boogaloo
Bree Serif
Buenard
Cagliostro
Cambay
Cambo
Cantarell
Cantata One
Cantora One
Capriola
Cardo
Cedarville Cursive
Ceviche One
Charmonman
Chau Philomene One
Chicle
Chonburi
Cinzel Black
Clicker Script
Codystar
Commissioner
Convergence
Covered By Your Grace
Crafty Girls
Cuprum
Cutive
Cutive Mono
Damion
Darker Grotesque
David Libre
Delius
Delius Swash Caps
Delius Unicase
Devonshire
Dhurjati
Dosis
Eczar
El Messiri
Electrolize
Elsie
Elsie Swash Caps
Encode Sans Expanded
Enriqueta
Euphoria Script
Expletus Sans
Fanwood Text
Fascinate
Fascinate Inline
Faustina
Federant
Federo
Fenix
Finger Paint
Fondamento
Fresca
Galdeano
Gamja Flower
Gentium Book Basic
Gentium Basic
Geo
Georama
Germania One
Glass Antiqua
Gloria Hallelujah
Gochi Hand
Gorditas
Graduate
Grand Hotel
Gruppo
Handlee
Halant
Hammersmith One
Hepta Slab
Herr Von Muellerhoff
Hind Guntur
Hind Jalandhar
Holtwood One SC
Homemade Apple
Ibarra Real Nova
Iceberg
Iceland
Imprima
Inder
Indie Flower
Irish Grover
Italiana
Italianno
Jaldi
Jomhuria
Jolly Lodger
Judson
Just Another Hand
Just Me Again Down Here
K2D
Kadwa
Kameron
Karma
Kavivanar
Kdam Thmor Pro
Kenia
Khula
Kirang Haerang
Kodchasan
Koulen
Kranky
Kristi
Kurale
La Belle Aurore
Laila
Lakki Reddy
Lancelot
Ledger
Lekton
Libre Baskerville
Libre Franklin
Libre Barcode 39
Libre Barcode 39 Text
Libre Barcode 128
Lilita One
Limelight
Linden Hill
Lustria
Ma Shan Zheng
Macondo
Macondo Swash Caps
Mada
Magra
Maiden Orange
Maitree
Mako
Mallanna
Mandali
Marcellus
Marcellus SC
Marck Script
Margarine
Markazi Text
Marmelad
Martel
Martel Sans
Marvel
Mate
Mate SC
McLaren
Medula One
Meera Inimai
Merienda
Merienda One
Metamorphous
Metrophobic
Michroma
Milonga
Mina
Mitr
Modak
Mogra
Molengo
Monda
Monoton
Monsieur La Doulaise
Montaga
Montserrat Subrayada
Montez
Mountains of Christmas
Mouse Memoirs
Mr De Haviland
Mr Dafoe
Mrs Saint Delafield
Mrs Sheppards
Mystery Quest
Neucha
Neuton
New Rocker
Niconne
Nixie One
Nobile
Notable
Nothing You Could Do
Numans
Odibee Sans
Oleo Script
Oleo Script Swash Caps
Oranienbaum
Orienta
Original Surfer
Orkney
Oxygen
Padauk
Palanquin
Palanquin Dark
Paprika
Parisienne
Passero One
Patrick Hand
Patrick Hand SC
Paytone One
Peddana
Peralta
Petit Formal Script
Philosopher
Piazzolla
Pinyon Script
Pirata One
Plaster
Playball
Podkova
Pontano Sans
Port Lligat Sans
Port Lligat Slab
Press Start 2P
Prompt
Prociono
Prosto One
Puritan
Quando
Qwigley
Racing Sans One
Ramaraja
Rambla
Ranchers
Ranga
Rasa
Rationale
Recursive
Red Rose
Reem Kufi
Reem Kufi Fun
Reenie Beanie
Ribeye
Ribeye Marrow
Righteous
Risque
Rokkitt
Romanesco
Ropa Sans
Rosario
Rosarivo
Rouge Script
Rowdies
Rozha One
Rubik Mono One
Ruda
Rufina
Ruge Boogie
Rum Raisin
Ruslan Display
Russo One
Ruthie
Rye
Saira
Saira Condensed
Saira Extra Condensed
Saira Semi Condensed
Sail
Salsa
Sanchez
Sancreek
Sansita
Sarabun
Sarpanch
Sawarabi Gothic
Sawarabi Mincho
Scada
Scheherazade
Seaweed Script
Secular One
Share
Share Tech
Share Tech Mono
Shojumaru
Short Stack
Shrikhand
Siemreap
Sigmar One
Signika Light
Simonetta
Six Caps
Skranji
Smythe
Sniglet
Snippet
Snowburst One
Sofadi One
Sofia
Sonsie One
Sorts Mill Goudy
Spectral
Spectral SC
Spicy Rice
Spinnaker
Spirax
Stalinist One
Stint Ultra Condensed
Stint Ultra Expanded
Stoke
Strait
Stylish
Sue Ellen Francisco
Suez One
Sulphur Point
Sunflower
Supermercado One
Suranna
Sura
Suravaram
Syncopate
Syne
Tajawal
Taviraj
Tenali Ramakrishna
Tenor Sans
Text Me One
Thasadith
The Girl Next Door
Tillana
Timmana
Titan One
Trade Winds
Trispace
Tulpen One
Turret Road
Uncial Antiqua
Underdog
Unica One
Unkempt
Unlock
Unna
Vampiro One
Varela
Vast Shadow
Vesper Libre
Vidaloka
Viga
Voces
Vollkorn
Vollkorn SC
Voltaire
Waiting for the Sunrise
Wallpoet
Walter Turncoat
Wellfleet
Wire One
Yanone Kaffeesatz
Yantramanav
Yatra One
Yeseva One
Yesteryear
Yrsa
Yusei Magic
ZCOOL KuaiLe
ZCOOL QingKe HuangYou
ZCOOL XiaoWei
Zeyada
Zilla Slab Highlight
`;
    const COMMON_FONT_CANDIDATES = Array.from(new Set(
        RAW_FONT_CANDIDATES
            .split('\n')
            .map(name => name.trim())
            .filter(Boolean)
    )).slice(0, 300);
    const FONT_TEST_STRING = 'mmmmmmmmmmlli';
    const FONT_TEST_SIZE = 72;

    function detectFonts() {
        const result = {
            supported: false,
            blocked: false,
            available: [],
            totalTested: COMMON_FONT_CANDIDATES.length,
            methods: [],
            error: null
        };

        if (typeof document === 'undefined' || typeof document.createElement !== 'function' || !document.body) {
            result.error = 'Not supported in this environment';
            return result;
        }

        const detectionThreshold = 0.5;
        const canCheckFontFace = document.fonts && typeof document.fonts.check === 'function';
        if (canCheckFontFace) {
            result.methods.push('FontFaceSet');
        }

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.visibility = 'hidden';
        container.style.pointerEvents = 'none';
        container.style.whiteSpace = 'nowrap';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        container.style.fontSize = `${FONT_TEST_SIZE}px`;
        document.body.appendChild(container);

        try {
            const baseWidths = {};
            BASE_FONT_FAMILIES.forEach((base) => {
                const span = document.createElement('span');
                span.style.fontFamily = base;
                span.textContent = FONT_TEST_STRING;
                container.appendChild(span);
                baseWidths[base] = span.offsetWidth;
                container.removeChild(span);
            });

            result.methods.push('DOM');
            result.supported = true;

            COMMON_FONT_CANDIDATES.forEach((font) => {
                let detected = false;

                if (canCheckFontFace) {
                    try {
                        detected = document.fonts.check(`16px "${font}"`) || document.fonts.check(`700 16px "${font}"`);
                    } catch (error) {
                        if (error && error.name === 'SecurityError') {
                            result.blocked = true;
                        }
                    }
                }

                if (!detected) {
                    for (const base of BASE_FONT_FAMILIES) {
                        const span = document.createElement('span');
                        span.style.fontFamily = `"${font}", ${base}`;
                        span.textContent = FONT_TEST_STRING;
                        container.appendChild(span);
                        const width = span.offsetWidth;
                        container.removeChild(span);
                        const baseWidth = baseWidths[base];
                        if (typeof width === 'number' && typeof baseWidth === 'number' && Math.abs(width - baseWidth) > detectionThreshold) {
                            detected = true;
                            break;
                        }
                    }
                }

                if (detected) {
                    result.available.push(font);
                }
            });

            result.available = [...new Set(result.available)].sort((a, b) => a.localeCompare(b));

            if (result.blocked && result.available.length === 0) {
                result.supported = false;
                result.error = 'Protected (browser blocked enumeration)';
            }
        } catch (error) {
            result.supported = false;
            result.error = 'Font detection failed';
        } finally {
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }

        return result;
    }

    function detectTouchSupport() {
        const maxTouchPoints = navigator.maxTouchPoints ?? 0;
        const hasTouchEvents = typeof window !== 'undefined' && 'ontouchstart' in window;
        const supported = maxTouchPoints > 0 || hasTouchEvents;

        let label = 'Not detected';
        if (supported) {
            if (maxTouchPoints > 0) {
                label = `${maxTouchPoints} touch point${maxTouchPoints === 1 ? '' : 's'}`;
            } else {
                label = 'Likely (touch events supported)';
            }
        }

        return {
            supported,
            maxTouchPoints,
            label
        };
    }

    function detectPointerMode() {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return {
                label: 'Unknown',
                fine: false,
                coarse: false,
                none: false
            };
        }

        const fine = window.matchMedia('(pointer: fine)').matches || window.matchMedia('(any-pointer: fine)').matches;
        const coarse = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(any-pointer: coarse)').matches;
        const none = window.matchMedia('(pointer: none)').matches || window.matchMedia('(any-pointer: none)').matches;

        let label = 'Unknown';
        if (fine && coarse) {
            label = 'Multiple (mouse & touch)';
        } else if (fine) {
            label = 'Precise pointer (mouse/stylus)';
        } else if (coarse) {
            label = 'Touch/limited pointer';
        } else if (none) {
            label = 'No pointer detected';
        }

        return {
            label,
            fine,
            coarse,
            none
        };
    }

    async function detectPrivateMode() {
        const result = {
            supported: false,
            private: null,
            quota: null,
            usage: null,
            error: null
        };

        if (!navigator.storage || typeof navigator.storage.estimate !== 'function') {
            return result;
        }

        try {
            const estimate = await navigator.storage.estimate();
            result.supported = true;
            result.quota = typeof estimate.quota === 'number' ? estimate.quota : null;
            result.usage = typeof estimate.usage === 'number' ? estimate.usage : null;

            if (typeof estimate.quota === 'number') {
                result.private = estimate.quota < 120 * 1024 * 1024; // < 120MB
            } else {
                result.private = null;
            }

            return result;
        } catch (error) {
            result.error = error && error.message ? error.message : 'Unavailable';
            return result;
        }
    }

    function detectGeolocationStatus() {
        const hasGeo = typeof navigator !== 'undefined' && 'geolocation' in navigator;
        if (!hasGeo) {
            return {
                available: false,
                label: 'Not supported in this browser'
            };
        }

        const secure = typeof window !== 'undefined' && typeof window.isSecureContext === 'boolean'
            ? window.isSecureContext
            : true;

        if (!secure) {
            return {
                available: false,
                requiresSecureContext: true,
                label: 'Blocked (HTTPS required)'
            };
        }

        return {
            available: true,
            label: 'Available (permission required)'
        };
    }

    async function getPreciseGeolocationIfGranted(secureContext) {
        const result = {
            supported: false,
            state: 'unsupported',
            label: secureContext ? 'Permission not requested (site uses IP-based location)' : 'Blocked (HTTPS required)',
            coords: null,
            accuracy: null,
            timestamp: null,
            error: null,
            requested: false
        };

        if (!secureContext) {
            result.state = 'insecure';
            result.error = 'Secure context required';
            return result;
        }

        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            result.state = 'unsupported';
            result.label = 'Not supported in this browser';
            result.error = 'Geolocation API unavailable';
            return result;
        }

        result.supported = true;

        let permissionState = 'unknown';
        if (navigator.permissions && typeof navigator.permissions.query === 'function') {
            try {
                const permStatus = await navigator.permissions.query({ name: 'geolocation' });
                permissionState = permStatus.state;
            } catch (error) {
                permissionState = 'unknown';
            }
        }

        if (permissionState !== 'granted') {
            if (permissionState === 'denied') {
                result.state = 'denied';
                result.label = 'Permission previously denied';
                result.error = 'Permission previously denied';
            } else if (permissionState === 'prompt') {
                result.state = 'prompt';
                result.label = 'Permission not requested (site uses IP-based location)';
            } else {
                result.state = permissionState || 'unknown';
                result.label = 'Permission status unknown (not requesting precise location)';
                result.error = result.label;
            }
            return result;
        }

        try {
            result.requested = true;
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                });
            });

            const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
            result.coords = {
                latitude,
                longitude,
                accuracy: accuracy ?? null,
                altitude: altitude ?? null,
                heading: heading ?? null,
                speed: speed ?? null
            };
            result.accuracy = accuracy ?? null;
            result.timestamp = position.timestamp || Date.now();
            result.state = 'granted';
            const accuracyText = accuracy ? ` (±${Math.round(accuracy)} m)` : '';
            result.label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}${accuracyText}`;
            result.error = null;
            return result;
        } catch (error) {
            const err = error || {};
            const message = err.message || 'Unable to retrieve location';
            result.state = 'error';
            result.label = `Error: ${message}`;
            result.error = message;
            return result;
        }
    }

    function getPluginNames() {
        if (typeof navigator === 'undefined' || !navigator.plugins || typeof navigator.plugins.length === 'undefined') {
            return null;
        }

        try {
            const names = Array.from(navigator.plugins)
                .map((plugin) => plugin && plugin.name ? plugin.name.trim() : '')
                .filter(Boolean);
            return [...new Set(names)];
        } catch (e) {
            return null;
        }
    }

    function getJavaStatus() {
        if (typeof navigator !== 'undefined' && typeof navigator.javaEnabled === 'function') {
            try {
                const enabled = navigator.javaEnabled();
                return {
                    supported: true,
                    enabled,
                    label: enabled ? 'Enabled (legacy plugin detected)' : 'Disabled or not installed'
                };
            } catch (e) {
                return {
                    supported: true,
                    enabled: false,
                    label: 'Unknown (browser blocked check)'
                };
            }
        }

        return {
            supported: false,
            enabled: false,
            label: 'Not supported in modern browsers'
        };
    }

    function formatPluginPreview(names) {
        if (names === null) {
            return 'Not supported in this browser';
        }
        if (!Array.isArray(names) || names.length === 0) {
            return 'None detected';
        }

        const preview = names.slice(0, 2).join(', ');
        const remainder = names.length > 2 ? ` +${names.length - 2} more` : '';
        return `${names.length} detected: ${preview}${remainder}`;
    }

    function formatMediaCount(count) {
        if (typeof count !== 'number') {
            return '—';
        }
        if (count === 0) {
            return 'None detected';
        }
        return `${count} detected`;
    }

    function mapExposureLevel(value, overrides = {}) {
        if (value === undefined || value === null) {
            return 'low';
        }

        const normalized = String(value).trim().toLowerCase();
        if (overrides[normalized]) {
            return overrides[normalized];
        }

        if (normalized === 'known') return 'high';
        if (normalized === 'estimated') return 'medium';
        if (
            normalized === 'missing' ||
            normalized === 'unknown' ||
            normalized === 'unavailable' ||
            normalized === 'not available'
        ) {
            return 'low';
        }

        return 'medium';
    }

    function renderAdStatus(adInsights, overviewEl, gridEl) {
        if (!overviewEl || !gridEl) {
            return;
        }

        if (!adInsights || !adInsights.status) {
            overviewEl.textContent = 'Not available';
            gridEl.innerHTML = '<li class="ad-status-empty">Signal status not available in this browser.</li>';
            return;
        }

        const { status, signals } = adInsights;
        const cards = [];
        const pushCard = (label, value, level, description) => {
            if (!value) {
                return;
            }
            cards.push({ label, value, level, description });
        };

        const ipv4Status = status.ip && status.ip.v4;
        if (ipv4Status) {
            const ipv4Level = mapExposureLevel(ipv4Status);
            pushCard(
                'IPv4 address',
                ipv4Status,
                ipv4Level,
                ipv4Status === 'Known'
                    ? 'Ad platforms can geolocate and de-duplicate you via IPv4.'
                    : 'IPv4 is hidden or unavailable; targeting falls back to softer signals.'
            );
        }

        const ipv6Status = status.ip && status.ip.v6;
        if (ipv6Status) {
            const ipv6Level = mapExposureLevel(ipv6Status);
            pushCard(
                'IPv6 address',
                ipv6Status,
                ipv6Level,
                ipv6Status === 'Known'
                    ? 'IPv6 remains visible; dual-stack campaigns can still identify your device.'
                    : 'IPv6 is not exposed, which reduces dual-stack targeting confidence.'
            );
        }

        const geoStatus = status.geo;
        if (geoStatus) {
            const geoLevel = mapExposureLevel(geoStatus);
            const geoDescription = geoStatus === 'Estimated'
                ? (signals && signals.geo && signals.geo.string
                    ? `Approximate location available (${signals.geo.string}).`
                    : 'Approximate city/region available for geo targeting.')
                : 'Geolocation from IP was not resolved.';
            pushCard('Location signals', geoStatus, geoLevel, geoDescription);
        }

        const languageStatus = status.language;
        if (languageStatus) {
            const languageLevel = mapExposureLevel(languageStatus);
            const languageDescription = languageStatus === 'Known'
                ? (signals && signals.languages && signals.languages.primary
                    ? `Browser language exposed (${signals.languages.primary}).`
                    : 'Browser language is shared for localisation.')
                : 'Language preference hidden; ads may default to generic content.';
            pushCard('Browser language', languageStatus, languageLevel, languageDescription);
        }

        const topicsStatus = status.topics;
        if (topicsStatus) {
            const topicsLevel = mapExposureLevel(topicsStatus);
            const topics = Array.isArray(signals && signals.topics) ? signals.topics : [];
            const topicsDescription = topicsStatus === 'Known'
                ? `${topics.length} topic ${topics.length === 1 ? 'ID' : 'IDs'} exposed by the Topics API.`
                : 'Browser did not provide Topics; interest ads must rely on other signals.';
            pushCard('Chrome Topics', topicsStatus, topicsLevel, topicsDescription);
        }

        const networkStatus = status.network || 'Unknown';
        const networkLevel = mapExposureLevel(networkStatus, {
            'home/office isp (guess)': 'high',
            'data-centre/vpn (guess)': 'medium'
        });
        let networkDescription = 'Network type unclear; fewer assumptions can be made.';
        if (networkStatus === 'Home/office ISP (guess)') {
            networkDescription = 'Looks residential; marketers often treat this as a household connection.';
        } else if (networkStatus === 'Data-centre/VPN (guess)') {
            networkDescription = 'Looks like VPN or hosting traffic; some advertisers reduce targeting confidence.';
        }
        pushCard('Network fingerprint', networkStatus, networkLevel, networkDescription);

        const connectionStatus = status.connection || 'Unknown';
        const connectionLevel = mapExposureLevel(connectionStatus);
        const connection = signals && signals.connection ? signals.connection : {};
        const downlink = typeof connection.downlinkMbps === 'number'
            ? `${connection.downlinkMbps} Mbps`
            : 'unknown speed';
        const rtt = typeof connection.rttMs === 'number'
            ? `${connection.rttMs} ms`
            : 'unknown latency';
        const connectionDescription = connectionStatus === 'Estimated'
            ? `Connection hints shared (${downlink}, ${rtt}, Data Saver ${connection.saveData ? 'On' : 'Off'}).`
            : 'Connection metrics hidden; creatives stay conservative.';
        pushCard('Connection quality', connectionStatus, connectionLevel, connectionDescription);

        const privacyStatus = status.privacy || {};
        const privacyParts = [];
        if (privacyStatus.dnt) {
            privacyParts.push(`DNT ${privacyStatus.dnt.toLowerCase()}`);
        }
        if (privacyStatus.gpc) {
            privacyParts.push(`GPC ${privacyStatus.gpc.toLowerCase()}`);
        }
        if (privacyStatus.cookies) {
            privacyParts.push(`Cookies ${privacyStatus.cookies.toLowerCase()}`);
        }
        const saveDataOn = !!(signals && signals.connection && signals.connection.saveData);
        privacyParts.push(`Data Saver ${saveDataOn ? 'on' : 'off'}`);
        const privacySignals = signals && signals.privacy ? signals.privacy : {};
        const hasProtection = !!(
            privacySignals.dnt ||
            privacySignals.gpc ||
            saveDataOn ||
            (typeof privacySignals.cookiesEnabled === 'boolean' && !privacySignals.cookiesEnabled)
        );
        const privacyLevel = hasProtection ? 'protect' : 'high';
        const privacyDescription = hasProtection
            ? 'Privacy signals reduce ad precision or limit tracking.'
            : 'No explicit privacy signals; ad tech can operate at full strength.';
        pushCard('Privacy signals', privacyParts.join(' • '), privacyLevel, privacyDescription);

        const counts = cards.reduce((acc, card) => {
            acc[card.level] = (acc[card.level] || 0) + 1;
            return acc;
        }, {});

        const overviewParts = [];
        if (counts.high) overviewParts.push(`${counts.high} high exposure`);
        if (counts.medium) overviewParts.push(`${counts.medium} medium exposure`);
        if (counts.low) overviewParts.push(`${counts.low} low exposure`);
        if (counts.protect) overviewParts.push(`${counts.protect} protective signal${counts.protect === 1 ? '' : 's'}`);

        overviewEl.textContent = overviewParts.length
            ? overviewParts.join(' • ')
            : 'Status available';

        gridEl.innerHTML = '';
        cards.forEach((card) => {
            const li = document.createElement('li');
            li.className = `ad-status-card ad-status-card--${card.level}`;

            const labelSpan = document.createElement('span');
            labelSpan.className = 'ad-status-card__label';
            labelSpan.textContent = card.label;
            li.appendChild(labelSpan);

            const valueSpan = document.createElement('span');
            valueSpan.className = 'ad-status-card__value';
            valueSpan.textContent = card.value;
            li.appendChild(valueSpan);

            if (card.description) {
                const descriptionP = document.createElement('p');
                descriptionP.className = 'ad-status-card__description';
                descriptionP.textContent = card.description;
                li.appendChild(descriptionP);
            }

            gridEl.appendChild(li);
        });

        if (!cards.length) {
            gridEl.innerHTML = '<li class="ad-status-empty">Signal status not available in this browser.</li>';
        }
    }

    function populateAdSection(adInsights, baseData) {
        const topicsListEl = document.getElementById('ad-topics-list');
        const categoriesContainer = document.getElementById('ad-category-list');
        const summaryTextEl = document.getElementById('ad-summary-text');
        const statusOverviewEl = document.getElementById('ad-status-overview');
        const statusGridEl = document.getElementById('ad-status-grid');
        const fingerprintSummaryEl = document.getElementById('ad-fingerprint-summary');
        const fingerprintCanvasEl = document.getElementById('ad-fingerprint-canvas');
        const fingerprintWebGLEl = document.getElementById('ad-fingerprint-webgl');
        const fingerprintAudioEl = document.getElementById('ad-fingerprint-audio');
        const fingerprintAdblockEl = document.getElementById('ad-fingerprint-adblock');
        const fingerprintPrivateModeEl = document.getElementById('ad-fingerprint-private-mode');
        const contextStatusEl = document.getElementById('ad-context-status');
        const contextTagsEl = document.getElementById('ad-context-tags');

        renderAdStatus(adInsights, statusOverviewEl, statusGridEl);

        const fingerprints = baseData && baseData.fingerprints ? baseData.fingerprints : {};

        if (fingerprintSummaryEl) {
            const summaryParts = [];
            if (fingerprints.canvas && fingerprints.canvas.hash) summaryParts.push('Canvas hash ready');
            if (fingerprints.webgl && fingerprints.webgl.hash) summaryParts.push('WebGL hash ready');
            if (fingerprints.audio && fingerprints.audio.hash) summaryParts.push('Audio hash ready');
            if (typeof fingerprints.adBlock === 'boolean') {
                summaryParts.push(fingerprints.adBlock ? 'Ad blocker detected' : 'Ad blocker not detected');
            }
            if (fingerprints.privateMode && typeof fingerprints.privateMode.private === 'boolean') {
                summaryParts.push(fingerprints.privateMode.private ? 'Private mode likely' : 'Private mode unlikely');
            }
            fingerprintSummaryEl.textContent = summaryParts.length
                ? summaryParts.join(' • ')
                : 'No fingerprint data collected';
        }

        if (fingerprintCanvasEl) {
            const canvasInfo = fingerprints.canvas || {};
            fingerprintCanvasEl.textContent = canvasInfo.hash
                ? canvasInfo.hash
                : canvasInfo.supported === false
                    ? 'Not supported'
                    : 'Unavailable';
        }

        if (fingerprintWebGLEl) {
            const webglInfo = fingerprints.webgl || {};
            fingerprintWebGLEl.textContent = webglInfo.hash
                ? webglInfo.hash
                : webglInfo.supported === false
                    ? 'Not supported'
                    : 'Unavailable';
        }

        if (fingerprintAudioEl) {
            const audioInfo = fingerprints.audio || {};
            fingerprintAudioEl.textContent = audioInfo.hash
                ? audioInfo.hash
                : audioInfo.error
                    ? `Unavailable (${audioInfo.error})`
                    : audioInfo.supported === false
                        ? 'Not supported'
                        : 'Unavailable';
        }

        if (fingerprintAdblockEl) {
            if (typeof fingerprints.adBlock === 'boolean') {
                fingerprintAdblockEl.textContent = fingerprints.adBlock ? 'Likely enabled' : 'Not detected';
            } else {
                fingerprintAdblockEl.textContent = 'Unknown';
            }
        }

        if (fingerprintPrivateModeEl) {
            const priv = fingerprints.privateMode || {};
            if (typeof priv.private === 'boolean') {
                fingerprintPrivateModeEl.textContent = priv.private
                    ? 'Likely (quota constrained)'
                    : 'Unlikely (normal quota)';
            } else if (priv.supported === false) {
                fingerprintPrivateModeEl.textContent = 'Not supported';
            } else if (priv.error) {
                fingerprintPrivateModeEl.textContent = `Unavailable (${priv.error})`;
            } else {
                fingerprintPrivateModeEl.textContent = 'Unknown';
            }
        }

        if (!adInsights) {
            updateElement('ad-topics', 'Not available');
            if (topicsListEl) {
                topicsListEl.innerHTML = '<li class="ad-topics-empty">Topics not available in this browser.</li>';
            }
            updateElement('ad-categories', 'Not available');
            if (categoriesContainer) {
                categoriesContainer.innerHTML = '<div class="ad-category-card ad-category-card--empty">No categories yet.</div>';
            }
            updateElement('ad-summary', 'Not available');
            if (summaryTextEl) {
                summaryTextEl.textContent = 'Advertising summary is not available in this browser.';
            }
            if (contextStatusEl) {
                contextStatusEl.textContent = 'Auto-scanned';
            }
            if (contextTagsEl) {
                contextTagsEl.innerHTML = '<span class="ad-context-tag ad-context-tag--empty">No keywords detected yet</span>';
            }
            return;
        }

        const topicsValue = adInsights && adInsights.signals && Array.isArray(adInsights.signals.topics)
            ? adInsights.signals.topics
            : [];

        updateElement('ad-topics', topicsValue.length ? `${topicsValue.length} topic ${topicsValue.length === 1 ? 'ID' : 'IDs'}` : 'Not available');
        if (topicsListEl) {
            topicsListEl.innerHTML = '';
            if (topicsValue.length) {
                topicsValue.forEach((topic) => {
                    const li = document.createElement('li');
                    const topicId = typeof topic.topic === 'number' ? topic.topic : 'unknown';
                    const taxonomy = topic.taxonomyVersion ?? 'N/A';
                    const model = topic.modelVersion ?? 'N/A';
                    li.textContent = `Topic ID ${topicId} (taxonomy ${taxonomy}, model ${model})`;
                    topicsListEl.appendChild(li);
                });
            } else {
                topicsListEl.innerHTML = '<li class="ad-topics-empty">Browser did not provide Topics (feature disabled or unsupported).</li>';
            }
        }

        const categoriesValue = Array.isArray(adInsights.categories) ? adInsights.categories : [];
        const matchedCategories = categoriesValue.filter((cat) => {
            const score = typeof cat.norm === 'number' ? cat.norm : cat.score || 0;
            return score > 0;
        });

        updateElement('ad-categories', matchedCategories.length
            ? matchedCategories.map((cat) => cat.label).join(', ')
            : 'No matches yet');

        if (categoriesContainer) {
            categoriesContainer.innerHTML = '';
            if (categoriesValue.length) {
                categoriesValue.forEach((cat) => {
                    const card = document.createElement('div');
                    card.className = 'ad-category-card';

                    const header = document.createElement('div');
                    header.className = 'ad-category-card__header';

                    const title = document.createElement('span');
                    title.className = 'ad-category-card__title';
                    title.textContent = cat.label;
                    header.appendChild(title);

                    let normalizedScore = null;
                    if (typeof cat.norm === 'number' && Number.isFinite(cat.norm)) {
                        normalizedScore = Math.round(Math.max(0, Math.min(100, cat.norm)));
                    } else if (typeof cat.score === 'number' && Number.isFinite(cat.score)) {
                        normalizedScore = Math.round(Math.max(0, Math.min(100, cat.score)));
                    }

                    if (normalizedScore !== null) {
                        const score = document.createElement('span');
                        score.className = 'ad-category-card__score';
                        score.textContent = `Score ${normalizedScore}`;
                        header.appendChild(score);
                    }

                    card.appendChild(header);

                    const bar = document.createElement('div');
                    bar.className = 'ad-category-card__bar';
                    const barFill = document.createElement('span');
                    barFill.className = 'ad-category-card__barFill';
                    barFill.style.width = `${normalizedScore !== null ? normalizedScore : 0}%`;
                    bar.appendChild(barFill);
                    card.appendChild(bar);

                    const reasons = Array.isArray(cat.because) ? cat.because : [];
                    if (reasons.length) {
                        const whyList = document.createElement('ul');
                        whyList.className = 'ad-category-card__why';
                        reasons.slice(0, 6).forEach((reason) => {
                            const li = document.createElement('li');
                            li.textContent = reason;
                            whyList.appendChild(li);
                        });
                        card.appendChild(whyList);
                    }

                    categoriesContainer.appendChild(card);
                });
            } else {
                categoriesContainer.innerHTML = '<div class="ad-category-card ad-category-card--empty">No categories yet.</div>';
            }
        }

        updateElement('ad-summary', matchedCategories.length ? 'Generated from local signals' : 'Generated (low confidence)');
        if (summaryTextEl) {
            summaryTextEl.textContent = adInsights.summary || 'Advertising summary is not available.';
        }

        const keywords = Array.isArray(adInsights.keywords) ? adInsights.keywords : [];

        if (contextStatusEl) {
            const hasUserText = adInsights.context && adInsights.context.hasUserText;
            contextStatusEl.textContent = hasUserText ? 'Auto-scanned + your text' : 'Auto-scanned';
        }

        if (contextTagsEl) {
            contextTagsEl.innerHTML = '';
            if (keywords.length) {
                keywords.slice(0, 12).forEach((entry) => {
                    const term = entry.term || entry.keyword || (Array.isArray(entry) ? entry[0] : null);
                    const count = entry.count ?? (Array.isArray(entry) ? entry[1] : null);
                    if (!term) {
                        return;
                    }
                    const tag = document.createElement('span');
                    tag.className = 'ad-context-tag';
                    tag.textContent = count ? `${term} ×${count}` : term;
                    contextTagsEl.appendChild(tag);
                });
            } else {
                const emptyTag = document.createElement('span');
                emptyTag.className = 'ad-context-tag ad-context-tag--empty';
                emptyTag.textContent = 'No keywords detected yet';
                contextTagsEl.appendChild(emptyTag);
            }
        }

        if (baseData && baseData.context) {
            baseData.context.keywords = keywords;
            if (adInsights.context && typeof adInsights.context.combinedText === 'string') {
                baseData.context.combinedText = adInsights.context.combinedText;
            }
        }
    }

    // Collect all data
    async function collectData() {
        const data = {
            timestamp: new Date().toISOString(),
            network: {},
            browser: {},
            system: {},
            connection: {},
            privacy: {},
            features: {},
            fingerprints: {},
            context: {
                baseText: '',
                userText: '',
                combinedText: '',
                keywords: []
            }
        };

        let ipv4Resolved = null;
        let ipv4Displayed = false;
        let reverseDnsResolved = null;
        let reverseDnsDisplayed = false;

        const secureContext = typeof window !== 'undefined' && typeof window.isSecureContext === 'boolean'
            ? window.isSecureContext
            : true;

        const baseContextText = (document.querySelector('main')?.innerText || document.body?.innerText || '').trim();
        data.context.baseText = baseContextText;
        data.context.combinedText = baseContextText;

        // Network data
        try {
            const ipv4Data = await safeFetch('https://api.ipify.org?format=json');
            if (ipv4Data) {
                data.network.ipv4 = ipv4Data.ip;
                ipv4Resolved = ipv4Data.ip;
                updateElement('ipv4', ipv4Data.ip);
                ipv4Displayed = true;
                
                // Try reverse DNS
                try {
                    const reversed = reverseIPv4(ipv4Data.ip);
                    const dnsData = await safeFetch(`https://dns.google/resolve?name=${reversed}.in-addr.arpa&type=PTR`);
                    if (dnsData && dnsData.Answer && dnsData.Answer[0]) {
                        const ptr = dnsData.Answer[0].data;
                        updateElement('reverse-dns', ptr);
                        reverseDnsResolved = ptr;
                        reverseDnsDisplayed = true;
                        data.network.reverseDns = ptr;
                    } else {
                        updateElement('reverse-dns', '—', 'No PTR record found');
                        reverseDnsDisplayed = true;
                    }
                } catch (e) {
                    updateElement('reverse-dns', '—', 'Reverse DNS lookup unavailable (blocked or timed out)');
                    reverseDnsDisplayed = true;
                }
            } else {
                updateElement('ipv4', '—', 'IPv4 lookup timed out — trying alternate sources…');
                ipv4Displayed = true;
            }
        } catch (e) {
            updateElement('ipv4', '—', 'IPv4 lookup blocked by network or privacy tools — trying alternate sources…');
            ipv4Displayed = true;
        }

        try {
            const ipv6Data = await safeFetch('https://api64.ipify.org?format=json');
            if (ipv6Data && ipv6Data.ip && ipv6Data.ip.includes(':')) {
                data.network.ipv6 = ipv6Data.ip;
                updateElement('ipv6', ipv6Data.ip);
            } else {
                data.network.ipv6 = null;
                updateElement('ipv6', '—', 'Not available (IPv6 not configured)');
            }
        } catch (e) {
            data.network.ipv6 = null;
            updateElement('ipv6', '—', 'Not available');
        }

        // Geo/ISP data (primary: ipapi.co, fallback: ipinfo.io -> ipwho.is)
        try {
            let geoData = await safeFetch('https://ipapi.co/json/');
            let geoSource = geoData ? 'ipapi.co' : null;
            if (!geoData) {
                geoData = await safeFetch('https://ipinfo.io/json');
                if (geoData && !geoData.error) {
                    geoSource = 'ipinfo.io';
                }
            }

            if (!geoData) {
                const ipwhoData = await safeFetch('https://ipwho.is/');
                if (ipwhoData && (ipwhoData.success === undefined || ipwhoData.success === true)) {
                    geoSource = 'ipwho.is';
                    geoData = {
                        org: ipwhoData.connection?.org || ipwhoData.connection?.isp || ipwhoData.connection?.domain || null,
                        isp: ipwhoData.connection?.isp || ipwhoData.connection?.org || null,
                        asn: ipwhoData.connection?.asn || null,
                        country_name: ipwhoData.country || ipwhoData.country_code,
                        country: ipwhoData.country_code,
                        region: ipwhoData.region || ipwhoData.regionName,
                        city: ipwhoData.city,
                        ip: ipwhoData.ip,
                        hostname: ipwhoData.connection?.domain || null
                    };
                }
            }
            
            if (geoData) {
                const isp = geoData.org || geoData.isp || '—';
                const asn = (typeof geoData.asn === 'object' && geoData.asn?.asn) 
                    ? geoData.asn.asn 
                    : (geoData.asn || (geoData.org ? geoData.org.split(' ')[0] : '—'));
                const country = geoData.country_name || geoData.country || '—';
                const region = geoData.region || geoData.regionName || '—';
                const city = geoData.city || '—';
                
                data.network.isp = isp;
                data.network.asn = asn;
                data.network.country = country;
                data.network.region = region;
                data.network.city = city;
                
                updateElement('isp', `${isp}${asn && asn !== '—' ? ` (ASN: ${asn})` : ''}`);
                
                const locationParts = [city, region, country].filter(p => p && p !== '—');
                updateElement('location', locationParts.length ? locationParts.join(', ') : '—');
                
                const networkType = guessNetworkType(isp, asn);
                updateElement('network-type', networkType);
                data.network.networkType = networkType;

                const geoIpFallback = geoData.ip
                    || geoData.ip_address
                    || (Array.isArray(geoData.ip_addresses) ? geoData.ip_addresses[0] : null);

                if (!ipv4Resolved && geoIpFallback) {
                    ipv4Resolved = geoIpFallback;
                    data.network.ipv4 = geoIpFallback;
                    updateElement('ipv4', geoIpFallback, `Recovered via ${geoSource || 'geo lookup'}`);
                    ipv4Displayed = true;
                }

                if (!reverseDnsResolved && geoData.hostname) {
                    reverseDnsResolved = geoData.hostname;
                    data.network.reverseDns = geoData.hostname;
                    updateElement('reverse-dns', geoData.hostname, 'Provided by geo lookup service');
                    reverseDnsDisplayed = true;
                }

                if (!ipv4Displayed) {
                    updateElement('ipv4', '—', 'No IP address returned — check VPN or strict network filters.');
                    ipv4Displayed = true;
                }

                if (!reverseDnsDisplayed && !reverseDnsResolved) {
                    updateElement('reverse-dns', '—', 'Reverse DNS not provided by lookup services.');
                    reverseDnsDisplayed = true;
                }
            } else {
                updateElement('isp', '—', 'ISP lookup blocked — try disabling aggressive content blockers.');
                updateElement('location', '—', 'Location service unreachable — check connection or retry later.');
                updateElement('network-type', '—', 'Unable to determine without ISP data.');
            }
        } catch (e) {
            updateElement('isp', '—', 'ISP lookup blocked — try disabling aggressive content blockers.');
            updateElement('location', '—', 'Location service unreachable — check connection or retry later.');
            updateElement('network-type', '—', 'Unable to determine without ISP data.');
        }

        if (!ipv4Displayed) {
            updateElement('ipv4', '—', 'We could not recover your public IP automatically.');
        }

        if (!reverseDnsDisplayed && reverseDnsResolved) {
            updateElement('reverse-dns', reverseDnsResolved);
        } else if (!reverseDnsDisplayed) {
            updateElement('reverse-dns', '—', 'Reverse DNS not available from any provider.');
        }

        // Referrer
        const referrer = document.referrer || 'None';
        data.network.referrer = referrer;
        updateElement('referrer', referrer === 'None' ? 'None' : referrer);

        // Browser & Device
        const browserInfo = getBrowserInfo();
        data.browser.browser = browserInfo.browser;
        data.browser.os = browserInfo.os;
        updateElement('browser', browserInfo.browser);
        updateElement('os', browserInfo.os);

        try {
            const enhancedOs = await getEnhancedOSLabel(browserInfo.os);
            if (enhancedOs && enhancedOs !== browserInfo.os) {
                data.browser.os = enhancedOs;
                updateElement('os', enhancedOs);
            }
        } catch (error) {
            // leave base OS label if enhancement fails
        }

        // Languages
        const languages = navigator.languages || [navigator.language];
        const langStr = languages.join(', ');
        data.browser.languages = languages;
        updateElement('languages', langStr);

        // Timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offsetMinutesRaw = new Date().getTimezoneOffset();
        const offsetTotalMinutes = offsetMinutesRaw * -1; // invert so positive = UTC+
        const offsetSign = offsetTotalMinutes >= 0 ? '+' : '-';
        const offsetAbsMinutes = Math.abs(offsetTotalMinutes);
        const offsetHoursPart = String(Math.floor(offsetAbsMinutes / 60)).padStart(2, '0');
        const offsetMinutePart = String(offsetAbsMinutes % 60).padStart(2, '0');
        const offsetStr = `UTC${offsetSign}${offsetHoursPart}:${offsetMinutePart}`;
        const tzWithOffset = `${tz} (${offsetStr})`;
        data.browser.timezone = tz;
        data.browser.timezoneOffset = offsetStr;
        updateElement('timezone', tzWithOffset);

        // Local time
        const now = new Date();
        const localTime = now.toLocaleString();
        data.browser.localTime = localTime;
        updateElement('local-time', localTime);
        
        // Update time every second
        setInterval(() => {
            updateElement('local-time', new Date().toLocaleString());
        }, 1000);

        // Device type
        const deviceType = guessDeviceType();
        data.browser.deviceType = deviceType;
        updateElement('device-type', deviceType);

        // Screen size
        const screenSize = `${screen.width} × ${screen.height}`;
        data.browser.screenWidth = screen.width;
        data.browser.screenHeight = screen.height;
        updateElement('screen-size', screenSize);

        // Viewport
        const viewport = `${window.innerWidth} × ${window.innerHeight}`;
        data.browser.viewportWidth = window.innerWidth;
        data.browser.viewportHeight = window.innerHeight;
        updateElement('viewport', viewport);

        // Pixel ratio
        const pixelRatio = window.devicePixelRatio || 1;
        data.browser.pixelRatio = pixelRatio;
        updateElement('pixel-ratio', pixelRatio.toString());

        // Color depth
        const colorDepth = screen.colorDepth || screen.pixelDepth || '—';
        data.browser.colorDepth = colorDepth;
        updateElement('color-depth', colorDepth !== '—' ? `${colorDepth} bits` : '—');

        // System
        const cpuThreads = navigator.hardwareConcurrency || '—';
        data.system.cpuThreads = cpuThreads;
        updateElement('cpu-threads', cpuThreads !== '—' ? cpuThreads.toString() : '—', cpuThreads !== '—' ? '' : 'Not available');

        const ram = navigator.deviceMemory;
        data.system.ram = ram;
        updateElement('ram', ram ? formatDeviceMemory(ram) : '—', ram ? 'Estimated by browser' : 'Not available');

        const webglFingerprint = await getWebGLFingerprint();
        const graphicsLabel = webglFingerprint.label || 'Not available';
        data.system.graphics = graphicsLabel;
        data.fingerprints.webgl = webglFingerprint;
        updateElement('graphics', graphicsLabel);

        // Connection
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const connInfo = formatConnection(conn);
        if (connInfo) {
            data.connection = connInfo;
            updateElement('connection-type', connInfo.type);
            updateElement('effective-type', connInfo.effectiveType);
            updateElement('downlink', connInfo.downlink);
            updateElement('rtt', connInfo.rtt);
            updateElement('save-data', connInfo.saveData);
        } else {
            updateElement('connection-type', '—', 'Not available');
            updateElement('effective-type', '—', 'Not available');
            updateElement('downlink', '—', 'Not available');
            updateElement('rtt', '—', 'Not available');
            updateElement('save-data', '—', 'Not available');
        }

        // Privacy signals
        const dnt = navigator.doNotTrack || '—';
        data.privacy.doNotTrack = dnt;
        updateElement('dnt', dnt === '1' ? 'Enabled' : dnt === '0' ? 'Disabled' : 'Not set');

        const gpc = navigator.globalPrivacyControl || false;
        data.privacy.globalPrivacyControl = gpc;
        updateElement('gpc', gpc ? 'Enabled' : 'Not set');

        const cookies = navigator.cookieEnabled;
        data.privacy.cookiesEnabled = cookies;
        updateElement('cookies', cookies ? 'Enabled' : 'Disabled');

        const localStorage = checkLocalStorage();
        data.privacy.localStorage = localStorage;
        updateElement('local-storage', localStorage);

        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        data.privacy.darkMode = darkMode;
        updateElement('dark-mode', darkMode ? 'Dark' : 'Light');

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        data.privacy.reducedMotion = reducedMotion;
        updateElement('reduced-motion', reducedMotion ? 'Enabled' : 'Disabled');

        // Features & peripherals
        const mediaDevicesInfo = {
            supported: !!(navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function'),
            counts: {
                audioinput: null,
                audiooutput: null,
                videoinput: null
            }
        };

        if (mediaDevicesInfo.supported) {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                devices.forEach((device) => {
                    if (!device || !device.kind) return;
                    if (Object.prototype.hasOwnProperty.call(mediaDevicesInfo.counts, device.kind)) {
                        mediaDevicesInfo.counts[device.kind] = (mediaDevicesInfo.counts[device.kind] || 0) + 1;
                    }
                });

                ['audioinput', 'audiooutput', 'videoinput'].forEach((kind) => {
                    if (mediaDevicesInfo.counts[kind] === null) {
                        mediaDevicesInfo.counts[kind] = 0;
                    }
                });

                updateElement('microphones', formatMediaCount(mediaDevicesInfo.counts.audioinput));
                updateElement('speakers', formatMediaCount(mediaDevicesInfo.counts.audiooutput));
                updateElement('webcams', formatMediaCount(mediaDevicesInfo.counts.videoinput));
            } catch (error) {
                const blockedMessage = !secureContext
                    ? 'Blocked (HTTPS required)'
                    : (error && (error.name === 'NotAllowedError' || error.name === 'SecurityError'))
                        ? 'Blocked (permission required)'
                        : 'Unavailable';
                ['microphones', 'speakers', 'webcams'].forEach((id) => updateElement(id, blockedMessage));
                mediaDevicesInfo.error = blockedMessage;
            }
        } else {
            ['microphones', 'speakers', 'webcams'].forEach((id) => updateElement(id, 'Not supported in this browser'));
        }

        data.features.mediaDevices = mediaDevicesInfo;

        const touchInfo = detectTouchSupport();
        data.features.touch = touchInfo;
        updateElement('touch-support', touchInfo.supported ? touchInfo.label : 'Not detected');

        const pointerInfo = detectPointerMode();
        data.features.pointer = pointerInfo;
        updateElement('pointer-support', pointerInfo.label);

        const geolocationStatus = detectGeolocationStatus();
        const geolocationInfo = {
            support: geolocationStatus,
            precise: null
        };
        data.features.geolocation = geolocationInfo;
        updateElement('geolocation-support', geolocationStatus.label);

        let geoPrecise = {
            supported: false,
            state: geolocationStatus.requiresSecureContext ? 'insecure' : 'unsupported',
            label: geolocationStatus.label,
            coords: null,
            accuracy: null,
            timestamp: null,
            error: geolocationStatus.label,
            requested: false
        };

        if (geolocationStatus.available) {
            geoPrecise = await getPreciseGeolocationIfGranted(secureContext);
        }

        geolocationInfo.precise = geoPrecise;
        updateElement('geolocation-precise', geoPrecise.label);

        const geoListEl = document.getElementById('geolocation-precise-list');
        if (geoListEl) {
            geoListEl.innerHTML = '';

            if (geoPrecise.coords) {
                const { latitude, longitude, accuracy, altitude, heading, speed } = geoPrecise.coords;

                const latLi = document.createElement('li');
                latLi.textContent = `Latitude: ${latitude.toFixed(6)}`;
                geoListEl.appendChild(latLi);

                const lonLi = document.createElement('li');
                lonLi.textContent = `Longitude: ${longitude.toFixed(6)}`;
                geoListEl.appendChild(lonLi);

                if (typeof accuracy === 'number') {
                    const accLi = document.createElement('li');
                    accLi.textContent = `Accuracy: ±${Math.round(accuracy)} m`;
                    geoListEl.appendChild(accLi);
                }

                if (typeof altitude === 'number') {
                    const altLi = document.createElement('li');
                    altLi.textContent = `Altitude: ${altitude.toFixed(1)} m`;
                    geoListEl.appendChild(altLi);
                }

                if (typeof speed === 'number' && !Number.isNaN(speed)) {
                    const speedLi = document.createElement('li');
                    speedLi.textContent = `Speed: ${speed.toFixed(2)} m/s`;
                    geoListEl.appendChild(speedLi);
                }

                if (typeof heading === 'number' && !Number.isNaN(heading)) {
                    const headingLi = document.createElement('li');
                    headingLi.textContent = `Heading: ${heading.toFixed(0)}°`;
                    geoListEl.appendChild(headingLi);
                }

                const timeLi = document.createElement('li');
                timeLi.textContent = `Timestamp: ${new Date(geoPrecise.timestamp || Date.now()).toLocaleString()}`;
                geoListEl.appendChild(timeLi);
            } else {
                const msgLi = document.createElement('li');
                msgLi.className = 'geo-list-empty';
                msgLi.textContent = geoPrecise.label || 'Precise location not available.';
                geoListEl.appendChild(msgLi);
                if (geoPrecise.error && geoPrecise.error !== geoPrecise.label) {
                    const errLi = document.createElement('li');
                    errLi.className = 'geo-list-note';
                    errLi.textContent = geoPrecise.error;
                    geoListEl.appendChild(errLi);
                }
            }

            const stateLi = document.createElement('li');
            stateLi.className = 'geo-list-note';
            stateLi.textContent = `Permission state: ${geoPrecise.state || 'unknown'}`;
            geoListEl.appendChild(stateLi);
        }

        const javaStatus = getJavaStatus();
        data.features.java = javaStatus;
        updateElement('java-enabled', javaStatus.label);

        const pluginNames = getPluginNames();
        data.features.plugins = {
            supported: pluginNames !== null,
            names: pluginNames || []
        };
        updateElement('plugins', formatPluginPreview(pluginNames));

        const pluginsListEl = document.getElementById('plugins-list');
        if (pluginsListEl) {
            pluginsListEl.innerHTML = '';
            if (pluginNames === null) {
                const li = document.createElement('li');
                li.className = 'plugin-list-empty';
                li.textContent = 'Plugin enumeration not supported in this browser.';
                pluginsListEl.appendChild(li);
            } else if (pluginNames.length === 0) {
                const li = document.createElement('li');
                li.className = 'plugin-list-empty';
                li.textContent = 'No legacy plugins detected.';
                pluginsListEl.appendChild(li);
            } else {
                pluginNames.forEach((name) => {
                    const li = document.createElement('li');
                    li.textContent = name;
                    pluginsListEl.appendChild(li);
                });
                const noteLi = document.createElement('li');
                noteLi.className = 'plugin-list-note';
                noteLi.textContent = `${pluginNames.length} plugin${pluginNames.length === 1 ? '' : 's'} detected.`;
                pluginsListEl.appendChild(noteLi);
            }
        }

        if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
            try {
                await document.fonts.ready;
            } catch (error) {
                // Ignore readiness errors; detection will fall back to other methods.
            }
        }

        const fontsInfo = detectFonts();
        data.features.fonts = fontsInfo;

        const fontsValue = fontsInfo.supported
            ? `${fontsInfo.available.length} / ${fontsInfo.totalTested} detected`
            : (fontsInfo.error || 'Not supported in this browser');
        updateElement('fonts', fontsValue);

        const fontsListEl = document.getElementById('fonts-installed-list');
        if (fontsListEl) {
            fontsListEl.innerHTML = '';

            if (fontsInfo.supported && fontsInfo.available.length) {
                fontsInfo.available.forEach((font) => {
                    const li = document.createElement('li');
                    li.textContent = font;
                    fontsListEl.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.className = 'font-list-empty';
                li.textContent = fontsInfo.supported
                    ? 'None detected from the tested list.'
                    : (fontsInfo.error || 'Font detection not supported.');
                fontsListEl.appendChild(li);
            }

            if (fontsInfo.supported) {
                const noteLi = document.createElement('li');
                noteLi.className = 'font-list-note';
                noteLi.textContent = `Tested ${fontsInfo.totalTested} common fonts.`;
                fontsListEl.appendChild(noteLi);
            }
        }

        const [adBlockDetected, canvasFingerprint, audioFingerprint, privateModeGuess] = await Promise.all([
            detectAdBlocker(),
            getCanvasFingerprint(),
            getAudioFingerprint(),
            detectPrivateMode()
        ]);

        data.fingerprints.canvas = canvasFingerprint;
        data.fingerprints.audio = audioFingerprint;
        data.fingerprints.adBlock = adBlockDetected;
        data.fingerprints.privateMode = privateModeGuess;

        if (typeof privateModeGuess.private === 'boolean') {
            data.privacy.privateMode = privateModeGuess.private;
        }
        data.privacy.privateModeSupported = !!privateModeGuess.supported;

        if (typeof buildAdInsights === 'function') {
            try {
                const adInsights = await buildAdInsights(data);
                data.advertising = adInsights;
                populateAdSection(adInsights, data);
            } catch (error) {
                console.warn('Failed to build advertising insights:', error);
                populateAdSection(null, data);
            }
        } else {
            populateAdSection(null, data);
        }

        return data;
    }

    async function refreshAdvertisingInsights(overrides = {}) {
        if (typeof buildAdInsights !== 'function' || !currentData) {
            return;
        }

        const contextOverrides = {};

        if (Object.prototype.hasOwnProperty.call(overrides, 'userText')) {
            currentData.context = currentData.context || {};
            currentData.context.userText = overrides.userText;
            contextOverrides.userText = overrides.userText;
        }

        try {
            const adInsights = await buildAdInsights(currentData, contextOverrides);
            currentData.advertising = adInsights;
            populateAdSection(adInsights, currentData);
        } catch (error) {
            console.warn('Failed to update advertising insights:', error);
        }
    }

    function handleContextInput(event) {
        if (!currentData) {
            return;
        }

        const value = event && event.target ? event.target.value : '';
        currentData.context = currentData.context || {};
        currentData.context.userText = value;

        if (contextUpdateTimer) {
            clearTimeout(contextUpdateTimer);
        }

        contextUpdateTimer = setTimeout(() => {
            refreshAdvertisingInsights({ userText: value });
        }, CONTEXT_UPDATE_DELAY);
    }

    // Generate human-readable summary
    function generateSummary(data) {
        const lines = [];
        lines.push('The Web Knows - Summary');
        lines.push(`Generated: ${new Date(data.timestamp).toLocaleString()}`);
        lines.push('');
        lines.push('NETWORK:');
        if (data.network.ipv4) lines.push(`  IPv4: ${data.network.ipv4}`);
        if (data.network.ipv6) lines.push(`  IPv6: ${data.network.ipv6}`);
        if (data.network.isp) lines.push(`  ISP: ${data.network.isp}`);
        if (data.network.city) lines.push(`  Location: ${[data.network.city, data.network.region, data.network.country].filter(Boolean).join(', ')}`);
        if (data.network.referrer) lines.push(`  Referrer: ${data.network.referrer}`);
        if (data.features && data.features.geolocation && data.features.geolocation.precise && data.features.geolocation.precise.coords) {
            const precise = data.features.geolocation.precise;
            const coords = precise.coords;
            const accuracyText = coords.accuracy ? ` (±${Math.round(coords.accuracy)} m)` : '';
            lines.push(`  Precise location: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}${accuracyText}`);
        }
        lines.push('');
        lines.push('BROWSER & DEVICE:');
        if (data.browser.browser) lines.push(`  Browser: ${data.browser.browser}`);
        if (data.browser.os) lines.push(`  OS: ${data.browser.os}`);
        if (data.browser.deviceType) lines.push(`  Device: ${data.browser.deviceType}`);
        if (data.browser.languages) lines.push(`  Languages: ${data.browser.languages.join(', ')}`);
        if (data.browser.timezone) lines.push(`  Timezone: ${data.browser.timezone}`);
        lines.push('');
        lines.push('SYSTEM:');
        if (data.system.cpuThreads) lines.push(`  CPU Threads: ${data.system.cpuThreads}`);
        if (data.system.ram) lines.push(`  RAM: ${formatDeviceMemory(data.system.ram)}`);
        if (data.system.graphics) lines.push(`  Graphics: ${data.system.graphics}`);
        lines.push('');
        lines.push('PRIVACY:');
        if (data.privacy.doNotTrack) lines.push(`  Do Not Track: ${data.privacy.doNotTrack === '1' ? 'Enabled' : 'Disabled'}`);
        if (data.privacy.globalPrivacyControl !== undefined) lines.push(`  Global Privacy Control: ${data.privacy.globalPrivacyControl ? 'Enabled' : 'Not set'}`);
        if (data.privacy.cookiesEnabled !== undefined) lines.push(`  Cookies: ${data.privacy.cookiesEnabled ? 'Enabled' : 'Disabled'}`);
        if (data.advertising && Array.isArray(data.advertising.categories)) {
            lines.push('');
            lines.push('ADVERTISING INSIGHTS:');
            const matched = data.advertising.categories
                .filter((cat) => {
                    if (typeof cat.norm === 'number') {
                        return cat.norm >= 20;
                    }
                    if (typeof cat.score === 'number') {
                        return cat.score > 0;
                    }
                    return false;
                })
                .map(cat => cat.label);
            lines.push(`  Matched categories: ${matched.length ? matched.join(', ') : 'None'}`);
            if (data.advertising.summary) {
                lines.push(`  Summary: ${data.advertising.summary.split('\n')[0]}`);
            }
            if (data.advertising.signals && Array.isArray(data.advertising.signals.topics)) {
                const topics = data.advertising.signals.topics;
                lines.push(`  Chrome Topics: ${topics.length ? topics.map(t => `id:${t.topic}`).join(', ') : 'Not available'}`);
            }
        }
        return lines.join('\n');
    }

    // Download JSON
    function downloadJSON(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `thewebknows-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Copy summary to clipboard
    async function copySummary(data) {
        const summary = generateSummary(data);
        try {
            await navigator.clipboard.writeText(summary);
            const btn = document.getElementById('copy-summary-btn');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = original;
                }, 2000);
            }
        } catch (e) {
            alert('Failed to copy to clipboard. Please copy manually.');
        }
    }

    const CONTEXT_UPDATE_DELAY = 250;
    // Store current data
    let currentData = null;
    let contextUpdateTimer = null;

    // Theme Management
    const THEME_STORAGE_KEY = 'thewebknows-theme';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(mode, save = false) {
        const body = document.body;
        if (!body) return;
        
        body.setAttribute('data-mode', mode);
        
        if (save) {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, mode);
            } catch (e) {
                console.warn('Failed to save theme preference:', e);
            }
        }
        
        // Update toggle button
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            const label = toggle.querySelector('.theme-toggle__label');
            if (label) {
                label.textContent = mode === 'dark' ? 'Light' : 'Dark';
            }
            toggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
            toggle.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    function initializeTheme() {
        let mode = 'light';
        
        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            if (stored === 'dark' || stored === 'light') {
                mode = stored;
            } else {
                // Use system preference if no stored preference
                mode = prefersDark.matches ? 'dark' : 'light';
            }
        } catch (e) {
            // If localStorage fails, use system preference
            mode = prefersDark.matches ? 'dark' : 'light';
        }
        
        applyTheme(mode, false);
    }

    function initializeHeaderCollapse() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const DOWN_THRESHOLD = 40;
        const UP_THRESHOLD = 10;
        let collapseEnabled = false;
        let isCollapsed = false;
        let ticking = false;
        let resizeTimer = null;

        const setCollapsed = value => {
            if (isCollapsed === value) return;
            isCollapsed = value;
            header.classList.toggle('header--collapsed', value);
        };

        const evaluateScroll = scrollY => {
            if (!collapseEnabled) return;
            if (scrollY > DOWN_THRESHOLD) {
                setCollapsed(true);
            } else if (scrollY <= UP_THRESHOLD) {
                setCollapsed(false);
            }
        };

        const handleScroll = () => {
            if (!collapseEnabled) return;
            const currentY = window.scrollY || window.pageYOffset || 0;
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(() => {
                    evaluateScroll(currentY);
                    ticking = false;
                });
            }
        };

        const evaluateActivation = () => {
            collapseEnabled = mediaQuery.matches;
            if (!collapseEnabled) {
                setCollapsed(false);
                return;
            }
            evaluateScroll(window.scrollY || window.pageYOffset || 0);
        };

        const handleMediaChange = () => {
            evaluateActivation();
        };

        const handleResize = () => {
            if (resizeTimer) {
                window.clearTimeout(resizeTimer);
            }
            resizeTimer = window.setTimeout(evaluateActivation, 180);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleMediaChange);
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handleMediaChange);
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', evaluateActivation);

        evaluateActivation();
    }

    // Populate explanations for info items
    function populateExplanations() {
        if (typeof EXPLANATIONS === 'undefined') return;
        
        Object.keys(EXPLANATIONS).forEach(key => {
            const exp = EXPLANATIONS[key];
            const updateField = (suffix, text) => {
                const el = document.getElementById(`${key}-${suffix}`);
                if (el) el.textContent = text || '—';
            };
            
            updateField('explanation', exp.what);
            updateField('legal', exp.legal);
            updateField('malicious', exp.malicious);
            updateField('accuracy', exp.accuracy);
            updateField('hide', exp.hide);
        });
    }

    function renderBehavioralLeaks() {
        const container = document.getElementById('behavioral-leaks');
        if (!container) return;

        const combined = [];

        const hiddenShares = (typeof HIDDEN_SHARES !== 'undefined' && Array.isArray(HIDDEN_SHARES)) ? HIDDEN_SHARES : [];
        const everydayLeaks = (typeof EVERYDAY_LEAKS !== 'undefined' && Array.isArray(EVERYDAY_LEAKS)) ? EVERYDAY_LEAKS : [];

        hiddenShares.forEach(share => {
            combined.push({
                id: share.id,
                title: share.type,
                details: [
                    { label: 'How it leaks', text: share.innocentShare },
                    { label: 'Misuse risk', text: share.maliciousUse },
                    { label: 'Protect', text: share.protection },
                    { label: 'Example', text: share.example }
                ]
            });
        });

        everydayLeaks.forEach(leak => {
            combined.push({
                id: leak.id,
                title: leak.title,
                details: [
                    { label: 'How it leaks', text: leak.how },
                    { label: 'Reduce risk', text: leak.reduce }
                ]
            });
        });

        container.textContent = '';

        combined.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'info-item leak-item';
            card.setAttribute('data-leak-id', entry.id);
            card.setAttribute('role', 'listitem');

            const label = document.createElement('div');
            label.className = 'info-label';
            label.textContent = entry.title;
            card.appendChild(label);

            const detailsWithContent = Array.isArray(entry.details)
                ? entry.details.filter(detail => detail && detail.text)
                : [];

            const primaryDetail = detailsWithContent[0];

            if (primaryDetail) {
                const value = document.createElement('div');
                value.className = 'info-value leak-item__value';

                const valueLabel = document.createElement('span');
                valueLabel.className = 'leak-item__value-label';
                valueLabel.textContent = primaryDetail.label;
                value.appendChild(valueLabel);

                const valueText = document.createElement('p');
                valueText.className = 'leak-item__value-text';
                valueText.textContent = primaryDetail.text;
                value.appendChild(valueText);

                card.appendChild(value);
            } else {
                const value = document.createElement('div');
                value.className = 'info-value leak-item__value';
                value.textContent = '—';
                card.appendChild(value);
            }

            const remainingDetails = primaryDetail
                ? detailsWithContent.slice(1)
                : detailsWithContent;

            if (remainingDetails.length > 0) {
                const details = document.createElement('details');
                details.className = 'info-explanation-collapsible';

                const summary = document.createElement('summary');
                summary.className = 'leak-item__summary';
                summary.append(document.createTextNode('Learn More'));

                const icon = document.createElement('span');
                icon.className = 'collapse-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.textContent = '+';
                summary.appendChild(icon);

                details.appendChild(summary);

                const explanation = document.createElement('div');
                explanation.className = 'info-explanation';

                remainingDetails.forEach(detail => {
                    const heading = document.createElement('h4');
                    heading.textContent = detail.label;
                    explanation.appendChild(heading);

                    const paragraph = document.createElement('p');
                    paragraph.textContent = detail.text;
                    explanation.appendChild(paragraph);
                });

                details.appendChild(explanation);
                card.appendChild(details);
            }

            container.appendChild(card);
        });
    }

    // Initialize
    async function init() {
        // Initialize theme first
        initializeTheme();
        
        cacheDefaultHelpText();
        setInitialLoadingStates();

        // Populate explanations
        populateExplanations();
        renderBehavioralLeaks();

        initializeHeaderCollapse();
        
        // Setup theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentMode = document.body.getAttribute('data-mode') || 'light';
                const newMode = currentMode === 'dark' ? 'light' : 'dark';
                applyTheme(newMode, true);
            });
        }
        // Collect data on load
        currentData = await collectData();

        const contextInputEl = document.getElementById('ad-context-input');
        if (contextInputEl) {
            contextInputEl.addEventListener('input', handleContextInput);
        }

        // Setup buttons
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

