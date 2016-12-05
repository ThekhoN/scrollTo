'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FixedNavX99 = function () {
  function FixedNavX99(options) {
    _classCallCheck(this, FixedNavX99);

    if (!options) {
      options = {};
    }
    this.navId = options.navId ? options.navId : 'fixedNavX99';
    this.class_scrollVW = options.class_scrollVW ? options.class_scrollVW : 'scrollVWx99';
  }

  _createClass(FixedNavX99, [{
    key: 'init',
    value: function init() {
      console.log('FixedNavX99 is running . . .');
      var nav = document.getElementById(this.navId);
      //const dom_scrollVWx99 = document.getElementsByClassName(this.class_scrollVW);
      //
      var _ScrollToX99_ = document.getElementsByClassName('_ScrollToX99_')[0];
      console.log('_ScrollToX99_: ', _ScrollToX99_);
      //
      var stuck = false;
      var stickyLimit = get_stickyLimit(nav);

      function get_stickyLimit(nav) {
        var stickyLimit = nav.offsetTop;
        return stickyLimit;
      }

      function scrollToFixed(nav) {

        var distance = get_stickyLimit(nav) - window.pageYOffset;
        var offset = window.pageYOffset;

        if (distance <= 0 && !stuck) {
          //width Calc
          var fxToWidth = _ScrollToX99_.offsetWidth;
          console.log('fxToWidth: ', fxToWidth);

          nav.style.position = 'fixed';
          nav.style.top = '0px';
          nav.style.left = '0px';
          nav.style.width = fxToWidth + 'px';
          stuck = true;
        } else if (stuck && offset <= stickyLimit) {
          nav.style.position = 'static';
          stuck = false;
        }
      }

      function debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
              args = arguments;
          var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }

      var scrollToFixed_debounced = debounce(function () {
        scrollToFixed(nav);
      }, 10);

      window.addEventListener('scroll', scrollToFixed_debounced);
    }
  }]);

  return FixedNavX99;
}();

exports.default = FixedNavX99;