# Touch Menu Like Android

hammer.js to touch events.

> A touch menu like Navigation Drawer of Android.

Use with cordova project, ionic.

# Demo
[Click here to see a demo](http://ericktatsui.github.io/Touch-Menu-Like-Android/sample.html)

## Browser Support

Browser	        | Support
---			    | ---
I.E		        | 10+ ✔
Chrome	     	| 4+ ✔
Firefox     	| 3.5+ ✔
Opera           | 23+ ✔
Safari          | 3.1+ ✔
Android Browser | 2.3.4+ ✔
iOS Safari      | 5.1+ ✔

## Getting started

Four ways:

* [Download .zip](https://github.com/ericktatsui/Touch-Menu-Like-Android/zipball/master)
* Clone the repo: `git@github.com:ericktatsui/Touch-Menu-Like-Android.git`
* Install with [Bower](http://bower.io/) `bower install touch-menu-la`
* Install with [npm](https://npmjs.com/) `npm install touch-menu-la`

## Usage

Include plugin's css
```html
<link rel="stylesheet" href="src/css/touch-menu-la.min.css">
```

Include a div with class 'touch-menu-la'
```html
<div id="menu" class="touch-menu-la"></div>
```

Include hammer.js and plugin's js
```html
<script src="lib/hammerjs/hammer.min.js"></script>
<script src="src/js/touch-menu-la.min.js"></script>
```

Call the plugin with required option 'target'
```javascript
TouchMenuLA({
    target: document.getElementById('menu')
});
```

## Options

list of avaliable settings:

Attribute			| Type				| Default		| Description
---					| ---				| ---			| ---
`target`			| *DOM Element*		| 				| *Required* - The target element for the plugin to create the menu
`width`				| *Integer*			| `280`			| Width of menu
`zIndex`			| *Integer*			| `99999`		| Style z-index of menu and mask
`disableSlide`		| *Boolean*			| `false`		| Disable slide of menu
`handleSize`		| *Integer*			| `20`			| Size of handle to slide
`disableMask`		| *Boolean*			| `false`		| Disable the mask
`maxMaskOpacity`	| *Double*			| `0.5`			| Max opacity of mask (when menu is opened). Numbers between 0 and 1.
`onOpen`			| *Function*		| 				| Function called when menu is opened. (the scope is this menu instance, try to use 'this')
`onClose`			| *Function*		| 				| Function called when menu is closed. (the scope is this menu instance, try to use 'this')

## Property and Methods

You can use this property and methods after calling the plugin.

**Property**

isVisible - Return a `Boolean` of state of menu

**Methods**

open(); - Open the menu

close(); - close the menu

toggle(); - open or close menu


**See this example:**

```javascript
var TouchMenu = TouchMenuLA({
    target: document.getElementById('menu'),
    onOpen: function(){
        console.log(this.isVisible);
    }
});

document.getElementByID('any-element').addEventListener('click', function(){
    TouchMenu.open();
});
```

## License
```license
The MIT License (MIT)

Copyright (c) 2016 Erick R. Alves Aguiar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```