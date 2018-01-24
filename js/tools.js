let ToolsFunction = (function() {

	class Tools {
        
        _$(id) {
            return document.getElementById(id);
        }

		swiperBanner() {
			var mySwiper = new Swiper ('.swiper-container', {
				loop: true,
				autoplay: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
			$('.match_content_left_content').eq(0).show()
			$('.match_content_left_header_nav_item').click(function(){
				$('.match_content_left_header_nav_item').removeClass('active')
				$(this).addClass('active')
				var index = $('.match_content_left_header_nav_item').index($(this))
				$('.match_content_left_content').hide()
				$('.match_content_left_content').eq(index).fadeIn()
			})
		}

		siblings(dom,callback){
            var pdom = dom.parentElement;
            var tabArr = [].slice.call(pdom.children);
            tabArr.filter(function(obj){
                if(obj!=dom)callback.call(obj);
            });
        }

        siblingsDom(id, class1, class2, flag) {
            var cardDom = this._$(id);
            var liDomes = cardDom.children;
            var len = liDomes.length;
            for(var i = 0; i < len; i++) {
                var that = this;
                //给对象缓存自有属性
                liDomes[i].index = i;
                liDomes[i].onmouseover = function() {
                    this.className = class1;
                    //同辈元素互斥
                    that.siblings(this,function(){
                        this.className = class2;
                    });
                }
                liDomes[i].onmouseover = function(){
                    this.className = class1;
                    //同辈元素互斥
                    that.siblings(this, function(){
                        this.className = class2;
                    });
                    //把对应的选项卡的内容显示出来
                    var tabDom = document.getElementById("IDate_list").children[this.index];
                    if (flag == true) {
                        tabDom.style.display = "block";
                        that.siblings(tabDom, function(){
                            this.style.display = "none";
                        });
                    }
                };

            }
        }

        getNewsMesasge() {
        	$.ajax({
        		url: './data/news.json',
        		method: "GET",
        		async: true,
        		success: function(res) {
        			console.log(res);
        		},
        		fail: function(err) {
        			console.log(err);
        		}
        	});
        }

        mune() {
            let html = "<div class='column' style='display: none;'>"+
                        "<ul>" +
                        "    <li>" +
                        "        <i class='iconfont icon-185078emailmailstreamline'></i>" +
                        "        <span>Contact Supplier</span>" +
                        "    </li>" +
                        "    <li>" +
                        "        <i class='iconfont icon-whatsapp'></i>" +
                        "        <span class='whatsapp'>whatsapp</span>" +
                        "    </li>" +
                        "    <li>" +
                        "        <i class='iconfont icon-wechat'></i>" +
                        "        <span class='wechat'>wechat</span>" +
                        "    </li>" +
                        "    <li class='ruiTouTop'>" +
                        "        <span class='top'>TOP</span>" +
                        "        <i class='iconfont icon-top'></i>" +
                        "    </li>" +
                        "</ul>" +
                    "</div>";
            $('body').append(html);
            // 按钮淡入淡出
            $(window).scroll(function(){
                if($(window).scrollTop() >= 450){
                    $(".column").fadeIn(200);
                } else {
                    $(".column").stop(true,true).fadeOut(200);
                }
            });
            
            // 回到顶部
            $(".ruiTouTop").click(function(){
                $("html,body").animate({
                    scrollTop:0
                },200);
            });
        }

	}

    return {
        Tools
    }

})();
