/**
 * Lightweight language manager - English only.
 * Applies English locale metadata.
 */
(function (global) {
    const DEFAULT_LANGUAGE = 'en-GB';

    const metadata = global.LANGUAGE_METADATA || {};
    const rtlCodes = new Set(global.RTL_LANGUAGE_CODES || []);

    function applyLanguage() {
        const langMetadata = metadata[DEFAULT_LANGUAGE] || {};

        document.documentElement.setAttribute('lang', langMetadata.htmlLang || 'en-GB');
        document.documentElement.setAttribute('dir', langMetadata.direction || 'ltr');
        document.body.classList.toggle('is-rtl', rtlCodes.has(DEFAULT_LANGUAGE));
        document.body.setAttribute('data-language', DEFAULT_LANGUAGE);
    }

    function initialise() {
        applyLanguage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialise);
    } else {
        initialise();
    }
})(typeof window !== 'undefined' ? window : globalThis);


