#DOMincer#
DOMincer.js is a lightweight JavaScript library inspired by jQuery.

DOMincer simplifies document traversal, manipulation, and event handling, will providing users with an easy to use syntax for making AJAX requests.

DOMincer acts as a wrapper for HTML DOM nodes, adding additional functionality. It supports many of the core jQuery methods, including:

- .html()
- .empty()
- .append()
- .attr()
- .addClass()
- .removeClass()
- .children()
- .parent()
- .find()
- .remove()
- .on()
- .off()

##Usage Examples##
**To gain access to the DOMincer methods, simply call the primary function ``` $l() ``` on a DOM element or HTML tag string (e.g., 'div'):**
```javascript
var collectionOfDivElements = $l('div');
```

Given an HTML document:
```html
<body class ="body">
    <div class="div1">
     A Div
    </div>

    <ul>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>
        <div class="div2">
          Another Div
        </div>
      </li>
    </ul>
    <p>
      <a href="#">LINK</a>
    </p>
  </body>
```

**To add a class to all of the above selected divs:**
```javascript
collectionOfDivElements.addClass("an-added-class");
```

**To remove the innerHTML from the selected divs:**
```javascript
collectionOfDivElements.empty();
```

**To select the parent nodes of a collection:**
```javascript
var collectionOfParentNodes = collectionOfDivElements.parent();
```


