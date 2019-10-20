'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;

  var picturesElementList = document.querySelector('.pictures');

  var pictureTemplates = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Отрисовка объектов
  var renderPhotos = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = pictureTemplates.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = pictures[i].url;
      pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
      pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;

      fragment.appendChild(pictureElement);
    }
    picturesElementList.appendChild(fragment);
  };

  renderPhotos(window.data.pictures);

  //  Редактирование изображения
  // Изменение счётчика по клику
  // Изменение изображения по клику
  var fieldValue = MAX_SCALE_VALUE;
  var scaleControlSmallerButton = window.uploadFile.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = window.uploadFile.querySelector('.scale__control--bigger');
  var scaleControlValue = window.uploadFile.querySelector('.scale__control--value');
  var imgUploadPreview = window.uploadFile.querySelector('.img-upload__preview img');
  window.imgUploadPreview = imgUploadPreview;

  var setScaleNumber = function () {
    scaleControlValue.value = fieldValue + '%';
  };
  window.setScaleNumber = setScaleNumber;

  var setImgTransform = function () {
    imgUploadPreview.style.transform = 'scale(' + fieldValue / 100 + ')';
  };

  var decreaseScaleImg = function () {
    if (fieldValue > SCALE_STEP) {
      fieldValue -= SCALE_STEP;
      setScaleNumber();
      setImgTransform();
    }
  };

  var increaseScaleImg = function () {
    if (fieldValue < MAX_SCALE_VALUE) {
      fieldValue += SCALE_STEP;
      setScaleNumber();
      setImgTransform();
    }
  };

  scaleControlSmallerButton.addEventListener('click', decreaseScaleImg);
  scaleControlBiggerButton.addEventListener('click', increaseScaleImg);

})();
