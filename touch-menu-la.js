var TouchMenu = function( options ) {
	// Defaults
	var settings = {
		currentPos: 0,
		newPos: 0,
		activeAction: false,
		velocity: 0.0,
		startPoint: 0,
		countStart: 0,
		visibility: false,
		disableSlide: false,
		menuWidth: 280,
		touchSize: 20
	};

	// Extend new settings
	extend(settings, options);

	// Start
	var menu = settings.menu,
		menuHammer = new Hammer(menu, null),
		currentPos = settings.currentPos,
		newPos = settings.newPos,
		activeAction = settings.activeAction,
		velocity = settings.velocity,
		startPoint = settings.startPoint,
		countStart = settings.countStart,
		visibility = settings.visibility,
		disableSlide = settings.disableSlide,
		menuWidth = settings.menuWidth,
		touchSize = settings.touchSize,
		mask = null,
		maskHammer = null;

	function extend( a, b ) {
		for ( var key in b ){
			if ( b.hasOwnProperty(key) ){
				a[key] = b[key];
			}
		}

		return a;
	};

	function invoke( func ){
		if ( func !== null && func !== undefined ) {
			func();
		}
	};

	var TouchMenu = function() {
		this.newPos = 0;
		this.createElements();
		this.init();
	};

	TouchMenu.prototype.setMenuWidth = function( size ){
		menuWidth = size;
		//menu.width = size + 'px';
		//menu.style.left = -size + 'px';
	};

	TouchMenu.prototype.createElements = function(){
		var aba = document.createElement("div");
			aba.className = "aba";
			aba.style.width = touchSize + "px";

		menu.appendChild(aba);
		
		mask = document.createElement("div");
		mask.className = "mask";
		document.body.appendChild(mask);

		//startMaskHammer
		maskHammer = new Hammer(mask, null);
	};

	TouchMenu.prototype.isVisible = function() {
		return visibility;
	};

	TouchMenu.prototype.open = function() {
		menu.className = "menu open";
		currentPos = menuWidth;
		visibility = true;

		this.showMask();
		invoke(this.onOpen);
	};
	TouchMenu.prototype.close = function() {
		menu.className = "menu close";
		currentPos = 0;
		visibility = false;

		this.hideMask();
		invoke(this.onClose);
	};
	TouchMenu.prototype.toggle = function(){
		if ( this.isVisible() ) {
			this.close();
		}else{
			this.open();
		}
	};
	TouchMenu.prototype.showMask = function() {
		mask.className = "mask transition";
		mask.style.opacity = '0.5';
		mask.style.zIndex = '999998';
	};
	TouchMenu.prototype.hideMask = function() {
		mask.className = "mask transition";
		mask.style.opacity = '0.0';
		mask.style.zIndex = -1;
	};
	TouchMenu.prototype.setMaskOpacity = function( newMenuPos ) {
		var opacity = parseFloat((newMenuPos / menuWidth) * 0.5);
		mask.style.opacity = opacity;
		if (opacity === 0 ) {
			mask.style.zIndex = -1;
		}else{
			mask.style.zIndex = '999998';
		}
	};
	TouchMenu.prototype.changeMenuPos = function() {
		if (newPos <= menuWidth) {
			menu.className = "menu";
			mask.className = "mask";
			menu.style.WebkitTransform = "translate3d(" + newPos + "px, 0, 0)";

			this.setMaskOpacity(newPos);
		}
	};
	TouchMenu.prototype.checkMenuState = function( deltaX ) {
		if (velocity >= 1.0) {
			if (deltaX >= 0) {
				self.open();
			} else {
				self.close();
			}
		} else {
			if (newPos >= 100) {
				self.open();
			} else {
				self.close();
			}
		}
	};
	TouchMenu.prototype.eventStartMenu = function() {
		self = this;
		menuHammer.on('panstart panmove', function( ev ) {
			newPos = currentPos + ev.deltaX;
			self.changeMenuPos();
			velocity = Math.abs(ev.velocity);
		});
	};
	TouchMenu.prototype.eventEndMenu = function() {
		self = this;
		menuHammer.on('panend pancancel', function( ev ) {
			self.checkMenuState(ev.deltaX);
		});
	};
	TouchMenu.prototype.eventStartMask = function() {
		self = this;
		maskHammer.on('panstart panmove', function( ev ) {
			if ( ev.center.x <= menuWidth && self.isVisible() ) {
				countStart++;
				if (countStart == 1) {
					startPoint = ev.deltaX;
				}

				if (ev.deltaX < 0) {
					newPos = (ev.deltaX - startPoint) + menuWidth;
					self.changeMenuPos();
					velocity = Math.abs(ev.velocity);
				}
			}
		});
	};
	TouchMenu.prototype.eventEndMask = function() {
		self = this;
		maskHammer.on('panend pancancel', function( ev ) {
			self.checkMenuState(ev.deltaX);
			countStart = 0;
		});
	};
	TouchMenu.prototype.clickMaskClose = function() {
		self = this;
		mask.addEventListener('click', function() {
			self.close();
		});
	};
	TouchMenu.prototype.init = function() {
		menu.style.zIndex = '999999';
		//this.setMenuWidth();

		if (!disableSlide) {
			this.eventStartMenu();
			this.eventEndMenu();
			this.eventStartMask();
			this.eventEndMask();
		}
		this.clickMaskClose();
	};

	return new TouchMenu();
};