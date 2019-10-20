'use strict';

(function () {

  var picturesElementList = document.querySelector('.pictures');

  var pictureTemplates = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Отрисовка объектов
  var renderPhotos = function () {
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

  renderPhotos(window.pictures);

})();
