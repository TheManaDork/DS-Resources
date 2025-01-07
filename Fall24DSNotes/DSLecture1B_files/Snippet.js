(function () {
    document.addEventListener('DOMContentLoaded', function () {

        //Determine User Identity
        var userId;
        var displayName;
        var emailAddress;
        var fullStoryOptOut = false;
        var isAppEmbedded = false;
        var iframeIsRoot = false;
        var runInIframe = false;

        //See if app is embedded and determine special iframe handling parameters for FullSotry
        if (window.self !== window.top) {
            isAppEmbedded = true;

            //Check for access to parent window (same domain)
            try {
                var parentDoc = window.parent.document;  //if this fails, we drop into the catch

                //check if parent is running FullStory
                if (window.parent.window._fs_host != null) {
                    //Basically do nothing in this instance.
                }
                else {
                    //Same Domain, but parent is not running FullStory (Unlikely, but still need to have iframe indicate it's the root.)
                    iframeIsRoot = true;
                }
            }
            catch (e) {
                iframeIsRoot = true;
            }
        }

        //Portal Apps
        if (window.location.href.toLowerCase().indexOf('/manage') > 0 ||
            window.location.href.toLowerCase().indexOf('/search') > 0 ||
            window.location.href.toLowerCase().indexOf('/moderate') > 0 ||
            window.location.href.toLowerCase().indexOf('/poll') > 0 ||
            window.location.href.toLowerCase().indexOf('/editor') > 0) {
            userId = window.App.UserName;
            displayName = window.App.DisplayName;
            emailAddress = window.App.UserEmailAddress;
            fullStoryOptOut = window.App.FullStoryOptOut;
        }
        //Showcase
        else if (window.location.href.toLowerCase().indexOf('/showcase') > 0) {
            userId = window.App.Username;
            displayName = window.App.UserDisplayName;
            emailAddress = window.App.UserEmailAddress;
            fullStoryOptOut = window.App.FullStoryOptOut;
        }
        //WebApps
        else if (window.location.href.toLowerCase().indexOf('/mymediasite') > 0 ||
            window.location.href.toLowerCase().indexOf('/channel/') > 0) {
            userId = window.ApplicationInitialization.Username;
            displayName = window.ApplicationInitialization.DisplayName;
            emailAddress = window.ApplicationInitialization.UserEmailAddress;
            fullStoryOptOut = window.ApplicationInitialization.FullStoryOptOut;
        }
        //Player
        else if (window.location.href.toLowerCase().indexOf('/play') > 0) {
            userId = window.SiteData.UserName;
            displayName = window.SiteData.DisplayName;
            emailAddress = window.SiteData.UserEmailAddress;
            fullStoryOptOut = window.SiteData.FullStoryOptOut;

            if (isAppEmbedded) {
                //Check for Parameters from Mediasite Connect
                let params = (new URL(window.self.document.location)).searchParams;
                let connectParameter = params.get("MediasiteConnect");
                
                if (isMediasiteConnect(connectParameter)) {
                    runInIframe = true;
                }
            }

            function isMediasiteConnect(parameter) {
                if (parameter) {
                    return parameter.toLowerCase() == 'true';
                }
                else {
                    return false;
                }
            }
        }
        //LTI
        else if (window.location.href.toLowerCase().indexOf('/lti') > 0) {
            fullStoryOptOut = window.fullStoryOptOut;
        }

        if (!fullStoryOptOut) {

            //*****  START FULLSTORY SNIPPET *****         
            window['_fs_debug'] = false;
            window['_fs_host'] = 'fullstory.com';
            window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
            window['_fs_org'] = '13M0RR';
            window['_fs_namespace'] = 'FS';
            (function (m, n, e, t, l, o, g, y) {
                if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
                g = m[e] = function (a, b, s) { g.q ? g.q.push([a, b, s]) : g._api(a, b, s); }; g.q = [];
                o = n.createElement(t); o.async = 1; o.crossOrigin = 'anonymous'; o.src = 'https://' + _fs_script;
                y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
                g.identify = function (i, v, s) { g(l, { uid: i }, s); if (v) g(l, v, s) }; g.setUserVars = function (v, s) { g(l, v, s) }; g.event = function (i, v, s) { g('event', { n: i, p: v }, s) };
                g.anonymize = function () { g.identify(!!0) };
                g.shutdown = function () { g("rec", !1) }; g.restart = function () { g("rec", !0) };
                g.log = function (a, b) { g("log", [a, b]) };
                g.consent = function (a) { g("consent", !arguments.length || a) };
                g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v) };
                g.clearUserCookie = function () { };
                g.setVars = function (n, p) { g('setVars', [n, p]); };
                g._w = {}; y = 'XMLHttpRequest'; g._w[y] = m[y]; y = 'fetch'; g._w[y] = m[y];
                if (m[y]) m[y] = function () { return g._w[y].apply(this, arguments) };
                g._v = "1.3.0";
            })(window, document, window['_fs_namespace'], 'script', 'user');
            //*****  END FULLSTORY SNIPPET *****

            //Iframe code checks
            if (iframeIsRoot) {
                window['_fs_is_outer_script'] = true;
            }
            else if (runInIframe) {
                window['_fs_run_in_iframe'] = true;
            }

            //WE ARE NOT IDENTIFYING USERS IN FULLSTORY FOR THE TIME BEING (12/2/2021 - msl)
            //FS.identify(userId,
            //    {
            //        DisplayName: displayName,
            //        Email: emailAddress
            //    });
        }

    });
})();
