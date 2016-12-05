
class FixedNavX99 {
  constructor(options){
    if(!options){
      options = {};
    }
    this.navId = options.navId?options.navId:'fixedNavX99';
    this.class_scrollVW = options.class_scrollVW ? options.class_scrollVW: 'scrollVWx99';
  }
  init (){
    console.log('FixedNavX99 is running . . .');
    const nav = document.getElementById(this.navId);
    //const dom_scrollVWx99 = document.getElementsByClassName(this.class_scrollVW);
    //
    const _ScrollToX99_ = document.getElementsByClassName('_ScrollToX99_')[0];
    console.log('_ScrollToX99_: ', _ScrollToX99_);
    //
    let stuck = false;
    const stickyLimit = get_stickyLimit(nav);

    function get_stickyLimit(nav){
      var stickyLimit = nav.offsetTop;
      return stickyLimit;
    }

    function scrollToFixed(nav){


      const distance = get_stickyLimit(nav) - window.pageYOffset;
      const offset = window.pageYOffset;

      if ( (distance <= 0) && !stuck) {
        //width Calc
        const fxToWidth = _ScrollToX99_.offsetWidth;
        console.log('fxToWidth: ', fxToWidth);

        nav.style.position = 'fixed';
        nav.style.top = '0px';
        nav.style.left = '0px';
        nav.style.width = fxToWidth + 'px';
        stuck = true;
      } else if (stuck && (offset <= stickyLimit)){
        nav.style.position = 'static';
        stuck = false;
      }
    }

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    const scrollToFixed_debounced = debounce(function() {
      scrollToFixed(nav);
    }, 10);

    window.addEventListener('scroll', scrollToFixed_debounced);
  }
}

export default FixedNavX99;
