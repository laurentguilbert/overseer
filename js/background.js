chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({
        'url': chrome.extension.getURL('frames.html'),
        'selected': true
    });
});
