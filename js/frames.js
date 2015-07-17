function createFrames(frames) {
    $('.js-frame').remove();

    function iframeReady() {
    }

    for (var i = 0; i < frames.length; i++) {
        var src = frames[i];
        if (!src) {
            continue;
        }
        var $frame = $(
            '<div class="frame js-frame">' +
            '<div class="frame-iframe-wrapper js-iframe-wrapper">' +
            '<iframe src="' + src + '" frameborder="0"></iframe>' +
            '</div>' +
            '<a class="frame-title js-title" href="' + src +
                '" target="_blank">Frame ' + i + '</a>' +
            '</div>'
        );

        $('.js-frames').append($frame);
        $frame.find('iframe').on('load', iframeReady);
    }
    resizeFrames();
}

function resizeFrames() {
    var resolutionX = 1280;
    var resolutionY = 786;
    var frameWidth = ($(window).width() - 60) / 3;
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

$(function() {
    var frames = [];
    var $configTextarea = $('.js-config-form-textarea');

    chrome.storage.sync.get('frames', function(result) {
        frames = result.frames;
        $configTextarea.val(frames.join('\n'));
        createFrames(frames);
    });

    $(window).on('resize', resizeFrames);

    $('.js-config-form-submit').on('click', function() {
        var value = $configTextarea.val();
        if (!value) {
            return;
        }
        frames = value.split('\n');
        // Remove empty strings from the array.
        frames = $.grep(frames, function(s) { return s; });
        chrome.storage.sync.set({'frames': frames});
        createFrames(frames);
        Modal.close();
    });
});
