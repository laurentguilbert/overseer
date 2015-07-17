var frames = [];
var settings = {};

function createFrames() {
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
    var resolutionX = settings.resolutionX;
    var resolutionY = settings.resolutionY;
    var frameWidth = ($(window).width() - settings.columns * 20) / settings.columns;
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

function fillSettingsForm() {
    var $form = $('.js-settings-form');
    $form.find('input').each(function() {
        $(this).val(settings[$(this).attr('name')]);
    });
}

function updateSettings() {
    var $form = $('.js-settings-form');
    $form.find('input').each(function() {
        settings[$(this).attr('name')] = $(this).val();
    });
    chrome.storage.sync.set({'settings': settings});
}

$(function() {
    var defaultSettings = {
        columns: 3,
        resolutionX: 1280,
        resolutionY: 786,
    };

    var $framesTextarea = $('.js-frames-form-textarea');

    chrome.storage.sync.get('settings', function(result) {
        settings = result.settings || defaultSettings;
        fillSettingsForm(settings);

        chrome.storage.sync.get('frames', function(result) {
            frames = result.frames;
            $framesTextarea.val(frames.join('\n'));
            createFrames();
        });
    });

    $(window).on('resize', resizeFrames);

    $('.js-settings-form-submit').on('click', function() {
        updateSettings();
        createFrames();
        Modal.close();
    });

    $('.js-frames-form-submit').on('click', function() {
        var value = $framesTextarea.val();
        frames = value.split('\n');
        // Remove empty strings from the array.
        frames = $.grep(frames, function(s) { return s; });
        chrome.storage.sync.set({'frames': frames});
        createFrames();
        Modal.close();
    });
});
