'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;


  //  Редактирование изображения
  // Изменение счётчика по клику
  // Изменение изображения по клику
  var fieldValue = MAX_SCALE_VALUE;
  var scaleControlSmallerButton = window.effects.uploadFile.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = window.effects.uploadFile.querySelector('.scale__control--bigger');
  var scaleControlValue = window.effects.uploadFile.querySelector('.scale__control--value');

  var setScaleNumber = function () {
    scaleControlValue.value = fieldValue + '%';
  };
  window.imgScale = {
    setScaleNumber: setScaleNumber,
  };

  var setImgTransform = function () {
    window.effects.imgUploadPreview.style.transform = 'scale(' + fieldValue / 100 + ')';
  };

  var decreaseScaleImg = function () {
    if (fieldValue > SCALE_STEP) {
      fieldValue -= SCALE_STEP;
      window.imgScale.setScaleNumber();
      setImgTransform();
    }
  };

  var increaseScaleImg = function () {
    if (fieldValue < MAX_SCALE_VALUE) {
      fieldValue += SCALE_STEP;
      window.imgScale.setScaleNumber();
      setImgTransform();
    }
  };

  scaleControlSmallerButton.addEventListener('click', decreaseScaleImg);
  scaleControlBiggerButton.addEventListener('click', increaseScaleImg);
})();
