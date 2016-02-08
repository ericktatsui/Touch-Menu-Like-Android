var TouchMenuLA = function( options ){
	var self,
		menuClassName = '',
		mask,
		handle,
		menuHammer,
		maskHammer,
		newPos = 0,
		newMenuPos = 0,
		currentPos = 0,

		startPoint = 0,
		countStart = 0,

		velocity = 0.0;

	var TouchMenuLA = function(){
		self = this;

		this.isVisible = false;

		this.initialize();
	};

	TouchMenuLA.prototype.initElements = function(){
		options.target.style.zIndex = self.getZIndex();
		options.target.style.width = self.getMenuWidth() + 'px';
		options.target.style.left = - options.width + 'px';

		handle = document.createElement( 'div' );
		handle.className = "tmla-handle";
		handle.style.width = self.getHandleSize() + 'px';
		handle.style.right = - self.getHandleSize() + 'px';

		options.target.appendChild( handle );
		
		if( !options.disableMask ){
			mask = document.createElement( 'div' );
			mask.className = 'tmla-mask';
			document.body.appendChild( mask );
			self.setMaxMaskOpacity();

			maskHammer = new Hammer( mask, null );
		}
	};

	TouchMenuLA.prototype.touchStartMenu = function() {
		menuHammer.on('panstart panmove', function( ev ) {
			newPos = currentPos + ev.deltaX;
			self.changeMenuPos();
			velocity = Math.abs( ev.velocity );
		});
	};

	TouchMenuLA.prototype.changeMenuPos = function() {
		if ( newPos <= options.width ) {
			options.target.className = menuClassName + ' tmla-menu';
			options.target.style.transform = 'translate3d(' + newPos + 'px, 0, 0)';
			options.target.style.WebkitTransform = 'translate3d(' + newPos + 'px, 0, 0)';
			options.target.style.MozTransform = 'translate3d(' + newPos + 'px, 0, 0)';

			if( !options.disableMask ){
				this.setMaskOpacity(newPos);
			}
		}
	};

	TouchMenuLA.prototype.setMaskOpacity = function( newMenuPos ) {
		var opacity = parseFloat( ( newMenuPos / options.width ) * options.maxMaskOpacity );

		mask.style.opacity = opacity;

		if (opacity === 0 ) {
			mask.style.zIndex = -1;
		}else{
			mask.style.zIndex = options.zIndex - 1;
		}
	};

	TouchMenuLA.prototype.touchEndMenu = function() {
		menuHammer.on('panend pancancel', function( ev ) {
			currentPos = ev.deltaX;
			self.checkMenuState( ev.deltaX );
		});
	};

	TouchMenuLA.prototype.eventStartMask = function() {
		maskHammer.on('panstart panmove', function( ev ) {
			if ( ev.center.x <= options.width && self.isVisible ) {
				countStart++;

				if ( countStart == 1 ) {
					startPoint = ev.deltaX;
				}
				
				if ( ev.deltaX < 0 ) {
					newPos = ( ev.deltaX - startPoint ) + options.width;
					self.changeMenuPos();
					velocity = Math.abs( ev.velocity );
				}
			}
		});
	};

	TouchMenuLA.prototype.eventEndMask = function() {
		maskHammer.on('panend pancancel', function( ev ) {
			self.checkMenuState( ev.deltaX );
			countStart = 0;
		});
	};

	TouchMenuLA.prototype.clickMaskClose = function() {
		mask.addEventListener('click', function() {
			self.close();
		});
	};

	TouchMenuLA.prototype.checkMenuState = function( deltaX ) {
		if ( velocity >= 1.0 ) {
			if ( deltaX >= 0 ) {
				self.open();
			} else {
				self.close();
			}
		} else {
			if ( newPos >= 100 ) {
				self.open();
			} else {
				self.close();
			}
		}
	};

	TouchMenuLA.prototype.open = function() {
		options.target.className = menuClassName + " tmla-menu opened";
		options.target.style.transform = 'translate3d(' + options.width + 'px, 0, 0)';
		options.target.style.WebkitTransform = 'translate3d(' + options.width + 'px, 0, 0)';
		options.target.style.MozTransform = 'translate3d(' + options.width + 'px, 0, 0)';

		currentPos = options.width;
		this.isVisible = true;

		self.showMask();
		self.invoke( options.onOpen );
	};

	TouchMenuLA.prototype.close = function() {
		options.target.className = menuClassName + " tmla-menu closed";
		currentPos = 0;
		self.isVisible = false;

		self.hideMask();
		self.invoke( options.onClose );
	};

	TouchMenuLA.prototype.toggle = function(){
		if ( self.isVisible ) {
			self.close();
		}else{
			self.open();
		}
	};

	TouchMenuLA.prototype.showMask = function() {
		mask.className = "tmla-mask transition";
		mask.style.opacity = options.maxMaskOpacity;
		mask.style.zIndex = options.zIndex - 1;
	};

	TouchMenuLA.prototype.hideMask = function() {
		mask.className = "tmla-mask transition";
		mask.style.opacity = 0;
		mask.style.zIndex = -1;
	};

	TouchMenuLA.prototype.setMenuClassName = function() {
		menuClassName = options.target.className;
	};

	TouchMenuLA.prototype.getMenuWidth = function() {
		if(!options.width){
			options.width = 280;
		}

		return options.width;
	};

	TouchMenuLA.prototype.getZIndex = function() {
		if(!options.zIndex){
			options.zIndex = 99999;
		}

		return options.zIndex;
	};

	TouchMenuLA.prototype.getHandleSize = function() {
		if(!options.handleSize){
			options.handleSize = 20;
		}

		return options.handleSize;
	};

	TouchMenuLA.prototype.getDisableSlide = function() {
		if(!options.disableSlide){
			options.disableSlide = false;
		}

		return options.handleSize;
	};

	TouchMenuLA.prototype.setMaxMaskOpacity = function() {
		if(!options.maxMaskOpacity){
			options.maxMaskOpacity = 0.5;
		}

		return options.maxMaskOpacity;
	};

	TouchMenuLA.prototype.invoke = function( fn ) {
		if( fn ){
			fn.apply(self);
		}
	};

	TouchMenuLA.prototype.initialize = function() {
		if(options.target){
			menuHammer = Hammer( options.target, null );

			self.setMenuClassName();
			self.initElements();

			if (!options.disableSlide) {
				self.touchStartMenu();
				self.touchEndMenu();
				self.eventStartMask();
				self.eventEndMask();
			}

			self.clickMaskClose();
		}else{
			console.error('TouchMenuLA: The option \'target\' is required.');
		}
	};

	return new TouchMenuLA();
};