# Learn More Section - Complete Content Review

This document contains all the information from the "Learn More" sections organized by category for easy review.

---

## 01. Network Section

### Public IP (IPv4)

**What is a public IPv4 Address?**
It's your network's unique identifier on the internet, like your home's street address for online traffic. It's a set of four numbers (e.g., 192.0.2.1) that allows data to find its way to you.

**How is your Public IP Address used legitimately?**
Websites use it to provide location-specific content, detect fraudulent activity, and ensure your connection routes correctly.

**How could your Public IP Address be used maliciously?**
It can be combined with other data to approximate your location, track your online activity, or target you with attacks.

**Is this accurate?**
This value is known because it is the exact IPv4 address your connection broadcasts to every site you visit.

**Can I hide my Public IP Address?**
Yes, by using a trustworthy VPN or proxy service, which will show its own address instead of yours.

---

### Public IP (IPv6)

**What is a public IPv6 Address?**
This is the newer format for internet addresses, designed because the old system is running out of unique numbers. It's longer and more complex (e.g., 2001:0db8::).

**How is your Public IPv6 Address used legitimately?**
It serves the same purpose as an IPv4 address but can support the vast number of modern connected devices.

**How could your Public IPv6 Address be used maliciously?**
If exposed, it can be used for tracking and targeting, similar to an IPv4 address.

**Is this accurate?**
This is known when your ISP enables IPv6. If nothing appears, your provider is not broadcasting IPv6 to the web.

**Can I hide my Public IPv6 Address?**
Use a VPN that supports IPv6, or disable IPv6 in your device or router settings.

---

### ISP / ASN

**What are your ISP and ASN?**
Your ISP (Internet Service Provider) is your internet company (e.g., Comcast). The ASN is the identifier for the specific network your ISP uses to route your traffic.

**How are your ISP and ASN used legitimately?**
Websites use this to comply with regional content laws, optimize your connection, and perform security checks.

**How could your ISP and ASN be used maliciously?**
It can reveal your general location and internet provider, which can be combined with other data to profile you.

**Is this accurate?**
This information is known and drawn from public routing databases that map IP ranges to ISPs.

**Can I hide my ISP or ASN?**
A VPN will mask your real ISP and show its own information instead.

---

### Location (IP-based)

**What is your IP-based location?**
This is an educated guess of your geographic location based on your IP address. It's typically accurate to the city level, but not to your precise address.

**How is your IP-based location used legitimately?**
Websites use it to show local content, such as news, weather, and language settings.

**How could your IP-based location be used maliciously?**
It can reveal your general area, which might be sensitive depending on your circumstances.

**Is this accurate?**
This is inferred from commercial geolocation databases and can be wrong, especially when you use VPNs or corporate routes.

**Can I hide my IP-based location?**
A VPN can make it appear you are in a different location.

---

### Referrer

**What is your referrer?**
This is the web address of the page you were on before clicking a link to the current site. It tells a site where you came from.

**How is your referrer used legitimately?**
Websites use it for analytics to understand their traffic sources and to pay affiliates for referrals.

**How could your referrer be used maliciously?**
It can sometimes expose private information, like search terms you used, revealing your browsing habits.

**Is this accurate?**
Referrer values are known because browsers send them automatically unless a privacy control removes the header.

**Can I hide your referrer?**
Yes, most browsers and privacy extensions can block referrer information.

---

### Network type (guess)

**What does your network type guess mean?**
This is an inference about whether you're on a home connection, mobile data, or a data center (which often hosts VPNs).

**How is your network type guess used legitimately?**
Services use it for security, like triggering extra checks for traffic that appears to come from an anonymous data center.

**How could your network type guess be used maliciously?**
It can flag you as a VPN user, which some services try to block.

**Is this accurate?**
This is an educated guess based on naming patterns and may mislabel niche or newly announced networks.

**Can I change my network type guess?**
You would need to switch to a different network or use a VPN that mimics a residential connection.

---

### Reverse DNS

**What is your reverse DNS hostname?**
This is a lookup that converts your IP address into a readable hostname, like a phone book for the internet.

**How is your reverse DNS hostname used legitimately?**
It's used for email security and by network administrators to troubleshoot issues.

**How could your reverse DNS hostname be used maliciously?**
It can reveal information about your ISP or network setup.

**Is this accurate?**
It is known only if your ISP publishes a reverse DNS record; many residential IPs do not have one.

**Can I hide my reverse DNS hostname?**
You cannot change it directly, but a VPN will show the VPN provider's hostname instead.

---

## 02. Browser & Device Section

### Browser & version

**What is your browser and version?**
This identifies the specific web browser you are using (e.g., Chrome 121) and its version number.

**How is your browser information used legitimately?**
Websites use it to ensure compatibility and display content correctly. They may also warn users with outdated, insecure versions.

**How could your browser information be used maliciously?**
Hackers can target known security flaws in specific browser versions.

**Is this accurate?**
This is KNOWN because your browser reports it, unless a privacy tool rewrites the string. Modern browsers may provide high-entropy hints only to trusted origins using User-Agent Client Hints negotiation.

**Can I hide my browser information?**
Extensions can mask it, but this may cause websites to display incorrectly.

---

### Operating system

**What is your operating system?**
This is the core software that runs your device, such as Windows, macOS, Android, or iOS.

**How is your operating system information used legitimately?**
Websites use it to provide the correct software downloads and ensure features work properly.

**How could your operating system information be used maliciously?**
Attackers can tailor scams or malware to your specific system.

**Is this accurate?**
This is KNOWN because your browser shares it, and even when spoofed many sites can still guess correctly using feature detection and TLS fingerprinting.

**Can I hide my operating system information?**
Privacy tools can mask it, but this can confuse websites and break functionality.

---

### Preferred languages

**What are your preferred languages?**
These are the languages you've set as preferred in your browser settings (e.g., English, Spanish).

**How are your preferred languages used legitimately?**
Websites use them to automatically show content in your language.

**How could your preferred languages be used maliciously?**
They can be used as a data point to infer your location or cultural background.

**Is this accurate?**
This is KNOWN because it comes straight from your browser settings. Developers know that HTTP negotiation falls back through the language list until a supported locale is found.

**Can I hide your preferred languages?**
You can change your browser's language list, but this will affect every site you visit.

---

### Time zone

**What is your time zone?**
This is the time zone setting from your device.

**How is your time zone used legitimately?**
Websites use it to display accurate times for events, schedules, and posts.

**How could your time zone be used maliciously?**
Combined with other data, it can help confirm your geographic region.

**Is this accurate?**
This is KNOWN because it comes from your device clock. Programmers often treat it as the browser's resolved IANA timezone name, which updates automatically as you travel.

**Can I hide your time zone?**
You can change your device's time zone, but this will affect all other apps and clocks on your device.

---

### Local time

**What is your local time?**
This is the current time according to your device.

**How is your local time used legitimately?**
Websites use it for accurate timestamps and scheduling.

**How could your local time be used maliciously?**
It can help build a profile of your active hours online.

**Is this accurate?**
This is KNOWN and calculated directly from your timezone settings, though skewed system clocks can throw it off. Engineers sync devices with NTP or chrony to keep offsets within milliseconds.

**Can I hide your local time?**
Only by changing your device's clock, which is not practical.

---

### Device type

**What is your device type?**
This is an estimate of whether you're using a phone, tablet, or computer.

**How is your device type used legitimately?**
Websites use it to switch to a layout that fits your screen size.

**How could your device type be used maliciously?**
It's one of many data points used for tracking and fingerprinting.

**Is this accurate?**
This is GUESSED and can be fooled by unusual screen setups or developer tools. It typically uses heuristics like pointer precision, screen diagonal, and hardware concurrency.

**Can I hide your device type?**
Spoofing it can make sites show the wrong layout, so it's not generally recommended.

---

### Screen size

**What is your screen size?**
This is the total pixel dimensions of your display.

**How is your screen size used legitimately?**
Websites use it to send images and layouts that fit your screen properly.

**How could your screen size be used maliciously?**
Unique screen sizes are a strong identifier for browser fingerprinting.

**Is this accurate?**
This is KNOWN because your browser reports the real size unless you are faking it, though multi-monitor scaling can cause subtle shifts. Front-end engineers account for devicePixelRatio and OS scaling when interpreting results.

**Can I hide your screen size?**
Changing it with tools can break website layouts.

---

### Viewport

**What is your viewport size?**
This is the current size of your browser window, which changes if you resize it.

**How is your viewport size used legitimately?**
Websites adjust their layout in real-time to fit your current window size.

**How could your viewport size be used maliciously?**
Like screen size, it's a factor in browser fingerprinting.

**Is this accurate?**
This is KNOWN and updates in real time as you resize, sourced from the rendering engine's layout tree. Developers use ResizeObserver and matchMedia to react to the same numbers.

**Can I hide your viewport size?**
Spoofing it can cause overlapping content or missing buttons.

---

### Pixel ratio

**What is your device pixel ratio?**
This indicates how sharp your screen is. A higher number means a sharper, high-resolution display.

**How is your device pixel ratio used legitimately?**
Websites use it to send high-quality images to high-resolution screens and lighter images to standard screens.

**How could your device pixel ratio be used maliciously?**
It's another data point for device fingerprinting.

**Is this accurate?**
This is KNOWN because it comes from your hardware, although zoom levels and OS scaling can tweak it slightly. Canvas rendering APIs reveal the same ratio when measuring backing store pixels.

**Can I hide your device pixel ratio?**
Changing it usually makes text and images look blurry.

---

### Color depth

**What is your color depth?**
This indicates how many colors your screen can display.

**How is your color depth used legitimately?**
Websites and video streams use it to ensure colors are displayed accurately.

**How could your color depth be used maliciously?**
Unusual color depths can help identify specific device models.

**Is this accurate?**
This is KNOWN because it reports your real display capability, though virtualization layers can cap it. Graphics programmers inspect the same value when tuning WebGL contexts and canvas rendering.

**Can I hide your color depth?**
Spoofing it can make colors look wrong on every site.

---

## 03. System Section

### CPU threads

**What is your CPU thread count?**
This indicates your device's processing power, like the number of workers available to handle tasks.

**How is your CPU thread count used legitimately?**
Complex web apps use it to distribute work efficiently without slowing down your device.

**How could your CPU thread count be used maliciously?**
Unique counts can help identify your device model or indicate a powerful machine worth targeting.

**Is this accurate?**
This is KNOWN because the browser reads it straight from your hardware, though some browsers round it for privacy. Kernel-level APIs expose the same logical processor count for native apps.

**Can I hide your CPU thread count?**
Spoofing it may slow down websites or cause glitches.

---

### RAM estimate

**What is your estimated RAM?**
This is a rough estimate of your device's memory, reported in broad categories (e.g., 4GB, 8GB).

**How is your RAM estimate used legitimately?**
Websites use it to decide how much data to load at once to avoid overwhelming your device.

**How could your RAM estimate be used maliciously?**
It can support device fingerprinting.

**Is this accurate?**
This is ESTIMATED because many browsers share only rounded buckets such as 4 GB or 8 GB. Internally it is derived from hardware telemetry but intentionally coarsened for privacy.

**Can I hide your RAM estimate?**
Most browsers already limit this information for privacy.

---

### Graphics

**What is your graphics hardware?**
This identifies your graphics card model.

**How is your graphics hardware information used legitimately?**
It enables high-quality video, games, and 3D graphics on the web.

**How could your graphics hardware information be used maliciously?**
It's a very strong and unique identifier for tracking.

**Is this accurate?**
This is KNOWN and usually exact unless the browser masks the vendor. Developers rely on the same info in graphics debugging consoles and driver compatibility checks.

**Can I hide your graphics hardware information?**
Spoofing it is difficult and often breaks video and games.

---

## 04. Peripherals & Features Section

### Microphones detected

**What microphones are detected on your device?**
This shows if microphones are connected. **No audio is accessed unless you grant permission.**

**How are your microphone details used legitimately?**
Video chat apps use it to let you select which microphone to use.

**How could your microphone details be used maliciously?**
It adds another detail to your device's fingerprint.

**Is this accurate?**
This is GUESSED because some browsers hide the full list until you have granted permission before, and device IDs may be randomized. Media APIs expose only hashed identifiers unless the origin is trusted.

**Can I hide your microphone details?**
Block microphone access in your browser settings or unplug external mics.

---

### Audio outputs detected

**What audio outputs are detected on your device?**
This shows available audio devices like speakers or headphones.

**How are your audio outputs used legitimately?**
Websites use it to let you choose where sound should play.

**How could your audio outputs be used maliciously?**
It's a minor factor in device fingerprinting.

**Is this accurate?**
This is GUESSED because many browsers reveal only limited information and may obfuscate labels. Browser makers sometimes require secure contexts or user gestures to expose full device metadata.

**Can I hide your audio outputs?**
Disable or unplug unused audio devices.

---

### Cameras detected

**What cameras are detected on your device?**
This shows if cameras are connected. **No video is accessed unless you grant permission.**

**How are your cameras used legitimately?**
Video call tools need this to help you switch cameras.

**How could your cameras be used maliciously?**
A site could learn a camera exists and try to trick you into turning it on.

**Is this accurate?**
This is GUESSED because many browsers hide the exact count until permission is granted, and identifiers may rotate. Under privacy sandboxing, device IDs are ephemeral to stop cross-site tracking.

**Can I hide your camera details?**
Cover or unplug cameras, and keep permissions revoked.

---

### Geolocation API

**What is your Geolocation API support?**
This shows whether your browser *allows* sites to *ask* for your precise location.

**How is your Geolocation API support used legitimately?**
Maps and delivery apps check this to see if they can request your location.

**How could your Geolocation API support be used maliciously?**
Pushy sites may nag you for access to log your location.

**Is this accurate?**
This is KNOWN because the browser knows if the feature is available, usually only on secure pages and some embedded browsers. Engineers confirm it via feature detection or permissions.query().

**Can I hide your Geolocation API support?**
Keep location permissions blocked in your browser.

---

### Device geolocation

**What is your precise device geolocation?**
If you granted permission, this shows your exact GPS coordinates.

**How is your precise device geolocation used legitimately?**
Essential for navigation, deliveries, and emergency services.

**How could your precise device geolocation be used maliciously?**
It can reveal your home, workplace, or travel routine.

**Is this accurate?**
This is MEASURED and can be very close, especially on phones with GPS, assisted GNSS, or Wi-Fi triangulation. Engineers inspect accuracy and timestamp fields to gauge sensor quality.

**Can I hide your precise device geolocation?**
Revoke location permissions for the site or in your browser settings.

---

### Touch support

**What is your touch support?**
This indicates whether your device has a touchscreen.

**How is your touch support used legitimately?**
Sites use it to enable touch-friendly layouts and gestures.

**How could your touch support be used maliciously?**
It's a minor factor in device fingerprinting.

**Is this accurate?**
This is GUESSED and can be wrong if drivers misreport touch support or if remote desktops translate input. Web runtimes often cache maxTouchPoints and fall back to zero when uncertain.

**Can I hide your touch support?**
Spoofing it may remove touch-friendly layouts you need.

---

### Pointer input

**What is your pointer input support?**
This indicates whether you're using a precise mouse or a finger.

**How is your pointer input support used legitimately?**
Websites use it to size interactive elements appropriately.

**How could your pointer input support be used maliciously?**
It's a minor factor in fingerprinting.

**Is this accurate?**
This is GUESSED based on what the browser knows, aggregating device capabilities and fallback heuristics.

**Can I hide your pointer input support?**
Spoofing it can make sites assume the wrong controls.

---

### Java plugin

**What is your Java plugin status?**
This reports if the outdated Java browser plugin is enabled. Modern browsers keep it off for security.

**How is your Java plugin status used legitimately?**
Virtually no modern sites need it.

**How could your Java plugin status be used maliciously?**
It was a major security vulnerability in the past.

**Is this accurate?**
This is KNOWN because the browser simply says yes, no, or unsupported, mapping to plugin availability.

**Can I hide your Java plugin status?**
Leave it disabled for security; modern sites don't need it.

---

### Browser plugins

**What browser plugins are detected?**
This lists old-style browser add-ons. Modern browsers typically show an empty list.

**How are your browser plugins used legitimately?**
They were once used for specific media formats.

**How could your browser plugins be used maliciously?**
They were historical targets for attacks and tracking.

**Is this accurate?**
This is GUESSED because many browsers block the list or show only built-in entries, making the data incomplete. Chromium-based browsers now gate plugin enumeration behind feature policies.

**Can I hide your browser plugins?**
Stay on modern browsers and avoid installing legacy plugins.

---

## 05. Connection Section

### Connection type

**What is your connection type?**
This indicates whether you're on Wi-Fi, mobile data, or a wired connection.

**How is your connection type used legitimately?**
Sites may adjust data usage to save your mobile plan.

**How could your connection type be used maliciously?**
It can hint that you're traveling or on a potentially weaker connection.

**Is this accurate?**
This is KNOWN only when the browser shares it, and many do not, because the specification is still experimental. Engineers treat the value as advisory since desktop browsers often return "unknown."

**Can I hide your connection type?**
Most browsers already hide it by default.

---

### Effective type

**What is your effective connection type?**
This is a rough label for your connection speed (e.g., "4G" or "slow-2g").

**How is your effective connection type used legitimately?**
Streaming sites use it to automatically adjust video quality.

**How could your effective connection type be used maliciously?**
It can reveal when your connection is sluggish.

**Is this accurate?**
This is ESTIMATED based on recent activity and can change quickly, especially as radio conditions fluctuate. Developers know it is derived from moving averages of RTT and downlink measurements.

**Can I hide your effective connection type?**
Spoofing it may cause videos to load the wrong quality.

---

### Download speed

**What is your estimated download speed?**
This is a rough estimate of your download speed in megabits per second.

**How is your download speed used legitimately?**
Sites use it to manage video quality and loading times.

**How could your download speed be used maliciously?**
It can hint at your internet plan or help time data-heavy attacks.

**Is this accurate?**
This is ESTIMATED and updates as your real-world speed changes, but it is not a certified speed test. Browser engines smooth the value using rolling averages to avoid constant jitter.

**Can I hide your download speed?**
Changing it only fools the estimate; sites can still run speed tests.

---

### Round-trip time

**What is your estimated round-trip time?**
This measures the delay (in milliseconds) for data to travel to a server and back.

**How is your round-trip time used legitimately?**
It helps sites decide when to show loading indicators.

**How could your round-trip time be used maliciously?**
It can hint at your distance from a server or VPN usage.

**Is this accurate?**
This is ESTIMATED from recent network activity and can fluctuate with congestion. Engineers often compare it against ICMP ping or synthetic monitoring results for validation.

**Can I hide your round-trip time?**
You cannot easily hide real network delays.

---

### Data saver mode

**What is your data saver mode?**
This indicates you've asked your browser to use less data.

**How is your data saver mode used legitimately?**
Sites honor it by sending smaller images and simpler pages.

**How could your data saver mode be used maliciously?**
It can signal that you're on a limited data plan.

**Is this accurate?**
This is KNOWN because it comes straight from your browser setting and does not change mid-session unless you toggle it.

**Can I hide your data saver mode?**
Turn the setting off to get full-quality content.

---

## 06. Privacy Signals Section

### Do Not Track

**What is your Do Not Track setting?**
This is a request your browser sends asking sites not to track you.

**How is your Do Not Track setting used legitimately?**
Some sites honor it, but most are free to ignore it.

**How could your Do Not Track setting be used maliciously?**
It may mark you as someone who values privacy.

**Is this accurate?**
This is KNOWN because it is either on, off, or unset and is read directly from browser settings.

**Can I hide your Do Not Track setting?**
You either enable it or not; turning it on doesn't guarantee privacy.

---

### Global Privacy Control

**What is your Global Privacy Control status?**
This is a newer, stronger "do not sell my data" signal that carries legal weight in some regions.

**How is your Global Privacy Control status used legitimately?**
In supported regions, companies must respect it by law.

**How could your Global Privacy Control status be used maliciously?**
It is a protection, not a risk.

**Is this accurate?**
This is KNOWN when your browser supports it and sets the value to true.

**Can I hide your Global Privacy Control status?**
You cannot hide it except by turning it off.

---

### Cookies enabled

**What are your cookie settings?**
This shows whether your browser allows sites to store small data files (cookies) on your device.

**How are your cookie settings used legitimately?**
Cookies keep you signed in and remember site preferences.

**How could your cookie settings be used maliciously?**
They can be used to track your activity across sites.

**Is this accurate?**
This is KNOWN because the browser knows whether cookies are allowed, taking into account third-party restrictions, SameSite rules, and partitioned storage.

**Can I hide your cookie settings?**
You can block cookies, but many sites will stop working correctly.

---

### Local storage

**What is your local storage availability?**
This is a more powerful storage space than cookies, used for saving app data on your device.

**How is your local storage availability used legitimately?**
It makes sites faster and lets web apps work offline.

**How could your local storage availability be used maliciously?**
Trackers can stash data there without your knowledge.

**Is this accurate?**
This is KNOWN because the browser decides whether the feature is available, respecting private-browsing modes and storage partitions.

**Can I hide your local storage availability?**
Disabling it breaks many modern web apps.

---

### Dark mode preference

**What is your dark mode preference?**
This indicates whether you prefer a dark or light color theme.

**How is your dark mode preference used legitimately?**
Websites use it to match your visual preference automatically.

**How could your dark mode preference be used maliciously?**
It's a minor fingerprinting factor.

**Is this accurate?**
This is KNOWN from your system settings and updates instantly when you toggle the theme at the OS or browser level.

**Can I hide your dark mode preference?**
Changing it alters the appearance of every app and site.

---

### Reduced motion

**What is your reduced motion preference?**
This indicates you've asked for less animation, often for accessibility reasons.

**How is your reduced motion preference used legitimately?**
Sites replace flashy effects with calmer ones to prevent motion sickness.

**How could your reduced motion preference be used maliciously?**
It's a harmless preference that adds a small fingerprinting clue.

**Is this accurate?**
This is KNOWN because it comes from your system accessibility settings and updates instantly when you toggle the option.

**Can I hide your reduced motion preference?**
Changing it affects every app and site; leave it on if animations bother you.

---

## Additional Information

### Fonts (from Peripherals & Features)

**What fonts are detected?**
This checks which fonts from a sample list are installed on your device.

**How are fonts used legitimately?**
Websites use it to pick fonts that will display correctly on your device.

**How could fonts be used maliciously?**
The unique combination of fonts is a strong method for browser fingerprinting.

**Is this accurate?**
This is ESTIMATED because it only tests a limited list and some browsers block the check entirely, returning generic metrics. Privacy-first browsers randomize or disable local font enumeration.

**Can I hide your fonts?**
Enable anti-fingerprinting modes in your browser to block this check.

---

## Summary

This document contains all "Learn More" content organized by section:
- **Network Section**: 7 items (IPv4, IPv6, ISP/ASN, Location, Referrer, Network Type, Reverse DNS)
- **Browser & Device Section**: 9 items (Browser, OS, Languages, Timezone, Local Time, Device Type, Screen Size, Viewport, Pixel Ratio, Color Depth)
- **System Section**: 3 items (CPU Threads, RAM, Graphics)
- **Peripherals & Features Section**: 9 items (Microphones, Speakers, Cameras, Geolocation API, Device Geolocation, Touch Support, Pointer Input, Java Plugin, Browser Plugins)
- **Connection Section**: 5 items (Connection Type, Effective Type, Download Speed, Round-Trip Time, Data Saver Mode)
- **Privacy Signals Section**: 6 items (Do Not Track, Global Privacy Control, Cookies, Local Storage, Dark Mode, Reduced Motion)

**Total: 39 data points with detailed explanations**

Each entry includes:
1. What it is (simplified explanation)
2. Legitimate uses
3. Malicious uses
4. Accuracy level (Known/Estimated/Guessed)
5. How to hide or protect it
