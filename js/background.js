chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({
        'url': chrome.extension.getURL('html/frames.html'),
        'selected': true
    });
});

var defaultOptions = {
  frames: '',
  columns: 3,
  resolutionX: 1280,
  resolutionY: 786,
};
