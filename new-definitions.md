# New Glossary Definitions

## Ads, Attribution & IDs

1.  **Topics API**
    A browser feature that shares general interest categories (like "sports" or "travel") for advertising, without revealing your specific identity across sites.

2.  **Protected Audience API (FLEDGE)**
    A system that runs ad auctions directly on your device, so your personal data and browsing history don't need to be sent to external servers.

3.  **Attribution Reporting API**
    A privacy-focused way for advertisers to measure if their ads led to a sale or sign-up, without using tracking cookies.

4.  **Private Aggregation API**
    A method that combines data from many users and adds statistical "noise" to generate reports, protecting any single person's information.

5.  **Aggregation Service**
    A secure, trusted service that combines encrypted reports from many users to create summary insights without exposing individual data.

6.  **Private State Tokens**
    A way for a website to vouch that you are a genuine user (and not a bot) without tracking your personal identity across the web.

7.  **Conversion Measurement (WebKit)**
    The method used by Safari and Firefox to measure ad effectiveness in a privacy-preserving way.

8.  **SKAdNetwork**
    Apple's framework for measuring mobile app ad campaigns without sharing user-level data from your iPhone or iPad.

9.  **Google Click ID (GCLID)**
    A unique tag added to a web link in a Google Ad, used to track which clicks lead to conversions on a website.

10. **Facebook Click ID (FBCLID)**
    A unique tag added to a web link from Facebook, used for tracking and analytics by the platform.

11. **UTM parameters**
    Tags added to a web address (URL) to identify where website traffic comes from (e.g., a specific email campaign or social media post).

12. **IDFA**
    A unique identifier for advertising on Apple devices. Apps must now ask for your permission to use it for tracking across other apps and websites.

13. **AAID / GAID**
    The advertising identifier for Android devices, which you can reset or disable in your settings.

14. **Enhanced Conversions**
    A method that uses hashed, anonymized customer data (like an email address) to more accurately measure conversions from ads.

15. **Consent Mode v2**
    A Google framework that adjusts how its tags operate based on the consent choices you make on a website.

16. **Server-side tagging**
    Running tracking code on a company's own server instead of in your browser, which can improve site performance and privacy.

17. **Real-Time Bidding (RTB)**
    The instantaneous automated auction where an ad space on a website is sold to the highest bidder.

18. **Demand-Side Platform (DSP)**
    A system used by advertisers to buy ad space from many different publishers in an automated way.

19. **Supply-Side Platform (SSP)**
    A system used by website owners (publishers) to sell their ad space to advertisers automatically.

20. **Data clean room**
    A secure, neutral environment where multiple companies can combine and analyze their data for insights without directly sharing their raw customer data with each other.

21. **Cookie syncing**
    A process where different advertising companies match their tracking IDs for the same user, effectively expanding their ability to track you.

22. **On-device ad auctions**
    The process of selecting which ad to show you happens directly on your device, keeping your browsing history private.

23. **Contextual targeting**
    Showing you ads based on the content of the page you are currently viewing (e.g., a sports ad on a sports article) rather than based on your personal profile.

24. **Frequency capping**
    A limit on how many times the same ad is shown to you to avoid over-saturation.

25. **Lookalike modelling**
    Finding new potential customers who share similar characteristics with a brand's existing best customers.

---

## Analytics, Data & PETs

1.  **First-party analytics**
    Data collected and analyzed by the website you are visiting, used to understand how people use their site.

2.  **Self-hosted analytics**
    When a website runs its own analytics software on its servers, instead of using a third-party service like Google Analytics.

3.  **Server-side analytics**
    Collecting website usage data on the website's server rather than in the user's browser.

4.  **IP anonymisation**
    The process of removing or masking your IP address from data records to protect your identity.

5.  **Log anonymisation**
    Scrubbing or hiding personal information from server logs after a short period.

6.  **Pseudonymisation**
    Replacing identifiable information (like your name) with a fake, reversible identifier (like a random ID number).

7.  **Anonymisation**
    The process of permanently altering data so that an individual can no longer be identified from it.

8.  **De-identification**
    The general process of removing identifying details from a dataset.

9.  **Re-identification risk**
    The risk that someone could reverse the de-identification process and figure out who the data belongs to.

10. **Differential privacy**
    A advanced mathematical technique that adds a tiny amount of statistical "noise" to data, allowing for useful insights while making it nearly impossible to identify any single person.

11. **k-anonymity**
    A privacy standard where an individual's information is hidden in a group of at least "k" people who share the same characteristics.

12. **l-diversity**
    An enhancement to k-anonymity that also requires diversity in the sensitive data within each group.

13. **t-closeness**
    A further privacy enhancement that ensures the data within each group closely resembles the overall data in the entire dataset.

14. **Synthetic data**
    Artificially generated data that is created to mimic the patterns and trends of real data, but contains no actual personal information.

15. **Secure multi-party computation (MPC)**
    A cryptographic technique that allows multiple parties to jointly analyze their combined data without any one party seeing the raw data of the others.

16. **Homomorphic encryption**
    A form of encryption that allows calculations to be performed on encrypted data without first decrypting it.

17. **Zero-knowledge proofs (ZKP)**
    A cryptographic method where one party can prove to another that they know a value (e.g., a password) without revealing the value itself.

18. **Private information retrieval (PIR)**
    A technique that allows a user to retrieve an item from a database without the database owner knowing which item was retrieved.

19. **Oblivious HTTP (OHTTP)**
    A protocol that separates who you are from what you are asking for, using proxies and encryption to enhance privacy.

20. **Mix networks (mixnets)**
    A network of computers that shuffle and encrypt internet traffic to hide where it came from and where it's going.

21. **Onion routing**
    The layered encryption technique used by the Tor network to anonymize internet traffic.

22. **Trusted execution environment (TEE)**
    A secure, isolated area within a computer's main processor that protects code and data from the rest of the system.

23. **Confidential computing**
    Cloud computing technology that protects data while it is being processed, even from the cloud provider itself.

24. **Client-side event measurement**
    Recording user interactions (like clicks) directly in the web browser.

25. **Privacy budget accounting**
    A concept where a browser limits how much unique identifying information a website can learn about you through various technical queries.

26. **Federated learning**
    A machine learning technique where the model is trained across many user devices without the raw data ever leaving the device.

27. **On-device processing**
    Performing data analysis and computation directly on your device (like your phone) instead of sending it to a remote server.

28. **Data minimisation (practice)**
    The practice of only collecting and storing the absolute minimum amount of data needed for a specific purpose.

29. **Data retention schedule**
    A policy that defines how long different types of data will be kept before they are securely deleted.

30. **Data classification**
    The process of categorizing data based on its sensitivity (e.g., public, confidential, restricted) to determine the appropriate level of protection.

---

## Browser & HTTP

1.  **User-Agent**
    A string of text your browser sends to every website, identifying the browser type, version, and operating system.

2.  **User-Agent Client Hints (UA-CH)**
    A more privacy-focused way for websites to request only the specific browser or device details they need, rather than getting the full User-Agent string.

3.  **Accept-Language**
    A header your browser sends to tell a website which languages you prefer.

4.  **Accept-Encoding**
    A header that tells a website what compression methods your browser supports, to make pages load faster.

5.  **Referrer**
    The web address of the previous page that linked to the current page.

6.  **Referrer-Policy**
    A setting that controls how much of the "referrer" information is sent to other websites.

7.  **Origin**
    The combination of protocol (http/https), domain, and port that defines a specific website's security boundary.

8.  **Same-Origin Policy (SOP)**
    A critical browser security rule that prevents a website from accessing data from a different website.

9.  **CORS**
    A security mechanism that allows a website to give *explicit permission* for another website to access its resources, relaxing the Same-Origin Policy.

10. **Content Security Policy (CSP)**
    A powerful security feature that helps websites prevent malicious code from running by specifying which sources of scripts are trusted.

11. **Permissions-Policy**
    A browser feature that lets a website disable certain browser features (like the camera or geolocation) for security and privacy.

12. **Mixed content**
    When a secure HTTPS page loads resources (like images or scripts) over an insecure HTTP connection, creating a security vulnerability.

13. **HSTS**
    A web security policy that forces your browser to only use a secure HTTPS connection with a website, preventing downgrade attacks.

14. **HTTP/2**
    A major revision of the HTTP network protocol that makes websites load faster.

15. **HTTP/3 (QUIC)**
    The next-generation HTTP protocol, built on a modern transport (QUIC) for even better performance and reliability.

16. **Cache-Control**
    Instructions that tell browsers and proxies how long they can store a copy of a web page or resource.

17. **ETag**
    A identifier for a specific version of a resource, used for caching. It can sometimes be misused for tracking.

18. **Vary**
    A HTTP header that tells a cache which request headers (like Accept-Language) should be considered when deciding if a cached response can be used.

19. **Link rel=preload**
    An instruction to the browser to start loading a critical resource (like a font or script) as early as possible.

20. **DNS prefetch**
    A hint for the browser to look up the IP address of a domain ahead of time, speeding up future connections.

21. **Preconnect**
    A hint for the browser to establish a network connection to a server before a resource is needed, reducing latency.

22. **Prefetch**
    A hint for the browser to download a resource (like the next page a user is likely to visit) in the background.

23. **Speculation Rules (prerender)**
    Advanced hints that allow a browser to safely pre-render an entire page, making it load instantly when clicked.

24. **Subresource Integrity (SRI)**
    A security feature that allows a website to ensure that externally hosted scripts have not been tampered with.

25. **Fetch Metadata headers**
    A set of HTTP headers that provide context about a request (like where it came from), helping servers detect and block malicious attacks.

26. **COOP**
    A security header that isolates a web page in the browser, preventing other sites from interacting with it in a harmful way.

27. **COEP**
    A security header that requires all resources on a page to be explicitly opted-in, enabling the use of powerful, isolated features.

28. **Document Policy**
    A set of rules that define how a webpage should behave, such as preventing synchronous scripts for better performance.

29. **FedCM**
    A privacy-preserving way to sign into websites using your existing accounts (like Google or Apple) without being tracked across the web.

30. **WebAuthn / Passkeys**
    A modern, phishing-resistant login standard that uses your device's biometrics (like a fingerprint) or a security key instead of a password.

---

## Cloud/SaaS & Ops Governance

1.  **Data residency**
    The physical geographical location where data is stored.

2.  **Encryption at rest**
    The practice of encrypting data when it is stored on a disk or database.

3.  **Encryption in transit**
    The practice of encrypting data while it is moving across a network.

4.  **Customer-managed keys (CMK)**
    An encryption model where the customer, not the cloud provider, retains control and management of the encryption keys.

5.  **Bring your own key (BYOK)**
    When a customer provides their own encryption keys for a cloud service to use.

6.  **Key escrow**
    The process of storing a copy of a cryptographic key with a trusted third party for recovery purposes.

7.  **Key rotation policy**
    A security practice of periodically replacing old encryption keys with new ones.

8.  **Access logs**
    Records that show who accessed a system, what they did, and when.

9.  **Audit logs**
    Secure, tamper-resistant records of administrative actions and system changes, used for compliance and security investigations.

10. **Shared responsibility model**
    A framework that defines the security obligations of the cloud provider and the customer using the cloud service.

11. **Data processing addendum (DPA)**
    A legal contract that outlines the data protection responsibilities between a company and its service providers.

12. **Sub-processor**
    A third-party vendor that a service provider uses to help process personal data.

13. **Vendor risk assessment**
    The process of evaluating a supplier's security and privacy practices before doing business with them.

14. **Third-party risk management (TPRM)**
    The ongoing process of identifying, assessing, and mitigating the risks associated with external suppliers and partners.

15. **Data breach**
    A security incident in which sensitive, protected, or confidential data is accessed or disclosed without authorization.

16. **Redaction**
    The process of permanently removing or obscuring sensitive information from a document.

17. **Tokenisation**
    The process of replacing sensitive data with non-sensitive substitutes, called tokens, which have no exploitable value.

18. **Hashing**
    A one-way mathematical process that converts input data into a fixed-length string of characters, which acts as a digital fingerprint.

19. **Salt and pepper (hashing)**
    Random data that is added to a password before hashing to defend against pre-computed attacks.

20. **Privacy by design**
    An approach to systems engineering that takes privacy into account throughout the entire development process.

21. **Privacy policy**
    A legal document that explains how an organization collects, uses, and manages a user's data.

---

## Cookies & Storage

1.  **Cookie**
    A small piece of data stored on your device by a website you visit, used to remember information about you or your activity.

2.  **First-party cookie**
    A cookie set by the website you are directly visiting (e.g., a cookie from `example.com` when you are on `example.com`).

3.  **Third-party cookie**
    A cookie set by a domain other than the one you are directly visiting, often by embedded content like ads or social media widgets.

4.  **SameSite=Lax**
    A cookie setting that mostly prevents the cookie from being sent on cross-site requests, but allows it when you click a link to the site.

5.  **SameSite=Strict**
    A secure cookie setting that prevents the cookie from being sent on any request that originates from another site.

6.  **SameSite=None; Secure**
    A cookie setting that explicitly allows the cookie to be sent on cross-site requests, but only over a secure HTTPS connection.

7.  **HttpOnly**
    A security flag for a cookie that prevents it from being accessed by JavaScript, helping to protect it from theft.

8.  **Secure attribute**
    A security flag for a cookie that ensures it is only sent to the server over a secure HTTPS connection.

9.  **Persistent cookie**
    A cookie that remains on your device for a set period of time (defined by its expiration date) until it is deleted or expires.

10. **Session cookie**
    A temporary cookie that is deleted as soon as you close your browser.

11. **Max-Age / Expires**
    Cookie attributes that define how long a persistent cookie should remain on your device.

12. **Partitioned cookies (CHIPS)**
    A new type of cookie that is scoped to the top-level site you are on, preventing embedded third-party content from using it for cross-site tracking.

13. **Storage partitioning**
    A browser privacy feature that isolates website data (like cookies and cache) by the top-level site you are visiting, preventing cross-site tracking.

14. **LocalStorage**
    A place in your browser where a website can store larger amounts of data that persists even after you close the browser.

15. **SessionStorage**
    Similar to LocalStorage, but the data is cleared as soon as you close the browser tab.

16. **IndexedDB**
    A built-in database in your browser that allows websites to store large amounts of structured data.

17. **Cache Storage**
    A storage area used by websites to save files (like images and scripts) so the site can load faster or work offline.

18. **Origin Private File System (OPFS)**
    A private, high-performance file system within your browser that a website can use to manage its own data.

19. **Storage Access API**
    A browser feature that allows embedded content (like a comment widget) to request permission to access its own stored data, which is otherwise blocked for privacy.

20. **Quota management**
    The system browsers use to limit how much data each website can store on your device.

21. **Cookie banner**
    The pop-up notice on a website that asks for your consent to use cookies, often required by privacy laws.

22. **Consent Mode (Google)**
    A Google framework that adjusts how its tracking tags behave based on the cookie consent choices you make on a website.

23. **Session fixation**
    A type of cyber attack where an attacker forces you to use a known session ID, allowing them to hijack your session after you log in.

24. **Cookie poisoning**
    The act of maliciously modifying a cookie's content to bypass security or impersonate a user.

25. **Flash cookies (LSO)**
    A legacy type of storage from the old Adobe Flash Player, notorious for being hard to delete and used to respawn regular cookies.

---

## DNS & Resolution

1.  **DNS**
    The "phonebook of the internet" that translates human-friendly domain names (like `example.com`) into numerical IP addresses that computers use.

2.  **DNS over HTTPS (DoH)**
    A security and privacy feature that sends your DNS queries over an encrypted HTTPS connection, so your internet provider or others on the network can't see which websites you're looking up.

3.  **DNS over TLS (DoT)**
    Similar to DoH, this encrypts DNS queries, but uses a dedicated, standard TLS-encrypted connection.

4.  **DNS over QUIC (DoQ)**
    A newer method for encrypting DNS queries using the modern QUIC transport protocol for better performance and privacy.

5.  **DNSSEC**
    A security technology that adds digital signatures to DNS data, ensuring that the website address you receive hasn't been tampered with.

6.  **QNAME minimisation**
    A privacy technique where a DNS resolver sends only the minimal amount of information needed (e.g., just the domain name, not your full IP) to upstream servers to fulfill your query.

7.  **Resolver**
    The server (often provided by your internet company) that your device asks to look up website addresses.

8.  **Recursive resolver**
    A DNS resolver that does the hard work of tracking down the full answer to your DNS query by asking multiple other servers across the internet.

9.  **Authoritative nameserver**
    The server that holds the definitive, official DNS records for a particular domain.

10. **A record**
    The fundamental DNS record that maps a domain name to an IPv4 address.

11. **AAAA record**
    The DNS record that maps a domain name to an IPv6 address.

12. **CNAME record**
    A "canonical name" record that makes one domain name an alias of another domain name.

13. **PTR record**
    A "pointer" record used for reverse DNS lookups, which maps an IP address back to a domain name.

14. **TXT record**
    A flexible DNS record that holds text information, often used for email security verification or other site policies.

15. **NXDOMAIN**
    A DNS response meaning "this domain name does not exist."

16. **Split-horizon DNS**
    A setup where a DNS server provides different answers to the same query depending on who is asking (e.g., different answers for internal vs external users).

17. **EDNS Client Subnet (ECS)**
    A method that sends a hint about your network location (a part of your IP) with a DNS query, which can improve performance but may reduce privacy.

18. **Oblivious DoH (ODoH)**
    An enhanced privacy version of DoH that uses a proxy to separate your IP address from your DNS query before it is sent to the resolver.

19. **DNS leak**
    When your DNS queries are accidentally sent outside of an encrypted tunnel (like a VPN), potentially revealing your browsing activity.

20. **Resolver logging**
    When a DNS resolver keeps records of the queries it processes, which can create a history of the sites you've visited.

---

## Device & OS Privacy

1.  **App Tracking Transparency (ATT)**
    The iOS feature that requires apps to ask for your permission before tracking your activity across other companies' apps and websites.

2.  **Android Advertising ID reset**
    The feature on Android devices that lets you easily reset or delete the unique identifier used for advertising.

3.  **Privacy dashboard (Android)**
    A central place in Android settings where you can see a timeline of which apps have accessed your sensitive data (like location or microphone).

4.  **iCloud Private Relay**
    An Apple subscription service that hides your IP address and encrypts your web browsing traffic so that neither Apple nor your network can see both who you are and what sites you visit.

5.  **App Privacy labels (iOS)**
    The nutrition-like labels on the Apple App Store that summarize what data an app collects and how it's used.

6.  **Background App Refresh**
    An OS feature that allows apps to update their content in the background; can sometimes be used to leak data.

7.  **Clipboard access notifications**
    Alerts on iOS and Android that appear when an app reads the content you've copied to your clipboard.

8.  **Bluetooth scanning permissions**
    OS-level controls that restrict how apps can use Bluetooth to discover nearby devices and beacons, limiting location tracking.

9.  **Precise vs approximate location**
    A user setting that allows you to grant an app your general area (e.g., a city) instead of your exact GPS coordinates.

10. **MAC address randomisation**
    A privacy technique where a device uses a random, changing hardware identifier for Wi-Fi and Bluetooth connections to prevent long-term tracking.

11. **App sandbox**
    A security mechanism that restricts each app's access to files, settings, and hardware, preventing it from interfering with other apps or the OS.

12. **Scoped storage (Android)**
    A privacy feature on Android that limits an app's access to the device's file system, typically only allowing it to see its own files and specific shared media.

13. **SafetyNet / Play Integrity**
    Google services that help app developers check if a device is secure and hasn't been tampered with.

14. **App Transport Security (ATS)**
    A security feature in iOS that encourages apps to use secure, encrypted HTTPS connections for all network communication.

15. **Push notification privacy**
    Controls that let you hide the content of notifications on your lock screen and limit the data apps can gather through them.

16. **Photo picker permissions**
    A modern OS feature that lets you grant an app access to only selected photos, instead of your entire photo library.

17. **Nearby devices permission**
    A granular Android permission that controls whether an app can discover and connect to devices nearby via Wi-Fi, Bluetooth, etc.

18. **Wi-Fi scanning & probe requests**
    A method devices use to find nearby Wi-Fi networks; the signals can be used to track your location and movement over time.

19. **Carrier messaging vs OTT**
    Traditional SMS/MMS (carrier) vs. internet-based messaging apps like WhatsApp or Signal (Over-The-Top), which have different privacy and security properties.

20. **Device encryption**
    The technology that scrambles all the data on your device, so it can only be read if you enter your passcode or use your biometrics (like a fingerprint).

---

## Email & Messaging

1.  **SPF**
    A DNS record that lists the mail servers authorized to send email on behalf of a domain, helping to prevent email spoofing.

2.  **DKIM**
    A method that adds a digital signature to an email, allowing the receiver to verify that it was truly sent by the claimed domain and wasn't altered.

3.  **DMARC**
    A policy that builds on SPF and DKIM, telling receiving mail servers what to do if an email fails authentication (e.g., quarantine or reject it).

4.  **BIMI**
    A new standard that allows companies that pass strict email authentication (DMARC) to display their logo in your email inbox.

5.  **STARTTLS**
    A command that upgrades an insecure email connection to a secure, encrypted TLS connection, if the receiving server supports it.

6.  **MTA-STS**
    A standard that forces email servers to use a secure TLS connection when delivering mail to a domain that supports it, preventing downgrade attacks.

7.  **TLS-RPT**
    A reporting policy that lets domain owners receive reports about email delivery issues related to TLS encryption.

8.  **Email tracking pixels**
    Tiny, invisible images embedded in an email that alert the sender when you open the email, potentially revealing your IP address and device info.

9.  **Link tracking**
    The practice of using unique, personalized URLs in emails to track who clicks on them and when.

10. **Apple Mail Privacy Protection**
    A feature in Apple's Mail app that pre-loads and hides images in emails, preventing senders from knowing when you opened an email or your IP address.

11. **Read receipt**
    A notification sent back to the email sender confirming that you have opened their message.

12. **End-to-end encryption (E2EE)**
    A system of communication where only the people communicating can read the messages. Not even the service provider (like WhatsApp or Signal) can decrypt them.

13. **OTR messaging**
    An older chat protocol ("Off-the-Record") that provided strong encryption and forward secrecy.

14. **Signal Protocol**
    A modern, highly-regarded encryption protocol used by Signal, WhatsApp, and others to provide end-to-end encryption.

15. **RCS**
    The modern successor to SMS, offering features like read receipts and higher-quality media, but with varying levels of encryption depending on the provider.

16. **SIM swap**
    A fraud where a criminal tricks your mobile carrier into transferring your phone number to a SIM card in their possession, allowing them to intercept your calls and texts.

17. **SMS interception**
    The act of capturing text messages, sometimes through malware on your phone or via fake cell towers.

18. **Metadata**
    "Data about data." In communications, this is information about *who* you talked to, *when*, and for *how long*—which can be very revealing, even if the content is encrypted.

19. **Forward secrecy (messaging)**
    A property of an encryption system where compromising your long-term keys does not allow an attacker to decrypt your past conversations.

20. **Encrypted backups**
    Storing a copy of your message history (e.g., from a messaging app) in an encrypted format, protecting it from unauthorized access.

---

## Fingerprinting & Tracking Techniques

1.  **Canvas fingerprinting**
    A tracking method that identifies your device by subtly measuring how it draws images and text on an invisible web page element.

2.  **WebGL fingerprinting**
    A tracking method that identifies your device based on the unique characteristics of your graphics card and driver.

3.  **AudioContext fingerprinting**
    A tracking method that exploits tiny, imperceptible differences in how your device processes audio.

4.  **WebGPU fingerprinting**
    A next-generation tracking method that uses the unique capabilities of your modern graphics card for identification.

5.  **Font enumeration**
    The process of detecting which fonts are installed on your device to create a more unique identifier.

6.  **Plugin enumeration**
    The process of listing the browser plugins or helper applications you have installed, which can be used to help identify you.

7.  **hardwareConcurrency**
    A browser property that reveals the number of CPU cores (or threads) your device has.

8.  **deviceMemory**
    A browser property that gives a rough estimate of how much RAM your device has.

9.  **Screen resolution**
    The number of pixels on your display, a common data point used for fingerprinting.

10. **Timezone/locale fingerprint**
    Using your device's time zone, language, and regional settings to help guess your location and identify you.

11. **MediaDevices enumeration**
    Listing the microphones and cameras connected to your device, which can aid in fingerprinting even if no permission is granted to use them.

12. **WebRTC local IP discovery**
    A technique that can reveal your device's local (internal) IP address through browser features designed for video calls.

13. **Client Hints entropy**
    Using the new, more privacy-focused browser signals (Client Hints) in combination to create a fingerprint.

14. **maxTouchPoints**
    A property that reveals how many simultaneous touch points your device supports.

15. **Sensor APIs**
    Browser interfaces for motion and orientation sensors that can reveal unique device calibration data.

16. **Gamepad API fingerprinting**
    Detecting connected game controllers to add a rare and identifying feature to your fingerprint.

17. **TLS fingerprinting (JA3)**
    Identifying your device or software by the unique way it sets up a secure TLS connection.

18. **HTTP/2/3 settings fingerprinting**
    Identifying your browser by the specific technical settings it uses for modern HTTP protocols.

19. **HSTS supercookies**
    An advanced tracking method that abuses a browser security feature (HSTS) to store a persistent identifier.

20. **ETag tracking**
    Misusing a browser caching mechanism (ETags) to create a tracker that respawns after you clear cookies.

21. **CNAME cloaking**
    A trick where a third-party tracker disguises itself as a first-party service by using a DNS alias (CNAME), making it harder to block.

22. **Bounce tracking**
    A tracking technique that uses quick, invisible redirects through multiple sites to set identifiers without your knowledge.

23. **Cache probing**
    A method where a site tests which resources are already in your browser cache to infer your past browsing history.

24. **Favicon supercookie**
    An advanced tracking method that uses the browser's caching behavior for website icons (favicons) to store an identifier.

25. **Link-decoration IDs**
    Adding unique tracking IDs to web links (like `?id=12345`) to follow you across the web.

26. **Evercookie**
    A notorious tracking script designed to store identifiers in multiple, hard-to-delete places on your device to make removal difficult.

27. **TLS session resumption tracking**
    Using the unique tokens from secure TLS connections to link your visits to a site.

28. **Tracking pixels (beacons)**
    Tiny, invisible images on a webpage or in an email used to log that you viewed the page or email.

29. **navigator.webdriver detection**
    A method used by sites to detect if your browser is being controlled by automation software (like for testing), which can also flag privacy tools.

30. **WebGL vendor/renderer**
    The specific model names of your graphics card and driver, which are often exposed and are highly unique for tracking.

31. **Web storage fingerprinting**
    Observing how your browser handles storage (like its limits and performance) to aid in identification.

32. **Font metrics fingerprinting**
    Measuring the precise size and shape of rendered text to detect which fonts are installed, even without a full list.

33. **Keystroke dynamics**
    Profiling you based on your unique typing rhythm and speed.

34. **Mouse movement tracking**
    Recording the path, speed, and acceleration of your mouse cursor to create a behavioral profile.

35. **Device fingerprint (composite)**
    The final, probabilistic identifier created by combining dozens of individual data points about your device and browser.

---

## Network & IP

1.  **IP address (IPv4)**
    A unique numerical label assigned to every device connected to a network, like a home address for your computer on the internet. The classic format uses four numbers separated by dots.

2.  **IPv6**
    The newer, much larger version of internet addresses, designed to provide enough unique addresses for every device in the world. It uses a longer, more complex format with letters and numbers.

3.  **Temporary IPv6 addresses (privacy extensions)**
    A privacy feature that makes your device use a random, temporary IPv6 address that changes over time, making it harder to track you based on your IP.

4.  **Subnet mask**
    A number that helps devices figure out which part of an IP address identifies the local network and which part identifies a specific device on that network.

5.  **CIDR**
    A flexible method for specifying a range of IP addresses, replacing the old, rigid "class" system.

6.  **Autonomous System Number (ASN)**
    A unique number assigned to a large network (like an internet provider or big tech company) that controls its own routing policies on the internet.

7.  **Internet Service Provider (ISP)**
    The company you pay to get access to the internet (e.g., Comcast, BT, Vodafone).

8.  **Network Address Translation (NAT)**
    A technology that lets multiple devices in your home share a single public IP address, acting as a traffic coordinator for your private home network.

9.  **Carrier-Grade NAT (CGNAT)**
    An extension of NAT used by some mobile and internet providers, where many customers share the same public IP address, which can cause issues for some online games or services.

10. **Proxy server (HTTP)**
    An intermediary server that sits between your device and the internet. It can be used for filtering content, improving performance, or hiding your IP address.

11. **SOCKS proxy**
    A more general-purpose type of proxy that can handle any kind of internet traffic, not just web browsing.

12. **Reverse proxy**
    A server that sits in front of web servers, protecting them from direct exposure to the internet and helping with load balancing and security.

13. **VPN (Virtual Private Network)**
    A service that creates a secure, encrypted tunnel between your device and a server on the internet, hiding your online activity from your local network and ISP.

14. **Tor (The Onion Router)**
    A free, volunteer-run network that routes your internet traffic through multiple layers of encryption and relays to provide strong anonymity.

15. **Tor exit node**
    The final relay in the Tor network where your internet traffic emerges onto the public internet. The IP of this node is what websites see.

16. **Reverse DNS (PTR)**
    The process of looking up a domain name associated with an IP address—the opposite of a normal DNS lookup.

17. **IP geolocation**
    The practice of estimating a user's physical location based on their IP address.

18. **Anycast**
    A network technique where the same IP address is announced from multiple locations worldwide, automatically routing your request to the nearest server for better performance.

19. **BGP (Border Gateway Protocol)**
    The "postal system of the internet" that figures out how to route data between large, independent networks.

20. **WebRTC leak**
    A potential privacy issue where a website can discover your real public or local IP address through browser features meant for video chatting, even if you're using a VPN.

21. **STUN**
    A protocol that helps devices discover their own public IP address, which is necessary for setting up direct peer-to-peer connections (like video calls).

22. **TURN**
    A relay server used when a direct peer-to-peer connection can't be established, acting as a middleman for the data.

23. **Public vs private IP**
    A public IP is your network's address on the wider internet. A private IP is an address used only within your local home or office network.

24. **DHCP**
    The technology that automatically assigns an IP address to your device when you join a network.

25. **TTL (Time To Live)**
    A counter in network data that limits how many times it can be forwarded before being discarded, preventing it from circulating forever.

26. **MTU (Maximum Transmission Unit)**
    The largest size a single piece of data (a "packet") can be when sent over a network connection.

27. **Packet loss**
    When pieces of data sent over a network fail to reach their destination, causing slowdowns, glitchy calls, or disconnections.

28. **Latency (ping)**
    The time it takes for data to make a round trip from your device to a server and back. Low latency is crucial for real-time activities like gaming and video calls.

29. **Split tunnelling**
    A VPN feature that lets you choose which apps send their traffic through the VPN tunnel and which apps connect directly to the internet.

30. **MAC randomisation**
    A privacy feature where your device uses a random, changing hardware identifier for Wi-Fi connections, making it harder to track your physical location.

---

## Privacy Signals & Controls

1.  **Do Not Track (DNT)**
    A legacy browser setting that sent a request to websites asking them not to track you. It was largely ignored by the industry.

2.  **Global Privacy Control (GPC)**
    A modern, stronger browser signal that tells websites you legally opt-out of the sale or sharing of your personal data.

3.  **Topics API opt-out**
    A browser setting that prevents your interests from being shared with advertisers via the Topics API.

4.  **Protected Audience controls**
    Browser settings that let you manage on-device ad auctions and remarketing.

5.  **Privacy Budget**
    A proposed browser concept to limit how much unique identifying information a website can extract from your device, curbing fingerprinting.

6.  **Enhanced Tracking Protection (ETP)**
    Firefox's built-in feature that blocks known third-party trackers by default.

7.  **Intelligent Tracking Prevention (ITP)**
    Safari's system for limiting cross-site tracking by restricting cookies and other website data.

8.  **Brave Shields**
    Brave browser's built-in suite of privacy tools that block ads, trackers, and fingerprinting attempts.

9.  **Private browsing / Incognito**
    A browser mode that doesn't save your history, cookies, or form data locally, but does *not* make you anonymous to websites or your internet provider.

10. **HTTPS-Only mode**
    A browser setting that forces all connections to use secure HTTPS encryption, protecting you from spies on the network.

11. **Clear-Site-Data**
    A command a website can send to your browser to immediately delete all of its stored data (cookies, cache, etc.).

12. **Site Isolation**
    A browser security architecture that loads each website in a separate process, preventing malicious sites from stealing data from other tabs.

13. **Permissions prompts**
    The pop-up dialogues in your browser that ask for your consent to access sensitive features like your camera, microphone, or location.

14. **First-Party Sets**
    A proposed web standard that would let a company declare that its different, related websites (e.g., youtube.com and google.com) should be treated as a single "first party" for logging in, with user control.

15. **Third-party cookie phase-out**
    The ongoing effort by browser makers to completely block third-party tracking cookies by default.

16. **Fingerprinting protections**
    Various browser features that reduce or standardize the technical signals websites can use to create a unique fingerprint of your device.

17. **Network prediction/preloading toggle**
    A browser setting that disables features which pre-load pages you might visit, improving privacy but potentially slowing down browsing.

18. **Tracking Protection lists**
    Curated lists of known tracking domains that browsers or extensions use to block trackers.

19. **Content blockers**
    Browser extensions or built-in features that filter out ads, trackers, and malicious content.

20. **AdChoices opt-out**
    An industry program that lets you opt-out of interest-based advertising from participating companies.

---

## Regulatory, Legal & Rights

1.  **GDPR**
    The comprehensive data privacy law in the European Union, giving individuals strong rights over their personal data.

2.  **UK GDPR**
    The United Kingdom's version of the GDPR, which took effect after Brexit.

3.  **CCPA / CPRA**
    The California Consumer Privacy Act (and its expansion, the CPRA), a state law granting Californians rights over their personal information.

4.  **POPIA**
    South Africa's Protection of Personal Information Act, governing the processing of personal data.

5.  **LGPD**
    Brazil's General Data Protection Law, similar in scope and principles to the GDPR.

6.  **ePrivacy Directive**
    The EU law that specifically regulates privacy in electronic communications, including rules on cookies and marketing emails.

7.  **PECR**
    The UK's Privacy and Electronic Communications Regulations, which implement the ePrivacy Directive.

8.  **ePrivacy Regulation**
    A proposed new EU law to replace the current ePrivacy Directive, with stricter rules for communications privacy.

9.  **PCI DSS**
    The security standard that all companies handling credit card information must follow.

10. **ISO/IEC 27001**
    An internationally recognized standard for managing an Information Security Management System.

11. **ISO/IEC 27701**
    A privacy extension to the ISO 27001 standard, providing a framework for a Privacy Information Management System.

12. **SOC 2**
    A report from an independent auditor verifying that a service provider has strong security, availability, and confidentiality controls.

13. **NIST Privacy Framework**
    A U.S. government-developed tool to help organizations manage privacy risk.

14. **Schrems II**
    A landmark EU court ruling that invalidated the Privacy Shield agreement for transferring personal data to the U.S., tightening rules for international data flows.

15. **Standard Contractual Clauses (SCCs)**
    Pre-approved model contracts issued by the European Commission for legally transferring personal data outside the EU.

16. **Data Protection Impact Assessment (DPIA)**
    A formal process to identify and minimize the data protection risks of a project before it starts.

17. **Privacy Impact Assessment (PIA)**
    A broader assessment of how a project affects individual privacy.

18. **ROPA**
    A Record of Processing Activities—a document that organizations must maintain, listing what personal data they process, why, and how.

19. **Lawful basis for processing**
    The legal justification a company must have to use your personal data, such as your consent, a contract, or a "legitimate interest."

20. **Legitimate interests assessment (LIA)**
    A test a company must do to balance its business needs against your privacy rights when using "legitimate interest" as a legal basis.

21. **Data minimisation (principle)**
    A core privacy principle that you should only collect personal data that is strictly necessary for your purpose.

22. **Purpose limitation**
    A privacy principle that you can only use personal data for the specific purpose you originally collected it for.

23. **Storage limitation**
    A privacy principle that you must not keep personal data for longer than you need it.

24. **Integrity and confidentiality**
    A privacy principle that requires personal data to be kept secure and protected against unauthorized access.

25. **Data controller**
    The organization that decides why and how personal data will be processed.

26. **Data processor**
    An organization that processes personal data on behalf of a controller (e.g., a cloud storage provider).

27. **Joint controllers**
    Two or more organizations that together decide why and how to process personal data.

28. **Data Processing Agreement (DPA)**
    A legally required contract between a data controller and a data processor.

29. **International data transfer**
    Sending personal data from one country to another, which is heavily regulated under laws like the GDPR.

30. **Data localisation / sovereignty**
    Laws that require data to be stored and processed within a specific country's borders.

---

## Security, Transport & PKI

1.  **TLS**
    The protocol that encrypts your connection to websites, shown as the padlock in your browser's address bar. It protects your data from being read or tampered with in transit.

2.  **TLS 1.3**
    The latest, most secure, and fastest version of the TLS encryption protocol.

3.  **Cipher suite**
    The specific set of encryption algorithms used to secure a TLS connection.

4.  **ECDHE**
    A modern key exchange algorithm that provides "Forward Secrecy."

5.  **Perfect Forward Secrecy (PFS)**
    A property of an encryption system where a compromise of the server's long-term key does *not* allow an attacker to decrypt past recorded conversations.

6.  **Certificate Authority (CA)**
    A trusted organization that issues digital certificates to verify the identity of websites.

7.  **Certificate chain**
    The sequence of certificates that links a website's certificate back to a trusted root Certificate Authority, building a chain of trust.

8.  **Certificate Transparency**
    A public logging system that helps detect mistakenly or maliciously issued SSL certificates.

9.  **OCSP**
    A protocol for checking if a website's security certificate has been revoked before it expires.

10. **OCSP stapling**
    A performance and privacy improvement where the web server provides proof of certificate validity, so your browser doesn't have to check itself.

11. **ALPN**
    A TLS extension that allows a browser and server to agree on which application protocol (like HTTP/2) to use during the secure handshake.

12. **HSTS preload list**
    A list of websites hardcoded into browsers that must *only* be accessed over HTTPS, even if you type "http://".

13. **SNI**
    An part of the TLS handshake that tells the server which website you're trying to reach. This is normally sent in plain text, revealing the site name.

14. **Encrypted ClientHello (ECH)**
    A new technology that encrypts the SNI, hiding which website you are visiting from network observers.

15. **TLS session tickets**
    A method to resume a previous TLS session more quickly, but which must be managed carefully to avoid tracking.

16. **MITM (Man-in-the-Middle)**
    A cyber attack where a criminal secretly intercepts and potentially alters the communication between two parties.

17. **Self-signed certificate**
    A security certificate that has not been issued by a trusted Certificate Authority. It will cause browser warnings and is not suitable for public websites.

18. **Root certificate store**
    The collection of trusted Certificate Authorities built into your operating system or browser.

19. **CRL (Certificate Revocation List)**
    A list, published by a Certificate Authority, of certificates that have been revoked before their expiration date.

20. **SSL stripping**
    An attack that downgrades a secure HTTPS connection to an insecure HTTP connection without the user noticing.

21. **mTLS**
    Mutual TLS, where both the client and the server present certificates to authenticate each other, common in zero-trust architectures.

22. **DANE**
    A method of binding a website's certificate to its DNS record using DNSSEC.

23. **DNS CAA**
    A DNS record that specifies which Certificate Authorities are allowed to issue certificates for a domain.

24. **Key pinning (HPKP)**
    A deprecated and risky security mechanism that told browsers to only accept specific certificates for a site.

25. **Key rotation**
    The security practice of regularly replacing cryptographic keys to limit the damage if a key is compromised.

26. **Public Key Infrastructure (PKI)**
    The entire system of hardware, software, policies, and standards used to create, manage, and distribute digital certificates.

27. **Key Management Service (KMS)**
    A cloud service that helps you create and control the encryption keys used to protect your data.

28. **Hardware Security Module (HSM)**
    A physical computing device that safeguards and manages digital keys, providing the highest level of security.

29. **Zero trust network access (ZTNA)**
    A security model that assumes no user or device is trustworthy by default, requiring continuous verification.

30. **SASE**
    A cloud-based architecture that combines wide-area networking with comprehensive security services (like Zero Trust).

---

## Social, IoT & Biometrics

1.  **Shadow profile**
    Data that a company collects about you without your direct input or consent, often inferred from your contacts or online activity.

2.  **Social graph**
    A map of your relationships and interactions with other people on a social platform.

3.  **Geotagging**
    Adding geographical location data to a digital object like a photo, social media post, or video.

4.  **Data scraping**
    Using automated software to extract large amounts of data from websites or apps.

5.  **Third-party app access**
    When you grant an external application permission to access your data on another platform (like logging into a game with your Facebook account).

6.  **OAuth consent screen**
    The pop-up that asks for your permission when an app wants to access your data from another service (like Google or Facebook).

7.  **Smart speaker**
    A voice-activated device, like an Amazon Echo or Google Nest, that listens for a "wake word" and processes your commands.

8.  **Wake word**
    The phrase that activates a smart assistant, like "Alexa" or "Hey Google."

9.  **Always-on listening**
    The feature of smart devices that continuously listens for its wake word, raising privacy concerns about constant audio monitoring.

10. **Device telemetry**
    Diagnostic and usage data that devices automatically send back to the manufacturer.

11. **Telemetry opt-out**
    A setting, often buried in menus, that allows you to reduce or stop your device from sending telemetry data.

12. **Firmware update policy**
    A company's policy for providing security and feature updates for the built-in software of its devices.

13. **Smart TV ACR**
    Automatic Content Recognition—a feature in many smart TVs that analyzes what you're watching to serve ads or recommendations.

14. **Cross-device tracking**
    Linking your online activity across your phone, laptop, tablet, and other devices to build a more complete profile of you.

15. **BLE beacons**
    Small, low-power Bluetooth devices that broadcast a signal, often used in stores to track customer movement or send push notifications.

16. **UWB positioning**
    Ultra-Wideband technology that enables extremely precise indoor location tracking, used for finding keys or unlocking your car with your phone.

17. **Facial recognition**
    A biometric technology that identifies or verifies a person from a digital image or video.

18. **Biometric template**
    A mathematical representation of your unique biological characteristic (like your fingerprint or face) that is stored for future comparison.

19. **Liveness detection**
    A security feature that ensures a biometric sample is coming from a live, present person and not a photo or recording.

20. **Voiceprint**
    A unique model of your voice used for speaker identification.

21. **Iris scan**
    A biometric method that uses the unique patterns in the colored ring of your eye for identification.

22. **Fingerprint (biometric)**
    Using the unique patterns on your fingertip to unlock devices or authenticate your identity.

23. **Behavioural biometrics**
    Identifying individuals based on unique patterns in their behavior, such as how they type, walk, or hold their phone.

24. **Age-appropriate design code (UK)**
    A set of standards in the UK that requires online services likely to be accessed by children to prioritize their privacy and safety by design.

---

## Threats & Attacks

1.  **Phishing**
    A cyber attack that uses disguised emails or messages to trick you into revealing sensitive information, like passwords or credit card numbers.

2.  **Spear phishing**
    A highly targeted form of phishing aimed at a specific individual or organization, using personalized information to seem more convincing.

3.  **Smishing**
    Phishing attacks carried out via SMS text messages.

4.  **Vishing**
    Phishing attacks carried out over the phone (voice phishing).

5.  **Malvertising**
    The use of online advertising networks to spread malware.

6.  **Drive-by download**
    The unintentional download of malicious software to your computer just by visiting a compromised website.

7.  **Keylogger**
    Malicious software or hardware that records every keystroke you make, aiming to steal passwords and other sensitive data.

8.  **Spyware**
    Software that secretly gathers information about a person or organization.

9.  **Stalkerware**
    A type of spyware specifically used for domestic surveillance, often installed on a partner's device without their knowledge.

10. **Ransomware**
    Malicious software that locks you out of your computer or files and demands a ransom to restore access.

11. **Data exfiltration**
    The unauthorized transfer of data from a computer or network.

12. **Credential stuffing**
    An attack where hackers use large lists of stolen usernames and passwords to try to log into other websites, hoping people have reused passwords.

13. **Password spraying**
    An attack that tries a few common passwords against a large number of usernames, avoiding account lockouts.

14. **Social engineering**
    Manipulating people into breaking normal security procedures, rather than hacking technical systems.

15. **Shoulder surfing**
    Observing someone's screen or keyboard to steal information, like a PIN at an ATM.

16. **OSINT**
    Open-Source INTelligence—the practice of collecting information from publicly available sources for a specific purpose, which can be used for reconnaissance by attackers.

17. **Browser-in-the-browser attack**
    A sophisticated phishing technique that creates a fake browser window within a real browser to trick you into entering credentials.

18. **MFA fatigue attack**
    Bombarding a user with multi-factor authentication (MFA) push notifications in hopes they will accidentally approve one.

19. **Session fixation attack**
    An attack where the attacker forces a user to use a known session ID, allowing them to hijack the user's session after they log in.

20. **Clickjacking**
    A malicious technique that tricks a user into clicking on something different from what they perceive, often by using transparent layers over a webpage.

---

## Workplace & IAM

1.  **BYOD**
    "Bring Your Own Device" - a policy that allows employees to use their personal devices (laptops, phones) for work.

2.  **MDM**
    Mobile Device Management - software used to secure, monitor, and manage mobile devices used in an organization.

3.  **MAM**
    Mobile Application Management - policies that control only the work-related apps and data on a device, often used with BYOD to protect personal privacy.

4.  **DLP**
    Data Loss Prevention - tools and processes that prevent sensitive data from being accidentally or maliciously shared outside an organization.

5.  **CASB**
    Cloud Access Security Broker - a security tool that sits between an organization's network and cloud applications to enforce security policies.

6.  **SSO**
    Single Sign-On - an authentication scheme that allows a user to log in with a single ID and password to access multiple, separate software systems.

7.  **SAML**
    A standard protocol used for SSO that allows identity providers to pass authorization credentials to service providers.

8.  **OAuth 2.0**
    An authorization framework that allows applications to get limited access to a user's account without giving them the password.

9.  **OpenID Connect (OIDC)**
    A simple identity layer built on top of OAuth 2.0, used for user authentication.

10. **SCIM**
    System for Cross-domain Identity Management - a standard for automating the exchange of user identity information between systems.

11. **RBAC**
    Role-Based Access Control - a method of regulating access to computer resources based on the roles of individual users within an organization.

12. **Principle of least privilege**
    A security concept that users should be granted only the minimum levels of access necessary to perform their job functions.

13. **Need-to-know**
    A security principle that restricts access to information to only those people who are required to know it to perform their tasks.

14. **Access reviews**
    The periodic process of reviewing users' access rights to ensure they are still appropriate.

15. **Security awareness training**
    Education provided to employees to help them understand and adhere to security practices and recognize threats like phishing.

16. **Incident response plan**
    A documented, structured approach for handling security breaches and cyber attacks.

17. **Breach notification**
    The legal requirement to inform authorities and affected individuals when a data breach occurs.

18. **Data mapping / inventory**
    The process of identifying what personal data an organization holds, where it is stored, how it flows, and who has access to it.

19. **Tag management system (TMS)**
    A tool that manages the deployment of marketing and analytics tags (snippets of code) on a website.

20. **Error monitoring PII scrubbing**
    The process of removing personally identifiable information (PII) from crash reports and error logs before they are sent to a third-party service.

---

