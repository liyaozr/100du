// 切换搜索框
(function () {
	var $searchList = $('#search li');
	var $text = $('.form .txt');
	var arrText = [
		'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
		'例如：昌平区育新站龙旗广场2号楼609室',
		'例如：万达影院双人情侣券',
		'例如：东莞出事了，大老虎是谁？',
		'例如：北京初春降雪，天气变幻莫测'
	];
	var iNow = 0;
	$searchList.click(function() {
		iNow = $(this).index('#search li');
		$(this).addClass('active').siblings('li').removeClass('active');
		$text.val(arrText[iNow]);
	});
	$text.focus(function (){
		if( $(this).val() == arrText[iNow] ) {
			$(this).val('');
		}
	});
	$text.blur(function (){
		if( $(this).val() === '' ) {
			$text.val(arrText[iNow]);
		}
	});
})();


// update文字弹性滑动
(function(){
	var $div = $('.update');
	var $ul = $div.find('ul');
	var iH = 0;
	var arrData = [
		{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
		{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
		{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
		{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
		{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
		{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
		{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
		{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
	];
	var str = '';
	var oBtnUp = $div.find('.triangle-up');
	var oBtnDown = $div.find('.triangle-down-red');
	var iNow = 0;
	var timer = null;

	for ( var i=0; i<arrData.length; i++ ) {
		str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
	}
	$ul.html( str );

	iH = $ul.find('li').height();

	oBtnUp.click(function (){
		doMove(-1);
	});
	oBtnDown.click(function (){
		doMove(1);
	});

	$div.hover(function (){
		clearInterval( timer );
	}, autoPlay);

	function autoPlay() {
		timer = setInterval(function () {
			doMove(-1);
		}, 3500);
	}
	autoPlay();

	function doMove( num ) {
		iNow += num;
		if ( Math.abs(iNow) > arrData.length-1 ) {
			iNow = 0;
		}
		if ( iNow > 0 ) {
			iNow = -(arrData.length-1);
		}
		$ul.stop().animate({ 'top': iH*iNow }, 2200, 'elasticOut');
	}
})();

// 选项卡切换
(function () {
	fnTab( $('.tab-nav1'), $('.con1'), 'click' );
	fnTab( $('.tab-nav2'), $('.con2'), 'click' );
	fnTab( $('.tab-nav3'), $('.con3'), 'mouseover' );
	fnTab( $('.tab-nav4'), $('.con4'), 'mouseover' );

	function fnTab( oNav, aCon, sEvent ) {
		var aElem = oNav.children();
		aCon.hide().eq(0).show();

		aElem.each(function (index){

			$(this).on(sEvent, function (){
				aElem.removeClass('active').addClass('gradient');
				$(this).removeClass('gradient').addClass('active');
				aElem.find('a').attr('class', 'triangle-down-gray');
				$(this).find('a').attr('class', 'triangle-down-red');

				aCon.hide().eq( index ).show();
			});

		});
	}
})();

//日历提示说明
(function (){
	var aSpan = $('.calendar h4 span');
	var aImg = $('.calendar .img');
	var oPrompt = $('.today-info');
	var oImg = oPrompt.find('img');
	var oStrong = oPrompt.find('strong');
	var oP = oPrompt.find('p');

	aImg.hover(function (){
		var iTop = $(this).parent().position().top - 30;
		var iLeft = $(this).parent().position().left + 55;
		var index = $(this).parent().index()%aSpan.size();

		oPrompt.show().css({ 'left': iLeft, 'top': iTop });
		oP.text($(this).attr('info'));
		oImg.attr('src', $(this).attr('src'));
		oStrong.text( aSpan.eq(index).text() );


	}, function (){
		oPrompt.hide();
	});
})();

// 焦点图
(function () {
	var $slide = $('.slide')
	var $fade = $('.fade');
	var $imgList = $fade.find('img');
	var $liList = $('.slide ul li');
	var oP = $fade.find('p');
	var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
	var timer = null;
	var iNow = 0;
	fnFade();
	$liList.click(function() {
		iNow = $(this).index();
		fnFade();
	});
	$slide.hover(function (){ clearInterval(timer); }, slide);
    function slide() {
    	timer = setInterval(function() {
    		iNow++;
			iNow%=arr.length;
    		fnFade();
    	}, 2000);
    }
    slide();
    function fnFade() {
		$imgList.each(function (i){
			if ( i != iNow ) {
				$imgList.eq(i).fadeOut().css('zIndex', 1);
				$liList.eq(i).removeClass('active');

			} else {
				$imgList.eq(i).fadeIn().css('zIndex', 2);
				$liList.eq(i).addClass('active');
			}
		});
		oP.html(arr[iNow]);
	}
})();

// BBS高亮显示
(function (){
	$('.bbs li').mouseover(function (){
		$('.bbs li').removeClass('active').eq($(this).index()).addClass('active');
	});
})();

// HOT鼠标提示效果
(function (){
	var arr = [
		'',
		'用户1<br />人气1',
		'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
		'用户3<br />区域：CBD<br />人气3',
		'用户4<br />区域：CBD<br />人气4',
		'用户5<br />区域：CBD<br />人气5',
		'用户6<br />区域：CBD<br />人气6',
		'用户7<br />区域：CBD<br />人气7',
		'用户8<br />区域：CBD<br />人气8',
		'用户9<br />区域：CBD<br />人气9',
		'用户10<br />区域：CBD<br />人气10'
	];
	$('.lattice ul li').mouseover(function (){

		if ( $(this).index() === 0 ) return;

		$('.lattice li p').remove();

		$(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
	});
})();

