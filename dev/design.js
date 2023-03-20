(function ($) {

    function settingGlobalScroll() {
        const global = $('head #global-scroll');
        const isMobile = /phone|pad|pod|iPhone|iPod|ios|iOS|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);

        if (!isMobile && global.length === 0) {
            const style = document.createElement('style');
            style.id = 'global-scroll';
            style.textContent = '::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: var(--scrollbarColor); border-radius: 2px; }';
            $('head').append(style);
        } else if (isMobile && global.length > 0) {
            global.remove();
        }
    }

    $(document).ready(() => {
        // Fixed scrollbar styles for browsers on different platforms
        settingGlobalScroll();
        // .node-status-realtime embed[src="/luci-static/resources/bandwidth.svg"] + div + br + table
        // .node-status-realtime embed[src="/luci-static/resources/wifirate.svg"] + div + br + table
        // .node-status-realtime embed[src="/luci-static/resources/wireless.svg"] + div + br + table
        if ($('.node-status-realtime').length != 0) {
            const selectorValues = ["bandwidth", "wifirate", "wireless"];
            selectorValues.forEach(value => {
                const target = $(`.node-status-realtime embed[src="/luci-static/resources/${value}.svg"] + div + br + table`);
                if (target.length) {
                    const div = document.createElement("div");
                    div.style.overflowX = "auto";
                    target.before(div);
                    const newTarget = target.clone();
                    target.remove();
                    div.appendChild(newTarget.get(0));
                }
            });
        }

        // Fixed luci-app-passwall/luci-app-ddns menu expand
        const path = self.location.pathname
        if (($(".node-services-passwall").length === 1 || $(".node-services-ddns").length === 1) && (path === "/cgi-bin/luci/admin/services/passwall" || path === "/cgi-bin/luci/admin/services/ddns")) {
            var slide = $(".main > .main-left > .nav > .slide");
            slide.each(function () {
                var ul = $(this).children("ul");
                ul.each(function () {
                    var liActive = $(this).children("li.active");
                    liActive.each(function () {
                        var aTags = $(this).children("a");
                        aTags.each(function () {
                            var href = $(this).attr("href");
                            if (href === "/cgi-bin/luci/admin/services/passwall2" || href === "/cgi-bin/luci/admin/services/ddnsto") {
                                $(this).parent("li").removeAttr("class");
                                const targetElement = $(this).closest(".slide").find(".menu").first()
                                const targetHeight = targetElement.height();
                                targetElement.click(() => {
                                    console.log(targetHeight);
                                    ul.css("height", '');
                                });
                                targetElement.click();
                            }
                        });
                    });
                });
            });
        }

    });

    // Fixed scrollbar styles for browsers on different platforms
    $(window).resize(function () {
        settingGlobalScroll();
    });

})(jQuery);