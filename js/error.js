'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var renderError = function () {

    var main = document.querySelector('main');

    var error = document.querySelector('#error')
      .content
      .querySelector('.error');

    main.appendChild(error);

    var errorInner = error.querySelector('.error__inner');

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
  };

  window.error = {
    renderError: renderError
  };
})();
