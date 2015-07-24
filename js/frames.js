$(function() {
  var options = {};

  function createFrames() {
    var frames = options.frames.split('\n');

    $('.js-frame').remove();

    for (var i = 0; i < frames.length; i++) {
      var src = frames[i];
      if (!src) {
        continue;
      }
      var $frame = $(
        '<div class="frame js-frame">' +
        '<div class="frame-iframe-wrapper js-iframe-wrapper">' +
        '<iframe frameborder="0" scrolling="no"></iframe>' +
        '</div>' +
        '<div class="frame-title-container">' +
        '<a class="frame-title js-title" ' +
        'href="' + src + '" target="_blank">' + src + '</a>' +
        '</div>' +
        '</div>'
      );
      $('.js-frames').append($frame);

      src += src.indexOf('?') !== -1 ? '&' : '?';
      src += 'timestamp=' + (new Date()).getTime();
      $frame.find('iframe').attr('src', src);
    }
    resizeFrames();
  }

  function resizeFrames() {
    var resolutionX = options.resolutionX;
    var resolutionY = options.resolutionY;
    var gutterWidth = 10;
    var frameWidth = (
      ($(document).width() - options.columns * gutterWidth - gutterWidth) /
      options.columns
    );
    var scale = frameWidth / resolutionX;

    $('.js-frame').each(function() {
      var $frame = $(this);
      var $wrapper = $frame.find('.js-iframe-wrapper');
      var $iframe = $wrapper.find('iframe');

      $frame.width(frameWidth);
      $wrapper.height(frameWidth * (resolutionY / resolutionX));
      $iframe.css({
        transform: 'scale(' + scale + ')',
      });
    });
  }

  $(window).on('resize', resizeFrames);

  chrome.storage.sync.get('options', function(result) {
    options = result.options;
    createFrames();
  });
});
