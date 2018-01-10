let ToolsFunction = (function() {

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

        footerElemet() {
            let html = "<div class='index_page_footer'> "+
                        "<div class='page_footer_body'>"+
                            "<div class='page_footer_imessage'>"+
                                "<div class='wechat fl'>"+
                                    "<img src='./images/wechatcode.png' class='block'>"+
                                    "<span>关注公众号</span>"+
                                "</div>"+
                                "<div class='imsg_content fl'>"+
                                    "<ul>"+
                                        "<li class='clearfix'>"+
                                            "<i class='iconfont fl icon-dianhua'></i>"+
                                            "<span class='fl'>0871-65198586</span>"+
                                        "</li>"+
                                        "<li class='clearfix'>"+
                                            "<i class='iconfont fl icon-youjian'></i>"+
                                            "<span class='fl'>kmlaohuaishu@qq.com</span>"+
                                        "</li>"+

                                        "<li class='clearfix'>"+
                                            "<i class='iconfont fl icon-weibiaoti-'></i>"+
                                            "<span class='fl'>龙泉路408号云南财经职业学院兴隆院26栋1单元501号</span>"+
                                        "</li>"+
                                    "</ul>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<div class='page_footer_copy clearfix'>"+
                            "<div style='width: 630px;text-align: left;margin: 0px auto;'>"+
                                "昆明老槐树婚介服务有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有&copy;2017 - 2018&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;滇ICP备17005284号"+
                            "</div>"+
                        "</div>"+
                    "</div>";
            $('#footer').append(html);
        }

	}

    return {
        Tools
    }

	// tools.getNewsMesasge();

})();
