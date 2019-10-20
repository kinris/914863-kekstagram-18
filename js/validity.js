'use strict';

(function () {
  var MAX_HASH_TAG_NUMBER = 5;
  var MAX_HASH_TAG_LENGTH = 20;

  var imageUploadForm = document.querySelector('.img-upload__form');
  var hashTagInput = window.uploadFile.querySelector('.text__hashtags');
  var uploadFormSubmit = window.uploadFile.querySelector('.img-upload__submit');

  var errorText = '';

  var checkValidHashTag = function (hashtagStr) {
    hashTagInput.setCustomValidity('');
    var hashTagArray = hashtagStr.trim().toLowerCase().split(' ');
    if (hashtagStr.trim() === '') {
      return '';
    }

    var newHashTagArray = hashTagArray.filter(function (element) {
      return element;
    });

    if (newHashTagArray.length > MAX_HASH_TAG_NUMBER) {
      errorText = 'Количество хэштэгов больше 5';
      return errorText;
    }

    for (var i = 0; i < newHashTagArray.length; i++) {
      var currentHash = newHashTagArray[i];
      if (currentHash[0] !== '#') {
        errorText = 'хэштэг должен начинаться с #';
      } else if (currentHash.length === 1) {
        errorText = 'в хэштеге должны быть символы кроме #';
      } else if (currentHash.length > MAX_HASH_TAG_LENGTH) {
        errorText = 'максимальная длина хэштэга:' + MAX_HASH_TAG_LENGTH + 'символов';
      } else if (newHashTagArray.indexOf(currentHash, i + 1) !== -1) {
        errorText = 'хэштеги не могут быть одинаковыми';
      }
      if (errorText) {
        break;
      }
    }
    return errorText;
  };

  uploadFormSubmit.addEventListener('click', function () {
    var textErrorHashTag = checkValidHashTag(hashTagInput.value);

    if (textErrorHashTag !== '') {
      hashTagInput.setCustomValidity(textErrorHashTag);
    } else {
      imageUploadForm.submit();
    }
  });

})();
