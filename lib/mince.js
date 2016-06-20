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


window.$l.ajax = function(options){
  var request = new XMLHttpRequest();
  var defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: function (data){
      return data;
    },
    error: function (error){
      return error;
    },
    data: {},
  };
  options = $l.extend(defaults, options);

  if (options.method.toUpperCase() === "GET" && Object.keys(options.data).length > 0){
    options.url += "?" + toQueryString(options.data);

  }
  request.open(options.method, options.url, true);

  request.onload = function(e) {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = function(obj){
  var result = "";
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
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
