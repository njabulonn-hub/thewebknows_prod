let EXPLANATIONS={
ipv4:{
what:"It's your network's unique identifier on the internet, like your home's street address for online traffic. It's a set of four numbers (e.g., 192.0.2.1) that allows data to find its way to you.",
legal:"Websites use it to provide location-specific content, detect fraudulent activity, and ensure your connection routes correctly.",
malicious:"It can be combined with other data to approximate your location, track your online activity, or target you with attacks.",
accuracy:"This value is <span class=\"tag-known\">known</span> because it is the exact IPv4 address your connection broadcasts to every site you visit.",
hide:"Yes, by using a trustworthy VPN or proxy service, which will show its own address instead of yours."
},
ipv6:{
what:"This is the newer format for internet addresses, designed because the old system is running out of unique numbers. It's longer and more complex (e.g., 2001:0db8::).",
legal:"It serves the same purpose as an IPv4 address but can support the vast number of modern connected devices.",
malicious:"If exposed, it can be used for tracking and targeting, similar to an IPv4 address.",
accuracy:"This is <span class=\"tag-known\">known</span> when your ISP enables IPv6. If nothing appears, your provider is not broadcasting IPv6 to the web.",
hide:"Use a VPN that supports IPv6, or disable IPv6 in your device or router settings."
},
isp:{
what:"Your ISP (Internet Service Provider) is your internet company (e.g., Comcast). The ASN is the identifier for the specific network your ISP uses to route your traffic.",
legal:"Websites use this to comply with regional content laws, optimize your connection, and perform security checks.",
malicious:"It can reveal your general location and internet provider, which can be combined with other data to profile you.",
accuracy:"This information is <span class=\"tag-known\">known</span> and drawn from public routing databases that map IP ranges to ISPs.",
hide:"A VPN will mask your real ISP and show its own information instead."
},
location:{
what:"This is an educated guess of your geographic location based on your IP address. It's typically accurate to the city level, but not to your precise address.",
legal:"Websites use it to show local content, such as news, weather, and language settings.",
malicious:"It can reveal your general area, which might be sensitive depending on your circumstances.",
accuracy:"This is <span class=\"tag-guess\">inferred</span> from commercial geolocation databases and can be wrong, especially when you use VPNs or corporate routes.",
hide:"A VPN can make it appear you are in a different location."
},
referrer:{
what:"This is the web address of the page you were on before clicking a link to the current site. It tells a site where you came from.",
legal:"Websites use it for analytics to understand their traffic sources and to pay affiliates for referrals.",
malicious:"It can sometimes expose private information, like search terms you used, revealing your browsing habits.",
accuracy:"Referrer values are <span class=\"tag-known\">known</span> because browsers send them automatically unless a privacy control removes the header.",
hide:"Yes, most browsers and privacy extensions can block referrer information."
},
"network-type":{
what:"This is an inference about whether you're on a home connection, mobile data, or a data center (which often hosts VPNs).",
legal:"Services use it for security, like triggering extra checks for traffic that appears to come from an anonymous data center.",
malicious:"It can flag you as a VPN user, which some services try to block.",
accuracy:"This is an educated <span class=\"tag-guess\">guess</span> based on naming patterns and may mislabel niche or newly announced networks.",
hide:"You would need to switch to a different network or use a VPN that mimics a residential connection."
},
"reverse-dns":{
what:"This is a lookup that converts your IP address into a readable hostname, like a phone book for the internet.",
legal:"It's used for email security and by network administrators to troubleshoot issues.",
malicious:"It can reveal information about your ISP or network setup.",
accuracy:"It is <span class=\"tag-known\">known</span> only if your ISP publishes a reverse DNS record; many residential IPs do not have one.",
hide:"You cannot change it directly, but a VPN will show the VPN provider's hostname instead."
},
browser:{
what:"This identifies the specific web browser you are using (e.g., Chrome 121) and its version number.",
legal:"Websites use it to ensure compatibility and display content correctly. They may also warn users with outdated, insecure versions.",
malicious:"Hackers can target known security flaws in specific browser versions.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because your browser reports it, unless a privacy tool rewrites the string. Modern browsers may provide high-entropy hints only to trusted origins using User-Agent Client Hints negotiation.",
hide:"Extensions can mask it, but this may cause websites to display incorrectly."
},
os:{
what:"This is the core software that runs your device, such as Windows, macOS, Android, or iOS.",
legal:"Websites use it to provide the correct software downloads and ensure features work properly.",
malicious:"Attackers can tailor scams or malware to your specific system.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because your browser shares it, and even when spoofed many sites can still guess correctly using feature detection and TLS fingerprinting.",
hide:"Privacy tools can mask it, but this can confuse websites and break functionality."
},
languages:{
what:"These are the languages you've set as preferred in your browser settings (e.g., English, Spanish).",
legal:"Websites use them to automatically show content in your language.",
malicious:"They can be used as a data point to infer your location or cultural background.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it comes straight from your browser settings. Developers know that HTTP negotiation falls back through the language list until a supported locale is found.",
hide:"You can change your browser's language list, but this will affect every site you visit."
},
timezone:{
what:"This is the time zone setting from your device.",
legal:"Websites use it to display accurate times for events, schedules, and posts.",
malicious:"Combined with other data, it can help confirm your geographic region.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it comes from your device clock. Programmers often treat it as the browser's resolved IANA timezone name, which updates automatically as you travel.",
hide:"You can change your device's time zone, but this will affect all other apps and clocks on your device."
},
"local-time":{
what:"This is the current time according to your device.",
legal:"Websites use it for accurate timestamps and scheduling.",
malicious:"It can help build a profile of your active hours online.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> and calculated directly from your timezone settings, though skewed system clocks can throw it off. Engineers sync devices with NTP or chrony to keep offsets within milliseconds.",
hide:"Only by changing your device's clock, which is not practical."
},
"device-type":{
what:"This is an estimate of whether you're using a phone, tablet, or computer.",
legal:"Websites use it to switch to a layout that fits your screen size.",
malicious:"It's one of many data points used for tracking and fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> and can be fooled by unusual screen setups or developer tools. It typically uses heuristics like pointer precision, screen diagonal, and hardware concurrency.",
hide:"Spoofing it can make sites show the wrong layout, so it's not generally recommended."
},
"screen-size":{
what:"This is the total pixel dimensions of your display.",
legal:"Websites use it to send images and layouts that fit your screen properly.",
malicious:"Unique screen sizes are a strong identifier for browser fingerprinting.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because your browser reports the real size unless you are faking it, though multi-monitor scaling can cause subtle shifts. Front-end engineers account for devicePixelRatio and OS scaling when interpreting results.",
hide:"Changing it with tools can break website layouts."
},
viewport:{
what:"This is the current size of your browser window, which changes if you resize it.",
legal:"Websites adjust their layout in real-time to fit your current window size.",
malicious:"Like screen size, it's a factor in browser fingerprinting.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> and updates in real time as you resize, sourced from the rendering engine's layout tree. Developers use ResizeObserver and matchMedia to react to the same numbers.",
hide:"Spoofing it can cause overlapping content or missing buttons."
},
"pixel-ratio":{
what:"This indicates how sharp your screen is. A higher number means a sharper, high-resolution display.",
legal:"Websites use it to send high-quality images to high-resolution screens and lighter images to standard screens.",
malicious:"It's another data point for device fingerprinting.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it comes from your hardware, although zoom levels and OS scaling can tweak it slightly. Canvas rendering APIs reveal the same ratio when measuring backing store pixels.",
hide:"Changing it usually makes text and images look blurry."
},
"color-depth":{
what:"This indicates how many colors your screen can display.",
legal:"Websites and video streams use it to ensure colors are displayed accurately.",
malicious:"Unusual color depths can help identify specific device models.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it reports your real display capability, though virtualization layers can cap it. Graphics programmers inspect the same value when tuning WebGL contexts and canvas rendering.",
hide:"Spoofing it can make colors look wrong on every site."
},
"cpu-threads":{
what:"This indicates your device's processing power, like the number of workers available to handle tasks.",
legal:"Complex web apps use it to distribute work efficiently without slowing down your device.",
malicious:"Unique counts can help identify your device model or indicate a powerful machine worth targeting.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because the browser reads it straight from your hardware, though some browsers round it for privacy. Kernel-level APIs expose the same logical processor count for native apps.",
hide:"Spoofing it may slow down websites or cause glitches."
},
ram:{
what:"This is a rough estimate of your device's memory, reported in broad categories (e.g., 4GB, 8GB).",
legal:"Websites use it to decide how much data to load at once to avoid overwhelming your device.",
malicious:"It can support device fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">ESTIMATED</span> because many browsers share only rounded buckets such as 4 GB or 8 GB. Internally it is derived from hardware telemetry but intentionally coarsened for privacy.",
hide:"Most browsers already limit this information for privacy."
},
graphics:{
what:"This identifies your graphics card model.",
legal:"It enables high-quality video, games, and 3D graphics on the web.",
malicious:"It's a very strong and unique identifier for tracking.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> and usually exact unless the browser masks the vendor. Developers rely on the same info in graphics debugging consoles and driver compatibility checks.",
hide:"Spoofing it is difficult and often breaks video and games."
},
microphones:{
what:"This shows if microphones are connected. No audio is accessed unless you grant permission.",
legal:"Video chat apps use it to let you select which microphone to use.",
malicious:"It adds another detail to your device's fingerprint.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> because some browsers hide the full list until you have granted permission before, and device IDs may be randomized. Media APIs expose only hashed identifiers unless the origin is trusted.",
hide:"Block microphone access in your browser settings or unplug external mics."
},
speakers:{
what:"This shows available audio devices like speakers or headphones.",
legal:"Websites use it to let you choose where sound should play.",
malicious:"It's a minor factor in device fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> because many browsers reveal only limited information and may obfuscate labels. Browser makers sometimes require secure contexts or user gestures to expose full device metadata.",
hide:"Disable or unplug unused audio devices."
},
webcams:{
what:"This shows if cameras are connected. No video is accessed unless you grant permission.",
legal:"Video call tools need this to help you switch cameras.",
malicious:"A site could learn a camera exists and try to trick you into turning it on.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> because many browsers hide the exact count until permission is granted, and identifiers may rotate. Under privacy sandboxing, device IDs are ephemeral to stop cross-site tracking.",
hide:"Cover or unplug cameras, and keep permissions revoked."
},
"geolocation-support":{
what:"This shows whether your browser *allows* sites to *ask* for your precise location.",
legal:"Maps and delivery apps check this to see if they can request your location.",
malicious:"Pushy sites may nag you for access to log your location.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because the browser knows if the feature is available, usually only on secure pages and some embedded browsers. Engineers confirm it via feature detection or permissions.query().",
hide:"Keep location permissions blocked in your browser."
},
"geolocation-precise":{
what:"If you granted permission, this shows your exact GPS coordinates.",
legal:"Essential for navigation, deliveries, and emergency services.",
malicious:"It can reveal your home, workplace, or travel routine.",
accuracy:"This is <span class=\"tag-known\">MEASURED</span> and can be very close, especially on phones with GPS, assisted GNSS, or Wi-Fi triangulation. Engineers inspect accuracy and timestamp fields to gauge sensor quality.",
hide:"Revoke location permissions for the site or in your browser settings."
},
"touch-support":{
what:"This indicates whether your device has a touchscreen.",
legal:"Sites use it to enable touch-friendly layouts and gestures.",
malicious:"It's a minor factor in device fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> and can be wrong if drivers misreport touch support or if remote desktops translate input. Web runtimes often cache maxTouchPoints and fall back to zero when uncertain.",
hide:"Spoofing it may remove touch-friendly layouts you need."
},
"pointer-support":{
what:"This indicates whether you're using a precise mouse or a finger.",
legal:"Websites use it to size interactive elements appropriately.",
malicious:"It's a minor factor in fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> based on what the browser knows, aggregating device capabilities and fallback heuristics.",
hide:"Spoofing it can make sites assume the wrong controls."
},
fonts:{
what:"This checks which fonts from a sample list are installed on your device.",
legal:"Websites use it to pick fonts that will display correctly on your device.",
malicious:"The unique combination of fonts is a strong method for browser fingerprinting.",
accuracy:"This is <span class=\"tag-guess\">ESTIMATED</span> because it only tests a limited list and some browsers block the check entirely, returning generic metrics. Privacy-first browsers randomize or disable local font enumeration.",
hide:"Enable anti-fingerprinting modes in your browser to block this check."
},
"java-enabled":{
what:"This reports if the outdated Java browser plugin is enabled. Modern browsers keep it off for security.",
legal:"Virtually no modern sites need it.",
malicious:"It was a major security vulnerability in the past.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because the browser simply says yes, no, or unsupported, mapping to plugin availability.",
hide:"Leave it disabled for security; modern sites don't need it."
},
plugins:{
what:"This lists old-style browser add-ons. Modern browsers typically show an empty list.",
legal:"They were once used for specific media formats.",
malicious:"They were historical targets for attacks and tracking.",
accuracy:"This is <span class=\"tag-guess\">GUESSED</span> because many browsers block the list or show only built-in entries, making the data incomplete. Chromium-based browsers now gate plugin enumeration behind feature policies.",
hide:"Stay on modern browsers and avoid installing legacy plugins."
},
"connection-type":{
what:"This indicates whether you're on Wi-Fi, mobile data, or a wired connection.",
legal:"Sites may adjust data usage to save your mobile plan.",
malicious:"It can hint that you're traveling or on a potentially weaker connection.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> only when the browser shares it, and many do not, because the specification is still experimental. Engineers treat the value as advisory since desktop browsers often return \"unknown.\"",
hide:"Most browsers already hide it by default."
},
"effective-type":{
what:"This is a rough label for your connection speed (e.g., \"4G\" or \"slow-2g\").",
legal:"Streaming sites use it to automatically adjust video quality.",
malicious:"It can reveal when your connection is sluggish.",
accuracy:"This is <span class=\"tag-guess\">ESTIMATED</span> based on recent activity and can change quickly, especially as radio conditions fluctuate. Developers know it is derived from moving averages of RTT and downlink measurements.",
hide:"Spoofing it may cause videos to load the wrong quality."
},
downlink:{
what:"This is a rough estimate of your download speed in megabits per second.",
legal:"Sites use it to manage video quality and loading times.",
malicious:"It can hint at your internet plan or help time data-heavy attacks.",
accuracy:"This is <span class=\"tag-guess\">ESTIMATED</span> and updates as your real-world speed changes, but it is not a certified speed test. Browser engines smooth the value using rolling averages to avoid constant jitter.",
hide:"Changing it only fools the estimate; sites can still run speed tests."
},
rtt:{
what:"This measures the delay (in milliseconds) for data to travel to a server and back.",
legal:"It helps sites decide when to show loading indicators.",
malicious:"It can hint at your distance from a server or VPN usage.",
accuracy:"This is <span class=\"tag-guess\">ESTIMATED</span> from recent network activity and can fluctuate with congestion. Engineers often compare it against ICMP ping or synthetic monitoring results for validation.",
hide:"You cannot easily hide real network delays."
},
"save-data":{
what:"This indicates you've asked your browser to use less data.",
legal:"Sites honor it by sending smaller images and simpler pages.",
malicious:"It can signal that you're on a limited data plan.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it comes straight from your browser setting and does not change mid-session unless you toggle it.",
hide:"Turn the setting off to get full-quality content."
},
dnt:{
what:"This is a request your browser sends asking sites not to track you.",
legal:"Some sites honor it, but most are free to ignore it.",
malicious:"It may mark you as someone who values privacy.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it is either on, off, or unset and is read directly from browser settings.",
hide:"You either enable it or not; turning it on doesn't guarantee privacy."
},
gpc:{
what:"This is a newer, stronger \"do not sell my data\" signal that carries legal weight in some regions.",
legal:"In supported regions, companies must respect it by law.",
malicious:"It is a protection, not a risk.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> when your browser supports it and sets the value to true.",
hide:"You cannot hide it except by turning it off."
},
cookies:{
what:"This shows whether your browser allows sites to store small data files (cookies) on your device.",
legal:"Cookies keep you signed in and remember site preferences.",
malicious:"They can be used to track your activity across sites.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because the browser knows whether cookies are allowed, taking into account third-party restrictions, SameSite rules, and partitioned storage.",
hide:"You can block cookies, but many sites will stop working correctly."
},
"local-storage":{
what:"This is a more powerful storage space than cookies, used for saving app data on your device.",
legal:"It makes sites faster and lets web apps work offline.",
malicious:"Trackers can stash data there without your knowledge.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because the browser decides whether the feature is available, respecting private-browsing modes and storage partitions.",
hide:"Disabling it breaks many modern web apps."
},
"dark-mode":{
what:"This indicates whether you prefer a dark or light color theme.",
legal:"Websites use it to match your visual preference automatically.",
malicious:"It's a minor fingerprinting factor.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> from your system settings and updates instantly when you toggle the theme at the OS or browser level.",
hide:"Changing it alters the appearance of every app and site."
},
"reduced-motion":{
what:"This indicates you've asked for less animation, often for accessibility reasons.",
legal:"Sites replace flashy effects with calmer ones to prevent motion sickness.",
malicious:"It's a harmless preference that adds a small fingerprinting clue.",
accuracy:"This is <span class=\"tag-known\">KNOWN</span> because it comes from your system accessibility settings and updates instantly when you toggle the option.",
hide:"Changing it affects every app and site; leave it on if animations bother you."
}
},EVERYDAY_LEAKS=[{id:"search-queries",title:"Search boxes & address bars",how:"Search engines and visited pages often keep a log of every term you type, even the ones you delete, and link it to your IP or account.",reduce:"Use privacy-first search engines, pause account history when looking up sensitive topics, and clear searches on shared devices."},{id:"signup-forms",title:"Newsletter pop-ups & giveaway forms",how:"Details entered into pop-ups are frequently captured the instant you type them and may feed marketing lists even if you close the page.",reduce:"Share only the required fields, use disposable or alias emails for untrusted sites, and skip optional questions."},{id:"social-reactions",title:"Likes, shares, and quick comments",how:"Each reaction creates a public breadcrumb that advertisers, data brokers, or nosy strangers can collect to learn your interests or plans.",reduce:"Limit who sees your activity, review connected apps, and keep sensitive updates inside private groups."},{id:"photo-uploads",title:"Photos and screenshots you post",how:"Pictures can include hidden tags with time, GPS, or device details, and backgrounds might show house numbers or work badges.",reduce:"Strip location data before sharing, blur or crop sensitive areas, and avoid posting live from home."},{id:"support-chats",title:"Support chats & AI helpers",how:"Anything you type into help widgets or AI assistants is often stored along with device details and can resurface later.",reduce:"Leave out personal identifiers, ask how long providers keep logs, and choose services with clear privacy promises."}],HIDDEN_SHARES=[{id:"referrer-header",type:"Referrer header",innocentShare:"You click a link and the new site learns which page sent you.",maliciousUse:"Trackers learn about sensitive pages you were reading.",protection:"Use privacy add-ons that strip referrers or open links in a fresh tab.",example:"Example: A clinic link tells the next site you were researching a diagnosis."},{id:"form-autofill",type:"Forms and autofill",innocentShare:"Typing a name or email may prompt autofill to pour in the rest.",maliciousUse:"Fake forms capture the full set for spam or identity theft.",protection:"Disable broad autofill, rely on a password manager, and skip optional boxes.",example:"Example: A contest form saves your address even if you never hit submit."},{id:"social-logins",type:"Social logins",innocentShare:"Logging in with Google or Facebook is quick and convenient.",maliciousUse:"Linked accounts may leak friend lists, likes, or daily habits.",protection:"Choose email sign-ups, use burner accounts, and review app access regularly.",example:"Example: A quiz app pulls your friend list after a single click."},{id:"device-permissions",type:"Device permissions",innocentShare:"Allowing location or camera once may let the browser remember the yes for later.",maliciousUse:"Sneaky sites can keep tracking your GPS or watching through the webcam.",protection:"Revoke old permissions, use a VPN to blur location, and grant access only when essential.",example:"Example: A weather site keeps pinging your GPS quietly in the background."},{id:"clipboard",type:"Clipboard",innocentShare:"Copying and pasting between tabs can expose whatever you copied.",maliciousUse:"Injected scripts can read the clipboard and steal secrets like passwords or wallet addresses.",protection:"Use browsers that block clipboard reads and clear the clipboard after sensitive tasks.",example:"Example: A fake wallet page swaps in its own crypto address when you paste."},{id:"sensors",type:"Battery and sensors",innocentShare:"Sites may check battery level or motion data to adjust features.",maliciousUse:"Unique sensor patterns add to a tracking fingerprint.",protection:"Limit sensor access in device settings and prefer a desktop for private work.",example:"Example: A travel site spots low battery and pushes \"urgent\" upgrade deals."},{id:"email-username",type:"Emails and usernames",innocentShare:"Dropping your email into a pop-up or reusing a username feels quick and easy.",maliciousUse:"Attackers combine those details with other leaks for convincing phishing.",protection:"Use disposable emails and fresh usernames on risky sites.",example:"Example: A leaked forum handle helps scammers guess your login elsewhere."},{id:"connection-hints",type:"Connection hints",innocentShare:"Video players read your speed or connection type to stream smoothly.",maliciousUse:"Threat actors spot when you are travelling or on a slow link and tailor scams.",protection:"Route traffic through a VPN and enable privacy signals like Do Not Track.",example:"Example: A \"slow connection\" alert is used to sell fake speed boosters."}];
