# Glossary Terms and Definitions

This document contains all glossary terms and their definitions organized by topic.

**Total Terms:** 400

---

## Ads, Attribution & IDs

*25 terms*

1. **Topics API**
   
   A browser API that shares coarse interest categories for ads without cross-site IDs.

2. **Protected Audience API (FLEDGE)**
   
   On-device remarketing that avoids sending user lists to ad platforms.

3. **Attribution Reporting API**
   
   Privacy-preserving ad measurement without third-party cookies.

4. **Private Aggregation API**
   
   Aggregates noisy event data to protect individual user privacy.

5. **Aggregation Service**
   
   A trusted service that combines encrypted reports for measurement.

6. **Private State Tokens**
   
   Tokens proving legitimacy without revealing cross-site identity.

7. **Conversion Measurement (WebKit)**
   
   Safari/Firefox approach to privacy-safe ads attribution.

8. **SKAdNetwork**
   
   Apple’s privacy-preserving mobile app install attribution framework.

9. **Google Click ID (GCLID)**
   
   A parameter linking ad clicks to conversions for measurement.

10. **Facebook Click ID (FBCLID)**
   
   A parameter appended to links for Facebook’s tracking and analytics.

11. **UTM parameters**
   
   Tagged URL parameters used to attribute traffic sources and campaigns.

12. **IDFA**
   
   Apple’s device advertising ID, access gated by App Tracking Transparency.

13. **AAID / GAID**
   
   Google’s Android advertising ID, resettable by the user.

14. **Enhanced Conversions**
   
   Matching conversions using hashed, consented first-party data.

15. **Consent Mode v2**
   
   Google tagging mode that respects consent and models gaps.

16. **Server-side tagging**
   
   Routing tags through your server to reduce client-side tracking scripts.

17. **Real-Time Bidding (RTB)**
   
   Automated auctions where ad impressions are sold in milliseconds.

18. **Demand-Side Platform (DSP)**
   
   A system advertisers use to buy ad inventory programmatically.

19. **Supply-Side Platform (SSP)**
   
   A system publishers use to sell ad space and manage demand.

20. **Data clean room**
   
   A controlled environment for analysing combined data without raw sharing.

21. **Cookie syncing**
   
   Matching user IDs between ad companies to broaden tracking reach.

22. **On-device ad auctions**
   
   Running bidding locally to avoid sharing user data externally.

23. **Contextual targeting**
   
   Showing ads based on page content rather than user profiles.

24. **Frequency capping**
   
   Limiting how many times a user sees the same advert.

25. **Lookalike modelling**
   
   Finding similar audiences based on features of a seed group.

---

## Analytics, Data & PETs

*30 terms*

1. **First-party analytics**
   
   Measurement run by the site owner with minimal data sharing.

2. **Self-hosted analytics**
   
   Analytics deployed on your own servers for greater control.

3. **Server-side analytics**
   
   Recording events on the server to reduce client scripts and leakage.

4. **IP anonymisation**
   
   Removing or truncating IP addresses to reduce identifiability.

5. **Log anonymisation**
   
   Scrubbing or hashing personal data in server logs.

6. **Pseudonymisation**
   
   Replacing identifiers with reversible tokens held separately.

7. **Anonymisation**
   
   Irreversibly transforming data so individuals are not identifiable.

8. **De-identification**
   
   Broad term for removing direct identifiers from datasets.

9. **Re-identification risk**
   
   The chance that anonymised data could be linked back to people.

10. **Differential privacy**
   
   Adding statistical noise to protect individuals in aggregate data.

11. **k-anonymity**
   
   Ensuring each record is indistinguishable from at least k-1 others.

12. **l-diversity**
   
   Requiring diversity of sensitive values within k-anonymous groups.

13. **t-closeness**
   
   Keeping a group’s distribution close to the overall distribution.

14. **Synthetic data**
   
   Artificially generated data that mimics real patterns without real subjects.

15. **Secure multi-party computation (MPC)**
   
   Parties compute results jointly without sharing raw data.

16. **Homomorphic encryption**
   
   Performing computations on data while it remains encrypted.

17. **Zero-knowledge proofs (ZKP)**
   
   Proving something is true without revealing the data.

18. **Private information retrieval (PIR)**
   
   Querying a database without revealing which record was fetched.

19. **Oblivious HTTP (OHTTP)**
   
   Splits sender identity from request contents using proxying and encryption.

20. **Mix networks (mixnets)**
   
   Routing messages through shuffling relays to hide traffic patterns.

21. **Onion routing**
   
   Layered encryption technique that underpins Tor for anonymity.

22. **Trusted execution environment (TEE)**
   
   Secure CPU area isolating code and data from the OS.

23. **Confidential computing**
   
   Cloud features protecting data while it is being processed.

24. **Client-side event measurement**
   
   Recording events in the browser, often with privacy-preserving APIs.

25. **Privacy budget accounting**
   
   Tracking privacy-sensitive API use to limit fingerprinting.

26. **Federated learning**
   
   Training models across devices without collecting raw data centrally.

27. **On-device processing**
   
   Performing computation locally to reduce data sharing.

28. **Data minimisation (practice)**
   
   Operational techniques to reduce collection and retention.

29. **Data retention schedule**
   
   A policy defining how long data is kept and when it’s deleted.

30. **Data classification**
   
   Labelling information by sensitivity to guide protection.

---

## Browser & HTTP

*30 terms*

1. **User-Agent**
   
   A header string identifying browser, version and platform to websites.

2. **User-Agent Client Hints (UA-CH)**
   
   Privacy-aware headers that supply browser details in a granular, controllable way.

3. **Accept-Language**
   
   A header that declares preferred languages, useful for localisation but also fingerprinting.

4. **Accept-Encoding**
   
   A header indicating supported compression formats such as gzip or br.

5. **Referrer**
   
   The URL of the previous page sent in requests unless limited by policy.

6. **Referrer-Policy**
   
   A header/meta tag that restricts how much referrer data is shared.

7. **Origin**
   
   The scheme, host and port that define web security boundaries.

8. **Same-Origin Policy (SOP)**
   
   A browser rule isolating documents from different origins for safety.

9. **CORS**
   
   A mechanism allowing controlled cross-origin requests with explicit server permission.

10. **Content Security Policy (CSP)**
   
   A header that whitelists script and resource sources to mitigate XSS.

11. **Permissions-Policy**
   
   A header to enable or disable powerful browser features per origin.

12. **Mixed content**
   
   Insecure HTTP resources loaded by HTTPS pages, weakening security and privacy.

13. **HSTS**
   
   A policy forcing browsers to use HTTPS for a site, preventing downgrade attacks.

14. **HTTP/2**
   
   A web protocol with multiplexing and header compression for faster loading.

15. **HTTP/3 (QUIC)**
   
   A UDP-based transport improving performance and connection reliability over the internet.

16. **Cache-Control**
   
   Directives that control how responses are cached by browsers and proxies.

17. **ETag**
   
   A response token for cache validation; sometimes misused for tracking.

18. **Vary**
   
   A header declaring which request parts affect a cached response’s validity.

19. **Link rel=preload**
   
   A hint telling the browser to fetch critical resources early.

20. **DNS prefetch**
   
   A hint to resolve hostnames early to reduce connection latency.

21. **Preconnect**
   
   A hint to open TCP/TLS connections ahead of time for speed.

22. **Prefetch**
   
   A hint to fetch likely next resources to accelerate navigation.

23. **Speculation Rules (prerender)**
   
   Declarative hints allowing safe pre-rendering of likely next pages.

24. **Subresource Integrity (SRI)**
   
   Hashes ensuring external scripts haven’t been tampered with.

25. **Fetch Metadata headers**
   
   Signals (e.g., Sec-Fetch-Site) that help servers defend against CSRF and drive-by attacks.

26. **COOP**
   
   A header that isolates a browsing context from cross-origin windows.

27. **COEP**
   
   A header requiring cross-origin resources to opt-in, enabling powerful APIs safely.

28. **Document Policy**
   
   Controls behaviours like automatic image resizing to standardise page behaviour.

29. **FedCM**
   
   Privacy-preserving federated sign-in that avoids tracking via third-party cookies.

30. **WebAuthn / Passkeys**
   
   Phishing-resistant logins using device-bound cryptographic keys instead of passwords.

---

## Cloud/SaaS & Ops Governance

*21 terms*

1. **Data residency**
   
   The country or region where data is stored and processed.

2. **Encryption at rest**
   
   Protecting stored data with cryptography on disks or databases.

3. **Encryption in transit**
   
   Protecting data while it moves across networks.

4. **Customer-managed keys (CMK)**
   
   Encryption keys controlled by the customer, not the provider.

5. **Bring your own key (BYOK)**
   
   Importing your own cryptographic keys into a cloud service.

6. **Key escrow**
   
   Holding a copy of keys with a trusted party for recovery.

7. **Key rotation policy**
   
   Regularly replacing keys and revoking old ones.

8. **Access logs**
   
   Records of who accessed what, when and from where.

9. **Audit logs**
   
   Tamper-evident records of administrative actions and system changes.

10. **Shared responsibility model**
   
   Clarifies which security duties belong to the cloud provider vs customer.

11. **Data processing addendum (DPA)**
   
   Contractual privacy terms for SaaS providers handling personal data.

12. **Sub-processor**
   
   A provider engaged by your vendor to process personal data.

13. **Vendor risk assessment**
   
   Evaluating suppliers’ security and privacy posture before use.

14. **Third-party risk management (TPRM)**
   
   Ongoing oversight of suppliers’ risks and controls.

15. **Data breach**
   
   A security incident that compromises confidentiality, integrity or availability of data.

16. **Redaction**
   
   Removing or masking sensitive information in documents or logs.

17. **Tokenisation**
   
   Replacing sensitive values with non-sensitive tokens stored separately.

18. **Hashing**
   
   One-way transformation producing a fixed-length digest of data.

19. **Salt and pepper (hashing)**
   
   Random values added to hashes to resist guessing and reuse.

20. **Privacy by design**
   
   Building systems to minimise data and protect users by default.

21. **Privacy policy**
   
   A public statement explaining what data is collected, why and how it’s handled.

---

## Cookies & Storage

*25 terms*

1. **Cookie**
   
   Small name-value data stored by the browser and sent with requests.

2. **First-party cookie**
   
   A cookie set by the site you’re visiting directly.

3. **Third-party cookie**
   
   A cookie set by embedded content from another domain.

4. **SameSite=Lax**
   
   Limits cross-site cookie sending except in top-level, safe navigations.

5. **SameSite=Strict**
   
   Sends the cookie only in same-site contexts, preventing most CSRF.

6. **SameSite=None; Secure**
   
   Allows cross-site use but only over HTTPS.

7. **HttpOnly**
   
   A flag that prevents JavaScript from reading a cookie.

8. **Secure attribute**
   
   A flag that allows cookie transmission only over HTTPS.

9. **Persistent cookie**
   
   A cookie stored beyond the session, with an expiry date.

10. **Session cookie**
   
   A cookie removed when the browser session ends.

11. **Max-Age / Expires**
   
   Cookie attributes specifying when a cookie should be deleted.

12. **Partitioned cookies (CHIPS)**
   
   Cookies scoped to a specific embedded context to reduce tracking.

13. **Storage partitioning**
   
   Isolating storage by top-level site to limit cross-site tracking.

14. **LocalStorage**
   
   Origin-scoped key-value storage accessible to scripts.

15. **SessionStorage**
   
   Per-tab key-value storage cleared when the tab closes.

16. **IndexedDB**
   
   A structured client-side database for larger application data.

17. **Cache Storage**
   
   API for storing HTTP responses for offline-first apps.

18. **Origin Private File System (OPFS)**
   
   Per-origin file storage with improved performance and isolation.

19. **Storage Access API**
   
   Lets embedded content request storage access with user interaction.

20. **Quota management**
   
   Browser limits and reporting for per-origin storage usage.

21. **Cookie banner**
   
   A notice seeking consent for cookies under ePrivacy/PECR rules.

22. **Consent Mode (Google)**
   
   A framework adapting tags to users’ consent choices for measurement.

23. **Session fixation**
   
   Forcing a victim to use a known session ID for takeover.

24. **Cookie poisoning**
   
   Tampering with cookie values to bypass security controls.

25. **Flash cookies (LSO)**
   
   Legacy storage from Flash Player, once used to respawn deleted cookies.

---

## DNS & Resolution

*20 terms*

1. **DNS**
   
   The system that translates human-readable names into IP addresses.

2. **DNS over HTTPS (DoH)**
   
   Resolving DNS queries over HTTPS to hide them from intermediaries.

3. **DNS over TLS (DoT)**
   
   Encrypting DNS queries using standard TLS on a dedicated port.

4. **DNS over QUIC (DoQ)**
   
   Carrying DNS over QUIC/UDP for privacy and performance.

5. **DNSSEC**
   
   Cryptographic signing of DNS data to prevent tampering and spoofing.

6. **QNAME minimisation**
   
   Reducing query detail sent to upstream resolvers for privacy.

7. **Resolver**
   
   The component that receives your DNS queries and fetches answers.

8. **Recursive resolver**
   
   A resolver that walks the DNS tree to resolve names for clients.

9. **Authoritative nameserver**
   
   The server that holds the official records for a domain.

10. **A record**
   
   DNS entry mapping a name to an IPv4 address.

11. **AAAA record**
   
   DNS entry mapping a name to an IPv6 address.

12. **CNAME record**
   
   Alias record pointing one name to another canonical name.

13. **PTR record**
   
   Reverse-lookup record mapping IPs to hostnames.

14. **TXT record**
   
   Free-form text record used for policies like SPF or verification.

15. **NXDOMAIN**
   
   A DNS response meaning the name does not exist.

16. **Split-horizon DNS**
   
   Returning different answers depending on who queries.

17. **EDNS Client Subnet (ECS)**
   
   Attaching client network hints to queries; can reduce privacy.

18. **Oblivious DoH (ODoH)**
   
   Separates client IP from DNS content using proxies and encryption.

19. **DNS leak**
   
   DNS requests escaping an encrypted tunnel, revealing browsing.

20. **Resolver logging**
   
   Recording DNS queries, which may expose user behaviour.

---

## Device & OS Privacy

*20 terms*

1. **App Tracking Transparency (ATT)**
   
   iOS prompt that requires permission to track across apps/sites.

2. **Android Advertising ID reset**
   
   Letting users regenerate or disable the device ad identifier.

3. **Privacy dashboard (Android)**
   
   Timeline view of sensor and data access by apps.

4. **iCloud Private Relay**
   
   Apple service that hides IP and DNS from websites and networks.

5. **App Privacy labels (iOS)**
   
   Store disclosures detailing what data an app collects and uses.

6. **Background App Refresh**
   
   Allowing apps to fetch data in the background; may leak identifiers.

7. **Clipboard access notifications**
   
   Alerts when apps read clipboard contents.

8. **Bluetooth scanning permissions**
   
   Controls around beacon and device discovery to curb tracking.

9. **Precise vs approximate location**
   
   User choice to limit location granularity for apps.

10. **MAC address randomisation**
   
   Rotating Wi-Fi MAC addresses to reduce long-term tracking.

11. **App sandbox**
   
   OS isolation that restricts each app’s access to data and hardware.

12. **Scoped storage (Android)**
   
   Limits app file access to their own space and approved folders.

13. **SafetyNet / Play Integrity**
   
   Google checks attesting device integrity and app legitimacy.

14. **App Transport Security (ATS)**
   
   iOS requirement encouraging secure network connections.

15. **Push notification privacy**
   
   Controls hiding content and limiting identifiers in notifications.

16. **Photo picker permissions**
   
   Granting access to selected photos rather than the whole library.

17. **Nearby devices permission**
   
   Granular controls for local connectivity features.

18. **Wi-Fi scanning & probe requests**
   
   Background discovery that can reveal movement patterns.

19. **Carrier messaging vs OTT**
   
   SMS/MMS vs internet-based apps with different privacy properties.

20. **Device encryption**
   
   Full-disk or file-based encryption protecting data at rest.

---

## Email & Messaging

*20 terms*

1. **SPF**
   
   DNS policy specifying which servers may send mail for a domain.

2. **DKIM**
   
   Cryptographic signing of emails to prove authenticity and detect tampering.

3. **DMARC**
   
   A policy aligning SPF/DKIM and telling receivers how to handle failures.

4. **BIMI**
   
   A standard allowing brand logos to display for authenticated email.

5. **STARTTLS**
   
   Opportunistic TLS that encrypts email in transit between servers.

6. **MTA-STS**
   
   A policy enforcing TLS for email delivery to a domain.

7. **TLS-RPT**
   
   Reports that reveal delivery and TLS issues for your domain.

8. **Email tracking pixels**
   
   Invisible images that confirm opens and leak device details.

9. **Link tracking**
   
   Unique URLs that attribute clicks and may profile recipients.

10. **Apple Mail Privacy Protection**
   
   Downloads images via proxies to hide opens and IPs.

11. **Read receipt**
   
   A signal that an email was opened; often optional or blocked.

12. **End-to-end encryption (E2EE)**
   
   Only sender and recipient can read message contents.

13. **OTR messaging**
   
   An older chat protocol with forward secrecy and deniability.

14. **Signal Protocol**
   
   Modern E2EE design used by Signal, WhatsApp and others.

15. **RCS**
   
   Rich Communication Services, a modern messaging standard with variable security.

16. **SIM swap**
   
   Taking over a phone number to intercept calls and SMS.

17. **SMS interception**
   
   Capturing text messages, often via malware or rogue base stations.

18. **Metadata**
   
   Data about communications (who/when/where) that can reveal patterns.

19. **Forward secrecy (messaging)**
   
   Compromise of long-term keys won’t expose past messages.

20. **Encrypted backups**
   
   Storing message history in encrypted form under user control.

---

## Fingerprinting & Tracking Techniques

*35 terms*

1. **Canvas fingerprinting**
   
   Identifying a device from subtle differences in canvas rendering.

2. **WebGL fingerprinting**
   
   Using graphics capabilities to derive a device-specific signature.

3. **AudioContext fingerprinting**
   
   Exploiting audio processing quirks to identify a browser.

4. **WebGPU fingerprinting**
   
   Fingerprinting via next-gen GPU compute and rendering characteristics.

5. **Font enumeration**
   
   Detecting installed fonts to increase fingerprint entropy.

6. **Plugin enumeration**
   
   Listing browser plugins or MIME types to aid identification.

7. **hardwareConcurrency**
   
   Reporting CPU thread count, increasing fingerprint uniqueness.

8. **deviceMemory**
   
   Exposing rough RAM size, contributing to fingerprint entropy.

9. **Screen resolution**
   
   Using display size and colour depth as fingerprint features.

10. **Timezone/locale fingerprint**
   
   Inferring user region from time, calendar and locale settings.

11. **MediaDevices enumeration**
   
   Listing microphones/cameras to help fingerprinting even without access.

12. **WebRTC local IP discovery**
   
   Revealing internal IPs through peer connection candidates.

13. **Client Hints entropy**
   
   Combining UA-CH values for a controlled, lower-noise fingerprint.

14. **maxTouchPoints**
   
   Declaring touch capability; useful in device classification.

15. **Sensor APIs**
   
   Motion or orientation readings that can reveal device characteristics.

16. **Gamepad API fingerprinting**
   
   Detecting controllers to add rare attributes to a profile.

17. **TLS fingerprinting (JA3)**
   
   Identifying clients by their TLS handshake parameters.

18. **HTTP/2/3 settings fingerprinting**
   
   Using protocol settings patterns to recognise clients.

19. **HSTS supercookies**
   
   Abusing HSTS state to store cross-site identifiers.

20. **ETag tracking**
   
   Reusing cache validators as covert identifiers.

21. **CNAME cloaking**
   
   Masking third-party trackers behind first-party subdomains.

22. **Bounce tracking**
   
   Chaining redirects to create identifiers without cookies.

23. **Cache probing**
   
   Testing what’s cached to infer browsing history.

24. **Favicon supercookie**
   
   Encoding identifiers via site icon caching behaviour.

25. **Link-decoration IDs**
   
   Tracking via parameters like UTM, GCLID or FBCLID.

26. **Evercookie**
   
   A technique storing identifiers redundantly to resist deletion.

27. **TLS session resumption tracking**
   
   Reusing session tickets to correlate visits.

28. **Tracking pixels (beacons)**
   
   Tiny resources that signal page views or email opens.

29. **navigator.webdriver detection**
   
   Detecting automation, often to block bots or abuse privacy tools.

30. **WebGL vendor/renderer**
   
   Exposed GPU strings that assist device identification.

31. **Web storage fingerprinting**
   
   Deriving identity from storage behaviour and limits.

32. **Font metrics fingerprinting**
   
   Measuring rendered text to detect installed fonts.

33. **Keystroke dynamics**
   
   Profiling users by typing rhythm and speed.

34. **Mouse movement tracking**
   
   Recording cursor paths for behaviour profiling.

35. **Device fingerprint (composite)**
   
   Combining many signals to create a probabilistic identifier.

---

## Network & IP

*30 terms*

1. **IP address (IPv4)**
   
   A 32-bit numerical label that identifies a device on the internet or a local network.

2. **IPv6**
   
   The newer 128-bit internet addressing system, vastly expanding address space and enabling autoconfiguration.

3. **Temporary IPv6 addresses (privacy extensions)**
   
   Randomised IPv6 identifiers that reduce long-term tracking of a device.

4. **Subnet mask**
   
   A bitmask that splits an IP network into smaller networks for routing and security.

5. **CIDR**
   
   Classless Inter-Domain Routing notation that expresses IP ranges more efficiently than legacy classes.

6. **Autonomous System Number (ASN)**
   
   An identifier for a network operator that controls a set of IP routes.

7. **Internet Service Provider (ISP)**
   
   A company that provides internet access and often assigns your public IP.

8. **Network Address Translation (NAT)**
   
   A method that lets multiple devices share one public IP address.

9. **Carrier-Grade NAT (CGNAT)**
   
   ISP-level NAT that puts many customers behind the same public IP.

10. **Proxy server (HTTP)**
   
   An intermediary that forwards web traffic, often used for filtering or privacy.

11. **SOCKS proxy**
   
   A generic proxy that relays any TCP traffic without understanding application protocols.

12. **Reverse proxy**
   
   A server that sits in front of web apps to hide origin IPs and add security.

13. **VPN (Virtual Private Network)**
   
   Encrypted tunnelling that hides your traffic from local networks and ISPs.

14. **Tor (The Onion Router)**
   
   A network that routes traffic through volunteer relays to obscure origin and destination.

15. **Tor exit node**
   
   The final Tor relay that connects to the public internet and exposes an exit IP.

16. **Reverse DNS (PTR)**
   
   DNS records that map an IP address back to a host name.

17. **IP geolocation**
   
   Estimating a user’s location from their IP address and network information.

18. **Anycast**
   
   Advertising the same IP from multiple locations so traffic reaches the nearest server.

19. **BGP (Border Gateway Protocol)**
   
   The routing protocol that moves traffic between autonomous systems on the internet.

20. **WebRTC leak**
   
   Exposure of local or public IPs via real-time browser networking features.

21. **STUN**
   
   A protocol that discovers a device’s public IP/port for peer-to-peer connections.

22. **TURN**
   
   A relay service used when direct peer-to-peer connections cannot be established.

23. **Public vs private IP**
   
   Public addresses are internet-routable; private ranges are only for local networks.

24. **DHCP**
   
   A service that automatically assigns IP configuration to devices on a network.

25. **TTL (Time To Live)**
   
   A counter that limits how far packets travel to prevent routing loops.

26. **MTU (Maximum Transmission Unit)**
   
   The largest packet size a link can carry without fragmentation.

27. **Packet loss**
   
   Dropped network packets that degrade speed, call quality and reliability.

28. **Latency (ping)**
   
   The round-trip time for data, affecting browsing snappiness and streaming.

29. **Split tunnelling**
   
   Sending some traffic through a VPN while other traffic goes directly.

30. **MAC randomisation**
   
   Rotating Wi-Fi/Bluetooth hardware addresses to reduce location tracking.

---

## Privacy Signals & Controls

*20 terms*

1. **Do Not Track (DNT)**
   
   A legacy browser signal requesting sites not to track the user.

2. **Global Privacy Control (GPC)**
   
   A browser signal asserting opt-out of data sale/sharing.

3. **Topics API opt-out**
   
   Browser setting preventing interest topics from being shared.

4. **Protected Audience controls**
   
   Browser options managing on-device ad auctions and remarketing.

5. **Privacy Budget**
   
   A concept limiting high-entropy API access to reduce fingerprinting.

6. **Enhanced Tracking Protection (ETP)**
   
   Firefox feature blocking common trackers by default.

7. **Intelligent Tracking Prevention (ITP)**
   
   Safari’s system for restricting cross-site tracking.

8. **Brave Shields**
   
   Built-in blocking of ads, trackers and fingerprinting techniques in Brave.

9. **Private browsing / Incognito**
   
   A mode that limits local history, not network-level visibility.

10. **HTTPS-Only mode**
   
   Browser feature that upgrades all navigations to HTTPS where possible.

11. **Clear-Site-Data**
   
   A header that instructs the browser to wipe site storage and caches.

12. **Site Isolation**
   
   Running each site in its own process to protect data boundaries.

13. **Permissions prompts**
   
   User dialogues for camera, microphone, location and other sensitive APIs.

14. **First-Party Sets**
   
   A declaration grouping related sites to reduce cookie breakage.

15. **Third-party cookie phase-out**
   
   The gradual removal of cross-site cookies in mainstream browsers.

16. **Fingerprinting protections**
   
   Browser mitigations that reduce or standardise identifying signals.

17. **Network prediction/preloading toggle**
   
   A setting that controls speculative preloads that may leak history.

18. **Tracking Protection lists**
   
   Curated blocklists used by browsers or extensions to stop tracking.

19. **Content blockers**
   
   Extensions or features that filter ads, trackers and malware.

20. **AdChoices opt-out**
   
   Industry tools for limiting interest-based advertising across participants.

---

## Regulatory, Legal & Rights

*30 terms*

1. **GDPR**
   
   EU data-protection law setting high standards and strong user rights.

2. **UK GDPR**
   
   The UK’s post-Brexit version of GDPR with local nuances.

3. **CCPA / CPRA**
   
   California privacy laws granting rights over personal information and sharing.

4. **POPIA**
   
   South African law governing personal information processing and security.

5. **LGPD**
   
   Brazil’s general data protection law similar in scope to GDPR.

6. **ePrivacy Directive**
   
   EU rules covering cookies and electronic communications consent.

7. **PECR**
   
   UK regulations implementing ePrivacy for cookies and marketing.

8. **ePrivacy Regulation**
   
   Proposed EU regulation to replace the Directive with stricter rules.

9. **PCI DSS**
   
   Security standard for organisations handling cardholder data.

10. **ISO/IEC 27001**
   
   An international standard for information security management systems.

11. **ISO/IEC 27701**
   
   A privacy extension to ISO 27001 for PIMS controls.

12. **SOC 2**
   
   Independent audit reporting on security, availability and confidentiality controls.

13. **NIST Privacy Framework**
   
   A US framework for managing privacy risk.

14. **Schrems II**
   
   EU court ruling invalidating Privacy Shield and tightening data transfers.

15. **Standard Contractual Clauses (SCCs)**
   
   EU model clauses for international data transfers.

16. **Data Protection Impact Assessment (DPIA)**
   
   A formal assessment of high-risk processing.

17. **Privacy Impact Assessment (PIA)**
   
   A broader assessment of privacy risks and mitigations.

18. **ROPA**
   
   Records of Processing Activities required for many controllers/processors.

19. **Lawful basis for processing**
   
   Legal grounds like consent, contract or legitimate interests.

20. **Legitimate interests assessment (LIA)**
   
   A test balancing business needs and individuals’ rights.

21. **Data minimisation (principle)**
   
   Collecting only what’s necessary for a specific purpose.

22. **Purpose limitation**
   
   Using data only for clearly stated, compatible purposes.

23. **Storage limitation**
   
   Keeping personal data no longer than necessary.

24. **Integrity and confidentiality**
   
   Ensuring security and resilience of personal data processing.

25. **Data controller**
   
   Decides why and how personal data is processed.

26. **Data processor**
   
   Processes personal data on behalf of a controller.

27. **Joint controllers**
   
   Two or more parties jointly deciding purposes and means of processing.

28. **Data Processing Agreement (DPA)**
   
   Contract defining processor obligations and safeguards.

29. **International data transfer**
   
   Moving personal data across borders under legal controls.

30. **Data localisation / sovereignty**
   
   Requirements to store or process data within a jurisdiction.

---

## Security, Transport & PKI

*30 terms*

1. **TLS**
   
   A protocol that encrypts data in transit between clients and servers.

2. **TLS 1.3**
   
   The latest TLS version with faster handshakes and stronger defaults.

3. **Cipher suite**
   
   The set of algorithms used for a TLS session.

4. **ECDHE**
   
   An ephemeral key exchange that provides forward secrecy.

5. **Perfect Forward Secrecy (PFS)**
   
   Ensures past traffic stays secret even if keys leak later.

6. **Certificate Authority (CA)**
   
   An entity that issues and vouches for digital certificates.

7. **Certificate chain**
   
   The path from a site certificate to a trusted root CA.

8. **Certificate Transparency**
   
   Public logs that detect mis-issued or rogue certificates.

9. **OCSP**
   
   A protocol to check whether a certificate has been revoked.

10. **OCSP stapling**
   
   Servers deliver revocation proofs to save client look-ups and improve privacy.

11. **ALPN**
   
   Negotiates which application protocol (e.g., HTTP/2) to run over TLS.

12. **HSTS preload list**
   
   A list baked into browsers to force HTTPS for known sites.

13. **SNI**
   
   A TLS extension that reveals the hostname; can be masked by ECH.

14. **Encrypted ClientHello (ECH)**
   
   Encrypts the SNI and other handshake bits to hide the target host.

15. **TLS session tickets**
   
   Tokens resuming TLS sessions; must be rotated to avoid tracking.

16. **MITM (Man-in-the-Middle)**
   
   An attacker or proxy intercepting and possibly altering traffic.

17. **Self-signed certificate**
   
   A certificate not issued by a CA; unsafe for public sites.

18. **Root certificate store**
   
   The set of trusted CAs a device or browser accepts.

19. **CRL (Certificate Revocation List)**
   
   A periodically published list of revoked certificates.

20. **SSL stripping**
   
   Downgrading HTTPS to HTTP to read or modify traffic.

21. **mTLS**
   
   Mutual TLS where clients also present certificates for strong authentication.

22. **DANE**
   
   Binding TLS certificates to DNSSEC-protected DNS records.

23. **DNS CAA**
   
   Records defining which CAs may issue certificates for a domain.

24. **Key pinning (HPKP)**
   
   Deprecated method of fixing allowed keys; risky and rarely used now.

25. **Key rotation**
   
   Regularly replacing cryptographic keys to reduce compromise impact.

26. **Public Key Infrastructure (PKI)**
   
   The system of keys, certificates and trust used on the web.

27. **Key Management Service (KMS)**
   
   A service that creates, stores and controls cryptographic keys.

28. **Hardware Security Module (HSM)**
   
   Tamper-resistant hardware that safeguards keys and cryptographic operations.

29. **Zero trust network access (ZTNA)**
   
   Access model requiring continuous verification, not a trusted perimeter.

30. **SASE**
   
   Cloud-delivered networking and security stack combining SD-WAN and zero trust.

---

## Social, IoT & Biometrics

*24 terms*

1. **Shadow profile**
   
   Inferred or collected data about non-users or without explicit consent.

2. **Social graph**
   
   The network of relationships and interactions between users.

3. **Geotagging**
   
   Attaching location data to posts, photos or videos.

4. **Data scraping**
   
   Automated extraction of data from websites or platforms.

5. **Third-party app access**
   
   External apps granted permissions to a platform account.

6. **OAuth consent screen**
   
   The page where users authorise scopes for an application.

7. **Smart speaker**
   
   Voice-controlled device that processes audio, sometimes in the cloud.

8. **Wake word**
   
   The phrase that triggers always-listening assistants to start recording.

9. **Always-on listening**
   
   Continuous audio monitoring awaiting wake words; raises privacy concerns.

10. **Device telemetry**
   
   Diagnostic data automatically sent back to manufacturers or services.

11. **Telemetry opt-out**
   
   Settings to reduce or disable diagnostic data collection.

12. **Firmware update policy**
   
   Rules governing secure, timely updates for connected devices.

13. **Smart TV ACR**
   
   Automatic content recognition used for viewing analytics and advertising.

14. **Cross-device tracking**
   
   Linking user behaviour across phones, tablets, TVs and laptops.

15. **BLE beacons**
   
   Low-energy Bluetooth transmitters used for proximity tracking.

16. **UWB positioning**
   
   Ultra-wideband ranging that enables very precise location features.

17. **Facial recognition**
   
   Identifying people from facial images or video.

18. **Biometric template**
   
   A mathematical representation of biometric features stored for matching.

19. **Liveness detection**
   
   Checks that a biometric sample comes from a real, present person.

20. **Voiceprint**
   
   A unique model of a person’s voice used for recognition.

21. **Iris scan**
   
   Capturing patterns in the coloured ring of the eye for identification.

22. **Fingerprint (biometric)**
   
   Recognising users by patterns on their fingertips.

23. **Behavioural biometrics**
   
   Identifying users by habits such as typing or swiping.

24. **Age-appropriate design code (UK)**
   
   Standards for protecting children online by design and default.

---

## Threats & Attacks

*20 terms*

1. **Phishing**
   
   Tricking users into revealing credentials or sensitive data.

2. **Spear phishing**
   
   Targeted phishing tailored to a specific person or organisation.

3. **Smishing**
   
   Phishing delivered by SMS messages.

4. **Vishing**
   
   Voice-call phishing, often pretending to be trusted staff.

5. **Malvertising**
   
   Malicious code served through advertising networks.

6. **Drive-by download**
   
   Automatic malware download via a compromised or malicious site.

7. **Keylogger**
   
   Malware that records keystrokes to steal secrets.

8. **Spyware**
   
   Software that secretly collects data about a user or device.

9. **Stalkerware**
   
   Covert tracking apps often used for domestic surveillance.

10. **Ransomware**
   
   Malware that encrypts files and demands payment for decryption.

11. **Data exfiltration**
   
   Unauthorised transfer of data out of an organisation.

12. **Credential stuffing**
   
   Using leaked passwords to try logins on other sites.

13. **Password spraying**
   
   Trying common passwords across many accounts to avoid lockouts.

14. **Social engineering**
   
   Psychological manipulation to bypass technical controls.

15. **Shoulder surfing**
   
   Observing someone’s screen or keyboard to steal information.

16. **OSINT**
   
   Open-source intelligence gathering from public data sources.

17. **Browser-in-the-browser attack**
   
   Fake OAuth windows that mimic real sign-in prompts.

18. **MFA fatigue attack**
   
   Spamming prompts to trick users into approving logins.

19. **Session fixation attack**
   
   Forcing a known session ID to hijack a user session.

20. **Clickjacking**
   
   Tricking clicks on hidden elements through overlaid frames.

---

## Workplace & IAM

*20 terms*

1. **BYOD**
   
   Letting staff use personal devices for work, with added risks and policies.

2. **MDM**
   
   Tools that manage and secure mobile devices in an organisation.

3. **MAM**
   
   Controls that secure only managed applications and their data.

4. **DLP**
   
   Technologies preventing unauthorised sharing or leakage of sensitive data.

5. **CASB**
   
   Gateways that enforce policies on cloud app usage.

6. **SSO**
   
   Single sign-on across systems using a central identity provider.

7. **SAML**
   
   XML-based federation protocol enabling SSO between parties.

8. **OAuth 2.0**
   
   Authorisation framework granting limited access without sharing passwords.

9. **OpenID Connect (OIDC)**
   
   Identity layer on OAuth providing user authentication.

10. **SCIM**
   
   A standard for automating user provisioning and de-provisioning.

11. **RBAC**
   
   Assigning permissions to roles rather than individuals.

12. **Principle of least privilege**
   
   Giving users only the access they truly need.

13. **Need-to-know**
   
   Restricting information strictly to those who must use it.

14. **Access reviews**
   
   Regular checks that users’ permissions remain appropriate.

15. **Security awareness training**
   
   Education that reduces human-factor security and privacy risks.

16. **Incident response plan**
   
   A defined process for handling security and privacy incidents.

17. **Breach notification**
   
   Legal duties to inform authorities and users of significant incidents.

18. **Data mapping / inventory**
   
   A catalogue of what data exists, where and why.

19. **Tag management system (TMS)**
   
   A tool that loads analytics/ads tags centrally; must be governed.

20. **Error monitoring PII scrubbing**
   
   Removing personal data from crash reports and logs.

---

