(function () {
    document.addEventListener('DOMContentLoaded', function () {

        //get root
        var systemFont = 'Default'
        var r = document.querySelector(':root');
        
        if (window?.App?.SystemFont) {
            systemFont = window.App.SystemFont;
            if (systemFont === 'OpenDyslexic' || systemFont === 'Dyslexie') {
                r.style.setProperty('--site-font-family', 'OpenDyslexic Regular')
            } else {
                r.style.setProperty('--site-font-family', 'inherit')
            }
        }
        else if (window?.ApplicationInitialization?.SystemFont) {
            systemFont = window.ApplicationInitialization.SystemFont;
            if (systemFont === 'OpenDyslexic' || systemFont === 'Dyslexie') {
                r.style.setProperty('--site-font-family', 'OpenDyslexic Regular')
            } else {
                r.style.setProperty('--site-font-family', 'inherit')
            }
        }
        else if (window?.SiteData?.SystemFont) {
            systemFont = window.SiteData.SystemFont;
            if (systemFont === 'OpenDyslexic' || systemFont === 'Dyslexie') {
                r.style.setProperty('--site-font-family', 'OpenDyslexic Regular')
                r.style.setProperty('--custom-font-family-gilroy', 'OpenDyslexic Regular')
                r.style.setProperty('--custom-font-family-verdana', 'OpenDyslexic Regular')
                r.style.setProperty('--custom-font-family-proximanova', 'OpenDyslexic Regular')
            } else {
                r.style.setProperty('--site-font-family', 'inherit')
                r.style.setProperty('--custom-font-family-gilroy', 'Gilroy, Verdana, sans-serif')
                r.style.setProperty('--custom-font-family-verdana', 'Verdana, Helvetica, sans-serif')
                r.style.setProperty('--custom-font-family-proximanova', 'proxima-nova, Verdana, sans-serif')
            }
        }
    });
})();
