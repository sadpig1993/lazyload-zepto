;(function($){
  $.extend($.fn, {
    lazyload: function(){
   	var imgs = this;
    	function getHeight() {
		return window.innerHeight || screen.availHeight;
	}

	function inViewport(el) {
		var height = getHeight();
		var min = window.pageYOffset - height / 2;
		var max = getMax();
		min = min < 0 ? 0 : min;
		var elTop = el.offset().top;
		return elTop > 0  && elTop >= min && elTop <= max;
	}
	function getMax() {
		return window.pageYOffset + getHeight() * 1.2;
	}
	function load(_self) {
		
		if (_self.attr('loaded')) return;
		var img = new Image(),
		url = _self.attr('_src') || _self.data('src');
		
		img.onload = function() {
			_self.attr('src', url).removeClass('lazy');
			var opacity = 1;
			if (_self.attr("_opacity")) {
				opacity = _self.css("opacity");
			}
			_self.css({
				"transition": "360ms",
				"opacity": opacity
			});
		}
			url && (img.src = url);
			_self.attr('loaded', true);
	}


	var loadIndex = 0;
	var prevTime = new Date().getTime();

	$(window).on('scroll.lazyload',function(e){
		
		var curTime = new Date().getTime();
		
		if (curTime - prevTime < 100) {
			return;
		}
		var oldIndex = loadIndex;
		loadIndex++;
		prevTime = curTime;
		var lazys = imgs;
		var height = 120;
		var rad = parseInt(Math.random() * 10) % 2 == 0;
		var length = lazys.length;
		
		for (var i = 0; i < length; i++) {
		
					if (oldIndex + 1 != loadIndex) {
						break;
					}
					var node = lazys[i];
					
					var Qme = $(imgs[i]);
					
					if (Qme.offset().top > getMax()) {
						
						break;
					}
					var opacity = parseFloat(Qme.css("opacity")) || 0;
					
					opacity <= 0 ? Qme.css("opacity", "0.5") : Qme.attr("_opacity", true);
					
					if (inViewport(Qme)) {
						load(Qme);
					}
		}


	});
	setTimeout(function(){
		$(window).trigger('scroll');
	},100)

      // `this` refers to the current Zepto collection.
      // When possible, return the Zepto collection to allow chaining.
      ///return this.html('bar')
    }
  })
})(Zepto)