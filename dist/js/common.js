// Code by ZenLiver
// 中银

$(function () {

    // 全局变量
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // 给当前页的顶部导航项添加active样式
    var currentPagePath=location.pathname.slice(1);
    console.log(currentPagePath);
    var navbarHrefs=new Array();
    var navbarLinks=$(".nav.navbar-nav li a");
    for (var i = 0; i < navbarLinks.length; i++) {
        navbarHrefs[i]=navbarLinks.eq(i).attr("href");
        console.log(navbarHrefs);
    }
    for (var n = 0; n < navbarLinks.length; n++) {
        if (navbarHrefs[n].indexOf(currentPagePath)>=0) {
            // navbarHrefs[n].slice(0,-5)
            if (currentPagePath != "") {
                $(".nav.navbar-nav li").removeClass("active");
                $(".nav.navbar-nav li a").eq(n).parent().addClass("active");
                break;
            }
        }
        else {
            $(".nav.navbar-nav li").removeClass("active");
        }
    }

    // 手机下折叠菜单添加动画效果
    var navbarLis=$(".navbar-nav li");
    var animationDelay=0;
    for (var i = 0; i < navbarLis.length; i++) {
        navbarLis.eq(i).css("animation-delay",animationDelay+"s");
        animationDelay=animationDelay+0.05;
    }
    $(".navbar-toggle").click(function () {
        $(".navbar-nav li").toggleClass("animated fadeInUp");
        // $(".navbar-nav li").animateCss("fadeInUp");
    });

    // modal垂直居中
    $(window).load(function () {
        $(".modal-dialog").each(function () {
            var modalHeight = $(this).actual("height");
            console.log(modalHeight);
            $(this).css({
                "margin-bottom": "0",
                "margin-top": (screenHeight-modalHeight)/2+"px"
            });
        });
    });

    // 首页swiper
    var indexSwiper = new Swiper ('#index_slides .swiper-container', {
        // Optional parameters
        // direction: 'vertical',
        loop: true,

        // If we need pagination
        pagination: '#index_slides .swiper-pagination',
        paginationClickable: true,
        // slidesPerView: 4,
        // spaceBetween: 50,

        // Navigation arrows
        nextButton: '#index_slides .swiper-button-next',
        prevButton: '#index_slides .swiper-button-prev',
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 800

        // And if we need scrollbar
        // scrollbar: '.swiper-scrollbar',
    });
    console.log(indexSwiper);
    console.log(indexSwiper.classNames);

    // 首页：品牌中心区域防止鼠标划过后显示错位
    $(window).load(function () {
        var colHeight = $("#index_brand .row .col-md-3").height();
        console.log(colHeight);
        $("#index_brand .row .col-md-3").mouseover(function () {
            $(this).children(".brand_item").css("border","1px solid #eee");
            $("#index_brand .row .col-md-3").css("height",(colHeight+2)+"px");
        });
        $("#index_brand .row .col-md-3").mouseout(function () {
            $(this).children(".brand_item").css("border","none");
            // $("#index_brand .row .col-md-3").attr("style","");
        });
    });

    // 首页：底部区域3列等高
    if (screenWidth >= 768) {
        $(window).load(function () {
            var indexBtmLastModHeight = $("#index_btm .col-md-4:last-child .mod1").height();
            console.log(indexBtmLastModHeight);
            $("#index_btm .col-md-4 .mod1").css("height",indexBtmLastModHeight+"px");
        });
    }

    // 产品详情页swiper

    // 初始化swiper
    var productsDetailSwiper = new Swiper ('#products_detail .swiper-container', {
        // direction: 'vertical',
        loop: true,
        pagination: '#products_detail .swiper-pagination',
        paginationClickable: true,
        // slidesPerView: 4,
        // spaceBetween: 50,
        // nextButton: '#products_detail .swiper-button-next',
        // prevButton: '#products_detail .swiper-button-prev',
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 500
    });

    // 添加缩略图和自定义按钮控制
    console.log(productsDetailSwiper);
    console.log(productsDetailSwiper.classNames);
    if (productsDetailSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。

        // 点击左右按钮控制swiper滑动
        $(".swiper_gallery_thumbs_btn_prev").click(function () {
            productsDetailSwiper.slidePrev();
        });
        $(".swiper_gallery_thumbs_btn_next").click(function () {
            productsDetailSwiper.slideNext();
        });

        // swiper滑动时给对应的缩略图添加active效果
        productsDetailSwiper.on("SlideChangeStart",function () {
            var realIndex = productsDetailSwiper.realIndex;
            console.log("realIndex:"+realIndex);
            var activeIndex = productsDetailSwiper.activeIndex;
            console.log("activeIndex:"+activeIndex);
            $("li.swiper_gallery_thumbs_img").removeClass("active");
            $(".swiper_gallery_thumbs_list").children("li").eq(realIndex).addClass("active");
        });

        // 点击缩略图swiper滑动到对应的大图
        $(".swiper_gallery_thumbs_img").click(function () {
            var thumbImgIndex = $(this).index();
            var thumbImgNum = $(".swiper_gallery_thumbs_img").length;
            var activeIndex;
            console.log(thumbImgIndex);
            // activeIndex 和 realIndex 的关系
            // thumbImgIndex = realIndex
            if (thumbImgIndex == 0) {
                activeIndex = thumbImgNum+2-1;
            }
            else {
                activeIndex = thumbImgIndex+1;
            }
            productsDetailSwiper.slideTo(activeIndex,500); // slideTo方法的参数 index 是activeIndex而不是realIndex
        });

        // 移动设备下限制swiper-container的高度
        if (screenWidth < 1200) {
            $(window).load(function () {
                var swiperContainerWidth = $("#products_detail .swiper-container").width();
                $("#products_detail .swiper-container").css("max-height",swiperContainerWidth);
            });
        }

    }

    // 新闻列表页：限制新闻缩略图显示的高度
    setImgParentHeight(".news_item_img a img",0.65);

    // 返回顶部
    backToTop(".right_fixedbar_backtotop");

    // 添加sr动画

        // 启动sr
        window.sr = ScrollReveal({
            reset: true,
            mobile: true,
            easing: 'ease',
            distance: '30px',
            scale: 1
        });

        // 首页
        sr.reveal(".area_head_title", {
            duration: 500,
            origin: "top"
        });
        sr.reveal(".area_head_subtitle", {
            duration: 500,
            origin: "bottom"
        });


});
