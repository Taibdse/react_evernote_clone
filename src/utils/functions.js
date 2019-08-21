
// export function debounce(a,b,c){
//     var d,e;
//     return function(){
//       function h(){
//         d=null;
//         c||(e=a.apply(f,g));
//       }
//       var f=this,g=arguments;
//       return (clearTimeout(d), d=setTimeout(h,b), c &&!d&&(e=a.apply(f,g)),e)
//     }
//   }
  
  export function removeHTMLTags (str) {
    return str.replace(/<[^>]*>?/gm, '');
  };

  export function truncate(str, max){
    if(str.length <= max) return str;
    return str.slice(0, max) + '...';
  }

  export function debounce(func, wait, immediate) {
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
  };