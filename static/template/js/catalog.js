(function(window, $) {

    'use strict';

	function SideCatalog(wrapper, options) {
		var defaults = {
			content: '#content',
            width: 240,
            height: 260,
            speed: 300
		};

		this.settings = $.extend(defaults, options);
		this.$wrapper = $(wrapper);
        this.$content = $(this.settings.content);

        this.timer = null;

		this.initCatalogView();

		this.bindEvents();
	}

	SideCatalog.prototype = {
		initCatalogView: function() {
			var html,
				cataItemClass,
                html,
                blocks;
			html = '<div id="sidebar">' +
	                    '<div class="sidebar-top"></div>' +
	                    '<div class="sidebar-bottom"></div>' +
	                '</div>' +
	                '<div id="catalog">' +
	                    '<dl></dl>' +
	                '</div>';
		    this.$wrapper.html(html);
            // this.$wrapper.find('dl').css({width: this.settings.width - 60});

			html = '';

            // 根据 content 内容初始化目录
            blocks = this.$content.find('.content-block, .sub-block');
			for (var i = 0; i < blocks.length; i++) {
                var $block = $(blocks[i]);
                if (!!$block.data('menuText')) {
                    if ($block.hasClass('block-level-1')) {
                        cataItemClass = 'catalog-item1';
                    } else if ($block.hasClass('block-level-2')) {
                        cataItemClass = 'catalog-item2';
                    }
                    var blockId = $block.attr('id');
                    var title = $block.data('menuText');
                    html += '<dd class="' + cataItemClass + '" id="cata-headline-' + blockId + '">' +
                        '<a href="#' + blockId + '" onclick="return false;" title="' + title + '">' + title + '</a>' +
                        '<span class="sideCatalog-dot"></span>' +
                        '</dd>';
                }
            }

            this.$wrapper.find('dl').html(html);
		},

        bindEvents: function() {
            var context = this;

            //文档滚动事件
            $(document).scroll(function() {
                context.cataLocationByContent();                
            });
  

            //目录项点击事件
            this.$wrapper.find('a').click(function() {
                var index = $(this).attr('href').replace('#', '');
                context.contentLocationByCata(index);
            })
            this.$wrapper.find('.sideCatalog-dot').click(function() {
                var index = $(this).parent().find('a').attr('href').replace('#', '');
                context.contentLocationByCata(index);
            });
            
            //目录返回顶部
            $('.sidebar-top').click(function() {
                context.scrollElement($('#catalog'), 100, 'up', 1); // 100 为自定义的jump长度
            });

            //目录返回底部
            $('.sidebar-bottom').click(function() {
                context.scrollElement($('#catalog'), 100, 'down', 1);
            });
        },

        scrollElement: function(ele, jump, dir, dur) {
            var dur = dur || 300;
            var top = ('down' === dir) ? ($(ele).scrollTop() + jump) : ($(ele).scrollTop() - jump);
            $(ele).animate({scrollTop: top}, dur, 'linear');             
        },

        contentLocationByCata: function(index) {
            var ele = this.$content.find('[id=' + index + ']');       
            var top = ele.offset().top - 6;
            $('body, html').animate({scrollTop: top}, 300, 'linear');
            window.location.hash = '#' + index;
        },

        cataLocationByContent: function() {
            var cataList = this.$content.find('.content-block, .sub-block');
            var scrollTop = $(document).scrollTop();
            for (var i = 0, len = cataList.length; i < len; i++) {
                var ele = cataList[i],
                    ele1 = cataList[i+1];
                if ($(ele).offset().top - 30 <= scrollTop && ((i + 1 == len) || ((i + 1 < len) && $(ele1).offset().top > scrollTop))) {     
                    this.$wrapper.find('.highlight').removeClass('highlight');
                    this.$wrapper.find('[href=#' + ele.getAttribute('id') + ']').parent().addClass('highlight');
                    ele.order = i + 1;
                    if (ele.order > 4) {
                        $('#catalog').scrollTop((ele.order - 4) * 23)
                    } else {
                        $('#catalog').scrollTop(0); 
                    } 
                }
            }
        }
	};

    window.SideCatalog = SideCatalog;

    $.fn.sideCatalog = function(options) {
        var calalog = new SideCatalog(this, options);
        return $(this);
    }

})(window, jQuery);






