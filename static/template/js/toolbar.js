(function() {
	'use strict';

	function SideToolbar(wrapper, options) {
		var defaults = {
			width: 240,
			height: 300,
			bottom: 8,
			speed: 300,
			showHeight: 600
		};

		this.settings = $.extend(defaults, options);

		this.$wrapper = $(wrapper);

		this.isVisible = true;
		this.$wrapper.css({display: 'block'});

		this.initView();

		this.bindEvents();
	}

	SideToolbar.prototype = {
		initView: function() {
			var toolbar = '<div class="side-toolbar"><a id="sideToolbar-btn" href="javascript:void(0);"></a><a id="sideToolbar-up" href="javascript:void(0)"></a><a id="sideToolbar-fullscreen" href="javascript:void(0)"></a></div>';
			this.$wrapper.append(toolbar);
			
			this.fixPosition();
		},

		fixPosition: function() {
			this.$wrapper.css({
				// width: this.settings.width, 
				bottom: this.settings.bottom
			});
		},

		bindEvents: function() {
			var me = this;

			// 必须在绑定document的scroll事件处理函数之后才能手动触发该事件
			$('.content-wrap').trigger('scroll');

			$('#sideToolbar-btn').click(function() {
				if ($(this).hasClass('disable')) {
					$(this).removeClass('disable');
					me.$wrapper.find('#sideCatalog').css({display: 'block'});
				} else {
					$(this).addClass('disable');
					me.$wrapper.find('#sideCatalog').css({display: 'none'});
				}
			});

			$('#sideToolbar-up').click(function() {
				$('body, html').animate({
					scrollTop: 0
				}, me.settings.speed, 'linear');
			});

			$('#sideToolbar-fullscreen').click(function (e) {
				if (screenfull.enabled) { screenfull.toggle(); }
			});
		},

		show: function() {
			this.$wrapper.fadeIn(this.settings.speed);
		},

		hide: function() {
			this.$wrapper.fadeOut(this.settings.speed);
		}
		
	};
 	

 	window.SideToolbar = SideToolbar;

 	$.fn.sideToolbar = function(options) {
 		var sideToolbar = new SideToolbar(this, options);
 		return $(this);
 	};

})(jQuery);