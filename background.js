browser.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    if( request.message === "reload" ) {
        let querying = browser.tabs.query({currentWindow: true, active:true});
        querying.then(function(tab){
            var code = 'window.location.reload(true);';
            browser.tabs.executeScript(tab.id, {code: code});
        }, null);
    }
});