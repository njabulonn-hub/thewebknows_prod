(()=>{let s=document.getElementById("article-root"),c=s?null:document.querySelector(".blog-article");if(s||c){let n="undefined"!=typeof GlossaryUtils&&GlossaryUtils||null,r=n&&"function"==typeof n.createEntries&&Array.isArray(window.glossaryData)?n.createEntries(window.glossaryData):[],l=n&&"function"==typeof n.matchText?n.matchText:null,o=(()=>{var e=document.head.querySelector('link[rel="canonical"]');if(e&&e.href)try{var t=new URL(e.href,window.location.href);if(t.origin&&"null"!==t.origin)return t.origin}catch(e){}try{if(window.location&&window.location.origin&&"null"!==window.location.origin)return window.location.origin}catch(e){}return"https://thewebknows.com"})();function d(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function g(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function u(e){return e?`/privacy-insights/${encodeURIComponent(e)}/`:"/privacy-insights/"}function m(e){return"undefined"!=typeof CSS&&"function"==typeof CSS.escape?CSS.escape(e):String(e).replace(/[^a-zA-Z0-9_-]/g,"\\$&")}function p(t,i){if(t&&"string"==typeof i){let e=document.head.querySelector(`meta[name="${m(t)}"]`);e||((e=document.createElement("meta")).setAttribute("name",t),document.head.appendChild(e)),e.setAttribute("content",i)}}function h(t,i){if(t&&"string"==typeof i){let e=document.head.querySelector(`meta[property="${m(t)}"]`);e||((e=document.createElement("meta")).setAttribute("property",t),document.head.appendChild(e)),e.setAttribute("content",i)}}function y(e){var t;return e?(t=e+"T00:00:00.000Z",Number.isNaN(Date.parse(t))?(e=new Date(e),Number.isNaN(e.getTime())?null:e.toISOString()):t):null}function f(t){if(t&&t.slug){var i=""+o+u(t.slug),e=(a=(a=t)&&(a.summary||a.excerpt)?String(a.summary||a.excerpt).trim():"")?!(a.length<=155)&&(e=a.slice(0,155).replace(/\s+[^\s]*$/,"")).length?e+"...":a:"",a=y(t.lastUpdated),r=(document.title=`${t.title||"Privacy Insights"} | Privacy Insights | The Web Knows`,p("description",e||"Explore privacy diagnostics and guides from The Web Knows."),"canonical"),n=i;if(r&&"string"==typeof n){let e=document.head.querySelector(`link[rel="${m(r)}"]`);e||((e=document.createElement("link")).setAttribute("rel",r),document.head.appendChild(e)),e.setAttribute("href",n)}h("og:type","article"),h("og:site_name","The Web Knows"),h("og:url",i),h("og:title",t.title||"Privacy Insights"),h("og:description",e||""),h("og:image",o+"/og-image.png"),h("article:section",t.category||""),a&&(h("article:published_time",a),h("article:modified_time",a)),p("twitter:card","summary_large_image"),p("twitter:title",t.title||"Privacy Insights"),p("twitter:description",e||""),p("twitter:image",o+"/og-image.png"),p("twitter:url",i);r=t,n=i,a=e;if(r&&n){var t=[],i=n+"#article",l=o+"/privacy-insights/",s=y(r.lastUpdated);t.push({"@type":"Article","@id":i,headline:r.title||"",description:a||"",inLanguage:"en",isPartOf:{"@id":l+"#page"},mainEntityOfPage:{"@id":n},articleSection:r.category||"",image:o+"/og-image.png",author:{"@type":"Organization",name:"The Web Knows"},publisher:{"@type":"Organization",name:"The Web Knows",logo:{"@type":"ImageObject",url:o+"/favicon.svg"}},datePublished:s||void 0,dateModified:s||void 0}),t.push({"@type":"BreadcrumbList","@id":n+"#breadcrumbs",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:o+"/"},{"@type":"ListItem",position:2,name:"Privacy Insights",item:l},{"@type":"ListItem",position:3,name:r.title||"",item:n}]});let e=document.head.querySelector("script[data-dynamic-article-ld]");e||((e=document.createElement("script")).type="application/ld+json",e.setAttribute("data-dynamic-article-ld","true"),document.head.appendChild(e)),e.textContent=JSON.stringify({"@context":"https://schema.org","@graph":t},null,2)}}}function b(e,t=""){if(!l||!r.length||!e)return[];e=[e.title,e.excerpt,Array.isArray(e.keywords)?e.keywords.join(" "):"",e.summary,t].filter(Boolean);if(!e.length)return[];t=e.join(" "),e=l(r,t);if(!Array.isArray(e)||!e.length)return[];let i=[],a=new Set;return e.forEach(e=>{var t;e&&(t=e.slug||e.id||e.term)&&!a.has(t)&&(a.add(t),i.push(e))}),i.sort((e,t)=>e.term.localeCompare(t.term)),i.slice(0,8)}function A(e){return Array.isArray(e)&&e.length?`
            <section class="blog-article__glossary">
                <h2>Glossary Terms Mentioned</h2>
                <div class="article-glossary-list">
                    ${e.map(e=>{var t=e.slug||e.id||"",i=Array.isArray(e.aliases)?e.aliases:[],i=i.length?`<span class="article-glossary-term__aliases">Also known as: ${d(i.join(", "))}</span>`:"",a=t?"/glossary/#glossary-"+g(t):"/glossary/";return`
                <details class="article-glossary-term" data-term="${g(t)}">
                    <summary>
                        <span class="article-glossary-term__name">${d(e.term)}</span>
                        ${i}
                    </summary>
                    <div class="article-glossary-term__body">
                        <p>${d(e.definition)}</p>
                        <p class="article-glossary-term__actions"><a href="${a}">View in glossary</a></p>
                    </div>
                </details>
            `}).join("")}
                </div>
            </section>
        `:""}function v(e){e=Array.isArray(e)?e:[];let a=[],r=new Set;return Array.isArray(ARTICLES_DATA)&&e.forEach(t=>{var e,i;t&&!r.has(t)&&(e=ARTICLES_DATA.find(e=>e.slug===t))&&(r.add(t),i=n&&"function"==typeof n.buildArticleUrl?n.buildArticleUrl(e.slug,{prefix:"./"}):u(e.slug),a.push(`<li><a href="${g(i)}">${d(e.title)}</a></li>`))}),a.length?`
            <aside class="blog-article__related">
                <h2>Related Articles</h2>
                <ul class="related-articles-list">
                    ${a.join("")}
                </ul>
            </aside>
        `:""}function w(e){s&&(s.innerHTML=`
            <div class="blog-article__content">
                <h1>Article not found</h1>
                <p>${e}</p>
                <p><a href="/privacy-insights/" class="btn btn-primary">Back to Privacy Insights</a></p>
            </div>
        `,s.classList.remove("placeholder-article"),s.setAttribute("aria-busy","false"))}function _(e){var t,i,a,r,n,l;s&&(f(e),{title:l,category:n,lastUpdated:t,readingTime:i,excerpt:a,relatedArticles:r=[]}=e,l=d(l),n=d(n),a=d(a),e=A(b(e)),r=v(r),s.innerHTML=`
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    <li><a href="../">Home</a></li>
                <li><a href="/privacy-insights/">Insights</a></li>
                    <li aria-current="page">${l}</li>
                </ol>
            </nav>

            <header class="blog-article__header">
                <p class="blog-article__category">${n}</p>
                <h1 class="blog-article__title">${l}</h1>
                <div class="blog-article__meta">
                    <time datetime="${t}">${n=t,l=new Date(n),Number.isNaN(l.getTime())?n:l.toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"})}</time>
                    <span class="blog-article__reading-time">${i} min read</span>
                </div>
            </header>

            <section class="blog-article__content">
                <h2>Summary</h2>
                <p>${a}</p>
                <div class="info-card-note">
                    <p><strong>Full article coming soon.</strong></p>
                    <p>We're still polishing the deep dive for this topic. Check back shortly or explore the related guides below.</p>
                </div>
            </section>

            ${e}
            ${r}
        `,s.classList.remove("placeholder-article"),s.setAttribute("aria-busy","false"))}function e(){if(!s&&c){if("undefined"==typeof ARTICLES_DATA)return;var i=window.location.pathname.match(/\/privacy-insights\/([^/]+)\/?$/)||window.location.pathname.match(/\/blog\/([^/.]+)\.html?$/);let t=i?i[1]:null;if(!t)return;let e=ARTICLES_DATA.find(e=>e.slug===t);void(e&&(i=e,c)&&i&&(a=A(b(i,(a=c.querySelector(".blog-article__content"))&&a.textContent||"")),i=v(i.relatedArticles||[]),a&&!c.querySelector(".blog-article__glossary")&&c.insertAdjacentHTML("beforeend",a),i)&&!c.querySelector(".blog-article__related")&&c.insertAdjacentHTML("beforeend",i))}else{var a;if(s){let t=new URLSearchParams(window.location.search).get("slug");if(t)if("undefined"==typeof ARTICLES_DATA)w("Article data failed to load. Please refresh the page.");else{let e=ARTICLES_DATA.find(e=>e.slug===t);e?_(e):w("We couldn’t find that article. It may have moved or been renamed.")}else w("No article was specified. Please choose a guide from the Privacy Insights section.")}}}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}})();