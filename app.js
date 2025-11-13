(()=>{function o(e){return"undefined"!=typeof CSS&&"function"==typeof CSS.escape?CSS.escape(e):String(e||"").replace(/[^a-zA-Z0-9_-]/g,"\\$&")}let t=(()=>{try{var e=document.head&&document.head.querySelector('link[rel="canonical"]');if(e&&e.href){var t=new URL(e.href,window.location.href);if(t.origin&&"null"!==t.origin)return t.origin}}catch(e){}try{if(window.location&&window.location.origin&&"null"!==window.location.origin)return window.location.origin}catch(e){}return"https://thewebknows.pages.dev"})();function e(t,a){if(t&&"string"==typeof a&&a.trim()){var n=document.head;if(n){let e=n.querySelector(`meta[name="${o(t)}"]`);e?e.hasAttribute("content")&&""!==e.getAttribute("content").trim()||e.setAttribute("content",a):((e=document.createElement("meta")).setAttribute("name",t),e.setAttribute("content",a),n.appendChild(e))}}}function a(t,a){if(t&&"string"==typeof a&&a.trim()){var n=document.head;if(n){let e=n.querySelector(`meta[property="${o(t)}"]`);e?e.hasAttribute("content")&&""!==e.getAttribute("content").trim()||e.setAttribute("content",a):((e=document.createElement("meta")).setAttribute("property",t),e.setAttribute("content",a),n.appendChild(e))}}}var n,r;async function N(t,e={}){try{n=fetch(t,{...e,cache:"no-store"}),o=7e3;var a=await Promise.race([n,new Promise((e,t)=>setTimeout(()=>t(new Error("Timeout")),o))]);if(a.ok)return await a.json();throw new Error("HTTP "+a.status)}catch(e){return console.warn(`Failed to fetch ${t}:`,e),null}var n,o}function M(e,t,a=""){e=document.getElementById(e);e&&(e.textContent=null==t||""===t?"—":t,e.removeAttribute("data-loading"),e.setAttribute("aria-busy","false"),a&&e.nextElementSibling?.classList.contains("info-help")?e.nextElementSibling.textContent=a:!a&&e.nextElementSibling?.classList.contains("info-help")&&e.nextElementSibling.dataset?.defaultHelp&&(e.nextElementSibling.textContent=e.nextElementSibling.dataset.defaultHelp))}function A(e){return!e||Number.isNaN(e)?"—":Math.round(2*e)/2+" GB (est.)"}async function P(t){"string"!=typeof t&&(t=String(t??""));try{var e,a;if(window.crypto&&window.crypto.subtle&&"undefined"!=typeof TextEncoder)return e=(new TextEncoder).encode(t),a=await window.crypto.subtle.digest("SHA-256",e),Array.from(new Uint8Array(a)).map(e=>e.toString(16).padStart(2,"0")).join("")}catch(e){}let n=5381;for(let e=0;e<t.length;e+=1)n=(n<<5)+n^t.charCodeAt(e);return("00000000"+(n>>>0).toString(16)).slice(-8)}async function T(t){var a,n=navigator.userAgent||"";let o=t;if((t||"").toLowerCase().includes("windows")){let e=null;if(navigator.userAgentData&&"function"==typeof navigator.userAgentData.getHighEntropyValues)try{var{platform:r,platformVersion:i}=await navigator.userAgentData.getHighEntropyValues(["platform","platformVersion"]);(r||"").toLowerCase().includes("windows")&&(e=([a=""]=[i],a=parseInt(a.split(".")[0],10),Number.isNaN(a)?null:13<=a?"Windows 11":10<=a?"Windows 10":null))}catch(e){}(e=e||(t=/Windows NT (\d+\.\d+)/i.exec(t=n))&&{"11.0":"Windows 11","10.0":"Windows 10 or later",6.3:"Windows 8.1",6.2:"Windows 8",6.1:"Windows 7","6.0":"Windows Vista",5.2:"Windows XP (64-bit)",5.1:"Windows XP","5.0":"Windows 2000","4.0":"Windows 95/98/NT"}[t[1]]||null)?o=e:"Windows"===o&&(o="Windows (version unknown)")}return o}async function L(){var t={supported:!1,label:"Not available",vendor:null,renderer:null,hash:null,details:null};try{var e,a,n,o,r,i,l,s,d=document.createElement("canvas"),c=d.getContext("webgl")||d.getContext("experimental-webgl");return c&&(t.supported=!0,o=((e,t)=>{var a=e=>{if(!e)return"";let t=e.trim();e=t.match(/^ANGLE\s*\((.+)\)$/i);return t=(t=e?e[1]:t).replace(/Google Inc\.?/gi,"").replace(/Direct3D.*$/i,"").replace(/\(0x[0-9a-fA-F]+\)/g,"").replace(/,\s*$/g,"").replace(/,\s*/g," ").replace(/\s{2,}/g," ").trim(),t=/^\(.*\)$/.test(t)?t.slice(1,-1).trim():t};let n=a(e),o=a(t);return a=(a=n)?a.replace(/\b(corporation|corp\.|inc\.|inc|ltd\.|ltd|llc|co\.|company|technologies)\b/gi,"").replace(/\s{2,}/g," ").trim():"",o&&a&&o.toLowerCase().includes(a.toLowerCase())&&(n=""),!o&&n&&(o=n,n=""),(a=[n,o].filter(Boolean).join(" "))||[e,t].filter(Boolean).join(" / ")||""})(a=(e=c.getExtension("WEBGL_debug_renderer_info"))?c.getParameter(e.UNMASKED_VENDOR_WEBGL):c.getParameter(c.VENDOR),n=e?c.getParameter(e.UNMASKED_RENDERER_WEBGL):c.getParameter(c.RENDERER)),r=c.getParameter(c.MAX_TEXTURE_SIZE),i=c.getParameter(c.SHADING_LANGUAGE_VERSION),l=c.getParameter(c.ALIASED_LINE_WIDTH_RANGE),s=await P([a||"",n||"",r||"",i||"",Array.isArray(l)?l.join(","):l||""].join("|")),t.vendor=a||"",t.renderer=n||"",t.label=o||(`${a||""} `+(n||"")).trim()||"Available",t.hash=s,t.details={maxTexture:"number"==typeof r?r:null,shadingLanguageVersion:i||null,aliasedLineWidthRange:l||null}),t}catch(e){return t}}(i=document.head)&&!i.querySelector("script[data-webknows-website]")&&((n=document.createElement("script")).type="application/ld+json",n.setAttribute("data-webknows-website","true"),r={"@context":"https://schema.org","@type":"WebSite","@id":t+"/#website",url:t+"/",name:"The Web Knows",description:"Plain-English privacy diagnostics & guides.",inLanguage:"en",publisher:{"@type":"Organization",name:"The Web Knows",url:t+"/",logo:{"@type":"ImageObject",url:t+"/favicon.svg"}},potentialAction:{"@type":"SearchAction",target:t+"/?q={search_term_string}","query-input":"required name=search_term_string"}},n.textContent=JSON.stringify(r,null,2),i.appendChild(n)),(r=document.head)&&(i=document.title&&document.title.trim()?document.title.trim():"The Web Knows",r=(r=r.querySelector('meta[name="description"]'))&&r.getAttribute("content")?r.getAttribute("content").trim():"Plain-English privacy diagnostics & guides.",n=(()=>{try{var e=document.head&&document.head.querySelector('link[rel="canonical"]');if(e&&e.href)return e.href}catch(e){}try{return""+t+window.location.pathname+window.location.search+window.location.hash}catch(e){return t+"/"}})(),a("og:type","website"),a("og:site_name","The Web Knows"),a("og:title",i),a("og:description",r),a("og:url",n),a("og:image",t+"/og-image.png"),e("twitter:card","summary_large_image"),e("twitter:title",i),e("twitter:description",r),e("twitter:url",n),e("twitter:image",t+"/og-image.png"));let I=["monospace","sans-serif","serif"];var i=`
Arial
Verdana
Times New Roman
Courier New
Georgia
Segoe UI
Helvetica
Trebuchet MS
Tahoma
Palatino
Gill Sans
Calibri
Cambria
Candara
Consolas
Comic Sans MS
Lucida Console
Lucida Sans Unicode
Arial Narrow
Courier
Impact
Franklin Gothic Medium
Century Gothic
Garamond
Bookman
Avant Garde
Baskerville
Optima
American Typewriter
Andale Mono
Apple Chancery
Big Caslon
Didot
Charter
Hoefler Text
Menlo
Monaco
Noteworthy
Skia
Geneva
Chicago
New York
Lucida Grande
Symbol
Wingdings
Wingdings 2
Wingdings 3
Segoe Print
Segoe Script
Segoe UI Emoji
Segoe UI Symbol
Segoe UI Historic
Lucida Sans
Lucida Calligraphy
Brush Script MT
Rockwell
Perpetua
Book Antiqua
Century Schoolbook
Elephant
Footlight MT Light
Kristen ITC
Wide Latin
Tempus Sans ITC
Monotype Corsiva
Copperplate
Futura
Avenir
DIN Alternate
DIN Condensed
Gill Sans MT
Palatino Linotype
Aparajita
Kalinga
Shonar Bangla
Vrinda
Mangal
Kokila
Raavi
Tunga
Vani
Shruti
Latha
Gautami
Iskoola Pota
Nirmala UI
Leelawadee UI
Myanmar Text
Khmer UI
Ebrima
Nyala
Euphemia UCAS
Malgun Gothic
Batang
Gulim
Dotum
SimSun
SimHei
NSimSun
FangSong
KaiTi
Songti SC
Songti TC
STHeiti
STKaiti
STSong
Heiti SC
Heiti TC
PingFang SC
PingFang TC
Hiragino Sans
Hiragino Kaku Gothic ProN
Hiragino Mincho ProN
Yu Gothic
Yu Gothic UI
Yu Mincho
Meiryo
Meiryo UI
Kozuka Gothic Pro
Kozuka Mincho Pro
Kozuka Gothic Pr6N
Kozuka Mincho Pr6N
Apple SD Gothic Neo
Apple Myungjo
Microsoft YaHei
Microsoft YaHei UI
Microsoft JhengHei
Microsoft JhengHei UI
Microsoft Uighur
Microsoft Himalaya
Microsoft PhagsPa
Microsoft New Tai Lue
Microsoft Tai Le
Microsoft Yi Baiti
Estrangelo Edessa
Gisha
Levenim MT
David
FrankRuehl
Miriam
Aharoni
Simplified Arabic
Traditional Arabic
Arabic Typesetting
Urdu Typesetting
Adobe Arabic
Roboto
Roboto Condensed
Roboto Mono
Roboto Slab
Roboto Flex
Open Sans
Open Sans Condensed
Lato
Oswald
Source Sans Pro
Source Serif Pro
Source Code Pro
Montserrat
Montserrat Alternates
Poppins
Merriweather
Merriweather Sans
Nunito
Nunito Sans
Raleway
PT Sans
PT Serif
PT Mono
Ubuntu
Ubuntu Mono
Ubuntu Condensed
Titillium Web
Work Sans
Inconsolata
Fira Sans
Fira Sans Condensed
Fira Sans Extra Condensed
Fira Code
Noto Sans
Noto Serif
Noto Sans JP
Noto Sans KR
Noto Sans SC
Noto Sans TC
Noto Sans Arabic
Noto Sans Devanagari
Noto Sans Hebrew
Noto Sans Thai
Noto Sans Georgian
Noto Sans Armenian
Noto Sans Bengali
Noto Sans Gujarati
Noto Sans Kannada
Noto Sans Malayalam
Noto Sans Tamil
Noto Sans Telugu
Noto Sans Sinhala
Noto Sans Lao
Noto Serif JP
Noto Serif KR
Noto Serif SC
Noto Serif TC
Barlow
Barlow Condensed
Barlow Semi Condensed
Jost
Manrope
Mulish
Quicksand
Rubik
Heebo
Karla
Cabin
Cabin Condensed
Comfortaa
Crimson Pro
Crimson Text
Domine
EB Garamond
Exo
Exo 2
Francois One
Hind
Hind Madurai
Hind Siliguri
Hind Vadodara
Bitter
Cairo
Candal
Catamaran
Chivo
Chivo Mono
Cormorant
Cormorant Garamond
Cormorant Infant
Cormorant SC
Cormorant Unicase
DM Sans
DM Serif Display
DM Serif Text
Encode Sans
Encode Sans Condensed
Encode Sans Semi Condensed
Gothic A1
IBM Plex Sans
IBM Plex Serif
IBM Plex Mono
Inter
Istok Web
Josefin Sans
Josefin Slab
Kanit
Khand
Lora
M PLUS 1
M PLUS Rounded 1c
Maven Pro
Metropolis
Mukta
Mukta Malar
Mukta Mahee
Nanum Gothic
Nanum Gothic Coding
Nanum Myeongjo
Nanum Pen Script
News Cycle
Old Standard TT
Orbitron
Overpass
Overpass Mono
Play
Playfair Display
Playfair Display SC
Prata
Righteous
Sarala
Signika
Signika Negative
Sintony
Slabo 13px
Slabo 27px
Space Grotesk
Space Mono
Teko
Tinos
Trirong
Varela Round
Zilla Slab
Public Sans
Red Hat Display
Red Hat Text
Be Vietnam Pro
Plus Jakarta Sans
Epilogue
Lexend
Lexend Deca
Lexend Mega
Lexend Tera
Urbanist
Atkinson Hyperlegible
Sora
Chakra Petch
Baloo 2
Baloo Bhai 2
Baloo Tamma 2
Baloo Tammudu 2
Baloo Thambi 2
Balsamiq Sans
Bevan
BioRhyme
Bungee
Bungee Inline
Bungee Outline
Bungee Shade
Carter One
Chewy
Changa
Cinzel
Cinzel Decorative
Coda
Concert One
Cookie
Courgette
Cousine
Crete Round
Creepster
Dancing Script
Fjalla One
Gudea
Kalam
Kaushan Script
Lobster
Lobster Two
Pacifico
Passion One
Patua One
Permanent Marker
Poiret One
Questrial
Rokkitt
Satisfy
Shadows Into Light
Staatliches
Tangerine
Vidaloka
Volkhov
Yellowtail
Adamina
Advent Pro
Alegreya
Alegreya Sans
Alegreya Sans SC
Alfa Slab One
Allerta
Allerta Stencil
Amaranth
Amatic SC
Amiri
Andika
Anton
Archivo
Archivo Narrow
Arimo
Arsenal
Arvo
Asap
Asap Condensed
Asul
Athiti
Average
Balthazar
Bangers
BenchNine
Biryani
Boogaloo
Bree Serif
Buenard
Cagliostro
Cambay
Cambo
Cantarell
Cantata One
Cantora One
Capriola
Cardo
Cedarville Cursive
Ceviche One
Charmonman
Chau Philomene One
Chicle
Chonburi
Cinzel Black
Clicker Script
Codystar
Commissioner
Convergence
Covered By Your Grace
Crafty Girls
Cuprum
Cutive
Cutive Mono
Damion
Darker Grotesque
David Libre
Delius
Delius Swash Caps
Delius Unicase
Devonshire
Dhurjati
Dosis
Eczar
El Messiri
Electrolize
Elsie
Elsie Swash Caps
Encode Sans Expanded
Enriqueta
Euphoria Script
Expletus Sans
Fanwood Text
Fascinate
Fascinate Inline
Faustina
Federant
Federo
Fenix
Finger Paint
Fondamento
Fresca
Galdeano
Gamja Flower
Gentium Book Basic
Gentium Basic
Geo
Georama
Germania One
Glass Antiqua
Gloria Hallelujah
Gochi Hand
Gorditas
Graduate
Grand Hotel
Gruppo
Handlee
Halant
Hammersmith One
Hepta Slab
Herr Von Muellerhoff
Hind Guntur
Hind Jalandhar
Holtwood One SC
Homemade Apple
Ibarra Real Nova
Iceberg
Iceland
Imprima
Inder
Indie Flower
Irish Grover
Italiana
Italianno
Jaldi
Jomhuria
Jolly Lodger
Judson
Just Another Hand
Just Me Again Down Here
K2D
Kadwa
Kameron
Karma
Kavivanar
Kdam Thmor Pro
Kenia
Khula
Kirang Haerang
Kodchasan
Koulen
Kranky
Kristi
Kurale
La Belle Aurore
Laila
Lakki Reddy
Lancelot
Ledger
Lekton
Libre Baskerville
Libre Franklin
Libre Barcode 39
Libre Barcode 39 Text
Libre Barcode 128
Lilita One
Limelight
Linden Hill
Lustria
Ma Shan Zheng
Macondo
Macondo Swash Caps
Mada
Magra
Maiden Orange
Maitree
Mako
Mallanna
Mandali
Marcellus
Marcellus SC
Marck Script
Margarine
Markazi Text
Marmelad
Martel
Martel Sans
Marvel
Mate
Mate SC
McLaren
Medula One
Meera Inimai
Merienda
Merienda One
Metamorphous
Metrophobic
Michroma
Milonga
Mina
Mitr
Modak
Mogra
Molengo
Monda
Monoton
Monsieur La Doulaise
Montaga
Montserrat Subrayada
Montez
Mountains of Christmas
Mouse Memoirs
Mr De Haviland
Mr Dafoe
Mrs Saint Delafield
Mrs Sheppards
Mystery Quest
Neucha
Neuton
New Rocker
Niconne
Nixie One
Nobile
Notable
Nothing You Could Do
Numans
Odibee Sans
Oleo Script
Oleo Script Swash Caps
Oranienbaum
Orienta
Original Surfer
Orkney
Oxygen
Padauk
Palanquin
Palanquin Dark
Paprika
Parisienne
Passero One
Patrick Hand
Patrick Hand SC
Paytone One
Peddana
Peralta
Petit Formal Script
Philosopher
Piazzolla
Pinyon Script
Pirata One
Plaster
Playball
Podkova
Pontano Sans
Port Lligat Sans
Port Lligat Slab
Press Start 2P
Prompt
Prociono
Prosto One
Puritan
Quando
Qwigley
Racing Sans One
Ramaraja
Rambla
Ranchers
Ranga
Rasa
Rationale
Recursive
Red Rose
Reem Kufi
Reem Kufi Fun
Reenie Beanie
Ribeye
Ribeye Marrow
Righteous
Risque
Rokkitt
Romanesco
Ropa Sans
Rosario
Rosarivo
Rouge Script
Rowdies
Rozha One
Rubik Mono One
Ruda
Rufina
Ruge Boogie
Rum Raisin
Ruslan Display
Russo One
Ruthie
Rye
Saira
Saira Condensed
Saira Extra Condensed
Saira Semi Condensed
Sail
Salsa
Sanchez
Sancreek
Sansita
Sarabun
Sarpanch
Sawarabi Gothic
Sawarabi Mincho
Scada
Scheherazade
Seaweed Script
Secular One
Share
Share Tech
Share Tech Mono
Shojumaru
Short Stack
Shrikhand
Siemreap
Sigmar One
Signika Light
Simonetta
Six Caps
Skranji
Smythe
Sniglet
Snippet
Snowburst One
Sofadi One
Sofia
Sonsie One
Sorts Mill Goudy
Spectral
Spectral SC
Spicy Rice
Spinnaker
Spirax
Stalinist One
Stint Ultra Condensed
Stint Ultra Expanded
Stoke
Strait
Stylish
Sue Ellen Francisco
Suez One
Sulphur Point
Sunflower
Supermercado One
Suranna
Sura
Suravaram
Syncopate
Syne
Tajawal
Taviraj
Tenali Ramakrishna
Tenor Sans
Text Me One
Thasadith
The Girl Next Door
Tillana
Timmana
Titan One
Trade Winds
Trispace
Tulpen One
Turret Road
Uncial Antiqua
Underdog
Unica One
Unkempt
Unlock
Unna
Vampiro One
Varela
Vast Shadow
Vesper Libre
Vidaloka
Viga
Voces
Vollkorn
Vollkorn SC
Voltaire
Waiting for the Sunrise
Wallpoet
Walter Turncoat
Wellfleet
Wire One
Yanone Kaffeesatz
Yantramanav
Yatra One
Yeseva One
Yesteryear
Yrsa
Yusei Magic
ZCOOL KuaiLe
ZCOOL QingKe HuangYou
ZCOOL XiaoWei
Zeyada
Zilla Slab Highlight
`;let D=Array.from(new Set(i.split("\n").map(e=>e.trim()).filter(Boolean))).slice(0,300),O="mmmmmmmmmmlli",R=72;function B(e){return"number"!=typeof e?"—":0===e?"None detected":e+" detected"}function k(e,t={}){return null==e?"low":t[t=String(e).trim().toLowerCase()]||("known"===t?"high":"estimated"!==t&&("missing"===t||"unknown"===t||"unavailable"===t||"not available"===t)?"low":"medium")}function H(e,t){let n=document.getElementById("ad-topics-list"),r=document.getElementById("ad-category-list");var a=document.getElementById("ad-summary-text"),i=document.getElementById("ad-status-overview"),l=document.getElementById("ad-status-grid"),o=document.getElementById("ad-fingerprint-summary"),s=document.getElementById("ad-fingerprint-canvas"),d=document.getElementById("ad-fingerprint-webgl"),c=document.getElementById("ad-fingerprint-audio"),u=document.getElementById("ad-fingerprint-adblock"),p=document.getElementById("ad-fingerprint-private-mode"),m=document.getElementById("ad-context-status");let g=document.getElementById("ad-context-tags");var h=e,y=l;if(i&&y)if(h&&h.status){var{status:h,signals:l}=h;let o=[];var v=(e,t,a,n)=>{t&&o.push({label:e,value:t,level:a,description:n})},b=h.ip&&h.ip.v4,b=(b&&v("IPv4 address",b,k(b),"Known"===b?"Ad platforms can geolocate and de-duplicate you via IPv4.":"IPv4 is hidden or unavailable; targeting falls back to softer signals."),h.ip&&h.ip.v6),b=(b&&v("IPv6 address",b,k(b),"Known"===b?"IPv6 remains visible; dual-stack campaigns can still identify your device.":"IPv6 is not exposed, which reduces dual-stack targeting confidence."),h.geo),b=(b&&v("Location signals",b,k(b),"Estimated"===b?l&&l.geo&&l.geo.string?`Approximate location available (${l.geo.string}).`:"Approximate city/region available for geo targeting.":"Geolocation from IP was not resolved."),h.language),b=(b&&v("Browser language",b,k(b),"Known"===b?l&&l.languages&&l.languages.primary?`Browser language exposed (${l.languages.primary}).`:"Browser language is shared for localisation.":"Language preference hidden; ads may default to generic content."),h.topics),f=(b&&(f=k(b),w=Array.isArray(l&&l.topics)?l.topics:[],v("Chrome Topics",b,f,"Known"===b?`${w.length} topic ${1===w.length?"ID":"IDs"} exposed by the Topics API.`:"Browser did not provide Topics; interest ads must rely on other signals.")),h.network||"Unknown"),b=k(f,{"home/office isp (guess)":"high","data-centre/vpn (guess)":"medium"});let e="Network type unclear; fewer assumptions can be made.";"Home/office ISP (guess)"===f?e="Looks residential; marketers often treat this as a household connection.":"Data-centre/VPN (guess)"===f&&(e="Looks like VPN or hosting traffic; some advertisers reduce targeting confidence."),v("Network fingerprint",f,b,e);var w=h.connection||"Unknown",f=k(w),b=l&&l.connection?l.connection:{},S="number"==typeof b.downlinkMbps?b.downlinkMbps+" Mbps":"unknown speed",C="number"==typeof b.rttMs?b.rttMs+" ms":"unknown latency",f=(v("Connection quality",w,f,"Estimated"===w?`Connection hints shared (${S}, ${C}, Data Saver ${b.saveData?"On":"Off"}).`:"Connection metrics hidden; creatives stay conservative."),h.privacy||{}),w=[],S=(f.dnt&&w.push("DNT "+f.dnt.toLowerCase()),f.gpc&&w.push("GPC "+f.gpc.toLowerCase()),f.cookies&&w.push("Cookies "+f.cookies.toLowerCase()),!!(l&&l.connection&&l.connection.saveData)),C=(w.push("Data Saver "+(S?"on":"off")),l&&l.privacy?l.privacy:{}),b=!!(C.dnt||C.gpc||S||"boolean"==typeof C.cookiesEnabled&&!C.cookiesEnabled),h=b?"protect":"high",f=b?"Privacy signals reduce ad precision or limit tracking.":"No explicit privacy signals; ad tech can operate at full strength.",l=(v("Privacy signals",w.join(" • "),h,f),o.reduce((e,t)=>(e[t.level]=(e[t.level]||0)+1,e),{})),S=[];l.high&&S.push(l.high+" high exposure"),l.medium&&S.push(l.medium+" medium exposure"),l.low&&S.push(l.low+" low exposure"),l.protect&&S.push(l.protect+" protective signal"+(1===l.protect?"":"s")),i.textContent=S.length?S.join(" • "):"Status available",y.innerHTML="",o.forEach(e=>{var t=document.createElement("li"),a=(t.className="ad-status-card ad-status-card--"+e.level,document.createElement("span")),a=(a.className="ad-status-card__label",a.textContent=e.label,t.appendChild(a),document.createElement("span"));a.className="ad-status-card__value",a.textContent=e.value,t.appendChild(a),e.description&&((a=document.createElement("p")).className="ad-status-card__description",a.textContent=e.description,t.appendChild(a)),y.appendChild(t)}),o.length||(y.innerHTML='<li class="ad-status-empty">Signal status not available in this browser.</li>')}else i.textContent="Not available",y.innerHTML='<li class="ad-status-empty">Signal status not available in this browser.</li>';C=t&&t.fingerprints?t.fingerprints:{};o&&(b=[],C.canvas&&C.canvas.hash&&b.push("Canvas hash ready"),C.webgl&&C.webgl.hash&&b.push("WebGL hash ready"),C.audio&&C.audio.hash&&b.push("Audio hash ready"),"boolean"==typeof C.adBlock&&b.push(C.adBlock?"Ad blocker detected":"Ad blocker not detected"),C.privateMode&&"boolean"==typeof C.privateMode.private&&b.push(C.privateMode.private?"Private mode likely":"Private mode unlikely"),o.textContent=b.length?b.join(" • "):"No fingerprint data collected"),s&&(v=C.canvas||{},s.textContent=v.hash||(!1===v.supported?"Not supported":"Unavailable")),d&&(w=C.webgl||{},d.textContent=w.hash||(!1===w.supported?"Not supported":"Unavailable")),c&&(h=C.audio||{},c.textContent=h.hash||(h.error?`Unavailable (${h.error})`:!1===h.supported?"Not supported":"Unavailable")),u&&("boolean"==typeof C.adBlock?u.textContent=C.adBlock?"Likely enabled":"Not detected":u.textContent="Unknown"),p&&("boolean"==typeof(f=C.privateMode||{}).private?p.textContent=f.private?"Likely (quota constrained)":"Unlikely (normal quota)":!1===f.supported?p.textContent="Not supported":f.error?p.textContent=`Unavailable (${f.error})`:p.textContent="Unknown"),e?(M("ad-topics",(l=e&&e.signals&&Array.isArray(e.signals.topics)?e.signals.topics:[]).length?l.length+" topic "+(1===l.length?"ID":"IDs"):"Not available"),n&&(n.innerHTML="",l.length?l.forEach(e=>{var t=document.createElement("li"),a="number"==typeof e.topic?e.topic:"unknown";t.textContent=`Topic ID ${a} (taxonomy ${e.taxonomyVersion??"N/A"}, model ${e.modelVersion??"N/A"})`,n.appendChild(t)}):n.innerHTML='<li class="ad-topics-empty">Browser did not provide Topics (feature disabled or unsupported).</li>'),S=Array.isArray(e.categories)?e.categories:[],M("ad-categories",(i=S.filter(e=>0<("number"==typeof e.norm?e.norm:e.score||0))).length?i.map(e=>e.label).join(", "):"No matches yet"),r&&(r.innerHTML="",S.length?S.forEach(e=>{var t=document.createElement("div"),n=(t.className="ad-category-card",document.createElement("div")),a=(n.className="ad-category-card__header",document.createElement("span"));a.className="ad-category-card__title",a.textContent=e.label,n.appendChild(a);let o=null;"number"==typeof e.norm&&Number.isFinite(e.norm)?o=Math.round(Math.max(0,Math.min(100,e.norm))):"number"==typeof e.score&&Number.isFinite(e.score)&&(o=Math.round(Math.max(0,Math.min(100,e.score)))),null!==o&&((a=document.createElement("span")).className="ad-category-card__score",a.textContent="Score "+o,n.appendChild(a)),t.appendChild(n);a=document.createElement("div"),a.className="ad-category-card__bar",n=document.createElement("span"),n.className="ad-category-card__barFill",n.style.width=`${null!==o?o:0}%`,a.appendChild(n),t.appendChild(a),n=Array.isArray(e.because)?e.because:[];if(n.length){let a=document.createElement("ul");a.className="ad-category-card__why",n.slice(0,6).forEach(e=>{var t=document.createElement("li");t.textContent=e,a.appendChild(t)}),t.appendChild(a)}r.appendChild(t)}):r.innerHTML='<div class="ad-category-card ad-category-card--empty">No categories yet.</div>'),M("ad-summary",i.length?"Generated from local signals":"Generated (low confidence)"),a&&(a.textContent=e.summary||"Advertising summary is not available."),o=Array.isArray(e.keywords)?e.keywords:[],m&&(s=e.context&&e.context.hasUserText,m.textContent=s?"Auto-scanned + your text":"Auto-scanned"),g&&(g.innerHTML="",o.length?o.slice(0,12).forEach(e=>{var t,a=e.term||e.keyword||(Array.isArray(e)?e[0]:null),e=e.count??(Array.isArray(e)?e[1]:null);a&&((t=document.createElement("span")).className="ad-context-tag",t.textContent=e?a+" ×"+e:a,g.appendChild(t))}):((d=document.createElement("span")).className="ad-context-tag ad-context-tag--empty",d.textContent="No keywords detected yet",g.appendChild(d))),t&&t.context&&(t.context.keywords=o,e.context)&&"string"==typeof e.context.combinedText&&(t.context.combinedText=e.context.combinedText)):(M("ad-topics","Not available"),n&&(n.innerHTML='<li class="ad-topics-empty">Topics not available in this browser.</li>'),M("ad-categories","Not available"),r&&(r.innerHTML='<div class="ad-category-card ad-category-card--empty">No categories yet.</div>'),M("ad-summary","Not available"),a&&(a.textContent="Advertising summary is not available in this browser."),m&&(m.textContent="Auto-scanned"),g&&(g.innerHTML='<span class="ad-context-tag ad-context-tag--empty">No keywords detected yet</span>'))}async function l(){var a={timestamp:(new Date).toISOString(),network:{},browser:{},system:{},connection:{},privacy:{},features:{},fingerprints:{},context:{baseText:"",userText:"",combinedText:"",keywords:[]}};let n=null,o=!1,r=null,i=!1;var l="undefined"==typeof window||"boolean"!=typeof window.isSecureContext||window.isSecureContext,e=(document.querySelector("main")?.innerText||document.body?.innerText||"").trim();a.context.baseText=e,a.context.combinedText=e;try{var t=await N("https://api.ipify.org?format=json");if(t){a.network.ipv4=t.ip,n=t.ip,M("ipv4",t.ip),o=!0;try{var s=await N(`https://dns.google/resolve?name=${t.ip.split(".").reverse().join(".")}.in-addr.arpa&type=PTR`);s&&s.Answer&&s.Answer[0]?(M("reverse-dns",u=s.Answer[0].data),r=u,i=!0,a.network.reverseDns=u):(M("reverse-dns","—","No PTR record found"),i=!0)}catch(e){M("reverse-dns","—","Reverse DNS lookup unavailable (blocked or timed out)"),i=!0}}else M("ipv4","—","IPv4 lookup timed out — trying alternate sources…"),o=!0}catch(e){M("ipv4","—","IPv4 lookup blocked by network or privacy tools — trying alternate sources…"),o=!0}try{var d=await N("https://api64.ipify.org?format=json");d&&d.ip&&d.ip.includes(":")?(a.network.ipv6=d.ip,M("ipv6",d.ip)):(a.network.ipv6=null,M("ipv6","—","Not available (IPv6 not configured)"))}catch(e){a.network.ipv6=null,M("ipv6","—","Not available")}try{let e=await N("https://ipapi.co/json/"),t=e?"ipapi.co":null,p;e||(e=await N("https://ipinfo.io/json"))&&!e.error&&(t="ipinfo.io"),e||!((p=await N("https://ipwho.is/")))||void 0!==p.success&&!p.success||(t="ipwho.is",e={org:p.connection?.org||p.connection?.isp||p.connection?.domain||null,isp:p.connection?.isp||p.connection?.org||null,asn:p.connection?.asn||null,country_name:p.country||p.country_code,country:p.country_code,region:p.region||p.regionName,city:p.city,ip:p.ip,hostname:p.connection?.domain||null}),e?(v=e.org||e.isp||"—",m="object"==typeof e.asn&&e.asn?.asn?e.asn.asn:e.asn||(e.org?e.org.split(" ")[0]:"—"),y=e.country_name||e.country||"—",h=e.region||e.regionName||"—",g=e.city||"—",a.network.isp=v,a.network.asn=m,a.network.country=y,a.network.region=h,a.network.city=g,M("isp",v+(m&&"—"!==m?` (ASN: ${m})`:"")),M("location",(f=[g,h,y].filter(e=>e&&"—"!==e)).length?f.join(", "):"—"),M("network-type",b=(e=>{if(!e)return"—";let t=e.toLowerCase();return["aws","amazon","google","gcp","azure","microsoft","cloudflare","ovh","hetzner","digitalocean","linode","vultr","rackspace","oracle cloud"].some(e=>t.includes(e))?"Likely data-center/VPN":"Likely home/office ISP"})(v)),a.network.networkType=b,w=e.ip||e.ip_address||(Array.isArray(e.ip_addresses)?e.ip_addresses[0]:null),!n&&w&&(n=w,M("ipv4",a.network.ipv4=w,"Recovered via "+(t||"geo lookup")),o=!0),!r&&e.hostname&&(r=e.hostname,a.network.reverseDns=e.hostname,M("reverse-dns",e.hostname,"Provided by geo lookup service"),i=!0),o||(M("ipv4","—","No IP address returned — check VPN or strict network filters."),o=!0),i||r||(M("reverse-dns","—","Reverse DNS not provided by lookup services."),i=!0)):(M("isp","—","ISP lookup blocked — try disabling aggressive content blockers."),M("location","—","Location service unreachable — check connection or retry later."),M("network-type","—","Unable to determine without ISP data."))}catch(e){M("isp","—","ISP lookup blocked — try disabling aggressive content blockers."),M("location","—","Location service unreachable — check connection or retry later."),M("network-type","—","Unable to determine without ISP data.")}o||M("ipv4","—","We could not recover your public IP automatically."),!i&&r?M("reverse-dns",r):i||M("reverse-dns","—","Reverse DNS not available from any provider.");e=document.referrer||"None",M("referrer","None"===(a.network.referrer=e)?"None":e),t=(()=>{let t=navigator.userAgent||"";var e=e=>{e=t.match(e);return e?e[1]:""};let a="Unknown",n="",o="Unknown";return/Edg\//.test(t)?(a="Microsoft Edge",n=e(/Edg\/([\d.]+)/)):/OPR\//.test(t)||/Opera/.test(t)?(a="Opera",n=e(/(?:OPR|Opera)\/([\d.]+)/)):!/Chrome\//.test(t)||/Edg\//.test(t)||/OPR\//.test(t)?/Safari/.test(t)&&!/Chrome/.test(t)?(a="Safari",n=e(/Version\/([\d.]+)/)):/Firefox\//.test(t)?(a="Firefox",n=e(/Firefox\/([\d.]+)/)):(/MSIE /.test(t)||/Trident\//.test(t))&&(a="Internet Explorer",n=e(/(?:MSIE |rv:)([\d.]+)/)):(a="Google Chrome",n=e(/Chrome\/([\d.]+)/)),/Android/.test(t)?o="Android":/iPhone|iPad|iPod/.test(t)?o="iOS":/Windows/.test(t)?o="Windows":/Mac/.test(t)?o="macOS":/Linux/.test(t)&&(o="Linux"),{browser:(n=navigator.userAgentData&&((e=navigator.userAgentData.platform)&&(o=e),e=(e=navigator.userAgentData.brands||[]).find(e=>e.brand&&!/not.?a.?brand/i.test(e.brand))||e[0])&&("Unknown"===a&&(a=e.brand||a),!n)&&e.version?e.version:n)?(a+" "+n).trim():a,os:o}})();a.browser.browser=t.browser,a.browser.os=t.os,M("browser",t.browser),M("os",t.os);try{var c=await T(t.os);c&&c!==t.os&&M("os",a.browser.os=c)}catch(e){}var s=navigator.languages||[navigator.language],u=s.join(", "),d=(a.browser.languages=s,M("languages",u),Intl.DateTimeFormat().resolvedOptions().timeZone),p=-1*(new Date).getTimezoneOffset(),m=0<=p?"+":"-",g=Math.abs(p),h=`UTC${m}${String(Math.floor(g/60)).padStart(2,"0")}:`+String(g%60).padStart(2,"0"),y=d+` (${h})`;a.browser.timezone=d,a.browser.timezoneOffset=h,M("timezone",y);var v,b,f=(new Date).toLocaleString(),w=(M("local-time",a.browser.localTime=f),setInterval(()=>{M("local-time",(new Date).toLocaleString())},1e3),v=window.screen.width,(b=navigator.userAgent.toLowerCase()).includes("mobile")||b.includes("android")||v<768?"Phone":b.includes("tablet")||768<=v&&v<1024?"Tablet":"Desktop"),e=(M("device-type",a.browser.deviceType=w),screen.width+" × "+screen.height),t=(a.browser.screenWidth=screen.width,a.browser.screenHeight=screen.height,M("screen-size",e),window.innerWidth+" × "+window.innerHeight),c=(a.browser.viewportWidth=window.innerWidth,a.browser.viewportHeight=window.innerHeight,M("viewport",t),window.devicePixelRatio||1),s=(M("pixel-ratio",(a.browser.pixelRatio=c).toString()),screen.colorDepth||screen.pixelDepth||"—"),u=(M("color-depth","—"!==(a.browser.colorDepth=s)?s+" bits":"—"),navigator.hardwareConcurrency||"—"),p=(M("cpu-threads","—"!==(a.system.cpuThreads=u)?u.toString():"—","—"!==u?"":"Not available"),navigator.deviceMemory),m=(M("ram",(a.system.ram=p)?A(p):"—",p?"Estimated by browser":"Not available"),await L()),g=m.label||"Not available",d=(a.system.graphics=g,a.fingerprints.webgl=m,M("graphics",g),navigator.connection||navigator.mozConnection||navigator.webkitConnection),y=(h=d)?{type:h.type||"—",effectiveType:h.effectiveType||"—",downlink:h.downlink?h.downlink+" Mbps":"—",rtt:h.rtt?h.rtt+" ms":"—",saveData:h.saveData?"Enabled":"Disabled"}:null,f=(y?(M("connection-type",(a.connection=y).type),M("effective-type",y.effectiveType),M("downlink",y.downlink),M("rtt",y.rtt),M("save-data",y.saveData)):(M("connection-type","—","Not available"),M("effective-type","—","Not available"),M("downlink","—","Not available"),M("rtt","—","Not available"),M("save-data","—","Not available")),navigator.doNotTrack||"—"),w=(M("dnt","1"===(a.privacy.doNotTrack=f)?"Enabled":"0"===f?"Disabled":"Not set"),navigator.globalPrivacyControl||!1),e=(M("gpc",(a.privacy.globalPrivacyControl=w)?"Enabled":"Not set"),navigator.cookieEnabled),t=(M("cookies",(a.privacy.cookiesEnabled=e)?"Enabled":"Disabled"),(()=>{try{var e="__localStorage_test__";return localStorage.setItem(e,e),localStorage.removeItem(e),"Available"}catch(e){return"Not available"}})()),c=(M("local-storage",a.privacy.localStorage=t),window.matchMedia("(prefers-color-scheme: dark)").matches),s=(M("dark-mode",(a.privacy.darkMode=c)?"Dark":"Light"),window.matchMedia("(prefers-reduced-motion: reduce)").matches);M("reduced-motion",(a.privacy.reducedMotion=s)?"Enabled":"Disabled");let S={supported:!(!navigator.mediaDevices||"function"!=typeof navigator.mediaDevices.enumerateDevices),counts:{audioinput:null,audiooutput:null,videoinput:null}};if(S.supported)try{(await navigator.mediaDevices.enumerateDevices()).forEach(e=>{e&&e.kind&&Object.prototype.hasOwnProperty.call(S.counts,e.kind)&&(S.counts[e.kind]=(S.counts[e.kind]||0)+1)}),["audioinput","audiooutput","videoinput"].forEach(e=>{null===S.counts[e]&&(S.counts[e]=0)}),M("microphones",B(S.counts.audioinput)),M("speakers",B(S.counts.audiooutput)),M("webcams",B(S.counts.videoinput))}catch(e){let t=l?!e||"NotAllowedError"!==e.name&&"SecurityError"!==e.name?"Unavailable":"Blocked (permission required)":"Blocked (HTTPS required)";["microphones","speakers","webcams"].forEach(e=>M(e,t)),S.error=t}else["microphones","speakers","webcams"].forEach(e=>M(e,"Not supported in this browser"));a.features.mediaDevices=S;u=(()=>{var e=navigator.maxTouchPoints??0,t="undefined"!=typeof window&&"ontouchstart"in window;let a=(t=0<e||t)?0<e?e+" touch point"+(1===e?"":"s"):"Likely (touch events supported)":"Not detected";return{supported:t,maxTouchPoints:e,label:a}})(),M("touch-support",(a.features.touch=u).supported?u.label:"Not detected"),p=(()=>{if("undefined"==typeof window||"function"!=typeof window.matchMedia)return{label:"Unknown",fine:!1,coarse:!1,none:!1};var e=window.matchMedia("(pointer: fine)").matches||window.matchMedia("(any-pointer: fine)").matches,t=window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(any-pointer: coarse)").matches,a=window.matchMedia("(pointer: none)").matches||window.matchMedia("(any-pointer: none)").matches;let n="Unknown";return e&&t?n="Multiple (mouse & touch)":e?n="Precise pointer (mouse/stylus)":t?n="Touch/limited pointer":a&&(n="No pointer detected"),{label:n,fine:e,coarse:t,none:a}})(),M("pointer-support",(a.features.pointer=p).label),m="undefined"!=typeof navigator&&"geolocation"in navigator?"undefined"==typeof window||"boolean"!=typeof window.isSecureContext||window.isSecureContext?{available:!0,label:"Available (permission required)"}:{available:!1,requiresSecureContext:!0,label:"Blocked (HTTPS required)"}:{available:!1,label:"Not supported in this browser"},g={support:m,precise:null};a.features.geolocation=g,M("geolocation-support",m.label);let C={supported:!1,state:m.requiresSecureContext?"insecure":"unsupported",label:m.label,coords:null,accuracy:null,timestamp:null,error:m.label,requested:!1};m.available&&(C=await(async t=>{var a={supported:!1,state:"unsupported",label:t?"Permission not requested (site uses IP-based location)":"Blocked (HTTPS required)",coords:null,accuracy:null,timestamp:null,error:null,requested:!1};if(!t)return a.state="insecure",a.error="Secure context required",a;if("undefined"==typeof navigator||!navigator.geolocation)return a.state="unsupported",a.label="Not supported in this browser",a.error="Geolocation API unavailable",a;a.supported=!0;let n="unknown";if(navigator.permissions&&"function"==typeof navigator.permissions.query)try{var e=await navigator.permissions.query({name:"geolocation"});n=e.state}catch(e){n="unknown"}if("granted"!==n)return"denied"===n?(a.state="denied",a.label="Permission previously denied",a.error="Permission previously denied"):"prompt"===n?(a.state="prompt",a.label="Permission not requested (site uses IP-based location)"):(a.state=n||"unknown",a.label="Permission status unknown (not requesting precise location)",a.error=a.label),a;try{a.requested=!0;var o=await new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}),{latitude:r,longitude:i,accuracy:l,altitude:s,heading:d,speed:c}=o.coords,u=(a.coords={latitude:r,longitude:i,accuracy:l??null,altitude:s??null,heading:d??null,speed:c??null},a.accuracy=l??null,a.timestamp=o.timestamp||Date.now(),a.state="granted",l?` (±${Math.round(l)} m)`:"");return a.label=r.toFixed(5)+", "+i.toFixed(5)+u,a.error=null,a}catch(e){t=(e||{}).message||"Unable to retrieve location";return a.state="error",a.label="Error: "+t,a.error=t,a}})(l)),M("geolocation-precise",(g.precise=C).label);y=document.getElementById("geolocation-precise-list"),y&&(y.innerHTML="",C.coords?({latitude:f,longitude:w,accuracy:e,altitude:t,heading:c,speed:s}=C.coords,(u=document.createElement("li")).textContent="Latitude: "+f.toFixed(6),y.appendChild(u),(p=document.createElement("li")).textContent="Longitude: "+w.toFixed(6),y.appendChild(p),"number"==typeof e&&((m=document.createElement("li")).textContent=`Accuracy: ±${Math.round(e)} m`,y.appendChild(m)),"number"==typeof t&&((l=document.createElement("li")).textContent=`Altitude: ${t.toFixed(1)} m`,y.appendChild(l)),"number"!=typeof s||Number.isNaN(s)||((g=document.createElement("li")).textContent=`Speed: ${s.toFixed(2)} m/s`,y.appendChild(g)),"number"!=typeof c||Number.isNaN(c)||((f=document.createElement("li")).textContent=`Heading: ${c.toFixed(0)}°`,y.appendChild(f)),(u=document.createElement("li")).textContent="Timestamp: "+new Date(C.timestamp||Date.now()).toLocaleString(),y.appendChild(u)):((w=document.createElement("li")).className="geo-list-empty",w.textContent=C.label||"Precise location not available.",y.appendChild(w),C.error&&C.error!==C.label&&((p=document.createElement("li")).className="geo-list-note",p.textContent=C.error,y.appendChild(p))),(e=document.createElement("li")).className="geo-list-note",e.textContent="Permission state: "+(C.state||"unknown"),y.appendChild(e)),m=(()=>{if("undefined"!=typeof navigator&&"function"==typeof navigator.javaEnabled)try{var e=navigator.javaEnabled();return{supported:!0,enabled:e,label:e?"Enabled (legacy plugin detected)":"Disabled or not installed"}}catch(e){return{supported:!0,enabled:!1,label:"Unknown (browser blocked check)"}}return{supported:!1,enabled:!1,label:"Not supported in modern browsers"}})(),M("java-enabled",(a.features.java=m).label),t=(()=>{if("undefined"==typeof navigator||!navigator.plugins||void 0===navigator.plugins.length)return null;try{var e=Array.from(navigator.plugins).map(e=>e&&e.name?e.name.trim():"").filter(Boolean);return[...new Set(e)]}catch(e){return null}})();a.features.plugins={supported:null!==t,names:t||[]},M("plugins",null===(l=t)?"Not supported in this browser":Array.isArray(l)&&0!==l.length?(s=l.slice(0,2).join(", "),g=2<l.length?` +${l.length-2} more`:"",l.length+" detected: "+s+g):"None detected");let k=document.getElementById("plugins-list");if(k&&(k.innerHTML="",null===t?((c=document.createElement("li")).className="plugin-list-empty",c.textContent="Plugin enumeration not supported in this browser.",k.appendChild(c)):0===t.length?((f=document.createElement("li")).className="plugin-list-empty",f.textContent="No legacy plugins detected.",k.appendChild(f)):(t.forEach(e=>{var t=document.createElement("li");t.textContent=e,k.appendChild(t)}),(u=document.createElement("li")).className="plugin-list-note",u.textContent=`${t.length} plugin${1===t.length?"":"s"} detected.`,k.appendChild(u))),document.fonts&&document.fonts.ready&&"function"==typeof document.fonts.ready.then)try{await document.fonts.ready}catch(e){}w=(()=>{let s={supported:!1,blocked:!1,available:[],totalTested:D.length,methods:[],error:null};if("undefined"!=typeof document&&"function"==typeof document.createElement&&document.body){let i=document.fonts&&"function"==typeof document.fonts.check,l=(i&&s.methods.push("FontFaceSet"),document.createElement("div"));l.style.position="absolute",l.style.visibility="hidden",l.style.pointerEvents="none",l.style.whiteSpace="nowrap",l.style.top="-9999px",l.style.left="-9999px",l.style.fontSize=R+"px",document.body.appendChild(l);try{let r={};I.forEach(e=>{var t=document.createElement("span");t.style.fontFamily=e,t.textContent=O,l.appendChild(t),r[e]=t.offsetWidth,l.removeChild(t)}),s.methods.push("DOM"),s.supported=!0,D.forEach(e=>{let t=!1;if(i)try{t=document.fonts.check(`16px "${e}"`)||document.fonts.check(`700 16px "${e}"`)}catch(e){e&&"SecurityError"===e.name&&(s.blocked=!0)}if(!t)for(var a of I){var n=document.createElement("span"),o=(n.style.fontFamily=`"${e}", `+a,n.textContent=O,l.appendChild(n),n.offsetWidth),n=(l.removeChild(n),r[a]);if("number"==typeof o&&"number"==typeof n&&.5<Math.abs(o-n)){t=!0;break}}t&&s.available.push(e)}),s.available=[...new Set(s.available)].sort((e,t)=>e.localeCompare(t)),s.blocked&&0===s.available.length&&(s.supported=!1,s.error="Protected (browser blocked enumeration)")}catch(e){s.supported=!1,s.error="Font detection failed"}finally{l&&l.parentNode&&l.parentNode.removeChild(l)}}else s.error="Not supported in this environment";return s})();M("fonts",(a.features.fonts=w).supported?`${w.available.length} / ${w.totalTested} detected`:w.error||"Not supported in this browser");let x=document.getElementById("fonts-installed-list");x&&(x.innerHTML="",w.supported&&w.available.length?w.available.forEach(e=>{var t=document.createElement("li");t.textContent=e,x.appendChild(t)}):((p=document.createElement("li")).className="font-list-empty",p.textContent=w.supported?"None detected from the tested list.":w.error||"Font detection not supported.",x.appendChild(p)),w.supported)&&((y=document.createElement("li")).className="font-list-note",y.textContent=`Tested ${w.totalTested} common fonts.`,x.appendChild(y));var[e,m,l,c]=await Promise.all([new Promise(a=>{try{let t=document.createElement("div");t.className="adsbox adsbygoogle banner-ad ad-unit",t.style.cssText="position:absolute; left:-9999px; top:-9999px; width:1px; height:1px; pointer-events:none;",document.body.appendChild(t),requestAnimationFrame(()=>{var e=window.getComputedStyle(t),e=null===t.offsetParent||"none"===e.display||"hidden"===e.visibility||0===t.clientHeight||0===t.clientWidth;t.remove(),a(e)})}catch(e){a(!1)}}),(async()=>{var t={supported:!1,hash:null,sample:null};try{var e,a=document.createElement("canvas"),n=(a.width=300,a.height=150,a.getContext("2d"));return n&&(t.supported=!0,n.textBaseline="top",n.font="16px 'Segoe UI', Tahoma, sans-serif",n.fillStyle="#f60",n.fillRect(130,1,62,20),n.fillStyle="#069",n.fillText("canvas-fp",4,32),n.globalCompositeOperation="multiply",n.fillStyle="#0a0",n.beginPath(),n.arc(75,75,60,0,2*Math.PI),n.fill(),n.globalCompositeOperation="overlay",n.fillStyle="#00f",n.beginPath(),n.arc(120,75,60,0,2*Math.PI),n.fill(),n.globalCompositeOperation="source-over",e=a.toDataURL(),t.hash=await P(e),t.sample=e.slice(0,48)+"..."),t}catch(e){return t}})(),(async()=>{var t={supported:!1,hash:null,error:null};try{var e,a,n,o,r,i=window.OfflineAudioContext||window.webkitOfflineAudioContext;return"function"!=typeof i?t.error="Unsupported":(a=(e=new i(1,44100,44100)).createOscillator(),n=e.createDynamicsCompressor(),a.type="triangle",a.frequency.value=1e3,a.connect(n),n.connect(e.destination),a.start(0),o=(await e.startRendering()).getChannelData(0).slice(0,512),r=Array.from(o).map(e=>e.toFixed(3)).join(","),t.supported=!0,t.hash=await P(r)),t}catch(e){return t.error=e&&e.message?e.message:"Unavailable",t}})(),(async()=>{var t={supported:!1,private:null,quota:null,usage:null,error:null};if(!navigator.storage||"function"!=typeof navigator.storage.estimate)return t;try{var e=await navigator.storage.estimate();return t.supported=!0,t.quota="number"==typeof e.quota?e.quota:null,t.usage="number"==typeof e.usage?e.usage:null,t.private="number"==typeof e.quota?e.quota<125829120:null,t}catch(e){return t.error=e&&e.message?e.message:"Unavailable",t}})()]);if(a.fingerprints.canvas=m,a.fingerprints.audio=l,a.fingerprints.adBlock=e,"boolean"==typeof(a.fingerprints.privateMode=c).private&&(a.privacy.privateMode=c.private),a.privacy.privateModeSupported=!!c.supported,"function"==typeof buildAdInsights)try{var E=await buildAdInsights(a);H(a.advertising=E,a)}catch(e){console.warn("Failed to build advertising insights:",e),H(null,a)}else H(null,a);return a}function s(t){if(c){let e=t&&t.target?t.target.value:"";c.context=c.context||{},c.context.userText=e,u&&clearTimeout(u),u=setTimeout(()=>{(async e=>{if("function"==typeof buildAdInsights&&c){var t={};Object.prototype.hasOwnProperty.call(e,"userText")&&(c.context=c.context||{},c.context.userText=e.userText,t.userText=e.userText);try{var a=await buildAdInsights(c,t);H(c.advertising=a,c)}catch(e){console.warn("Failed to update advertising insights:",e)}}})({userText:e})},d)}}let d=250,c=null,u=null,p="thewebknows-theme",m=window.matchMedia("(prefers-color-scheme: dark)");function g(e,t=!1){var a=document.body;if(a){if(a.setAttribute("data-mode",e),t)try{localStorage.setItem(p,e)}catch(e){console.warn("Failed to save theme preference:",e)}a=document.getElementById("theme-toggle");a&&((t=a.querySelector(".theme-toggle__label"))&&(t.textContent="dark"===e?"Light":"Dark"),a.setAttribute("aria-pressed","dark"===e?"true":"false"),a.setAttribute("aria-label","dark"===e?"Switch to light mode":"Switch to dark mode"))}}async function h(){{let t="light";try{var e=localStorage.getItem(p);t="dark"===e||"light"===e?e:m.matches?"dark":"light"}catch(e){t=m.matches?"dark":"light"}g(t,!1)}document.querySelectorAll(".info-help").forEach(e=>{e&&(e.dataset.defaultHelp=e.textContent||"")}),document.querySelectorAll(".info-value[aria-live]").forEach(e=>{var t=(e.textContent||"").trim();t&&"—"!==t||(e.textContent="Detecting…",e.setAttribute("data-loading","true"),e.setAttribute("aria-busy","true"))}),var populateExplanations=function(){
    if("undefined"==typeof EXPLANATIONS)return;
    Object.keys(EXPLANATIONS).forEach(a=>{
        var e=EXPLANATIONS[a],
            t=(e,t)=>{
                e=document.getElementById(a+"-"+e);
                e&&(e.textContent=t||"—");
            };
        t("explanation",e.what),
            t("legal",e.legal),
            t("malicious",e.malicious),
            t("accuracy",e.accuracy),
            t("hide",e.hide);
    });
};
window.__applyExplanations=populateExplanations, populateExplanations();
var loadExplanations=function(){
    if(loadExplanations.__promise)return loadExplanations.__promise;
    return (loadExplanations.__promise=new Promise((e,t)=>{
        if("undefined"!=typeof EXPLANATIONS)
            return window.__applyExplanations&&window.__applyExplanations(), e(EXPLANATIONS);
        var a=document.createElement("script");
        a.src="/explanations.js",
            (a.async=!0),
            (a.onload=()=>{
                window.__applyExplanations&&window.__applyExplanations(), e(EXPLANATIONS);
            }),
            (a.onerror=()=>t(new Error("Failed to load explanations.js"))),
            document.head.appendChild(a);
    }));
};
document.querySelectorAll(".info-explanation-collapsible summary").forEach(e=>{
    var t=()=>{
        loadExplanations(), e.removeEventListener("click",t);
    };
    e.addEventListener("click",t);
});
document.querySelectorAll(".info-explanation-collapsible").forEach(e=>{
    var t=()=>{
        e.open&&loadExplanations(), e.removeEventListener("toggle",t);
    };
    e.addEventListener("toggle",t);
});
"function"==typeof window.requestIdleCallback
    ? requestIdleCallback(()=>loadExplanations())
    : setTimeout(()=>loadExplanations(),2000);{let a=document.getElementById("behavioral-leaks");if(a){let t=[];var e="undefined"!=typeof HIDDEN_SHARES&&Array.isArray(HIDDEN_SHARES)?HIDDEN_SHARES:[],u="undefined"!=typeof EVERYDAY_LEAKS&&Array.isArray(EVERYDAY_LEAKS)?EVERYDAY_LEAKS:[];e.forEach(e=>{t.push({id:e.id,title:e.type,details:[{label:"How it leaks",text:e.innocentShare},{label:"Misuse risk",text:e.maliciousUse},{label:"Protect",text:e.protection},{label:"Example",text:e.example}]})}),u.forEach(e=>{t.push({id:e.id,title:e.title,details:[{label:"How it leaks",text:e.how},{label:"Reduce risk",text:e.reduce}]})}),a.textContent="",t.forEach(e=>{var t=document.createElement("div"),n=(t.className="info-item leak-item",t.setAttribute("data-leak-id",e.id),t.setAttribute("role","listitem"),document.createElement("div")),n=(n.className="info-label",n.textContent=e.title,t.appendChild(n),Array.isArray(e.details)?e.details.filter(e=>e&&e.text):[]),e=n[0],o=(e?((o=document.createElement("div")).className="info-value leak-item__value",(r=document.createElement("span")).className="leak-item__value-label",r.textContent=e.label,o.appendChild(r),(r=document.createElement("p")).className="leak-item__value-text",r.textContent=e.text,o.appendChild(r),t.appendChild(o)):((r=document.createElement("div")).className="info-value leak-item__value",r.textContent="—",t.appendChild(r)),e?n.slice(1):n);if(0<o.length){var r=document.createElement("details"),e=(r.className="info-explanation-collapsible",document.createElement("summary")),n=(e.className="leak-item__summary",e.append(document.createTextNode("Learn More")),document.createElement("span"));n.className="collapse-icon",n.setAttribute("aria-hidden","true"),n.textContent="+",e.appendChild(n),r.appendChild(e);let a=document.createElement("div");a.className="info-explanation",o.forEach(e=>{var t=document.createElement("h4"),t=(t.textContent=e.label,a.appendChild(t),document.createElement("p"));t.textContent=e.text,a.appendChild(t)}),r.appendChild(a),t.appendChild(r)}a.appendChild(t)})}}{let c=document.querySelector(".site-header");if(c){let e=window.matchMedia("(max-width: 768px)"),t=40,a=10,n=!1,o=!1,r=!1,i=null,l=e=>{o!==e&&(o=e,c.classList.toggle("header--collapsed",e))},s=e=>{n&&(e>t?l(!0):e<=a&&l(!1))};let d=()=>{(n=e.matches)?s(window.scrollY||window.pageYOffset||0):l(!1)};u=()=>{d()};window.addEventListener("scroll",()=>{if(n){let e=window.scrollY||window.pageYOffset||0;r||(r=!0,window.requestAnimationFrame(()=>{s(e),r=!1}))}},{passive:!0}),"function"==typeof e.addEventListener?e.addEventListener("change",u):"function"==typeof e.addListener&&e.addListener(u),window.addEventListener("resize",()=>{i&&window.clearTimeout(i),i=window.setTimeout(d,180)}),window.addEventListener("orientationchange",d),d()}}var t=document.getElementById("theme-toggle"),t=(t&&t.addEventListener("click",()=>{g("dark"===(document.body.getAttribute("data-mode")||"light")?"light":"dark",!0)}),c=await l(),document.getElementById("ad-context-input"));t&&t.addEventListener("input",s)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",h):h()})();