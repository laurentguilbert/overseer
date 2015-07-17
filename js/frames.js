function createFrames(frames) {
    $('.js-frame').remove();

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
                '" target="_blank">' + src + '</a>' +
            '</div>'
        );

        $('.js-frames').append($frame);
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
    var $framesTextarea = $('.js-frames-form-textarea');

    chrome.storage.sync.get('frames', function(result) {
        frames = result.frames;
        $framesTextarea.val(frames.join('\n'));
        createFrames(frames);
    });

    $(window).on('resize', resizeFrames);

    $('.js-frames-form-submit').on('click', function() {
        var value = $framesTextarea.val();
        frames = value.split('\n');
        // Remove empty strings from the array.
        frames = $.grep(frames, function(s) { return s; });
        chrome.storage.sync.set({'frames': frames});
        createFrames(frames);
        Modal.close();
    });
});
