'use strict';

(function () {
  // генерация случайных чисел
  window.util = {
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
  };
})();
