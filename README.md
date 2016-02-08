# Touch Menu Like Android

hammer.js to touch events.

> A touch menu like Navigation Drawer of Android.

Use with cordova project, ionic.

# Demo
[See a demo](https://github.com/ericktatsui/Touch-Menu-Like-Android/blob/master/sample.html)

## Browser Support

Browser	        | Support
---			    | ---
I.E		        | 10+
Chrome	     	| ✔
Firefox     	| 3.5+ ✔
Opera           | 23+ ✔
Safari          | ✔
Android Browser | 2.3+ ✔
iOS Safari      | 5.1+ ✔

## Usage

Include plugin's css
```html
<link rel="stylesheet" href="src/css/touch-menu-la.min.css">
```

Include a div with class 'touch-menu-la'
```html
<div id="menu" class="touch-menu-la">
	<ul>
		<li>Item 1</li>
		<li>Item 2</li>
	</ul>
</div>
```

Include hammer.js and plugin's js
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.6/hammer.min.js"></script>
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
`onOpen`			| *Function*		| 				| Function called when menu is opened. [the scope is this menu instance, try to use 'this']
`onClose`			| *Function*		| 				| Function called when menu is closed. [the scope is this menu instance, try to use 'this']

## Propertie and Methods

You can use this propertie and methods after call the plugin.

**Propertie**
isVisible - Return a `Boolean` of state of menu

**Methods**
open(); - Open the menu
close(); - close the menu
toggle(); - open or close menu

See this example:

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