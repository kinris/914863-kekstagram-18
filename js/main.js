'use strict';
// генерация случайных чисел
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// константы
var DESCRIPTION = [
  'Отличная фотография',
  'Хорошая фотография',
  'Плохая фотография',
];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var USERNAMES = [
  'Дина',
  'Берта',
  'Фёдор',
  'Иван',
  'Анжела',
  'Алексей',
  'Михаил',
  'Татьяна',
  'Аня',
  'Ольга',
  'Лев',
];
var NUMBER_PICTURES = 25;
var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var MAX_SCALE_VALUE = 100;

// Создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем
var getPictures = function () {
  var picturesList = [];
  for (var i = 1; i <= NUMBER_PICTURES; i++) {
    var comments = [];
    var countComments = getRandomInteger(1, 7);
    for (var j = 0; j < countComments; j++) {
      var comment = {
        avatar: 'img/avatar' + getRandomInteger(1, 6) + '.svg',
        message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
        name: USERNAMES[getRandomInteger(0, USERNAMES.length - 1)],
      };
      comments.push(comment);
    }
    var pictures = {
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: comments,
    };
    picturesList.push(pictures);
  }
  return picturesList;
};

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
var pictures = getPictures();

var picturesElementList = document.querySelector('.pictures');

var pictureTemplates = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Отрисовка объектов
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  var pictureElement = pictureTemplates.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = pictures[i].url;
  pictureElement.querySelector('.picture__likes').textContent = pictures[i].likes;
  pictureElement.querySelector('.picture__comments').textContent = pictures[i].comments.length;

  fragment.appendChild(pictureElement);
}
picturesElementList.appendChild(fragment);

// Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('.img-upload');
var imgUploadInput = uploadFile.querySelector('.img-upload__input');
var closeUploadFileButton = uploadFile.querySelector('.img-upload__cancel');

// открывает окно редактирования загруженного фото
var openUploadFile = function () {
  uploadFile.querySelector('.img-upload__overlay').classList.remove('hidden');
};

//  Редактирование изображения
// Изменение счётчика по клику
// Изменение изображения по клику
var fieldValue = MAX_SCALE_VALUE;
var scaleControlSmallerButton = uploadFile.querySelector('.scale__control--smaller');
var scaleControlBiggerButton = uploadFile.querySelector('.scale__control--bigger');
var scaleControlValue = uploadFile.querySelector('.scale__control--value');
var imgUploadPreview = uploadFile.querySelector('.img-upload__preview img');

var setScaleNumber = function () {
  scaleControlValue.value = fieldValue + '%';
};

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

// открытие окна редактирования фото при изменении значения инпута загрузки
imgUploadInput.addEventListener('change', function () {
  openUploadFile();
  setScaleNumber();
});

// закрывает окно редактирования загруженного фото
var closeImgUploadOverlay = function () {
  uploadFile.querySelector('.img-upload__overlay').classList.add('hidden');
};

// по клику на кнопку
closeUploadFileButton.addEventListener('click', function () {
  closeImgUploadOverlay();
});
//  по ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUploadOverlay();
  }
});

// Наложение эффектов на изображения
var imgUploadEffects = document.querySelector('.img-upload__effects');

imgUploadEffects.addEventListener('change', function (evt) {
  if (evt.target.value === 'chrome') {
    imgUploadPreview.classList.add('effects__preview--chrome');
  } else if (evt.target.value === 'sepia') {
    imgUploadPreview.classList.add('effects__preview--sepia');
  } else if (evt.target.value === 'marvin') {
    imgUploadPreview.classList.add('effects__preview--marvin');
  } else if (evt.target.value === 'phobos') {
    imgUploadPreview.classList.add('effects__preview--phobos');
  } else if (evt.target.value === 'heat') {
    imgUploadPreview.classList.add('effects__preview--heat');
  }
});
