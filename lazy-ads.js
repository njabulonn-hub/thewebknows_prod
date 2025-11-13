(function() {
    var ADS_SCRIPT_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9160600423347839";
    var scriptAppended = false;
    var scheduled = false;

    function appendAdsScript() {
        if (scriptAppended) {
            return;
        }
        scriptAppended = true;
        var script = document.createElement("script");
        script.src = ADS_SCRIPT_SRC;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }

    function scheduleWhenIdle() {
        if (scheduled || scriptAppended) {
            return;
        }
        scheduled = true;
        var load = function() {
            scheduled = false;
            appendAdsScript();
        };
        if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(function() {
                load();
            }, { timeout: 4000 });
        } else {
            window.setTimeout(load, 2000);
        }
    }

    if (document.readyState === "complete") {
        scheduleWhenIdle();
    } else {
        window.addEventListener("load", scheduleWhenIdle, { once: true });
    }

    var interactionEvents = ["scroll", "pointerdown", "keydown", "touchstart"];
    var interactionOptions = { once: true, passive: true };
    var triggerOnInteraction = function() {
        appendAdsScript();
    };

    interactionEvents.forEach(function(evt) {
        window.addEventListener(evt, triggerOnInteraction, interactionOptions);
    });

    window.__twkLoadAdsScript = appendAdsScript;
})();
