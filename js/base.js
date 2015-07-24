$(function() {
  $('.js-nav-options').on('click', function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      location.href = chrome.runtime.getURL('html/options.html');
    }
  });

  $('.js-nav-frames').on('click', function() {
    location.href = chrome.runtime.getURL('html/frames.html');
  });

  $('.js-manifest-version').text(chrome.runtime.getManifest().version);
});
