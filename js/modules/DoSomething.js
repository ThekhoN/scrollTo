'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoSomething = function () {
  function DoSomething(options) {
    _classCallCheck(this, DoSomething);

    if (!options) {
      options = {};
    }
    this.name = options.name ? options.name : 'Jack';
    this.saying = options.saying ? options.saying : 'hello';
    this.doing = options.doing ? options.doing : 'work';
  }

  _createClass(DoSomething, [{
    key: 'saying_something',
    value: function saying_something() {
      console.log(this.name + ' is saying ' + this.saying);
    }
  }, {
    key: 'doing_something',
    value: function doing_something() {
      console.log(this.name + ' is doing ' + this.doing);
    }
  }]);

  return DoSomething;
}();

module.exports = DoSomething;