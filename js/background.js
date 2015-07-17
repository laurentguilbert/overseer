/*
 * Overseer
 * https://github.com/laurentguilbert/overseer
 * Copyright (c) 2015 Laurent Guilbert
 * Released under the MIT license.
 */

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({
        'url': chrome.extension.getURL('frames.html'),
        'selected': true
    });
});
