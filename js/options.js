$(function() {
  var background = chrome.extension.getBackgroundPage();
  var defaultOptions = background.defaultOptions;
  var options = {};

  var $form = $('.js-options-form');
  var $saveButton = $('.js-options-form-submit');
  var $saveSuccessMessage = $('.js-save-success-message');

  function parseOptions() {
    $form.find(':input').each(function() {
      var $field = $(this);
      var name = $field.attr('name');
      var value = $field.val();
      options[name] = value || defaultOptions[name];
    });
  }

  function save() {
    parseOptions();
    chrome.storage.sync.set({'options': options});
    $saveSuccessMessage.fadeIn(200, function() {
      setTimeout(function() { $saveSuccessMessage.fadeOut(200); }, 2000);
    });
  }

  function restore() {
    chrome.storage.sync.get('options', function(result) {
      options = $.extend({}, background.defaultOptions, result.options);
      $form.find(':input').each(function() {
        var $field = $(this);
        var name = $field.attr('name');
        $field.attr('placeholder', defaultOptions[name]);
        $field.val(options[name] || defaultOptions[name]);
      });
    });
  }

  $saveButton.on('click', save);
  restore();
});
