(function() {

	class Tools {

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

        siblingsDom(id, class1, class2) {
        	var cardDom = document.getElementById(id);
            var liDomes = cardDom.children;
           	console.log(liDomes);
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

                liDomes[i].onclick = function(){
                    this.className = class1;
                    //同辈元素互斥
                    that.siblings(this,function(){
                        this.className = class2;
                    });
                    //把对应的选项卡的内容显示出来
                    var tabDom = document.getElementById("IDate_list").children[this.index];
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
        		fail(err) {
        			console.log(err);
        		}
        	});
        }
	}

	let tools = new Tools();
	tools.siblingsDom("IDate_list", "index_page_date_item active", "index_page_date_item");

	tools.siblingsDom("headrNavList", "main_header_nav_item active", "main_header_nav_item");

	//	滚动图
	tools.swiperBanner();
	// tools.getNewsMesasge();

})();
