'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorInner = errorTemplate.querySelector('.error__inner');

  var renderError = function () {
    var error = errorTemplate.cloneNode(true);
    var closeErrorPopup = function () {
      error.remove();
    };

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorPopup();
      }
    });

    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('error__button')) {
        closeErrorPopup();
      } else if (!errorInner.contains(target)) {
        closeErrorPopup();
      }
    });


    main.appendChild(error);

  };

  window.error = {
    renderError: renderError
  };
})();
