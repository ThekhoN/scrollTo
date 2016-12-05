'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollToX99 = function () {
    function ScrollToX99(opts) {
        _classCallCheck(this, ScrollToX99);

        if (!opts) {
            opts = {};
        }
        this.navClass = opts.navClass ? opts.navClass : 'navX99';
        this.dataTarget = opts.dataTarget ? opts.dataTarget : 'data-target';
        this.activeClass = opts.activeClass ? opts.activeClass : 'activeX99';
        this.offset = opts.offset ? opts.offset : '0';
        this.easing = opts.easing ? opts.easing : 'linear';
        this.duration = opts.duration ? opts.duration : 700;
    }

    _createClass(ScrollToX99, [{
        key: 'init',
        value: function init() {
            console.log('ScrollToX99 is running. . .');

            var navClass = this.navClass;
            var dataTarget = this.dataTarget;
            var activeClass = this.activeClass;
            var offset = this.offset;
            var easing = this.easing;
            var duration = this.duration;

            // opts validation
            if (typeof offset !== 'string') {
                console.log('offset must be of type string');return;
            }

            var dom_navClass = document.getElementsByClassName(navClass);
            //console.log('dom_navClass: ', dom_navClass);

            //inner vars
            var targetId = void 0,
                dom_targetId = void 0,
                target_topOffset = void 0,
                clicked_navClass = void 0;

            for (var i = 0; i < dom_navClass.length; i++) {
                var nav = dom_navClass[i];
                nav.addEventListener('click', function (e) {
                    //if e.target is hyperlink then prevent default
                    if (e.target.tagName.toLowerCase() === 'a') {
                        e.preventDefault();
                        console.log('hyperlink was clicked!');
                    }

                    console.log('e.target: ', e.target);
                    e.preventDefault();
                    e.stopPropagation();
                    clicked_navClass = e.target.classList.contains(navClass) ? e.target : findElemWithClassX99(e.target, navClass);

                    //console.log('e.target: ', e.target);
                    //console.log('clicked_navClass: ', clicked_navClass);
                    if (!clicked_navClass || clicked_navClass === null) {
                        console.log('clicked_navClass not found!');
                        return;
                    }

                    //toggleClass
                    for (var j = 0; j < dom_navClass.length; j++) {
                        var _nav = dom_navClass[j];
                        _nav.classList.remove(activeClass);
                    }
                    clicked_navClass.classList.add(activeClass);

                    //scroll To
                    if (!clicked_navClass.hasAttribute(dataTarget)) {
                        console.log('clicked_navClass does not have attribute', dataTarget);
                        return;
                    }

                    targetId = clicked_navClass.getAttribute(dataTarget);
                    dom_targetId = document.getElementById(targetId);
                    //console.log('dom_targetId: ', dom_targetId);
                    if (!dom_targetId) {
                        console.log('element with this id not found in dom');return;
                    } else {
                        target_topOffset = dom_targetId.offsetTop;
                        if (offset) {
                            if (offset.indexOf('-')) {
                                target_topOffset = target_topOffset - Number(offset);
                            } else {
                                target_topOffset = target_topOffset + Number(offset);
                            }
                        }

                        //run scrollTo
                        scrollTo_Y({
                            e_scrollY_val: target_topOffset,
                            speed: duration,
                            easing: easing
                        });
                    }
                }, false);
            }
        }
    }]);

    return ScrollToX99;
}();

//helper functions


function findElemWithClassX99(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
}

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

var scrollTo_Y = function scrollTo_Y() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    //internal opts
    var e_scrollY_val = opts.e_scrollY_val ? opts.e_scrollY_val : 0;
    var speed = opts.speed ? opts.speed : 2000;
    var easing = opts.easing ? opts.easing : 'easeOutSine';

    //internal vars
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var currentTime = 0;
    var time = Math.max(0.1, Math.min(Math.abs(scrollY - e_scrollY_val) / speed, 0.8));
    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
        linear: function linear(pos) {
            return pos;
        },
        easeOutSine: function easeOutSine(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function easeInOutSine(pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        },
        easeInOutQuint: function easeInOutQuint(pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow(pos - 2, 5) + 2);
        }
    };

    var tick = function tick() {
        currentTime += 1 / 60;
        var p = currentTime / time;
        var t = easingEquations[easing](p);
        if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + (e_scrollY_val - scrollY) * t);
        } else {

            window.scrollTo(0, e_scrollY_val);
        }
    };
    tick();
};
//helper functions


exports.default = ScrollToX99;