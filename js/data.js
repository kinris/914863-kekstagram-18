'use strict';

(function () {
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

  // Создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем
  var getPictures = function () {
    var picturesList = [];
    for (var i = 1; i <= NUMBER_PICTURES; i++) {
      var comments = [];
      var countComments = window.util.getRandomInteger(1, 7);
      for (var j = 0; j < countComments; j++) {
        var comment = {
          avatar: 'img/avatar' + window.util.getRandomInteger(1, 6) + '.svg',
          message: COMMENTS[window.util.getRandomInteger(0, COMMENTS.length - 1)],
          name: USERNAMES[window.util.getRandomInteger(0, USERNAMES.length - 1)],
        };
        comments.push(comment);
      }
      var pictures = {
        url: 'photos/' + i + '.jpg',
        description: DESCRIPTION[window.util.getRandomInteger(0, DESCRIPTION.length - 1)],
        likes: window.util.getRandomInteger(15, 200),
        comments: comments,
      };
      picturesList.push(pictures);
    }
    return picturesList;
  };

  window.data = {
    pictures: getPictures()
  };
})();
