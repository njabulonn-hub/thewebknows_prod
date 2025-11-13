/**
 * Language metadata - English only.
 * Provides labels, locale codes, directionality, and URL segments.
 */
(function (global) {
    const LANGUAGE_METADATA = Object.freeze({
        'en-GB': { label: 'English', urlSegment: 'en', htmlLang: 'en-GB', direction: 'ltr' }
    });

    const SUPPORTED_LANGUAGE_CODES = Object.freeze(Object.keys(LANGUAGE_METADATA));

    const LANGUAGE_URL_SEGMENTS = Object.freeze(
        Object.fromEntries(SUPPORTED_LANGUAGE_CODES.map((code) => [code, LANGUAGE_METADATA[code].urlSegment]))
    );

    const URL_SEGMENT_TO_LANGUAGE_CODE = Object.freeze(
        Object.fromEntries(SUPPORTED_LANGUAGE_CODES.map((code) => [LANGUAGE_METADATA[code].urlSegment.toLowerCase(), code]))
    );

    const RTL_LANGUAGE_CODES = Object.freeze([]);

    global.LANGUAGE_METADATA = LANGUAGE_METADATA;
    global.SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGE_CODES;
    global.LANGUAGE_URL_SEGMENTS = LANGUAGE_URL_SEGMENTS;
    global.URL_SEGMENT_TO_LANGUAGE_CODE = URL_SEGMENT_TO_LANGUAGE_CODE;
    global.RTL_LANGUAGE_CODES = RTL_LANGUAGE_CODES;
})(typeof window !== 'undefined' ? window : globalThis);


