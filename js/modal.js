'use strict';

(function () {
  var ESC_KEYCODE = 27;
  // var uploadFile = document.querySelector('.img-upload');
  // var imgUploadInput = uploadFile.querySelector('.img-upload__input');
  var closeUploadFileButton = window.effects.uploadFile.querySelector('.img-upload__cancel');

  // открывает окно редактирования загруженного фото
  var openUploadFile = function () {
    window.effects.uploadFile.querySelector('.img-upload__overlay').classList.remove('hidden');
  };

  // закрывает окно редактирования загруженного фото
  var closeImgUploadOverlay = function () {
    window.effects.uploadFile.querySelector('.img-upload__overlay').classList.add('hidden');
  };

  // по клику на кнопку
  closeUploadFileButton.addEventListener('click', function () {
    closeImgUploadOverlay();
  });
  //  по ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      // если активный элемент не содержит классов хештега и комментария, то его не надо закрывать esc
      var isHashtags = document.activeElement.classList.contains('text__hashtags');
      var isComment = document.activeElement.classList.contains('text__description');
      if (!isHashtags && !isComment) {
        closeImgUploadOverlay();
      }
    }
  });

  window.effects.imgUploadInput.addEventListener('change', function () {
    openUploadFile();
    window.imgScale.setScaleNumber();
  });

})();
