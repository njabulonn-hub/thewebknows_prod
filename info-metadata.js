let INFO_METADATA={
ipv4:{
explanation:"It's your network's unique identifier on the internet, like your home's street address for online traffic. It's a set of four numbers (e.g., 192.0.2.1) that allows data to find its way to you.",
legalUses:"Websites use it to provide location-specific content, detect fraudulent activity, and ensure your connection routes correctly.",
maliciousUses:"It can be combined with other data to approximate your location, track your online activity, or target you with attacks.",
accuracy:"Known - This value is known because it is the exact IPv4 address your connection broadcasts to every site you visit.",
canHide:"Yes - By using a trustworthy VPN or proxy service, which will show its own address instead of yours."
},
ipv6:{
explanation:"This is the newer format for internet addresses, designed because the old system is running out of unique numbers. It's longer and more complex (e.g., 2001:0db8::).",
legalUses:"It serves the same purpose as an IPv4 address but can support the vast number of modern connected devices.",
maliciousUses:"If exposed, it can be used for tracking and targeting, similar to an IPv4 address.",
accuracy:"Known - This is known when your ISP enables IPv6. If nothing appears, your provider is not broadcasting IPv6 to the web.",
canHide:"Yes - Use a VPN that supports IPv6, or disable IPv6 in your device or router settings."
},
isp:{
explanation:"Your ISP (Internet Service Provider) is your internet company (e.g., Comcast). The ASN is the identifier for the specific network your ISP uses to route your traffic.",
legalUses:"Websites use this to comply with regional content laws, optimize your connection, and perform security checks.",
maliciousUses:"It can reveal your general location and internet provider, which can be combined with other data to profile you.",
accuracy:"Known - This information is known and drawn from public routing databases that map IP ranges to ISPs.",
canHide:"Yes - A VPN will mask your real ISP and show its own information instead."
},
location:{
explanation:"This is an educated guess of your geographic location based on your IP address. It's typically accurate to the city level, but not to your precise address.",
legalUses:"Websites use it to show local content, such as news, weather, and language settings.",
maliciousUses:"It can reveal your general area, which might be sensitive depending on your circumstances.",
accuracy:"Inferred - This is inferred from commercial geolocation databases and can be wrong, especially when you use VPNs or corporate routes.",
canHide:"Yes - A VPN can make it appear you are in a different location."
},
referrer:{
explanation:"This is the web address of the page you were on before clicking a link to the current site. It tells a site where you came from.",
legalUses:"Websites use it for analytics to understand their traffic sources and to pay affiliates for referrals.",
maliciousUses:"It can sometimes expose private information, like search terms you used, revealing your browsing habits.",
accuracy:"Known - Referrer values are known because browsers send them automatically unless a privacy control removes the header.",
canHide:"Yes - Most browsers and privacy extensions can block referrer information."
},
"network-type":{
explanation:"This is an inference about whether you're on a home connection, mobile data, or a data center (which often hosts VPNs).",
legalUses:"Services use it for security, like triggering extra checks for traffic that appears to come from an anonymous data center.",
maliciousUses:"It can flag you as a VPN user, which some services try to block.",
accuracy:"Guessed - This is an educated guess based on naming patterns and may mislabel niche or newly announced networks.",
canHide:"Not applicable - You would need to switch to a different network or use a VPN that mimics a residential connection."
},
"reverse-dns":{
explanation:"This is a lookup that converts your IP address into a readable hostname, like a phone book for the internet.",
legalUses:"It's used for email security and by network administrators to troubleshoot issues.",
maliciousUses:"It can reveal information about your ISP or network setup.",
accuracy:"Known - It is known only if your ISP publishes a reverse DNS record; many residential IPs do not have one.",
canHide:"Yes - You cannot change it directly, but a VPN will show the VPN provider's hostname instead."
},
browser:{
explanation:"This identifies the specific web browser you are using (e.g., Chrome 121) and its version number.",
legalUses:"Websites use it to ensure compatibility and display content correctly. They may also warn users with outdated, insecure versions.",
maliciousUses:"Hackers can target known security flaws in specific browser versions.",
accuracy:"Known - This is KNOWN because your browser reports it, unless a privacy tool rewrites the string. Modern browsers may provide high-entropy hints only to trusted origins using User-Agent Client Hints negotiation.",
canHide:"Partially - Extensions can mask it, but this may cause websites to display incorrectly."
},
os:{
explanation:"This is the core software that runs your device, such as Windows, macOS, Android, or iOS.",
legalUses:"Websites use it to provide the correct software downloads and ensure features work properly.",
maliciousUses:"Attackers can tailor scams or malware to your specific system.",
accuracy:"Known - This is KNOWN because your browser shares it, and even when spoofed many sites can still guess correctly using feature detection and TLS fingerprinting.",
canHide:"Partially - Privacy tools can mask it, but this can confuse websites and break functionality."
},
languages:{
explanation:"These are the languages you've set as preferred in your browser settings (e.g., English, Spanish).",
legalUses:"Websites use them to automatically show content in your language.",
maliciousUses:"They can be used as a data point to infer your location or cultural background.",
accuracy:"Known - This is KNOWN because it comes straight from your browser settings. Developers know that HTTP negotiation falls back through the language list until a supported locale is found.",
canHide:"Yes - You can change your browser's language list, but this will affect every site you visit."
},
timezone:{
explanation:"This is the time zone setting from your device.",
legalUses:"Websites use it to display accurate times for events, schedules, and posts.",
maliciousUses:"Combined with other data, it can help confirm your geographic region.",
accuracy:"Known - This is KNOWN because it comes from your device clock. Programmers often treat it as the browser's resolved IANA timezone name, which updates automatically as you travel.",
canHide:"Partially - You can change your device's time zone, but this will affect all other apps and clocks on your device."
},
"local-time":{
explanation:"This is the current time according to your device.",
legalUses:"Websites use it for accurate timestamps and scheduling.",
maliciousUses:"It can help build a profile of your active hours online.",
accuracy:"Known - This is KNOWN and calculated directly from your timezone settings, though skewed system clocks can throw it off. Engineers sync devices with NTP or chrony to keep offsets within milliseconds.",
canHide:"Partially - Only by changing your device's clock, which is not practical."
},
"device-type":{
explanation:"This is an estimate of whether you're using a phone, tablet, or computer.",
legalUses:"Websites use it to switch to a layout that fits your screen size.",
maliciousUses:"It's one of many data points used for tracking and fingerprinting.",
accuracy:"Guessed - This is GUESSED and can be fooled by unusual screen setups or developer tools. It typically uses heuristics like pointer precision, screen diagonal, and hardware concurrency.",
canHide:"Partially - Spoofing it can make sites show the wrong layout, so it's not generally recommended."
},
"screen-size":{
explanation:"This is the total pixel dimensions of your display.",
legalUses:"Websites use it to send images and layouts that fit your screen properly.",
maliciousUses:"Unique screen sizes are a strong identifier for browser fingerprinting.",
accuracy:"Known - This is KNOWN because your browser reports the real size unless you are faking it, though multi-monitor scaling can cause subtle shifts. Front-end engineers account for devicePixelRatio and OS scaling when interpreting results.",
canHide:"Partially - Changing it with tools can break website layouts."
},
viewport:{
explanation:"This is the current size of your browser window, which changes if you resize it.",
legalUses:"Websites adjust their layout in real-time to fit your current window size.",
maliciousUses:"Like screen size, it's a factor in browser fingerprinting.",
accuracy:"Known - This is KNOWN and updates in real time as you resize, sourced from the rendering engine's layout tree. Developers use ResizeObserver and matchMedia to react to the same numbers.",
canHide:"Partially - Spoofing it can cause overlapping content or missing buttons."
},
"pixel-ratio":{
explanation:"This indicates how sharp your screen is. A higher number means a sharper, high-resolution display.",
legalUses:"Websites use it to send high-quality images to high-resolution screens and lighter images to standard screens.",
maliciousUses:"It's another data point for device fingerprinting.",
accuracy:"Known - This is KNOWN because it comes from your hardware, although zoom levels and OS scaling can tweak it slightly. Canvas rendering APIs reveal the same ratio when measuring backing store pixels.",
canHide:"Partially - Changing it usually makes text and images look blurry."
},
"color-depth":{
explanation:"This indicates how many colors your screen can display.",
legalUses:"Websites and video streams use it to ensure colors are displayed accurately.",
maliciousUses:"Unusual color depths can help identify specific device models.",
accuracy:"Known - This is KNOWN because it reports your real display capability, though virtualization layers can cap it. Graphics programmers inspect the same value when tuning WebGL contexts and canvas rendering.",
canHide:"Partially - Spoofing it can make colors look wrong on every site."
},
"cpu-threads":{
explanation:"This indicates your device's processing power, like the number of workers available to handle tasks.",
legalUses:"Complex web apps use it to distribute work efficiently without slowing down your device.",
maliciousUses:"Unique counts can help identify your device model or indicate a powerful machine worth targeting.",
accuracy:"Known - This is KNOWN because the browser reads it straight from your hardware, though some browsers round it for privacy. Kernel-level APIs expose the same logical processor count for native apps.",
canHide:"Partially - Spoofing it may slow down websites or cause glitches."
},
ram:{
explanation:"This is a rough estimate of your device's memory, reported in broad categories (e.g., 4GB, 8GB).",
legalUses:"Websites use it to decide how much data to load at once to avoid overwhelming your device.",
maliciousUses:"It can support device fingerprinting.",
accuracy:"Estimated - This is ESTIMATED because many browsers share only rounded buckets such as 4 GB or 8 GB. Internally it is derived from hardware telemetry but intentionally coarsened for privacy.",
canHide:"Partially - Most browsers already limit this information for privacy."
},
graphics:{
explanation:"This identifies your graphics card model.",
legalUses:"It enables high-quality video, games, and 3D graphics on the web.",
maliciousUses:"It's a very strong and unique identifier for tracking.",
accuracy:"Known - This is KNOWN and usually exact unless the browser masks the vendor. Developers rely on the same info in graphics debugging consoles and driver compatibility checks.",
canHide:"Partially - Spoofing it is difficult and often breaks video and games."
},
microphones:{
explanation:"This shows if microphones are connected. No audio is accessed unless you grant permission.",
legalUses:"Video chat apps use it to let you select which microphone to use.",
maliciousUses:"It adds another detail to your device's fingerprint.",
accuracy:"Guessed - This is GUESSED because some browsers hide the full list until you have granted permission before, and device IDs may be randomized. Media APIs expose only hashed identifiers unless the origin is trusted.",
canHide:"Yes - Block microphone access in your browser settings or unplug external mics."
},
speakers:{
explanation:"This shows available audio devices like speakers or headphones.",
legalUses:"Websites use it to let you choose where sound should play.",
maliciousUses:"It's a minor factor in device fingerprinting.",
accuracy:"Guessed - This is GUESSED because many browsers reveal only limited information and may obfuscate labels. Browser makers sometimes require secure contexts or user gestures to expose full device metadata.",
canHide:"Yes - Disable or unplug unused audio devices."
},
webcams:{
explanation:"This shows if cameras are connected. No video is accessed unless you grant permission.",
legalUses:"Video call tools need this to help you switch cameras.",
maliciousUses:"A site could learn a camera exists and try to trick you into turning it on.",
accuracy:"Guessed - This is GUESSED because many browsers hide the exact count until permission is granted, and identifiers may rotate. Under privacy sandboxing, device IDs are ephemeral to stop cross-site tracking.",
canHide:"Yes - Cover or unplug cameras, and keep permissions revoked."
},
"geolocation-support":{
explanation:"This shows whether your browser allows sites to ask for your precise location.",
legalUses:"Maps and delivery apps check this to see if they can request your location.",
maliciousUses:"Pushy sites may nag you for access to log your location.",
accuracy:"Known - This is KNOWN because the browser knows if the feature is available, usually only on secure pages and some embedded browsers. Engineers confirm it via feature detection or permissions.query().",
canHide:"Yes - Keep location permissions blocked in your browser."
},
"geolocation-precise":{
explanation:"If you granted permission, this shows your exact GPS coordinates.",
legalUses:"Essential for navigation, deliveries, and emergency services.",
maliciousUses:"It can reveal your home, workplace, or travel routine.",
accuracy:"Measured - This is MEASURED and can be very close, especially on phones with GPS, assisted GNSS, or Wi-Fi triangulation. Engineers inspect accuracy and timestamp fields to gauge sensor quality.",
canHide:"Yes - Revoke location permissions for the site or in your browser settings."
},
"touch-support":{
explanation:"This indicates whether your device has a touchscreen.",
legalUses:"Sites use it to enable touch-friendly layouts and gestures.",
maliciousUses:"It's a minor factor in device fingerprinting.",
accuracy:"Guessed - This is GUESSED and can be wrong if drivers misreport touch support or if remote desktops translate input. Web runtimes often cache maxTouchPoints and fall back to zero when uncertain.",
canHide:"Partially - Spoofing it may remove touch-friendly layouts you need."
},
"pointer-support":{
explanation:"This indicates whether you're using a precise mouse or a finger.",
legalUses:"Websites use it to size interactive elements appropriately.",
maliciousUses:"It's a minor factor in fingerprinting.",
accuracy:"Guessed - This is GUESSED based on what the browser knows, aggregating device capabilities and fallback heuristics.",
canHide:"Partially - Spoofing it can make sites assume the wrong controls."
},
fonts:{
explanation:"This checks which fonts from a sample list are installed on your device.",
legalUses:"Websites use it to pick fonts that will display correctly on your device.",
maliciousUses:"The unique combination of fonts is a strong method for browser fingerprinting.",
accuracy:"Estimated - This is ESTIMATED because it only tests a limited list and some browsers block the check entirely, returning generic metrics. Privacy-first browsers randomize or disable local font enumeration.",
canHide:"Yes - Enable anti-fingerprinting modes in your browser to block this check."
},
"java-enabled":{
explanation:"This reports if the outdated Java browser plugin is enabled. Modern browsers keep it off for security.",
legalUses:"Virtually no modern sites need it.",
maliciousUses:"It was a major security vulnerability in the past.",
accuracy:"Known - This is KNOWN because the browser simply says yes, no, or unsupported, mapping to plugin availability.",
canHide:"Yes - Leave it disabled for security; modern sites don't need it."
},
plugins:{
explanation:"This lists old-style browser add-ons. Modern browsers typically show an empty list.",
legalUses:"They were once used for specific media formats.",
maliciousUses:"They were historical targets for attacks and tracking.",
accuracy:"Guessed - This is GUESSED because many browsers block the list or show only built-in entries, making the data incomplete. Chromium-based browsers now gate plugin enumeration behind feature policies.",
canHide:"Yes - Stay on modern browsers and avoid installing legacy plugins."
},
"connection-type":{
explanation:"This indicates whether you're on Wi-Fi, mobile data, or a wired connection.",
legalUses:"Sites may adjust data usage to save your mobile plan.",
maliciousUses:"It can hint that you're traveling or on a potentially weaker connection.",
accuracy:"Known - This is KNOWN only when the browser shares it, and many do not, because the specification is still experimental. Engineers treat the value as advisory since desktop browsers often return \"unknown.\"",
canHide:"Partially - Most browsers already hide it by default."
},
"effective-type":{
explanation:"This is a rough label for your connection speed (e.g., \"4G\" or \"slow-2g\").",
legalUses:"Streaming sites use it to automatically adjust video quality.",
maliciousUses:"It can reveal when your connection is sluggish.",
accuracy:"Estimated - This is ESTIMATED based on recent activity and can change quickly, especially as radio conditions fluctuate. Developers know it is derived from moving averages of RTT and downlink measurements.",
canHide:"Partially - Spoofing it may cause videos to load the wrong quality."
},
downlink:{
explanation:"This is a rough estimate of your download speed in megabits per second.",
legalUses:"Sites use it to manage video quality and loading times.",
maliciousUses:"It can hint at your internet plan or help time data-heavy attacks.",
accuracy:"Estimated - This is ESTIMATED and updates as your real-world speed changes, but it is not a certified speed test. Browser engines smooth the value using rolling averages to avoid constant jitter.",
canHide:"Partially - Changing it only fools the estimate; sites can still run speed tests."
},
rtt:{
explanation:"This measures the delay (in milliseconds) for data to travel to a server and back.",
legalUses:"It helps sites decide when to show loading indicators.",
maliciousUses:"It can hint at your distance from a server or VPN usage.",
accuracy:"Estimated - This is ESTIMATED from recent network activity and can fluctuate with congestion. Engineers often compare it against ICMP ping or synthetic monitoring results for validation.",
canHide:"Partially - You cannot easily hide real network delays."
},
"save-data":{
explanation:"This indicates you've asked your browser to use less data.",
legalUses:"Sites honor it by sending smaller images and simpler pages.",
maliciousUses:"It can signal that you're on a limited data plan.",
accuracy:"Known - This is KNOWN because it comes straight from your browser setting and does not change mid-session unless you toggle it.",
canHide:"Yes - Turn the setting off to get full-quality content."
},
dnt:{
explanation:"This is a request your browser sends asking sites not to track you.",
legalUses:"Some sites honor it, but most are free to ignore it.",
maliciousUses:"It may mark you as someone who values privacy.",
accuracy:"Known - This is KNOWN because it is either on, off, or unset and is read directly from browser settings.",
canHide:"Not applicable - You either enable it or not; turning it on doesn't guarantee privacy."
},
gpc:{
explanation:"This is a newer, stronger \"do not sell my data\" signal that carries legal weight in some regions.",
legalUses:"In supported regions, companies must respect it by law.",
maliciousUses:"It is a protection, not a risk.",
accuracy:"Known - This is KNOWN when your browser supports it and sets the value to true.",
canHide:"Not applicable - You cannot hide it except by turning it off."
},
cookies:{
explanation:"This shows whether your browser allows sites to store small data files (cookies) on your device.",
legalUses:"Cookies keep you signed in and remember site preferences.",
maliciousUses:"They can be used to track your activity across sites.",
accuracy:"Known - This is KNOWN because the browser knows whether cookies are allowed, taking into account third-party restrictions, SameSite rules, and partitioned storage.",
canHide:"Yes - You can block cookies, but many sites will stop working correctly."
},
"local-storage":{
explanation:"This is a more powerful storage space than cookies, used for saving app data on your device.",
legalUses:"It makes sites faster and lets web apps work offline.",
maliciousUses:"Trackers can stash data there without your knowledge.",
accuracy:"Known - This is KNOWN because the browser decides whether the feature is available, respecting private-browsing modes and storage partitions.",
canHide:"Yes - Disabling it breaks many modern web apps."
},
"dark-mode":{
explanation:"This indicates whether you prefer a dark or light color theme.",
legalUses:"Websites use it to match your visual preference automatically.",
maliciousUses:"It's a minor fingerprinting factor.",
accuracy:"Known - This is KNOWN from your system settings and updates instantly when you toggle the theme at the OS or browser level.",
canHide:"Yes - Changing it alters the appearance of every app and site."
},
"reduced-motion":{
explanation:"This indicates you've asked for less animation, often for accessibility reasons.",
legalUses:"Sites replace flashy effects with calmer ones to prevent motion sickness.",
maliciousUses:"It's a harmless preference that adds a small fingerprinting clue.",
accuracy:"Known - This is KNOWN because it comes from your system accessibility settings and updates instantly when you toggle the option.",
canHide:"Yes - Changing it affects every app and site; leave it on if animations bother you."
}
};
