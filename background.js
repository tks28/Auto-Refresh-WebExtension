// if receive the reuquest mesasge from autoRefresh.js
browser.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    if( request.message === "reload" ) {
        // get the current active tab from the browser
        let querying = browser.tabs.query({currentWindow: true, active:true});
        querying.then(function(tab){
            //store the code
            var codeReload = 'window.location.reload(true);';
            //execute the code on the current tab
            browser.tabs.executeScript(tab.id, {code: codeReload});
        }, null);
    }
});