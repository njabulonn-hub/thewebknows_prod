# The Web Knows

A fast, privacy-first static site that shows—in plain English—the common information a website can know about a visitor **without any extra permissions** (no GPS/mic/cam/login). Everything runs client-side, and the experience is now funded by carefully reviewed advertising partners.

## Features

- **Privacy-first diagnostics**: The core scan renders locally without sending your results to us. Minimal server logging and privacy-reviewed ad partners keep the project sustainable.
- **Performance**: Total JS ≤ 50 KB, CSS ≤ 12 KB, no frameworks or external fonts.
- **Accessibility**: Semantic HTML, keyboard friendly, high contrast, `aria-live` for dynamic values.
- **Plain English**: Designed for everyday, non-technical users.

## Files

All files are in the root directory:

- `index.html` — Main page with data collection and display
- `styles.css` — All styling (under 12 KB)
- `app.js` — All JavaScript logic (under 50 KB)
- `privacy/` — Privacy policy (`index.html`)
- `about/` — About page (`index.html`)
- `insights/` — Privacy guides hub and article directories
- `glossary/` — Glossary hub (`index.html`)
- `robots.txt` — Search engine directives
- `sitemap.xml` — Sitemap for search engines
- `favicon.svg` — SVG favicon
- `favicon.ico` — ICO favicon
- `og-image.png` — Open Graph image (to be created)

## Running Locally

Run a static server from the project root (for example `npx serve`) and visit the reported URL. Links are root-relative, matching the production deployment at `https://thewebknows.pages.dev/`.

## Security Headers

The site includes the following security headers:

- **Content-Security-Policy**: Restricts resources to prevent XSS attacks. Only allows connections to necessary API endpoints.
- **Referrer-Policy**: `strict-origin-when-cross-origin` — Limits referrer information shared.
- **Permissions-Policy**: Disables geolocation, camera, and microphone permissions.
- **X-Content-Type-Options**: `nosniff` — Prevents MIME type sniffing.

### Example CSP

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.ipify.org https://api64.ipify.org https://ipapi.co https://ipinfo.io https://dns.google; font-src 'self' data:; base-uri 'self'; form-action 'self';" />
```

This CSP:
- Allows scripts and styles from the same origin (with `unsafe-inline` for simplicity)
- Allows images from same origin, data URIs, and HTTPS
- Allows connections only to the specific API endpoints needed
- Restricts base URI and form actions to same origin
- Forbids framing when sent as an HTTP response header; note that browsers ignore `frame-ancestors` in `<meta http-equiv>` tags, so managed hosting should set this directive via headers instead

## Data Collection

The site collects the following information (all client-side):

### Network
- Public IP (IPv4 and IPv6)
- ISP / ASN
- Country / Region / City (IP-based, approximate)
- Reverse DNS (PTR)
- Referrer
- Network type guess (home/office vs data-center/VPN)

### Browser & Device
- Browser and version
- Operating system
- Preferred languages
- Time zone and local time
- Device type (phone/tablet/desktop)
- Screen size and viewport
- Pixel ratio and color depth

### System
- CPU threads
- RAM estimate (if available)
- Graphics information (WebGL)

### Connection
- Connection type
- Effective type (e.g., "4G")
- Download speed (Mbps)
- Round-trip time (ms)
- Data saver mode

### Privacy Signals
- Do Not Track preference
- Global Privacy Control
- Cookies enabled
- Local storage available
- Dark mode preference
- Reduced motion preference

## Third-Party Services

The site uses the following third-party APIs:

- **ipify.org** — IP address lookup (IPv4 and IPv6)
- **ipapi.co** — ISP and location information (primary)
- **ipinfo.io** — ISP and location information (fallback)
- **dns.google** — Reverse DNS (PTR) lookups

These services may log requests according to their own privacy policies. We have no control over their data collection practices.

## Performance Targets

- **LCP** (Largest Contentful Paint): ≤ 2.5s
- **INP** (Interaction to Next Paint): ≤ 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Browser Support

Works in current versions of:
- Chrome/Edge
- Firefox
- Safari
- Other modern browsers with ES6+ support

Graceful degradation where APIs are absent (e.g., `navigator.deviceMemory`, `navigator.connection`).

## License

This project is open source and available for use.

## Domain

Designed for **thewebknows.com** but can be run on any domain or locally.


