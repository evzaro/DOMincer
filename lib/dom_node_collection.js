function DomNodeCollection(elements) {
  this.elements = elements;
}

DomNodeCollection.prototype.html = function (string) {
  if (string !== undefined) {
    this.elements.forEach(function(el) {
      el.innerHTML = string;
    });
  } else {
    return this.elements[0].innerHTML;
  }
};

DomNodeCollection.prototype.empty = function (){
  this.html("");
};

DomNodeCollection.prototype.append = function (arg) {
  this.elements.forEach(function(el) {
    if (typeof arg === "string") {
      el.innerHTML += arg;
    } else if (arg instanceof DomNodeCollection === true) {
      arg.elements.forEach(function(obj) {
        el.innerHTML += obj.outerHTML;
      });
    } else {
      el.innerHTML += arg.outerHTML;
    }
  });
};

DomNodeCollection.prototype.attr = function (name, value) {
  if (value === undefined){
    return this.elements[0].getAttribute(name);
  } else {
    this.elements.forEach(function(el) {
      el.setAttribute(name, value);
    });
  }
  return this;
};

DomNodeCollection.prototype.addClass = function(newClass){
  this.elements.forEach(
    function(node){
      node.classList.add(newClass);
    });
};

DomNodeCollection.prototype.removeClass = function(oldClass){
  this.elements.forEach(function(node){
    node.classList.remove(oldClass);
  });
};

DomNodeCollection.prototype.children = function () {
  var arr = [];
  this.elements.forEach(function(el) {
    for (var i = 0; i < el.children.length; i++) {
      arr.push(el.children[i]);
    }
  });
  return new DomNodeCollection(arr);
};

DomNodeCollection.prototype.parent = function() {
  var arr = [];
  this.elements.forEach(function(el) {
      if (arr.includes(el.parentNode) === false) {
        arr.push(el.parentNode);
      }
  });
  return new DomNodeCollection(arr);
};

DomNodeCollection.prototype.find = function(arg) {
  var arr = [];
  this.elements.forEach(function(el) {
    var found_el = el.querySelectorAll(arg);
      if ((arr.includes(found_el) === false) && (found_el.length !== 0)) {
        for (var i = 0; i < found_el.length; i++) {
          arr.push(found_el[i]);
        }
      }
  });
  return new DomNodeCollection(arr);
};

DomNodeCollection.prototype.remove = function () {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].outerHTML = "";
  }
    this.elements = [];
};

DomNodeCollection.prototype.on = function (event, callback) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].addEventListener(event, callback);
  }
};

DomNodeCollection.prototype.off = function (event, callback) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].removeEventListener(event, callback);
  }
};

module.exports = DomNodeCollection;
