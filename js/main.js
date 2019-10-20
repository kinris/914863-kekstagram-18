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
var MAX_HASH_TAG_NUMBER = 5;
var MAX_HASH_TAG_LENGTH = 20;
// var MAX_DESCRIPTION_NUMBER = 140;

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
var pictures = getPictures();


// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
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

renderPhotos();

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
    // если активный элемент не содержит классов хештега и комментария, то его не надо закрывать esc
    var isHashtags = document.activeElement.classList.contains('text__hashtags');
    var isComment = document.activeElement.classList.contains('text__description');
    if (!isHashtags && !isComment) {
      closeImgUploadOverlay();
    }
  }
});

// // Наложение эффектов на изображения
var effectLevel = uploadFile.querySelector('.effect-level');
var effectLevelPin = uploadFile.querySelector('.effect-level__pin');
var effectLevelDepth = uploadFile.querySelector('.effect-level__depth');
var effectLevelValue = uploadFile.querySelector('.effect-level__value');

// // переключение эффектов
var imgUploadEffects = document.querySelector('.img-upload__effects');
var currentClass = null;
effectLevel.style.display = 'none';
imgUploadEffects.addEventListener('change', function (evt) {
  imgUploadPreview.classList.remove(currentClass);
  currentClass = 'effects__preview--' + evt.target.value;
  imgUploadPreview.classList.add(currentClass);
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
      imgUploadPreview.style.filter = 'grayscale(' + getFilterValue(0, 1) + ')';
      break;
    case 'sepia':
      imgUploadPreview.style.filter = 'sepia(' + getFilterValue(0, 1) + ')';
      break;
    case 'marvin':
      imgUploadPreview.style.filter = 'invert(' + effectLevelValue + '%)';
      break;
    case 'phobos':
      imgUploadPreview.style.filter = 'blur(' + getFilterValue(1, 3) + 'px)';
      break;
    case 'heat':
      imgUploadPreview.style.filter = 'brightness(' + getFilterValue(1, 3) + ')';
      break;
    case 'none':
      imgUploadPreview.style.filter = '';
      break;
  }
};

effectLevelPin.addEventListener('mouseup', function () {
  var effectLine = document.querySelector('.effect-level__line');
  var effectLineWidth = effectLine.offsetWidth;
  effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
});

// валидация хештегов
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
