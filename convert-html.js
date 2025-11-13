// Helper script to generate HTML structure for info items
// This is a reference - actual conversion done manually in index.html

function generateInfoItemHTML(id, label) {
    return `
            <div class="info-item">
                <div class="info-header">
                    <span class="info-label">${label}</span>
                    <span class="info-value" aria-live="polite" id="${id}">—</span>
                </div>
                <details class="info-expanded">
                    <summary>Learn more about this</summary>
                    <div class="info-explanation">
                        <h4>What is this?</h4>
                        <p id="${id}-explanation">—</p>
                        <h4>How is it used legally?</h4>
                        <p id="${id}-legal">—</p>
                        <h4>How could it be used maliciously?</h4>
                        <p id="${id}-malicious">—</p>
                        <h4>Is this accurate?</h4>
                        <p id="${id}-accuracy">—</p>
                        <h4>Can I hide this?</h4>
                        <p id="${id}-hide">—</p>
                    </div>
                </details>
            </div>`;
}

// Items to convert:
const items = [
    { id: 'ipv6', label: 'Public IP (IPv6)' },
    { id: 'isp', label: 'ISP / ASN' },
    { id: 'location', label: 'Location (IP-based)' },
    { id: 'referrer', label: 'Referrer' },
    { id: 'network-type', label: 'Network type (guess)' },
    { id: 'reverse-dns', label: 'Reverse DNS' },
    { id: 'browser', label: 'Browser & version' },
    { id: 'os', label: 'Operating system' },
    { id: 'languages', label: 'Preferred languages' },
    { id: 'timezone', label: 'Time zone' },
    { id: 'local-time', label: 'Local time' },
    { id: 'device-type', label: 'Device type' },
    { id: 'screen-size', label: 'Screen size' },
    { id: 'viewport', label: 'Viewport' },
    { id: 'pixel-ratio', label: 'Pixel ratio' },
    { id: 'color-depth', label: 'Color depth' },
    { id: 'cpu-threads', label: 'CPU threads' },
    { id: 'ram', label: 'RAM estimate' },
    { id: 'graphics', label: 'Graphics' },
    { id: 'connection-type', label: 'Connection type' },
    { id: 'effective-type', label: 'Effective type' },
    { id: 'downlink', label: 'Download speed' },
    { id: 'rtt', label: 'Round-trip time' },
    { id: 'save-data', label: 'Data saver mode' },
    { id: 'dnt', label: 'Do Not Track' },
    { id: 'gpc', label: 'Global Privacy Control' },
    { id: 'cookies', label: 'Cookies enabled' },
    { id: 'local-storage', label: 'Local storage' },
    { id: 'dark-mode', label: 'Dark mode preference' },
    { id: 'reduced-motion', label: 'Reduced motion' }
];

items.forEach(item => {
    console.log(generateInfoItemHTML(item.id, item.label));
});

