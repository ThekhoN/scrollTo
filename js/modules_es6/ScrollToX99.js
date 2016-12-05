class ScrollToX99 {
	constructor(opts) {
		if(!opts){
			opts = {};
		}
		this.navClass = opts.navClass? opts.navClass:'navX99';
    this.dataTarget = opts.dataTarget? opts.dataTarget: 'data-target';
		this.activeClass = opts.activeClass? opts.activeClass: 'activeX99';
		this.offset = opts.offset? opts.offset:'0';
		this.easing = opts.easing? opts.easing:'linear';
		this.duration = opts.duration? opts.duration: 700;
	}

	init(){
		console.log('ScrollToX99 is running. . .');

		const navClass = this.navClass;
    const dataTarget = this.dataTarget;
		const activeClass = this.activeClass;
		const offset = this.offset;
		const easing = this.easing;
		const duration = this.duration;

    // opts validation
    if(typeof offset !== 'string'){console.log('offset must be of type string'); return ;}

    const dom_navClass = document.getElementsByClassName(navClass);
    //console.log('dom_navClass: ', dom_navClass);

    //inner vars
    let targetId,
        dom_targetId,
        target_topOffset,
        clicked_navClass;

    for(let i=0; i<dom_navClass.length; i++){
      let nav = dom_navClass[i];
      nav.addEventListener('click', function(e){
        //if e.target is hyperlink then prevent default
        if(e.target.tagName.toLowerCase() === 'a'){
          e.preventDefault();
          console.log('hyperlink was clicked!')
        }

				console.log('e.target: ', e.target);
        e.preventDefault();
        e.stopPropagation();
        clicked_navClass = (e.target.classList.contains(navClass))? e.target : findElemWithClassX99 (e.target, navClass);

        //console.log('e.target: ', e.target);
        //console.log('clicked_navClass: ', clicked_navClass);
        if (!clicked_navClass || clicked_navClass === null) {
          console.log('clicked_navClass not found!');
          return;
        }

        //toggleClass
        for(let j=0; j<dom_navClass.length; j++){
          let _nav = dom_navClass[j];
          _nav.classList.remove(activeClass);
        }
        clicked_navClass.classList.add(activeClass);

        //scroll To
        if(!clicked_navClass.hasAttribute(dataTarget)){
          console.log('clicked_navClass does not have attribute', dataTarget);
          return;
        }

        targetId = clicked_navClass.getAttribute(dataTarget);
        dom_targetId = document.getElementById(targetId);
        //console.log('dom_targetId: ', dom_targetId);
        if(!dom_targetId){console.log('element with this id not found in dom'); return;}
        else {
          target_topOffset = dom_targetId.offsetTop;
          if(offset){
            if (offset.indexOf('-')) {
              target_topOffset = target_topOffset - Number(offset);
            } else {
              target_topOffset = target_topOffset + Number(offset);
            }
          }

          //run scrollTo
          scrollTo_Y({
            e_scrollY_val:target_topOffset,
            speed: duration,
            easing: easing
          });
        }

      }, false)}
	}
}

//helper functions
function findElemWithClassX99 (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

const scrollTo_Y = (opts = {}) => {
  //internal opts
    const e_scrollY_val = opts.e_scrollY_val? opts.e_scrollY_val: 0 ;
    const speed = opts.speed? opts.speed: 2000 ;
    const easing = opts.easing? opts.easing: 'easeOutSine';

  //internal vars
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    let currentTime = 0;
    let time = Math.max(0.1, Math.min(Math.abs(scrollY - e_scrollY_val) / speed, 0.8));
  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
        linear: function(pos) {
            return pos;
        },
        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function(pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function(pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
    };

    const tick = () => {
        currentTime += 1 / 60;
        const p = currentTime / time;
        const t = easingEquations[easing](p);
        if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + ((e_scrollY_val - scrollY) * t));
        } else {

            window.scrollTo(0, e_scrollY_val);
        }
    };
    tick();
};
//helper functions


export default ScrollToX99;
