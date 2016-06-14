var DomNodeCollection = require('./dom_node_collection');

_queue = [];
_ready = false;

window.$l = function (arg){
  if (typeof arg === "function") {
    registerDocReadyCallback(arg);
  } else if (typeof arg === "string") {
      var elementList = document.querySelectorAll(arg);
      var arr =  [].slice.call(elementList);
      return new DomNodeCollection(arr);
  } else if (typeof arg === "object") {
      return new DomNodeCollection([arg]);
    }
};

window.$l.extend = function(args){
  var new_ob = {};
  [].slice.call(arguments).forEach(function(obj){
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      new_ob[keys[i]] = obj[keys[i]];
    }
  });
  return new_ob;
};

registerDocReadyCallback = function (func){
  if(!_ready){
    _queue.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', function (){
  _ready = true;
  _queue.forEach(function(el){
    el();
  });
});
