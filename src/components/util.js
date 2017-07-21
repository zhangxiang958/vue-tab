(function(root, factory){

  if(typeof define === 'function' && define.amd){

    define(factory);
  } else if(typeof exports === 'object'){

    module.exports = factory();
  } else {

    root.Util = factory();
  }

}(this, function(){
  'use strict';

  var Util = {
    getMinVal: function(list){

      if(Object.prototype.toString.call(list) !== '[object Array]') {
        console.error('list is not a array');
      } else {

        var min = list[0],
            index = 0;

        list.forEach(function(data, i){

          if(data < min) {
            min = data;
            index = i;
          }
        });

        return {
          minHeight: min,
          index: index
        }
      }

      return null;
    },
    getMaxVal: function(list){

      if(Object.prototype.toString.call(list) !== '[object Array]') {
        console.error('list is not a array');
      } else {

        var max = list[0],
            index = 0;

        list.forEach(function(data, i){

          if(data > max) {
            max = data;
            index = i;
          }
        });

        return {
          maxHeight: max,
          index: index
        }
      }

      return null;
    }
    
  }

  return Util;
}));