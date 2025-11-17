# JavaScript Text Injection Summary

This document lists all sections on the main page that receive JavaScript text injection and which scripts populate them.

## Scripts Involved

1. **`app.js`** - Main application script that populates most data values and coordinates explanation loading
2. **`explanations.js`** - Contains explanation text data (loaded dynamically by `app.js`)
3. **`ad_insights.js`** - Handles advertising insights (if applicable)

---

## 1. Network Section

**Script:** `app.js` (function `y()`)

### Main Values (populated via `l()` function):
- `id="ipv4"` - Public IPv4 address
- `id="ipv6"` - Public IPv6 address  
- `id="isp"` - ISP and ASN information
- `id="location"` - IP-based location (city, region, country)
- `id="referrer"` - HTTP referrer header
- `id="network-type"` - Network type guess (residential/VPN/data-center)
- `id="reverse-dns"` - Reverse DNS hostname

### Explanation Texts (populated from `explanations.js` via `app.js`):
- `id="ipv4-explanation"`, `ipv4-legal`, `ipv4-malicious`, `ipv4-accuracy`, `ipv4-hide`
- `id="ipv6-explanation"`, `ipv6-legal`, `ipv6-malicious`, `ipv6-accuracy`, `ipv6-hide`
- `id="isp-explanation"`, `isp-legal`, `isp-malicious`, `isp-accuracy`, `isp-hide`
- `id="location-explanation"`, `location-legal`, `location-malicious`, `location-accuracy`, `location-hide`
- `id="referrer-explanation"`, `referrer-legal`, `referrer-malicious`, `referrer-accuracy`, `referrer-hide`
- `id="network-type-explanation"`, `network-type-legal`, `network-type-malicious`, `network-type-accuracy`, `network-type-hide`
- `id="reverse-dns-explanation"`, `reverse-dns-legal`, `reverse-dns-malicious`, `reverse-dns-accuracy`, `reverse-dns-hide`

---

## 2. Browser & Device Section

**Script:** `app.js` (function `y()`)

### Main Values:
- `id="browser"` - Browser name and version
- `id="os"` - Operating system
- `id="languages"` - Preferred languages
- `id="timezone"` - Time zone with UTC offset
- `id="local-time"` - Local time (updates every second)
- `id="device-type"` - Device type (Phone/Tablet/Desktop)
- `id="screen-size"` - Screen dimensions
- `id="viewport"` - Viewport dimensions
- `id="pixel-ratio"` - Device pixel ratio
- `id="color-depth"` - Color depth in bits

### Explanation Texts:
- `id="browser-explanation"`, `browser-legal`, `browser-malicious`, `browser-accuracy`, `browser-hide`
- `id="os-explanation"`, `os-legal`, `os-malicious`, `os-accuracy`, `os-hide`
- `id="languages-explanation"`, `languages-legal`, `languages-malicious`, `languages-accuracy`, `languages-hide`
- `id="timezone-explanation"`, `timezone-legal`, `timezone-malicious`, `timezone-accuracy`, `timezone-hide`
- `id="local-time-explanation"`, `local-time-legal`, `local-time-malicious`, `local-time-accuracy`, `local-time-hide`
- `id="device-type-explanation"`, `device-type-legal`, `device-type-malicious`, `device-type-accuracy`, `device-type-hide`
- `id="screen-size-explanation"`, `screen-size-legal`, `screen-size-malicious`, `screen-size-accuracy`, `screen-size-hide`
- `id="viewport-explanation"`, `viewport-legal`, `viewport-malicious`, `viewport-accuracy`, `viewport-hide`
- `id="pixel-ratio-explanation"`, `pixel-ratio-legal`, `pixel-ratio-malicious`, `pixel-ratio-accuracy`, `pixel-ratio-hide`
- `id="color-depth-explanation"`, `color-depth-legal`, `color-depth-malicious`, `color-depth-accuracy`, `color-depth-hide`

---

## 3. System Section

**Script:** `app.js` (function `y()`)

### Main Values:
- `id="cpu-threads"` - CPU thread count
- `id="ram"` - RAM estimate
- `id="graphics"` - Graphics hardware information

### Explanation Texts:
- `id="cpu-threads-explanation"`, `cpu-threads-legal`, `cpu-threads-malicious`, `cpu-threads-accuracy`, `cpu-threads-hide`
- `id="ram-explanation"`, `ram-legal`, `ram-malicious`, `ram-accuracy`, `ram-hide`
- `id="graphics-explanation"`, `graphics-legal`, `graphics-malicious`, `graphics-accuracy`, `graphics-hide`

---

## 4. Peripherals & Features Section

**Script:** `app.js` (function `y()`)

### Main Values:
- `id="microphones"` - Microphone count
- `id="speakers"` - Audio output count
- `id="webcams"` - Camera count
- `id="geolocation-support"` - Geolocation API availability
- `id="geolocation-precise"` - Precise geolocation (if permission granted)
- `id="touch-support"` - Touch support detection
- `id="pointer-support"` - Pointer input type
- `id="java-enabled"` - Java plugin status
- `id="plugins"` - Browser plugins list

### Dynamic Lists:
- `id="geolocation-precise-list"` - List of precise location coordinates (latitude, longitude, accuracy, etc.)
- `id="plugins-list"` - List of detected browser plugins

### Explanation Texts:
- `id="microphones-explanation"`, `microphones-legal`, `microphones-malicious`, `microphones-accuracy`, `microphones-hide`
- `id="speakers-explanation"`, `speakers-legal`, `speakers-malicious`, `speakers-accuracy`, `speakers-hide`
- `id="webcams-explanation"`, `webcams-legal`, `webcams-malicious`, `webcams-accuracy`, `webcams-hide`
- `id="geolocation-support-explanation"`, `geolocation-support-legal`, `geolocation-support-malicious`, `geolocation-support-accuracy`, `geolocation-support-hide`
- `id="geolocation-precise-explanation"`, `geolocation-precise-legal`, `geolocation-precise-malicious`, `geolocation-precise-accuracy`, `geolocation-precise-hide`
- `id="touch-support-explanation"`, `touch-support-legal`, `touch-support-malicious`, `touch-support-accuracy`, `touch-support-hide`
- `id="pointer-support-explanation"`, `pointer-support-legal`, `pointer-support-malicious`, `pointer-support-accuracy`, `pointer-support-hide`
- `id="java-enabled-explanation"`, `java-enabled-legal`, `java-enabled-malicious`, `java-enabled-accuracy`, `java-enabled-hide`
- `id="plugins-explanation"`, `plugins-legal`, `plugins-malicious`, `plugins-accuracy`, `plugins-hide`

---

## 5. Connection Section

**Script:** `app.js` (function `y()`)

### Main Values:
- `id="connection-type"` - Connection type (Wi-Fi/mobile/wired)
- `id="effective-type"` - Effective connection type (2g/3g/4g/etc.)
- `id="downlink"` - Download speed estimate
- `id="rtt"` - Round-trip time
- `id="save-data"` - Data saver mode status

### Explanation Texts:
- `id="connection-type-explanation"`, `connection-type-legal`, `connection-type-malicious`, `connection-type-accuracy`, `connection-type-hide`
- `id="effective-type-explanation"`, `effective-type-legal`, `effective-type-malicious`, `effective-type-accuracy`, `effective-type-hide`
- `id="downlink-explanation"`, `downlink-legal`, `downlink-malicious`, `downlink-accuracy`, `downlink-hide`
- `id="rtt-explanation"`, `rtt-legal`, `rtt-malicious`, `rtt-accuracy`, `rtt-hide`
- `id="save-data-explanation"`, `save-data-legal`, `save-data-malicious`, `save-data-accuracy`, `save-data-hide`

---

## 6. Privacy Signals Section

**Script:** `app.js` (function `y()`)

### Main Values:
- `id="dnt"` - Do Not Track status
- `id="gpc"` - Global Privacy Control status
- `id="cookies"` - Cookies enabled status
- `id="local-storage"` - Local storage availability
- `id="dark-mode"` - Dark mode preference
- `id="reduced-motion"` - Reduced motion preference

### Explanation Texts:
- `id="dnt-explanation"`, `dnt-legal`, `dnt-malicious`, `dnt-accuracy`, `dnt-hide`
- `id="gpc-explanation"`, `gpc-legal`, `gpc-malicious`, `gpc-accuracy`, `gpc-hide`
- `id="cookies-explanation"`, `cookies-legal`, `cookies-malicious`, `cookies-accuracy`, `cookies-hide`
- `id="local-storage-explanation"`, `local-storage-legal`, `local-storage-malicious`, `local-storage-accuracy`, `local-storage-hide`
- `id="dark-mode-explanation"`, `dark-mode-legal`, `dark-mode-malicious`, `dark-mode-accuracy`, `dark-mode-hide`
- `id="reduced-motion-explanation"`, `reduced-motion-legal`, `reduced-motion-malicious`, `reduced-motion-accuracy`, `reduced-motion-hide`

---

## How It Works

### Main Data Population (`app.js`)
1. The `y()` function (async) collects all device/browser/network information
2. The `l(id, value, helpText)` function updates elements by ID:
   ```javascript
   l("ipv4", "192.0.2.1", "Optional help text")
   ```
3. Elements with `aria-live="polite"` are updated for accessibility

### Explanation Text Population (`explanations.js` + `app.js`)
1. `explanations.js` exports an `EXPLANATIONS` object with keys like `ipv4`, `browser`, etc.
2. Each key contains: `what`, `legal`, `malicious`, `accuracy`, `hide`
3. `app.js` loads `explanations.js` dynamically and applies text via `__applyExplanations()`:
   ```javascript
   // For each key in EXPLANATIONS:
   document.getElementById("ipv4-explanation").textContent = EXPLANATIONS.ipv4.what
   document.getElementById("ipv4-legal").textContent = EXPLANATIONS.ipv4.legal
   // etc.
   ```
4. Explanations are loaded:
   - On demand when user clicks "Learn More"
   - Via `requestIdleCallback` or after 2 seconds timeout
   - When details element is toggled open

### Special Cases
- **`local-time`**: Updates every second via `setInterval`
- **`geolocation-precise-list`**: Dynamically populated with `<li>` elements if permission granted
- **`plugins-list`**: Dynamically populated with `<li>` elements for each detected plugin
- **Font detection**: Results stored but no visible element in current HTML (may be used elsewhere)

---

## Summary Statistics

- **Total main value elements**: ~40
- **Total explanation text elements**: ~200 (40 items × 5 explanation fields each)
- **Dynamic list elements**: 2 (geolocation-precise-list, plugins-list)
- **Primary script**: `app.js` (handles all data collection and DOM updates)
- **Secondary script**: `explanations.js` (provides explanation text data)
- **Tertiary script**: `ad_insights.js` (advertising insights, if applicable)

