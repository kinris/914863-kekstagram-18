'use strict';

(function () {
  // Наложение эффектов на изображения
  var effectLevel = window.uploadFile.querySelector('.effect-level');
  var effectLevelPin = window.uploadFile.querySelector('.effect-level__pin');
  var effectLevelDepth = window.uploadFile.querySelector('.effect-level__depth');
  var effectLevelValue = window.uploadFile.querySelector('.effect-level__value');

  // переключение эффектов
  var imgUploadEffects = document.querySelector('.img-upload__effects');
  var currentClass = null;
  effectLevel.style.display = 'none';
  imgUploadEffects.addEventListener('change', function (evt) {
    window.imgUploadPreview.classList.remove(currentClass);
    currentClass = 'effects__preview--' + evt.target.value;
    window.imgUploadPreview.classList.add(currentClass);
    effectLevelValue = 100;
    // добавить сброс ползунка до 100%
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    // скрыть ползунок у эффекта "Оригинал"
    if (evt.target.value === 'none') {
      effectLevel.style.display = 'none';
    } else {
      effectLevel.style.display = 'block';
    }
  });

  var getFilterValue = function (min, max) {
    return (min + max) / 100 * (+effectLevelValue.value);
  };

  imgUploadEffects.addEventListener('change', setEffect);

  var setEffect = function (evt) {
    switch (evt.target.value) {
      case 'chrome':
        window.imgUploadPreview.style.filter = 'grayscale(' + getFilterValue(0, 1) + ')';
        break;
      case 'sepia':
        window.imgUploadPreview.style.filter = 'sepia(' + getFilterValue(0, 1) + ')';
        break;
      case 'marvin':
        window.imgUploadPreview.style.filter = 'invert(' + effectLevelValue + '%)';
        break;
      case 'phobos':
        window.imgUploadPreview.style.filter = 'blur(' + getFilterValue(1, 3) + 'px)';
        break;
      case 'heat':
        window.imgUploadPreview.style.filter = 'brightness(' + getFilterValue(1, 3) + ')';
        break;
      case 'none':
        window.imgUploadPreview.style.filter = '';
        break;
    }
  };

  effectLevelPin.addEventListener('mouseup', function () {
    var effectLine = document.querySelector('.effect-level__line');
    var effectLineWidth = effectLine.offsetWidth;
    effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
  });
})();
