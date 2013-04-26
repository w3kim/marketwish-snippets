javascript:(function(win) {
    var doc = win.document;
    setTimeout(function() {
        /* simple server message arrives upon a successful bookmark request */
        function close(msg) {
            console.log(msg.data);
        }

        var bmklt_id = "MW_bookmarklet";
        var exists = doc.getElementById(bmklt_id);

        if (exists) {
            /* for testing purpose, allow multiple bookmarking from one site */
            exists.remove();
            return;
        }

        var base_url = "http://mw.myungjun.org/";
        var iframe = doc.createElement("iframe");

        iframe.id = bmklt_id;
        iframe.src= base_url + "parse?url=" + encodeURIComponent(win.location.href);

        iframe.onload = function() {
            this.style.visibility = "visible";
        };
        doc.body.appendChild(iframe);

        var func = win.addEventListener ? "addEventListener" : "attachEvent";
        var evt = func == "attachEvent" ? "" : "message";

        win[func](evt, close, false);

        }, 1);
})(window);