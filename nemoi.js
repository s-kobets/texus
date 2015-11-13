// Определение мобильных браузеров
var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
        iPad = (navigator.userAgent.match(/(iPad)/g) ? true : false),
        operaMini = navigator.userAgent.match(/Opera Mini/i) ? true : false,
        operaMobile = navigator.userAgent.match(/Opera Mobi/i) ? true : false,
        touchSupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        clickEvent = touchSupport ? 'touchstart' : 'click';

/*
 * Starts any clocks using the user's local time
 * From: cssanimation.rocks/clocks
 */
function initLocalClocks() {
    // Get the local time using JS
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    // Create an object with each hand and it's angle in degrees
    var hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];
    // Loop through each of these hands to set their angle
    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
            elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
            // If this is a minute hand, note the seconds position (to calculate minute position later)
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

/*
 * Move the second containers
 */
function moveSecondHands() {
    var containers = document.querySelectorAll('.seconds-container');
    setInterval(function () {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
    }, 1000);
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
function setUpMinuteHands() {
    // Find out how far into the minute we are
    var containers = document.querySelectorAll('.minutes-container');
    if (containers.length === 0)
        return;
    var secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
        // Set a timeout until the end of the current minute, to move the hand
        var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
        setTimeout(function () {
            moveMinuteHands(containers);
        }, delay);
    }
}

/*
 * Do the first minute's rotation
 */
function moveMinuteHands(containers) {
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }
    // Then continue with a 60 second interval
    setInterval(function () {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
    }, 60000);
}


// Определение ширины скроллбара
function getScrollBarWidth() {
    if ($(document).height() > $(window).height()) {
        $('body').append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
        fakeScrollBar = $('#fakescrollbar');
        fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
        var w1 = fakeScrollBar.find('div').innerWidth();
        fakeScrollBar.css('overflow-y', 'scroll');
        var w2 = $('#fakescrollbar').find('div').html('html is required to init new width.').innerWidth();
        fakeScrollBar.remove();
        return (w1 - w2);
    }
    return 0;
}

// Проверка на число
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Вспомогательная анимация fadeSlideToggle
$.fn.fadeSlideToggle = function (settings) {
    settings = $.extend({
        speed: 500,
        height: 'toggle',
        easing: "swing",
        complete: null
    }, settings);

    var caller = $(this);
    if ($(caller).css("display") === "none") {
        $(caller).stop().animate({
            opacity: 'toggle',
            height: settings.height
        }, parseInt(settings.speed), settings.easing, settings.complete);
    } else {
        $(caller).stop().animate({
            opacity: 'toggle',
            height: settings.height
        }, parseInt(settings.speed), settings.easing, settings.complete);
    }

    return this;
};

// Вспомогательная функция для фильтрации
$.expr[':'].Contains = function (a, i, m) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Разрешение на ввод в инпут только чисел
$.fn.forceNumericOnly = function () {
    return this.each(function ()
    {
        $(this).keydown();
    });
};

// Разрешение на ввод в инпут только чисел
function forceNumericOnly(obj) {
    $('.js-force-numeric-only', obj).off("keydown.forceNumericOnly").on("keydown.forceNumericOnly", function (e)
    {
        var key = e.charCode || e.keyCode || 0;

        return (
                key === 8 ||
                key === 9 ||
                key === 46 ||
                key === 188 ||
                key === 190 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
    });
}

// Разбиение на триады
function setBackspaces(p) {
    p = p.toString();
    p = p.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
    return p;
}

// Разбиение на триады
function setBackspacesSelector(obj) {
    $('.js-set-backspaces-selector', obj).off("keyup.setBackspaces").on("keyup.setBackspaces", function () {
        $(this).val(setBackspaces($(this).val()));
    }).each(function () {
        $(this).triggerHandler("keyup.setBackspaces");
    });
}



// Слайдер
function slider(obj) {
    var sliderArea = $('.js-slider-area:visible:not(".is-stl")', obj),
            sliderTimeout;

    if (sliderArea.length) {
        sliderArea.each(function () {
            var sliderArea = $(this),
                    slider = sliderArea.children('.js-slider'),
                    sliderEl = slider.children('.slider-el'),
                    sliderElLength = sliderEl.length,
//		sliderEq = sliderElLength > 3 ? 1 : 0,
                    sliderEq = 0,
                    sliderPagerArea = sliderArea.children('.js-slider-pager-area'),
                    sliderPager = sliderPagerArea.find('.js-slider-pager'),
                    sliderNav = sliderArea.children('.js-slider-nav'),
                    sliderNavBtnPrev = sliderNav.find('.js-slider-nav-btn-prev'),
                    sliderNavBtnNext = sliderNav.find('.js-slider-nav-btn-next'),
                    sliderAnimation = slider.data('slider-animation') || false,
                    sliderAnimationType = slider.data('slider-animation-type') || 'directscroll',
                    sliderAuto = slider.data('slider-auto') || false,
                    anchor = slider.data('slider-anchor') || false;

            function sliderNavShow() {
                var windowWidth = $(window).width();

                if (windowWidth < 1200)
                    sliderNav.hide();
                else
                    sliderNav.show();

//		var sliderNavBtnWidth = (sliderArea.outerWidth() - sliderEl.outerWidth()) / 2  + 40;
//		sliderNavBtnPrev.css({'width': sliderNavBtnWidth+'px'});
//		sliderNavBtnNext.css({'width': sliderNavBtnWidth+'px'});
            }

            function sliderElSize() {
                var containerFluidWidth = $('.container-fluid').outerWidth(),
                        containerFluidPaddingLeft = parseInt($('.container-fluid').css('padding-left'));

                sliderEl.css({'width': containerFluidWidth - containerFluidPaddingLeft * 2});

                if ($.browser.msie && parseInt($.browser.version, 10) === 8)
                    return;

                slider.trigger('updateSizes');
            }

            slider.carouFredSel({
                width: '100%',
                circular: true,
                infinite: true,
//		responsive: sliderElLength > 3 ? false : true,
                responsive: true,
                auto: sliderAuto,
                items: {
//		    visible: sliderElLength > 3 ? 3 : 1,
//		    visible: 1,
//		    start: sliderElLength > 3 ? -1 : 0,
//		    width: 'variable',
//		    height: 'variable'
                },
                scroll: {
                    timeoutDuration: 6000,
                    duration: 500,
                    fx: sliderAnimationType,
                    pauseOnHover: true,
                    items: 1
                },
                pagination: {
                    container: sliderPager,
                    anchorBuilder: anchor
                },
                onCreate: function () {
                    if (sliderAnimation) {
//			sliderEl.not(":first-child").each(function () {
//			    $(this).find('.js-slider-head').css({'left': '3000px', 'opacity': '0'});
//			    $(this).find('.js-slider-descr').css({'left': '3000px', 'opacity': '0'});
//			});
                        sliderEl.not(":eq(" + sliderEq + ")").each(function () {
                            $(this).find('.js-slider-info').css({'display': 'none'});
                        });
                    }

//		    $(window).resize(function () {
//			clearTimeout(sliderTimeout);
//			var sliderTimeout = setTimeout(function () {
//			    sliderNavShow();
////			    sliderElSize();
//			}, 250);
//		    }).trigger('resize');
                },
                next: {
                    button: sliderNavBtnNext,
                    key: "right",
                    onBefore: function (data) {
                        if (sliderAnimation) {
//			    $(this).delay(1000);
//			    data.items.old.find('.js-slider-head').delay(250).animate({'left': '-3000px'}, 350, function () {
//				$(this).css('opacity', '0');
//			    });
//			    data.items.old.find('.js-slider-descr').delay(350).animate({'left': '-3000px'}, 350, function () {
//				$(this).css('opacity', '0');
//			    });
                            if (Modernizr.cssanimations) {
                                $(this).delay(500);
                                data.items.old.eq(sliderEq).find('.js-slider-info').removeClass('bounceOutLeft animated').addClass('bounceOutLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).css({'display': 'none'}).removeClass('bounceOutLeft animated');
                                });
                            }
                            else {
                                data.items.old.eq(sliderEq).find('.js-slider-info').css({'display': 'none'});
                                data.items.visible.eq(sliderEq).find('.js-slider-info').css({'display': 'table'});
                            }
                        }
                    },
                    onAfter: function (data) {
                        if (sliderAnimation) {
//			    data.items.visible.find('.js-slider-head').css({'opacity': '1', 'left': '3000px'}).delay(250).animate({'left': '0'}, 350);
//			    data.items.visible.find('.js-slider-descr').css({'opacity': '1', 'left': '3000px'}).delay(350).animate({'left': '0'}, 350);
                            if (Modernizr.cssanimations)
                                data.items.visible.eq(sliderEq).find('.js-slider-info').css({'display': 'table'}).removeClass('bounceInRight animated').addClass('bounceInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).removeClass('bounceInRight animated');
                                });
                        }
                    }
                },
                prev: {
                    button: sliderNavBtnPrev,
                    key: "left",
                    onBefore: function (data) {
                        if (sliderAnimation) {
//			    $(this).delay(1000);
//			    data.items.old.find('.js-slider-head').delay(250).animate({'left': '3000px'}, 350, function () {
//				$(this).css('opacity', '0');
//			    });
//			    data.items.old.find('.js-slider-descr').delay(350).animate({'left': '3000px'}, 350), function () {
//				$(this).css('opacity', '0');
//			    };
                            if (Modernizr.cssanimations) {
                                $(this).delay(500);
                                data.items.old.eq(sliderEq).find('.js-slider-info').removeClass('bounceOutRight animated').addClass('bounceOutRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).css({'display': 'none'}).removeClass('bounceOutRight animated');
                                });
                            }
                            else {
                                data.items.old.eq(sliderEq).find('.js-slider-info').css({'display': 'none'});
                                data.items.visible.eq(sliderEq).find('.js-slider-info').css({'display': 'table'});
                            }
                        }
                    },
                    onAfter: function (data) {
                        if (sliderAnimation) {
//			    data.items.visible.find('.js-slider-head').css({'opacity': '1', 'left': '-3000px'}).delay(250).animate({'left': '0'}, 350);
//			    data.items.visible.find('.js-slider-descr').css({'opacity': '1', 'left': '-3000px'}).delay(350).animate({'left': '0'}, 350);
                            if (Modernizr.cssanimations)
                                data.items.visible.eq(sliderEq).find('.js-slider-info').css({'display': 'table'}).removeClass('bounceInLeft animated').addClass('bounceInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).removeClass('bounceInLeft animated');
                                });
                        }
                    }
                },
                swipe: {
                    onTouch: true
                }
            }).addClass('is-stl');
        });
    }
}

// Карусель
function carousel(obj) {
    var carouselArea = $('.js-carousel-area:visible:not(".is-stl")', obj);

    if (carouselArea.length) {
        carouselArea.each(function () {
            var carouselArea = $(this),
                    carousel = carouselArea.find('.js-carousel'),
                    carouselItems = carousel.children(),
                    carouselItemsLength = carouselItems.length,
                    carouselPagerArea = carouselArea.children('.js-carousel-pager-area'),
                    carouselPager = carouselPagerArea.find('.js-carousel-pager'),
                    carouselNav = carouselArea.children('.js-carousel-nav'),
                    carouselNavBtnPrev = carouselNav.find('.js-carousel-nav-btn-prev'),
                    carouselNavBtnNext = carouselNav.find('.js-carousel-nav-btn-next'),
                    visible = parseInt(carousel.data('carousel-visible')) || 'variable',
                    minItem = parseInt(carousel.data('carousel-min')) || null,
                    maxItem = parseInt(carousel.data('carousel-max')) || null,
                    width = parseInt(carousel.data('carousel-width')) || null,
                    height = parseInt(carousel.data('carousel-height')) || null,
                    responsive = carousel.data('carousel-responsive') || false,
                    circular = carousel.data('carousel-circular') || false,
                    infinite = carousel.data('carousel-infinite') || false,
                    visibleObj = isNumber(visible) ? visible : {min: minItem, max: maxItem},
            scroll = carousel.data('carousel-scroll') || 1,
                    anchor = carousel.data('carousel-anchor') || false;

            if (minItem && (carouselItemsLength <= minItem))
                return;

            carousel.carouFredSel({
                circular: circular,
                infinite: infinite,
                auto: false,
                responsive: responsive,
                scroll: scroll,
                width: width,
                height: height,
                items: {
                    width: width,
                    height: height,
                    visible: visibleObj
                },
                prev: {
                    button: carouselNavBtnPrev,
                    key: "left"
                },
                next: {
                    button: carouselNavBtnNext,
                    key: "right"
                },
                pagination: {
                    container: carouselPager,
                    anchorBuilder: anchor
                },
                swipe: {
                    onTouch: true
                }
            }).addClass('is-stl');

            carouselArea.addClass('is-stl');
        });
    }
}

// Обновление размеров каруселей/слайдеров
function carouFredSelUpdate(obj) {
    $('.js-carousel:visible, .js-slider:visible', obj).trigger('updateSizes');
}

// Адаптивная карусель
function carouselResponsive(obj) {
//    $('.js-carousel-responsive', obj).each(function(){
//	var carousel = $(this),
//	    carouselParams = carousel.data('carousel-params') ? JSON.parse(JSON.stringify(carousel.data('carousel-params'))) : '';
//
//	carousel.owlCarousel(carouselParams);
//    });

    $('.js-carousel-responsive', obj).slick().on('setPosition', function () {
        addOneBox($(this));
        changeCheckboxAction($(this));
        changeRadioboxAction($(this));
    });

    $('.js-tabs-link-area').on('switch', function () {
        $('.js-carousel-responsive').slick('setPosition');
    });
}

// Переключение фото в карусели
function photoSwitch(obj) {
    $('.js-photo-el', obj).on('click', function (e) {
        e.preventDefault();

        var photoEl = $(this),
                photoElSrc = photoEl.data('src'),
                photoArea = photoEl.closest('.js-photo-area'),
                photoFullArea = photoArea.find('.js-photo-full-area[data-src=' + photoElSrc + ']'),
                photoAnimateTime = 500;

        if (photoEl.hasClass('active') || photoArea.hasClass('animated'))
            return false;

        photoArea.addClass('animated');
        photoEl.addClass('active').siblings('.js-photo-el').removeClass('active');
        photoFullArea.fadeIn(photoAnimateTime, function () {
            photoArea.removeClass('animated');
        }).siblings('.js-photo-full-area').hide();
    });
}

function isMobile() { 
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    }
    else {
        return false;
    }
}

// Стилизованный чекбокс
function changeCheckboxAction(obj) {
    $('.js-ch-box input', obj).off('change.changeCheckboxAction');
    $('.js-ch-box', obj).off('touchstart click mouseenter mouseleave');
    $('.js-ch-box-area label', obj).off('touchstart click mouseenter mouseleave');

    $('.js-ch-box', obj).each(function () {
        changeCheckStart($(this));
    });

    $('.js-ch-box input', obj).on('change.changeCheckboxAction', function () {
        var chBoxInput = $(this),
                chBoxInputIsChecked = chBoxInput.prop('checked'),
                chBoxArea = chBoxInput.closest('.js-ch-box-area'),
                chBoxHiddenText = $('.js-ch-box-hidden-text', chBoxArea),
                animateTime = 333;

        chBoxInputIsChecked ? chBoxHiddenText.slideDown(animateTime, function () {
            chBoxHiddenText.css('display', 'block');
        }) : chBoxHiddenText.slideUp(animateTime, function () {
            chBoxHiddenText.css('display', 'none');
        });
    });

    /*if (touchSupport) {
        $('.js-ch-box', obj).on({
            touchstart: function () {
                changeCheck($(this));
            }
        });
        $('.js-ch-box-area label', obj).on({
            touchstart: function () {
                changeCheck($(this).closest('.js-ch-box-area').find('.js-ch-box'));
            }
        });
    }
    else {*/
        $('.js-ch-box', obj).on({
            click: function () {
                changeCheck($(this));
            }
        });
        $('.js-ch-box-area label', obj).on({
            click: function () {
                changeCheck($(this).closest('.js-ch-box-area').find('.js-ch-box'));
            }
        });

        if(!isMobile()) {
            $('.js-ch-box', obj).on({
                mouseenter: function () {
                    $(this).closest('.js-ch-box-area').addClass('hover');
                },
                mouseleave: function () {
                    $(this).closest('.js-ch-box-area').removeClass('hover');
                }
            });
            $('.js-ch-box-area label', obj).on({
                mouseenter: function () {
                    $(this).closest('.js-ch-box-area').addClass('hover');
                },
                mouseleave: function () {
                    $(this).closest('.js-ch-box-area').removeClass('hover');
                }
            });
        }
    //}
}

function changeCheckStart(el)
{
    var input = el.find("input").eq(0),
            chBoxArea = el.closest('.js-ch-box-area'),
            checkChecked = input.prop("checked"),
            checkDisabled = input.prop("disabled");

    if (checkDisabled) {
        el.addClass("disabled");
        chBoxArea.addClass("disabled");
    }
    else if (checkChecked) {
        el.addClass("checked");
        chBoxArea.addClass("checked");
    }
    else {
        el.removeClass("checked");
        chBoxArea.removeClass("checked");
    }

    return true;
}

function changeCheck(el)
{
    var input = el.find("input").eq(0),
            chBoxArea = el.closest('.js-ch-box-area');

    if (input.prop("disabled"))
        return false;

    if (!input.prop("checked")) {
        el.addClass("checked");
        chBoxArea.addClass("checked");
        input.prop("checked", true);
    }
    else {
        el.removeClass("checked");
        chBoxArea.removeClass("checked");
        input.prop("checked", false);
    }

//    el.trigger('change');
    input.trigger('change');

    return true;
}

// Стилизованный радиобатон
function changeRadioboxAction(obj) {
    $('.js-radio-box input', obj).off('change');
    $('.js-radio-box', obj).off('touchstart click mouseenter mouseleave');
    $('.js-radio-box-area label', obj).off('touchstart click mouseenter mouseleave');

    $('.js-radio-box', obj).each(function () {
        changeRadioStart($(this));
    });

    $('.js-radio-box input', obj).on('change', function () {
        var radioBoxInput = $(this),
                radioBoxInputName = radioBoxInput.attr('name'),
                radioBoxInputChecked = $('.js-radio-box input:radio[name=' + radioBoxInputName + ']').filter(':checked'),
                radioBoxInputsNoChecked = $('.js-radio-box input:radio[name=' + radioBoxInputName + ']').not(':checked'),
                radioBoxAreaChecked = radioBoxInputChecked.closest('.js-radio-box-area'),
                radioHiddenTextChecked = $('.js-radio-box-hidden-text', radioBoxAreaChecked).filter(':hidden'),
                animateTime = 333;

        radioBoxInputsNoChecked.each(function () {
            var radioBoxInputNoChecked = $(this),
                    radioBoxAreaNoChecked = radioBoxInputNoChecked.closest('.js-radio-box-area'),
                    radioHiddenTextNoChecked = $('.js-radio-box-hidden-text', radioBoxAreaNoChecked).filter(':visible');

            radioHiddenTextNoChecked.slideUp(animateTime);
        });

        radioHiddenTextChecked.slideDown(animateTime);
    });

//    if (touchSupport) {
//	$('.js-radio-box', obj).on({
//	    touchstart: function() {
//		changeRadio($(this));
//	    }
//	});
//	$('.js-radio-box-area label', obj).on({
//	    touchstart: function() {
//		changeRadio($(this).closest('.js-radio-box-area').find('.js-radio-box'));
//	    }
//	});
//    }
//    else {
    $('.js-radio-box', obj).on({
        click: function () {
            changeRadio($(this));
        }
    });
    $('.js-radio-box-area label', obj).on({
        click: function () {
            changeRadio($(this).closest('.js-radio-box-area').find('.js-radio-box'));
        }
    });
    $('.js-radio-box', obj).on({
        mouseenter: function () {
            $(this).closest('.js-radio-box-area').addClass('hover');
        },
        mouseleave: function () {
            $(this).closest('.js-radio-box-area').removeClass('hover');
        }
    });
    $('.js-radio-box-area label', obj).on({
        mouseenter: function () {
            $(this).closest('.js-radio-box-area').addClass('hover');
        },
        mouseleave: function () {
            $(this).closest('.js-radio-box-area').removeClass('hover');
        }
    });
//    }
}

function changeRadioStart(el)
{
    var input = el.find("input").eq(0),
            radioBoxArea = el.closest('.js-radio-box-area'),
            radioChecked = input.prop("checked"),
            radioDisabled = input.prop("disabled");

    if (radioChecked)
    {
        el.addClass('checked');
        radioBoxArea.addClass('checked');
    }
    if (radioDisabled)
    {
        el.addClass('disabled');
        radioBoxArea.addClass('disabled');
    }

    return true;
}

function changeRadio(el)
{
    var input = el.find("input").eq(0),
            radioBoxArea = el.closest('.js-radio-box-area'),
            nm = input.attr("name");

    if (el.attr("class").indexOf("disabled") === -1)
    {
        $(".js-radio-box input").each(function () {
            var tInpt = $(this);
            if (tInpt.attr("name") === nm)
            {
                tInpt.parent().removeClass("checked");
                tInpt.closest('.js-radio-box-area').removeClass("checked");
                tInpt.removeAttr("checked");
            }
        });

        el.addClass("checked");
        radioBoxArea.addClass("checked");
        input.prop("checked", true);

        $('input[name=' + nm + ']').first().trigger('change');
    }

    return true;
}

// Toggle - блок
function initToggle(obj) {
    $('.js-slide-btn', obj).off('click.initToggle').on('click.initToggle', function () {
        var slideBtn = $(this),
                slideBox = slideBtn.closest('.js-slide-box'),
                slideContnt = $('> .js-slide-contnt', slideBox),
                slideBtns = slideBox.find('.js-slide-btn');

        if (slideBox.hasClass('run'))
            return false;

        slideBox.addClass('run');

        slideBtns.toggleClass('open');
//	slideBtn.toggleClass('open');

        slideBox.one("slideanimationend", slideEnd)

        slideContnt.fadeSlideToggle({
            speed: 333,
            complete: function () {
                slideBox.trigger("slideanimationend");
            }
        });


        function slideEnd() {
            slideBox.removeClass('run').toggleClass('open');
            slideContnt.toggleClass('open').removeAttr('style');
            slideBox.trigger('slideBoxEnd');
        }
    });
}

// Accordeon - блок
function initAccordeon(obj) {
    $('.js-accordeon-btn', obj).on('click', function () {
        var accordeonBtn = $(this),
                accordeonBox = accordeonBtn.closest('.js-accordeon-box'),
                accordeonContnt = $('.js-accordeon-contnt', accordeonBox),
                accordeonBoxSel = accordeonBox.siblings('.js-accordeon-box.open'),
                accordeonContntSel = $('.js-accordeon-contnt', accordeonBoxSel),
                accordeonBtnSel = $('.js-accordeon-btn', accordeonBoxSel),
                accordeonBtns = $('.js-accordeon-btn', accordeonBox);

        if (!accordeonBox.hasClass('run')) {
            accordeonBoxSel.addClass('run');
            accordeonBox.addClass('run');

            accordeonBtnSel.removeClass('open');
            accordeonBtns.toggleClass('open');

            accordeonContntSel.fadeSlideToggle({
                speed: 333,
                complete: function () {
                    accordeonBoxSel.removeClass('run').removeClass('open');
                    accordeonContntSel.removeClass('open').removeAttr('style');
                }
            });

            accordeonContnt.fadeSlideToggle({
                speed: 333,
                complete: function () {
                    accordeonBox.removeClass('run').toggleClass('open');
                    accordeonContnt.toggleClass('open').removeAttr('style');
                    accordeonBox.trigger('accordeonBoxEnd');
                }
            });
        }
    });
}

// Accordeon - блок реверсивный
function initReverseAccordeon(obj) {
    $('.js-reverse-accordeon-btn', obj).on('click', function () {
        var reverseAccordeonBtn = $(this),
                reverseAccordeonBox = reverseAccordeonBtn.closest('.js-reverse-accordeon-box'),
                reverseAccordeonContnt = $('.js-reverse-accordeon-contnt', reverseAccordeonBox),
                reverseAccordeonBoxSel = reverseAccordeonBox.siblings('.js-reverse-accordeon-box'),
                reverseAccordeonContntSel = $('.js-reverse-accordeon-contnt', reverseAccordeonBoxSel),
                reverseAccordeonBtnSel = $('.js-reverse-accordeon-btn', reverseAccordeonBoxSel),
                reverseAccordeonBtns = $('.js-reverse-accordeon-btn', reverseAccordeonBox);

        if (!reverseAccordeonBox.hasClass('run')) {
            reverseAccordeonBoxSel.addClass('run');
            reverseAccordeonBox.addClass('run');

            reverseAccordeonBtnSel.addClass('open');
            reverseAccordeonBtns.removeClass('open');

            reverseAccordeonContntSel.fadeSlideToggle({
                speed: 333,
                complete: function () {
                    reverseAccordeonBoxSel.removeClass('run').addClass('open');
                    reverseAccordeonContntSel.addClass('open');
                    reverseAccordeonBox.trigger('reverseAccordeonBoxEnd');
                }
            });

            reverseAccordeonContnt.fadeSlideToggle({
                speed: 333,
                complete: function () {
                    reverseAccordeonBox.removeClass('run').removeClass('open');
                    reverseAccordeonContnt.removeClass('open');
                }
            });
        }
    });
}

// Вызов плагина модального окна
function commonPopup(obj) {
    $('.js-common-popup-btn', obj).fancybox({
        'padding': 0,
        'margin': 0,
        'autoScale': false,
        'overlayColor': '#232f3e',
        'overlayOpacity': 0.85,
        'onComplete': function () {
            carouFredSelUpdate($('#fancybox-wrap:visible'));
            slider($('#fancybox-wrap:visible'));
            carousel($('#fancybox-wrap:visible'));
            $('body').addClass('common-popup');
        },
        'onClosed': function () {
            $('body').removeClass('common-popup');
        }
    });

    $('.js-common-popup-close', obj).on('click', function () {
        $.fancybox.close();
    });
}

// Вызов плагина модального окна фото
function mediaPopup(obj) {

    $('.js-media-popup-btn', obj).fancybox({
        'padding': 30,
        'margin': 0,
//	'autoScale': false,
        'overlayColor': '#232f3e',
        'overlayOpacity': 0.85,
        'titlePosition': 'inside',
        'onComplete': function () {
            $('body').addClass('media-popup');
        },
        'onClosed': function () {
            $('body').removeClass('media-popup');
        }
    });

    $('.js-media-popup-open', obj).on("click", function () {
        var rel = $(this).attr("rel");
        $("#" + rel).triggerHandler("click");
    });
}

// Вызов плагина модального окна видео
function youtubeVideo(obj) {
    $('.js-video-popup-btn', obj).fancybox({
        'overlayColor': '#232f3e',
        'overlayOpacity': 0.85,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'title': this.title,
        'width': 680,
        'height': 495,
        'padding': 30,
        'type': 'iframe',
        'onComplete': function () {
            $('body').addClass('media-popup-video');
        },
        'onClosed': function () {
            $('body').removeClass('media-popup-video');
        }
    });
}

// Анимация якоря
function anchorAnimate(obj) {
    $('.js-anchor', obj).on('click', function (e) {
        e.preventDefault();
        var anchor = $(this),
                hrefAnchor = anchor.attr('href').replace('#', ''),
                hrefTargetTop = $('[id = "' + hrefAnchor + '"]').offset().top;

        $("html, body").animate({'scrollTop': hrefTargetTop}, 300);
    });
}

// Инициализация стилизованных селектов
function selectStlInit(obj) {
    $("select", obj).not('.is-stl, .dis-stl').selectpicker({
        'mobile': touchSupport ? true : undefined
    }).addClass('is-stl');
    $(".bootstrap-select", obj).addClass('is-stl').on('shown.bs.dropdown', function () {
        var stlSelect = $(this),
                stlSelectBox = $('> .dropdown-menu', stlSelect);

        stlSelectBox.css({'margin-left': 0});

        var wrpArea = $('.container, .container-fluid, header .wrapper'),
                stlSelectBoxOfs = stlSelectBox.offset(),
                stlSelectBoxOfsLft = stlSelectBoxOfs.left,
                stlSelectBoxWidth = stlSelectBox.outerWidth(),
                stlSelectBoxOfsRight = stlSelectBoxOfsLft + stlSelectBoxWidth,
                wrpAreaOfs = wrpArea.offset(),
                wrpAreaOfsLft = wrpAreaOfs.left,
                wrpAreaWidth = wrpArea.outerWidth(),
                wrpAreaPadRight = parseInt(wrpArea.css('padding-right')),
                wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth - wrpAreaPadRight;

        if (stlSelectBoxOfsRight > wrpAreaOfsRight) {
            stlSelectBox.css({
                'margin-left': (wrpAreaOfsRight - stlSelectBoxOfsRight)
            });
        }
    });
}

// Имитация селекта
function pseudoSelect(obj) {
    $('.js-pseudo-select', obj).each(function () {
        var pseudoSelectItemValue, pseudoSelect = $(this),
                pseudoSelectItemSelectedValue = pseudoSelect.find('.js-pseudo-select-item.selected .js-pseudo-select-item-txt');

        if (pseudoSelectItemSelectedValue.length)
            pseudoSelectItemValue = pseudoSelectItemSelectedValue.html();
        else
            pseudoSelectItemValue = pseudoSelect.find('.js-pseudo-select-item:first .js-pseudo-select-item-txt').addClass('selected').html();

        pseudoSelect.find('.js-pseudo-select-value').html(pseudoSelectItemValue);
    });

    $('.js-pseudo-select-link', obj).on('click', function () {
        var pseudoSelectLink = $(this),
                pseudoSelect = pseudoSelectLink.closest('.js-pseudo-select'),
                pseudoSelectDrop = pseudoSelect.find('.js-pseudo-select-drop'),
                wrpArea = $('.container, .container-fluid, header .wrapper');

        pseudoSelectLink.toggleClass('hover');
        pseudoSelect.toggleClass('open');
        $('.js-pseudo-select-link').not(pseudoSelectLink).removeClass('hover');
        $('.js-pseudo-select').not(pseudoSelect).removeClass('open');

        pseudoSelectDrop.attr('style', '');

        var pseudoSelectOfs = pseudoSelect.offset(),
                pseudoSelectOfsLft = pseudoSelectOfs.left,
                pseudoSelectDropWidth = pseudoSelectDrop.outerWidth(),
                wrpAreaOfs = wrpArea.offset(),
                wrpAreaOfsLft = wrpAreaOfs.left,
                wrpAreaWidth = wrpArea.outerWidth(),
                wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth;

        if ((pseudoSelectOfsLft + pseudoSelectDropWidth) > wrpAreaOfsRight) {
            pseudoSelectDrop.css({
                'left': (wrpAreaOfsRight - (pseudoSelectOfsLft + pseudoSelectDropWidth))
            });
        }
    });

    $('.js-pseudo-select-item', obj).on('click', function () {
        var pseudoSelectItem = $(this),
                pseudoSelectItemSelected = pseudoSelectItem.find('.js-pseudo-select-item-txt').html();

        pseudoSelectItem.addClass('selected').siblings().removeClass('selected');
        pseudoSelectItem.closest('.js-pseudo-select').removeClass('open').find('.js-pseudo-select-value').html(pseudoSelectItemSelected);
        pseudoSelectItem.closest('.js-pseudo-select').find('.js-pseudo-select-link').removeClass('hover');
    });

    $(document).on('click', function (e) {
        if ((!$(e.target).closest('.js-pseudo-select.open').length)) {
            $('.js-pseudo-select').removeClass('open');
            $('.js-pseudo-select-link').removeClass('hover');
        }
    });
}

// Инициализация рейтинговых селектов
function selectBarratingInit(obj) {
    $('.js-barrating', obj).barrating('show', {
        showSelectedRating: true
    });
}

//+/- 1 для инпута
function addOneBox(obj) {
    $('.js-btn-add-one-box', obj).off('click.addOneBox');
    $('.js-add-one-box-input', obj).off('keyup.addOneBox change.addOneBox');

    $('.js-btn-add-one-box', obj).on('click.addOneBox', function () {
        var addOneBoxBtn = $(this),
                addOneBox = addOneBoxBtn.closest('.js-add-one-box'),
                addOneBoxInput = $('.js-add-one-box-input', addOneBox),
                addOneBoxInputVal = parseInt(addOneBoxInput.val()),
                addOneBoxInputMinVal = parseInt(addOneBoxInput.data('min-val')),
                addOneBoxInputMaxVal = parseInt(addOneBoxInput.data('max-val'));

        if (addOneBoxBtn.hasClass('js-btn-add-one-box-pl') && (addOneBoxInputVal < addOneBoxInputMaxVal)) {
            addOneBoxInput.val(addOneBoxInputVal + 1);
        }
        else if (addOneBoxBtn.hasClass('js-btn-add-one-box-mn') && (addOneBoxInputVal > addOneBoxInputMinVal)) {
            addOneBoxInput.val(addOneBoxInputVal - 1);
        }
    });

    $('.js-add-one-box-input', obj).forceNumericOnly().on('keyup.addOneBox change.addOneBox', function () {
        var addOneBoxInput = $(this),
                addOneBoxInputVal = parseInt(addOneBoxInput.val()),
                addOneBoxInputMinVal = parseInt(addOneBoxInput.data('min-val')),
                addOneBoxInputMaxVal = parseInt(addOneBoxInput.data('max-val'));

        if (addOneBoxInputVal > addOneBoxInputMaxVal)
            addOneBoxInput.val(addOneBoxInputMaxVal);
        else if (addOneBoxInputVal < addOneBoxInputMinVal)
            addOneBoxInput.val(addOneBoxInputMinVal);
        else if (addOneBoxInputVal === '' || !addOneBoxInputVal)
            addOneBoxInput.val(addOneBoxInputMinVal);
    });

    $('.js-add-one-box-input', obj).trigger('change');
}

// Работа с одиночным выбором даты
function datepickerSimple(obj) {
    $('.js-datepicker-simple', obj).datepicker({
        dateFormat: "dd.mm.yy",
        numberOfMonths: 1,
        dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        dayNamesShort: ["пнд", "втн", "срд", "чтв", "птн", "суб", "вск"],
        dayNamesMin: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    });
}

// Комлексная рефлексия
function complexReflex(obj) {
    if (!touchSupport) {
        $('.js-complex-reflex', obj).on({
            mouseenter: function () {
                var complexReflex = $(this);
                complexReflex.closest(".js-complex-reflex-area").find(".js-complex-reflex[href='" + complexReflex.attr("href") + "']").addClass("hover");
            },
            mouseleave: function () {
                var complexReflex = $(this);
                complexReflex.closest(".js-complex-reflex-area").find(".js-complex-reflex[href='" + complexReflex.attr("href") + "']").removeClass("hover");
            }
        });
    }
}

// Placeholder polyfill
function placeholder(obj) {
    $('input, textarea', obj).placeholder();
}

// Переключение табов по hash
function tabsSwitchHash(obj) {
    var tabHash = window.location.hash.replace(/#(.+)/, '$1');

    if (tabHash)
        $('.js-tabs-link[data-target-tab =' + tabHash + ']', obj).trigger('click');
}

// Переключение табов
function tabsSwitch(obj) {
    $('.js-tabs-link', obj).on('click', function (e) {
        var tabBtn = $(this),
                tabBtnOffsTop = tabBtn.offset().top,
                tabsLinkArea = tabBtn.closest('.js-tabs-link-area'),
                tabBtnIndx = tabBtn.index(),
                targetTab = tabBtn.data('target-tab'),
                scrollTime = 300;

        if (tabBtn.parent('li').length)
            tabBtn.parent('li').addClass('active').siblings().removeClass('active');
        else
            tabBtn.addClass('active').siblings().removeClass('active');

//	$('.js-tab[data-tab =' + targetTab + ']').show().addClass('active').siblings().removeClass('active').hide();
        $('.js-tab[data-tab =' + targetTab + ']').addClass('active').siblings().removeClass('active');

        carouFredSelUpdate($('.js-tab[data-tab =' + targetTab + ']'));
        slider($('.js-tab[data-tab =' + targetTab + ']'));
        carousel($('.js-tab[data-tab =' + targetTab + ']'));

        window.location.hash = targetTab;

//	$('body, html').animate({'scrollTop': tabBtnOffsTop}, scrollTime);

        tabsLinkArea.trigger('switch');

        $('.js-carousel-responsive').slick('setPosition');
    });

    tabsSwitchHash(obj);

    $(window).on('hashchange', function () {
        tabsSwitchHash(obj);
    });
}

//Добавление классов активности
function addCurrentClass() {
    $(this).addClass('hover active selected open');
}

//Удаление классов активности
function removeCurrentClass() {
    $(this).removeClass('hover active selected open');
}

//Появление выпадающего окна
function dropGroupBefore() {
    var tooltipBtn = $(this),
            tooltipElement = $(tooltipBtn.tooltipster('elementTooltip')),
            tooltipArrow = $('.tooltipster-arrow', tooltipElement),
            tooltipArrowSpan = $('span', tooltipArrow),
            wrpArea = $('.container, .container-fluid, header .wrapper'),
            tooltipElementOfs = tooltipElement.offset(),
            tooltipElementOfsLft = tooltipElementOfs.left,
            tooltipElementWidth = tooltipElement.outerWidth(),
            wrpAreaOfs = wrpArea.offset(),
            wrpAreaOfsLft = wrpAreaOfs.left,
            wrpAreaWidth = wrpArea.outerWidth(),
            wrpAreaPadRight = parseInt(wrpArea.css('padding-right')),
            wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth - wrpAreaPadRight;

    $('.js-pseudo-select').removeClass('open');
    $('.js-pseudo-select-link').removeClass('hover');
    $('.bootstrap-select').removeClass('open');
    $('.js-drop-group').removeClass('open');
    $('.js-drop-btn').removeClass('hover');

    clearTimeout($('.js-drop-btn').data('timeout'));
    clearTimeout($('.js-drop-btn').data('timeout2'));

    carouFredSelUpdate(tooltipElement);
    slider(tooltipElement);
    carousel(tooltipElement);

    if ((tooltipElementOfsLft + tooltipElementWidth) > wrpAreaOfsRight) {
        tooltipElement.css({
            'margin-left': (wrpAreaOfsRight - (tooltipElementOfsLft + tooltipElementWidth))
        });
    }

    tooltipBtn.addClass('hover active selected open').tooltipster('reposition');

    if (tooltipArrowSpan.length) {
        var tooltipArrow = $('.tooltipster-arrow', tooltipElement),
                tooltipArrowSpan = $('span', tooltipArrow);

        tooltipArrow.css({'left': ''});
        tooltipArrowSpan.css({'margin-left': ''});

        var tooltipBtnOfs = tooltipBtn.offset(),
                tooltipBtnOfsLft = tooltipBtnOfs.left,
                tooltipBtnWidth = tooltipBtn.outerWidth(),
                tooltipArrowSpanOfs = tooltipArrowSpan.offset(),
                tooltipArrowSpanOfsLft = tooltipArrowSpanOfs.left,
                tooltipArrowSpanWidth = tooltipArrowSpan.outerWidth();

        tooltipArrowSpan.css({
            'left': (tooltipBtnOfsLft - tooltipArrowSpanOfsLft) + (tooltipBtnWidth - tooltipArrowSpanWidth) / 2
        });
    }
}

//Исчезание выпадающего окна
function dropGroupAfter() {
    var tooltipBtn = $(this);

    tooltipBtn.removeClass('hover active selected open');
}

// Многофунциональный тултип
function simpleTooltip(obj) {
    var simpleTooltip = '.js-simple-tooltip',
            simpleTooltipClose = '.js-simple-tooltip-close',
            simpleTooltipOpen = '.js-simple-tooltip-open';

    $(simpleTooltip, obj).each(function () {
        var simpleTooltip = $(this),
                simpleTooltipAnimation = simpleTooltip.data('animation'),
                simpleTooltipArrow = simpleTooltip.data('arrow'),
                simpleTooltipAutoClose = simpleTooltip.data('auto-close'),
                simpleTooltipContent = (simpleTooltip.data('content') !== '') ? (simpleTooltip.data('content')) : undefined,
                simpleTooltipContentQuery = $(simpleTooltip.data('content-query')).length ? $(simpleTooltip.data('content-query')) : undefined,
                simpleTooltipHTML = simpleTooltip.data('html'),
                simpleTooltipCloning = simpleTooltip.data('cloning'),
                simpleTooltipDelay = $.isNumeric(parseInt(simpleTooltip.data('delay'))) ? parseInt(simpleTooltip.data('delay')) : undefined,
                simpleTooltipMinWidth = $.isNumeric(parseInt(simpleTooltip.data('min-width'))) ? parseInt(simpleTooltip.data('min-width')) : undefined,
                simpleTooltipMaxWidth = $.isNumeric(parseInt(simpleTooltip.data('max-width'))) ? parseInt(simpleTooltip.data('max-width')) : undefined,
                simpleTooltipFuncInit = typeof (window[simpleTooltip.data('func-init')]) === "function" ? window[simpleTooltip.data('func-init')] : undefined,
                simpleTooltipFuncBefore = typeof (window[simpleTooltip.data('func-before')]) === "function" ? window[simpleTooltip.data('func-before')] : undefined,
                simpleTooltipFuncReady = typeof (window[simpleTooltip.data('func-ready')]) === "function" ? window[simpleTooltip.data('func-ready')] : undefined,
                simpleTooltipFuncAfter = typeof (window[simpleTooltip.data('func-after')]) === "function" ? window[simpleTooltip.data('func-after')] : undefined,
                simpleTooltipInteractive = simpleTooltip.data('interactive'),
                simpleTooltipTolerance = $.isNumeric(parseInt(simpleTooltip.data('tolerance'))) ? parseInt(simpleTooltip.data('tolerance')) : undefined,
                simpleTooltipMultiple = simpleTooltip.data('multiple'),
                simpleTooltipOffsetX = $.isNumeric(parseInt(simpleTooltip.data('offset-x'))) ? parseInt(simpleTooltip.data('offset-x')) : undefined,
                simpleTooltipOffsetY = $.isNumeric(parseInt(simpleTooltip.data('offset-y'))) ? parseInt(simpleTooltip.data('offset-y')) : undefined,
                simpleTooltipOne = simpleTooltip.data('one'),
                simpleTooltipPosition = simpleTooltip.data('position'),
                simpleTooltipTracker = simpleTooltip.data('tracker'),
                simpleTooltipSpeed = $.isNumeric(parseInt(simpleTooltip.data('speed'))) ? parseInt(simpleTooltip.data('speed')) : undefined,
                simpleTooltipTimer = $.isNumeric(parseInt(simpleTooltip.data('timer'))) ? parseInt(simpleTooltip.data('timer')) : undefined,
                simpleTooltipTheme = simpleTooltip.data('theme'),
                simpleTooltipTrigger = simpleTooltip.data('trigger'),
                simpleTooltipUpdateAnimation = simpleTooltip.data('update-animation');

        simpleTooltip.not('.disabled').tooltipster({
            'animation': simpleTooltipAnimation,
            'arrow': simpleTooltipArrow,
            'autoClose': simpleTooltipAutoClose,
            'content': simpleTooltipContent || simpleTooltipContentQuery,
            'contentAsHTML': simpleTooltipHTML,
            'contentCloning': simpleTooltipCloning,
            'delay': simpleTooltipDelay,
            'minWidth': simpleTooltipMinWidth,
            'maxWidth': simpleTooltipMaxWidth,
            'functionInit': simpleTooltipFuncInit,
            'functionBefore': simpleTooltipFuncBefore,
            'functionReady': simpleTooltipFuncReady,
            'functionAfter': simpleTooltipFuncAfter,
            'interactive': simpleTooltipInteractive,
            'interactiveTolerance': simpleTooltipTolerance,
            'multiple': simpleTooltipMultiple,
            'offsetX': simpleTooltipOffsetX,
            'offsetY': simpleTooltipOffsetY,
            'onlyOne': false,
            'position': simpleTooltipPosition,
            'positionTracker': simpleTooltipTracker,
            'speed': simpleTooltipSpeed,
            'timer': simpleTooltipTimer,
            'theme': simpleTooltipTheme,
            'trigger': simpleTooltipTrigger,
            'updateAnimation': simpleTooltipUpdateAnimation
        });
    });

    $(document).on('mouseup', simpleTooltipClose, function () {
        $(simpleTooltip).tooltipster('hide');
    });

    $(document).on('mouseup', simpleTooltipOpen, function () {
        var simpleTooltipOpen = $(this),
                simpleTooltipOpenTarget = $(simpleTooltipOpen.data('tooltip-target'));

        simpleTooltipOpenTarget.tooltipster('show');
    });
}

/*Вычисление макимальной из высот объектов*/
function maxHeightCalc(obj1, obj2) {
    var obj1Height = obj1.outerHeight(),
            obj2Height = obj2.outerHeight();

    return (obj1Height >= obj2Height) ? obj1Height : obj2Height;
}

/*Главное выпадающее меню*/
var navVar = {
    actTimerNav: true,
    timerNav: '',
    slideEffect: true
};

function activateSubmenu1(row) {
    clearTimeout(navVar.timerNav);
    function innerFunction() {
        var $row1 = $(row),
                $submenu1 = $row1.find('.js-nav-dropdown-menu'),
                $menu1 = $row1.closest('.js-nav'),
                $rows1 = $menu1.find('.js-nav-el'),
                $submenus1 = $menu1.find('.js-nav-dropdown-menu'),
                $row2 = $row1.find('.js-nav-inner-el:first-child'),
                $rowlink2 = $row2.find('.js-nav-inner-link'),
                $submenu2 = $row2.find('.js-nav-inner-dropdown-menu'),
                $menu2 = $row2.closest('.js-nav-inner-menu'),
                $rows2 = $menu2.find('.js-nav-inner-el'),
                $rowlinks2 = $menu2.find('.js-nav-inner-link'),
                $submenus2 = $menu2.find('.js-nav-inner-dropdown-menu');

        $('.js-pseudo-select').removeClass('open');
        $('.js-pseudo-select-link').removeClass('hover');
        $('.bootstrap-select').removeClass('open');
        $('.js-drop-group').removeClass('open');
        $('.js-drop-btn').removeClass('hover');

        clearTimeout($('.js-drop-btn').data('timeout'));
        clearTimeout($('.js-drop-btn').data('timeout2'));

        $rows1.not($row1).removeClass('open');
//	$submenus1.not($submenu1).css({'display':'none'});

        $rows2.not($row2).removeClass('open');
        $rowlinks2.not($rowlink2).removeClass('hover');
//	$submenus2.not($submenu2).css({'display':'none'});

//	$menu2.removeAttr('style');
//	$row2.addClass('open');
//	$rowlink2.addClass('hover');
//	$submenu2.css({'display':'block'});

        $row1.addClass('open');
//        if(navVar.slideEffect){
//            $submenu1.slideDown(250);
//            navVar.slideEffect = false;
//        }
//        else
//	    $submenu1.css({'display':'block'});

        carouFredSelUpdate($submenu1);
        slider($submenu1);
        carousel($submenu1);

        $submenu1.css({'margin-left': 0});

        if ($submenu1 && $submenu1.length) {
            var wrpArea = $('.container, .container-fluid, header .wrapper'),
                    submenu1Ofs = $submenu1.offset(),
                    submenu1OfsLft = submenu1Ofs.left,
                    submenu1Width = $submenu1.outerWidth(),
                    submenu1OfsRight = submenu1OfsLft + submenu1Width,
                    wrpAreaOfs = wrpArea.offset(),
                    wrpAreaOfsLft = wrpAreaOfs.left,
                    wrpAreaWidth = wrpArea.outerWidth(),
                    wrpAreaPadRight = parseInt(wrpArea.css('padding-right')),
                    wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth - wrpAreaPadRight;

            if (submenu1OfsRight > wrpAreaOfsRight) {
                $submenu1.css({
                    'margin-left': (wrpAreaOfsRight - submenu1OfsRight)
                });
            }
        }

//	var maxHeightMenu = maxHeightCalc($menu2, $submenu2);
//
//	$menu2.css({'height':maxHeightMenu});

        dropNavStatic();

//	$(window).trigger('resize');
        $('.js-carousel-responsive').slick('setPosition');
    }
    if (!touchSupport) {
        if (navVar.actTimerNav) {
            navVar.timerNav = setTimeout(innerFunction, 300);
            return navVar.actTimerNav = false, navVar.timerNav;
        }
        else {
            innerFunction();
        }
    }
    else {
        innerFunction();
    }
}

function deactivateSubmenu1(row) {
    var $row1 = $(row),
            $submenu1 = $row1.find('.js-nav-dropdown-menu');

    if ($(".js-nav").is('.main-nav-static'))
        return;

    $row1.removeClass('open');

//    if(navVar.slideEffect)
//        $submenu1.slideUp(250);
//    else
//        $submenu1.css({'display':'none'});
}

function exitSubmenu1(menu) {
    navVar.slideEffect = true;
    clearTimeout(navVar.timerNav);
    return true, navVar.actTimerNav = true;
}

function dropNav(obj) {
    $(".js-nav", obj).menuAim({
        activate: activateSubmenu1,
        deactivate: deactivateSubmenu1,
        exitMenu: exitSubmenu1,
        submenuDirection: 'below',
        tolerance: 0.75,
        rowSelector: ".js-nav-el"
    });

    dropNavStatic();
}

function dropNavStatic() {
    if ($(".js-nav").is('.main-nav-static')) {
        if ($('.js-main-nav-static-helper').length === 0)
            $('.header').after('<div class="main-nav-static-helper js-main-nav-static-helper"></div>');

        $('.js-main-nav-static-helper').css({'height': $('.js-nav-dropdown-menu:visible').outerHeight()});
    }
}

/*Главное внутреннее выпадающее меню*/
var navVarInner = {
    actTimerNavInner: true,
    timerNavInner: ''
};

function activateSubmenu2(row) {
    clearTimeout(navVarInner.timerNavInner);
    function innerFunction() {
        var $row2 = $(row),
                $rowlink2 = $row2.find('.js-nav-inner-link'),
                $submenu2 = $row2.find('.js-nav-inner-dropdown-menu'),
                $menu2 = $row2.closest('.js-nav-inner-menu'),
                $rows2 = $menu2.find('.js-nav-inner-el'),
                $rowlinks2 = $menu2.find('.js-nav-inner-link'),
                $submenus2 = $menu2.find('.js-nav-inner-dropdown-menu');

        $rows2.not($row2).removeClass('open');
        $rowlinks2.not($rowlink2).removeClass('hover');
        //    $submenus2.not($submenu2).css({'display':'none'});

        $menu2.removeAttr('style');
        $row2.addClass('open');
        $rowlink2.addClass('hover');
        //    $submenu2.css({'display':'block'});

        //    var maxHeightMenu = maxHeightCalc($menu2, $submenu2);
        //
        //    $menu2.css({'height':maxHeightMenu});

        //    $(window).trigger('resize');
        $('.js-carousel-responsive').slick('setPosition');
    }
    if (!touchSupport) {
        if (navVarInner.actTimerNavInner) {
            navVarInner.timerNavInner = setTimeout(innerFunction, 300);
            return navVarInner.actTimerNavInner = false, navVarInner.timerNavInner;
        }
        else {
            innerFunction();
        }
    }
    else {
        innerFunction();
    }
}

function deactivateSubmenu2(row) {
    var $row2 = $(row),
            $rowlink2 = $row2.find('.js-nav-inner-link'),
            $submenu2 = $row2.find('.js-nav-inner-dropdown-menu');

    $row2.removeClass('open');
    $rowlink2.removeClass('hover');
//    $submenu2.css({'display':'none'});
}

function exitSubmenu2(menu) {
    clearTimeout(navVarInner.timerNavInner);
    return true, navVarInner.actTimerNavInner = true;
}

function dropInnerNav(obj) {
    $(".js-nav-inner-menu", obj).menuAim({
        activate: activateSubmenu2,
        deactivate: deactivateSubmenu2,
        exitMenu: exitSubmenu2,
        submenuDirection: 'right',
        tolerance: 0.75,
        rowSelector: ".js-nav-inner-el"
    });
}

/*Выпадение блоков топ-меню шапки при клике на кнопку*/
function dropBlock(obj) {
    $('.js-drop-btn', obj).on('click mouseenter', function (e) {
        function innerFunction() {
            if (e.type === 'click' && dropGroup.hasClass('open') && dropBtnDataClickClose && !dropBtnDataHover && dropBtnDataHover !== true) {
                dropGroup.removeClass('open');
                dropBtn.removeClass('hover');
                dropOverlay.removeClass('open');
                return;
            }

            $('.js-pseudo-select').removeClass('open');
            $('.js-pseudo-select-link').removeClass('hover');
            $('.bootstrap-select').removeClass('open');
            $('.js-drop-group').not(dropGroup).removeClass('open');
            $('.js-drop-btn').not(dropBtn).removeClass('hover');

            dropGroup.addClass('open');
            dropBtn.addClass('hover');

            if (dropBtnDataOverlay) {
                dropOverlay.addClass('open');
            }

            dropBox.css({'margin-left': 0});

            var wrpArea = $('.container, .container-fluid, header .wrapper'),
                    dropBoxOfs = dropBox.offset(),
                    dropBoxOfsLft = dropBoxOfs.left,
                    dropBoxWidth = dropBox.outerWidth(),
                    dropBoxOfsRight = dropBoxOfsLft + dropBoxWidth,
                    wrpAreaOfs = wrpArea.offset(),
                    wrpAreaOfsLft = wrpAreaOfs.left,
                    wrpAreaWidth = wrpArea.outerWidth(),
                    wrpAreaPadRight = parseInt(wrpArea.css('padding-right')),
                    wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth - wrpAreaPadRight;

            if (dropBoxOfsRight > wrpAreaOfsRight) {
                dropBox.css({
                    'margin-left': (wrpAreaOfsRight - dropBoxOfsRight)
                });
            }

//	    $(window).trigger('resize');
            $('.js-carousel-responsive').slick('setPosition');
        }

        var wrpArea,
                dropBtn = $(this),
                dropBtnDataHover = dropBtn.data('hover'),
                dropBtnDataClickClose = dropBtn.data('click-close'),
                dropBtnDataOverlay = dropBtn.data('overlay'),
                dropBtnDataTimeout = dropBtn.data('timeout'),
                dropBtnDataTimeout2 = dropBtn.data('timeout2'),
                dropGroup = dropBtn.closest('.js-drop-group'),
                dropBox = $('.js-drop-box', dropGroup),
                dropOverlay = $('.js-drop-overlay');

        clearTimeout(dropBtnDataTimeout);
        clearTimeout(dropBtnDataTimeout2);

        if (e.type === 'mouseenter' && !dropBtnDataHover && dropBtnDataHover !== true)
            return;

        if (e.type === 'mouseenter' && dropBtnDataHover && dropBtnDataHover === true)
            dropBtn.data('timeout2', setTimeout(innerFunction, 300));
        else
            innerFunction();
    });

    $('.js-drop-btn', obj).on('mouseleave', function (e) {
        var wrpArea,
                dropBtn = $(this),
                dropBtnDataHover = dropBtn.data('hover'),
                dropBtnDataTimeout = dropBtn.data('timeout'),
                dropBtnDataTimeout2 = dropBtn.data('timeout2'),
                dropGroup = dropBtn.closest('.js-drop-group'),
                dropBox = $('.js-drop-box', dropGroup);

        clearTimeout(dropBtnDataTimeout);
        clearTimeout(dropBtnDataTimeout2);

        if (!dropBtnDataHover && dropBtnDataHover !== true)
            return;

        dropBtn.data('timeout', setTimeout(function () {
            dropGroup.removeClass('open');
            dropBtn.removeClass('hover');
        }, 500));
    });

    $('.js-drop-box', obj).on('mouseenter', function (e) {
        var dropBox = $(this),
                dropGroup = dropBox.closest('.js-drop-group'),
                dropBtn = $('.js-drop-btn', dropGroup),
                dropBtnDataHover = dropBtn.data('hover'),
                dropBtnDataTimeout = dropBtn.data('timeout'),
                dropBtnDataTimeout2 = dropBtn.data('timeout2');

        clearTimeout(dropBtnDataTimeout);
        clearTimeout(dropBtnDataTimeout2);
    });

    $('.js-drop-box', obj).on('mouseleave', function (e) {
        var dropBox = $(this),
                dropGroup = dropBox.closest('.js-drop-group'),
                dropBtn = $('.js-drop-btn', dropGroup),
                dropBtnDataHover = dropBtn.data('hover'),
                dropBtnDataTimeout = dropBtn.data('timeout'),
                dropBtnDataTimeout2 = dropBtn.data('timeout2');

        clearTimeout(dropBtnDataTimeout);
        clearTimeout(dropBtnDataTimeout2);

        if (!dropBtnDataHover && dropBtnDataHover !== true)
            return;

        dropBtn.data('timeout', setTimeout(function () {
            dropGroup.removeClass('open');
            dropBtn.removeClass('hover');
        }, 500));
    });

    $('.js-drop-close', obj).on('click', function () {
        var dropClose = $(this),
                dropGroup = dropClose.closest('.js-drop-group'),
                dropBox = $('.js-drop-box', dropGroup),
                dropBtn = $('.js-drop-btn', dropGroup),
                dropOverlay = $('.js-drop-overlay')
        dropBtnDataTimeout = dropBtn.data('timeout'),
                dropBtnDataTimeout2 = dropBtn.data('timeout2');

        clearTimeout(dropBtnDataTimeout);
        clearTimeout(dropBtnDataTimeout2);
        dropGroup.removeClass('open');
        dropBtn.removeClass('hover');
        dropOverlay.removeClass('open');
    });

    $('.js-drop-overlay', obj).on('click', function () {
        $('.js-drop-group').removeClass('open');
        $('.js-drop-btn').removeClass('hover');
        $('.js-drop-overlay').removeClass('open');
    });

    /*Закрытие блоков топ-меню шапки при клике вне его области*/
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.js-drop-group.open').length) {
            $('.js-drop-group').removeClass('open');
            $('.js-drop-btn').removeClass('hover');
            $('.js-drop-overlay').removeClass('open');
            clearTimeout($('.js-drop-btn').data('timeout'));
            clearTimeout($('.js-drop-btn').data('timeout2'));
        }
    });
}

/*Выпадение блоков топ-меню шапки при клике на кнопку*/
function mobileDropBlock(obj) {
    $('.js-mobile-drop-btn', obj).on('click', function (e) {
        var wrpArea,
                dropBtn = $(this),
                dropBtnDataClickClose = dropBtn.data('click-close'),
                dropBtnDataOverlay = dropBtn.data('overlay'),
                dropGroup = dropBtn.closest('.js-mobile-drop-group'),
                dropBox = $('.js-mobile-drop-box', dropGroup),
                dropOverlay = $('.js-mobile-drop-overlay');

        if (dropGroup.hasClass('open') && dropBtnDataClickClose) {
            dropGroup.removeClass('open');
            dropBtn.removeClass('hover');
            dropOverlay.removeClass('open');
            return;
        }

        $('.js-pseudo-select').removeClass('open');
        $('.js-pseudo-select-link').removeClass('hover');
        $('.bootstrap-select').removeClass('open');
        $('.js-mobile-drop-group').not(dropGroup).removeClass('open');
        $('.js-mobile-drop-btn').not(dropBtn).removeClass('hover');

        dropGroup.addClass('open');
        dropBtn.addClass('hover');

        if (dropBtnDataOverlay) {
            dropOverlay.addClass('open');
        }

        dropBox.css({'margin-left': 0});

        var wrpArea = $('.container, .container-fluid, header .wrapper'),
                dropBoxOfs = dropBox.offset(),
                dropBoxOfsLft = dropBoxOfs.left,
                dropBoxWidth = dropBox.outerWidth(),
                dropBoxOfsRight = dropBoxOfsLft + dropBoxWidth,
                wrpAreaOfs = wrpArea.offset(),
                wrpAreaOfsLft = wrpAreaOfs.left,
                wrpAreaWidth = wrpArea.outerWidth(),
                wrpAreaPadRight = parseInt(wrpArea.css('padding-right')),
                wrpAreaOfsRight = wrpAreaOfsLft + wrpAreaWidth - wrpAreaPadRight;

        if (dropBoxOfsRight > wrpAreaOfsRight) {
            dropBox.css({
                'margin-left': (wrpAreaOfsRight - dropBoxOfsRight)
            });
        }

//	    $(window).trigger('resize');
        $('.js-carousel-responsive').slick('setPosition');
    });

    $('.js-mobile-drop-close', obj).on('click', function () {
        var dropClose = $(this),
                dropGroup = dropClose.closest('.js-mobile-drop-group'),
                dropBox = $('.js-mobile-drop-box', dropGroup),
                dropBtn = $('.js-mobile-drop-btn', dropGroup),
                dropOverlay = $('.js-mobile-drop-overlay');

        dropGroup.removeClass('open');
        dropBtn.removeClass('hover');
        dropOverlay.removeClass('open');
    });

//    $('.js-mobile-drop-overlay', obj).on('click', function() {
//	$('.js-mobile-drop-group').removeClass('open');
//	$('.js-mobile-drop-btn').removeClass('hover');
//	$('.js-mobile-drop-overlay').removeClass('open');
//    });

    /*Закрытие блоков топ-меню шапки при клике вне его области*/
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.js-mobile-drop-group.open').length) {
            $('.js-mobile-drop-group').removeClass('open');
            $('.js-mobile-drop-btn').removeClass('hover');
            $('.js-mobile-drop-overlay').removeClass('open');
        }
    });
}

/*Закрытие инфосообщения с последующим удалением*/
function dropInfoBlock(obj) {
    $('.js-info-drop-close', obj).on('click', function () {
        var infoDropClose = $(this),
                infoDropBox = infoDropClose.closest('.js-info-drop-box'),
                infoDropAnimateTime = 250;

        if (infoDropBox.hasClass('animated'))
            return;

        infoDropBox.addClass('animated').fadeSlideToggle({
            speed: infoDropAnimateTime,
            complete: function () {
                infoDropBox.remove();
                $(window).trigger('resize.pannel');
            }
        });
    });
}

// Фильтрация списка
function filterAreaActions(obj) {
    $('.js-filter-input', obj).on({
        change: function () {
            var filterInput = $(this),
                    filterArea = filterInput.closest('.js-filter-area'),
                    filterList = $('.js-filter-list', filterArea),
                    filterItems = $('.js-filter-item', filterList),
                    filterInputVal = filterInput.val();

            if (filterInputVal) {
                var filterItemsMatches = $('.js-filter-item:Contains(' + filterInputVal + ')', filterList);

                filterItems.not(filterItemsMatches).hide();
                filterItems.filter(filterItemsMatches).show();
            }
            else {
                filterItems.show();
            }
            return false;
        },
        keyup: function () {
            var filterInput = $(this);

            filterInput.change();
        }
    });
}

//Открытие/скрытие контента
function jTruncate(obj) {
    var truncateBlock = '.js-truncate-block';

    $(truncateBlock, obj).each(function () {
        var truncateBlock = $(this),
                truncateLength = $.isNumeric(parseInt(truncateBlock.data('length'))) ? parseInt(truncateBlock.data('length')) : 300,
                truncateTrail = $.isNumeric(parseInt(truncateBlock.data('trail'))) ? parseInt(truncateBlock.data('trail')) : 0,
                truncateText = truncateBlock.data('text'),
                truncateMoreAni = $.isNumeric(parseInt(truncateBlock.data('more-ani'))) ? parseInt(truncateBlock.data('more-ani')) : 500,
                truncateLessAni = $.isNumeric(parseInt(truncateBlock.data('les-ani'))) ? parseInt(truncateBlock.data('les-ani')) : 500;

        truncateBlock.jTruncate({
            length: truncateLength,
            minTrail: truncateTrail,
            ellipsisText: truncateText,
            moreAni: truncateMoreAni,
            lessAni: truncateLessAni
        });
    });
}

// Маска для инпутов
function maskInput(obj) {
    $('.js-mask-input', obj).not('.is-stl').each(function () {
        var maskInput = $(this);

        if($('html').hasClass('bx-touch')) {
            maskInput.attr('placeholder', '+');
            maskInput.mask('\+999999999999');
            /*maskInput.attr('placeholder', '+375_________')
            maskInput.on('keypress keyup change', function(e) {
                var chr = String.fromCharCode(e.which);

                this.value = this.value.replace(/[^0-9\+]/gi, '');
                this.value = this.value.replace(/[\s-]+/g, '');
                
                if($(this).val().length > 12 && e.which !== 8 && e.which !== 46) {
                    return false;
                }
            });*/
        }
        else {
           maskInput.inputmask().addClass('is-stl');
        }
    });
}

// Кнопка вверх
function btnUp(obj) {
    var btnUp = '.js-btn-up',
            animateTime = 300;

    $(btnUp, obj).click(function () {
        $('html, body').animate({'scrollTop': 0}, animateTime);
    });

    $(window).scroll(function () {
        var windowScrollTop = $(window).scrollTop(),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                compareWidth = 0;

        ((windowScrollTop >= windowHeight) && (windowWidth >= compareWidth)) ? $(btnUp).fadeIn(animateTime) : $(btnUp).fadeOut(animateTime);
    });

    $(window).resize(function () {
        $(window).trigger('scroll');
    });

    $(window).trigger('resize');
}

/*Работа с выбором файлов*/
function fileInputActions(obj) {
    $('.js-btn-file-input', obj).on('click', function () {
        $(this).closest('.js-file-input-area').find('.js-file-input').trigger("click");
    });
    $('.js-file-input', obj).on('change', function (e) {
        var fileInput = $(this),
                fileInputNames = [],
                fileInputList = fileInput.closest('.js-file-input-area').find('.js-file-input-list'),
                btnFileInput = fileInput.closest('.js-file-input-area').find('.js-btn-file-input'),
                fileInputText = fileInput.closest('.js-file-input-area').find('.js-file-input-txt'),
                /*supportsMultiple = 'multiple' in document.createElement('input')*/
                supportsMultiple = false;

        if (supportsMultiple) {
            for (var i = 0; i < $(this).get(0).files.length; ++i) {
                fileInputNames.push(' ' + $(this).get(0).files[i].name);
            }
        }
        else {
            fileInputNames.push(e.target.value);
        }

//	fileInput.closest('.js-file-input-area').find('.js-file-input-txt').text(fileInputNames);

        if (!supportsMultiple) {
            fileInputList.empty();
        }

        fileInputList.show();
        btnFileInput.hide();
        fileInputText.hide();

        fileInputNames.forEach(function (element) {
            fileInputList.prepend('<span class="nodecor-link base-link btn-file-delete js-btn-file-delete"><span class="dotted-link">' + element + '</span></span>');

            var btnFileDelete = fileInputList.find('.js-btn-file-delete').first();

            btnFileDelete.on('click', function () {
                fileInput.val("");

                fileInputList.fadeSlideToggle({
                    speed: 1,
                    complete: function () {
                        fileInputList.empty();
                        btnFileDelete.remove();
                        btnFileInput.show();
                        fileInputText.show();
                    }
                });
            });
        });
    });
}


//Зум изображений
function cloudZoom(obj) {
    $('.cloud-zoom, .cloud-zoom-gallery', obj).not('.is-stl').CloudZoom().addClass('is-stl');
}

//Добавление соответствующего класса при наведении на элемент
function hoverEl(obj) {
    $('.js-hover-el', obj).on({
        mouseenter: function () {
            var hoverEl = $(this);

            $('.js-hover-el').not(hoverEl).removeClass('hover');
            hoverEl.addClass('hover');
        },
        mouseleave: function () {
            var hoverEl = $(this);

            hoverEl.removeClass('hover');
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.js-hover-el').length)
            $('.js-hover-el').removeClass('hover');
    });
}

//Смена видимости вводимых символов в полях паролей
function passwordVisibilityCheck(sfasfa) {
    var passwordVisibilityTrigger = sfasfa,
            passwordVisibilityTriggerIsCheck = passwordVisibilityTrigger.prop('checked'),
            passwordVisibilityInputData = passwordVisibilityTrigger.data('password-visibility-input'),
            passwordVisibilityInput = $('.js-password-visibility-input[data-password-visibility-input=' + passwordVisibilityInputData + ']');

    passwordVisibilityInput.each(function () {
        var passwordVisibilityInput = $(this);
        passwordVisibilityTriggerIsCheck ? passwordVisibilityInput.get(0).type = "text" : passwordVisibilityInput.get(0).type = "password";
    });
}
function passwordVisibility(obj) {
    $('.js-password-visibility-trigger', obj).each(function () {
        passwordVisibilityCheck($(this));
    }).on('change', function () {
        passwordVisibilityCheck($(this));
    });
}

/*Адаптивное меню*/
function secondaryNav(obj) {
    var secondaryNavMenu = $('.js-secondary-nav-menu', obj),
            secondaryNavBg = $('.js-secondary-nav-bg', obj),
            btnSecondaryNavOpen = $('.js-btn-secondary-nav-open', obj),
            btnSecondaryNavClose = $('.js-btn-secondary-nav-close', obj),
            secondaryNavScroll = '#js-secondary-nav-scroll',
            secondaryNavScrollSelector = $(secondaryNavScroll, obj);

    if (secondaryNavScrollSelector.length) {
        secondaryNavScrollObj = new IScroll(secondaryNavScroll, {
            scrollX: false,
            scrollY: true,
            mouseWheel: true,
            bounce: false,
            mouseWheelSpeed: 1000,
            deceleration: 0.01,
            useTransform: false,
            click: true
        });

        secondaryNavScrollSelector.find('.js-slide-box').on('slideBoxEnd', function () {
            secondaryNavScrollObj.refresh();
        });
    }

    btnSecondaryNavOpen.on('click', function () {
        $('body').addClass('secondary-nav-open');
        secondaryNavScrollObj.refresh();
    });
    btnSecondaryNavClose.on('click', function () {
        $('body').removeClass('secondary-nav-open');
    });
    secondaryNavBg.on('click', function () {
        $('body').removeClass('secondary-nav-open');
    });
}

/*Подсчет высоты второстепенного меню*/
function secondaryNavMenuHeight(obj) {
    function secondaryNavMenuHeightFix(obj) {
        $('.secondary-nav-menu.js-drop-group', obj).each(function () {
            var secondaryNavMenu = $(this),
                    secondaryNavLink = $('.secondary-nav-link', secondaryNavMenu),
                    secondaryNavLinkMaxHeight = 0;

            secondaryNavLink.removeAttr('style');
            secondaryNavMenu.removeAttr('style');

            secondaryNavLink.each(function () {
                var secondaryNavLink = $(this),
                        secondaryNavHeight = secondaryNavLink.outerHeight();

                if (secondaryNavHeight > secondaryNavLinkMaxHeight)
                    secondaryNavLinkMaxHeight = secondaryNavHeight;
            });

            secondaryNavLink.css({'height': secondaryNavLinkMaxHeight, 'padding-top': 0, 'padding-bottom': 0});
            secondaryNavMenu.css({'height': secondaryNavLinkMaxHeight});
        });
    }

    secondaryNavMenuHeightFix(obj);
    $(window).resize(function () {
//	clearTimeout($('.secondary-nav-menu.js-drop-group', obj).data('secondaryNavMenuTimeout'));
//	$('.secondary-nav-menu.js-drop-group', obj).data('secondaryNavMenuTimeout', setTimeout(function () {
        secondaryNavMenuHeightFix(obj);
//	}, 300));
    });
}

//Инициализация плавающей шапки
function headerFly(obj) {
    $(".js-header-fly", obj).floatPannel({'shiftTop': $('.js-header-fly').outerHeight()});
}

//Инициализация плавающего сайдбара
function asideFly(obj) {
    $(".js-aside-fly", obj).floatPannel({'initTop': 30, 'pannelBottomObj': $('.content-main')});
}

//Фиксирование минимальной высоты контентной части под высоту меню
function contentAsideHeight(obj) {
    var contentAsideHeight = $('.js-content-aside-height', obj),
            aside = $('.aside', contentAsideHeight),
            mainNavMenuMobileDropdownMenu = $('.js-mobile-drop-box.main-nav-mobile-dropdown-menu', obj),
            mainNavMenu = $('.main-nav-menu', mainNavMenuMobileDropdownMenu),
            contentAsideDelay = 250;

    function contentAsideHeightInit() {
        if (contentAsideHeight.length > 0 && mainNavMenu.length > 0) {
            if (aside.is(':empty')) {
                aside.addClass('aside-empty');
            }
            else {
                aside.removeClass('aside-empty');
            }

            if ($(window).width() + getScrollBarWidth() > 1023) {
                mainNavMenuMobileDropdownMenu.css({
                    'visibility': 'hidden',
                    'display': 'block'
                }).addClass('show');

                var maxHeightContentAside = maxHeightCalc(contentAsideHeight, mainNavMenu);

                mainNavMenuMobileDropdownMenu.css({
                    'visibility': '',
                    'display': ''
                });

                mainNavMenu.css({
                    'height': maxHeightContentAside
                });

                contentAsideHeight.css({
                    'height': maxHeightContentAside
                });

                $('body').addClass('main-nav-mobile-dropdown-menu-expanded');
            }
            else {
                mainNavMenuMobileDropdownMenu.removeClass('show');

                mainNavMenu.css({
                    'height': ''
                });

                contentAsideHeight.css({
                    'height': ''
                });

                $('body').removeClass('main-nav-mobile-dropdown-menu-expanded');
            }
        }
    }

    contentAsideHeightInit();
    $(window).resize(function () {
        clearTimeout(mainNavMenu.data('contentAsideTimeout'));
        mainNavMenu.data('contentAsideTimeout', setTimeout(contentAsideHeightInit, contentAsideDelay));
    });
}

$(window).load(function () {
    // Обновление размеров каруселей/слайдеров
    carouFredSelUpdate('body');
});

// Инициализация совместного скролла
function initHorizontalScrollWith(obj) {
    $('.js-scroll-with', obj).each(function () {
        var t = $(this);
        var friends = $('.js-scroll-with[data-scroll-with="' + t.attr('data-scroll-with') + '"]', obj);
        var timeout = 0;

        if(touchSupport) {
            t.on('scroll', function () {
                if(t.hasClass('not-scroll-target')) {
                    return;
                }

                friends.addClass('not-scroll-target');
                friends.scrollLeft(t.scrollLeft());
                
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    friends.removeClass('not-scroll-target');
                }, 10);
            });
        }
        else {
            t.on('scroll', function () {
                friends.scrollLeft(t.scrollLeft());
            });
        }
    });

    if(touchSupport) {
        $('.js-scroll-with', obj).on('touchmove', function() {
            $(this).trigger('scroll');
        });

        $('.js-scroll-with', obj).on('touchend', function() {
            setTimeout(function() {
                $(this).trigger('scroll');
            }, 1500);
        }); 
    }
}

// Выравнивание высоты абсолютно позиционированной ячейки и tr
function absoluteCellsEqualizer(obj) {

    function equalize() {
        $('.js-equalize-td-height tr', obj).each(function () {
            var tr = $(this);
            var td = tr.find('td:first-child, th:first-child');

            td.css('height', 'unset');
            tr.css('height', 'unset');

            var trHeight = tr.height();
            var tdHeight = td.outerHeight();

            if (trHeight > tdHeight) {
                td.height(trHeight);
            }
            else if (trHeight < tdHeight) {
                tr.height(tdHeight);
            }
        });
    }

    var equalizeTimeout;

    equalize();

    $(window).resize(function () {
        clearTimeout(equalizeTimeout);
        equalizeTimeout = setTimeout(equalize, 100);
    });
}


// инициализация блока, растягиыающего родителя (min-width)
function initStretchParent(obj) {
    $('.js-stretch-parent-box', obj).each(function() {
        var t = $(this);
        var target = t.closest('.js-stretch-parent-target');
        var dropBox = t.closest('.js-mobile-drop-box');
        var dropboxChanged = false;
        var targetDisplay = target.css('display');

        if(dropBox.length > 0 && dropBox.css('display') === 'none') {
            dropBox.show();
            dropboxChanged = true;
        }

        if(targetDisplay === 'none') {
            target.show().css('min-width', t.outerWidth()).css('display', '');
        }
        else {
            target.css('min-width', t.outerWidth());
        }

        if(dropboxChanged) {
            dropBox.css('display', '');
        }
    });
}

function initFixPosition(obj) {
    $('.js-fix-when-overscroll', obj).each(function () {
        var t = $(this);
        var offset = t.offset().top;
        var win = $(window);
        var winScrollTop;
        var isFixed = false;
        var margins = t.outerHeight(true) - t.outerHeight();

        if (t.hasClass('js-not-fix-768') && win.width() <= 768) {
            return true;
        }

        //t.addClass('fixed');
        //offset += t.outerHeight(true);
        //t.removeClass('fixed');

        win.on('scroll', function (e) {
            winScrollTop = win.scrollTop();
            if (winScrollTop > offset && !isFixed) {
                t.addClass('fixed');
                t.after('<div class="js-overscroll-placeholder" style="height: ' + (t.outerHeight(true) + margins) + 'px;"></div>');
                isFixed = true;
            }
            else if (winScrollTop < offset && isFixed) {
                t.removeClass('fixed');
                isFixed = false;
                t.siblings('.js-overscroll-placeholder').remove();
            }
        });
    });

    $('.js-unfix-when-overscroll', obj).each(function () {
        var t = $(this);
        var target = $(t.attr('data-unfix'));
        var offset = target.offset().top + target.height() - t.height();
        var win = $(window);
        var winScrollTop;
        var isFixed = true;
        var margins = t.outerHeight(true) - t.outerHeight();

        if (t.hasClass('js-not-fix-768') && win.width() <= 768) {
            return true;
        }

        win.on('scroll', function (e) {
            winScrollTop = win.scrollTop();
            if (winScrollTop > offset && isFixed) {
                t.removeClass('fixed');
                t.hide();
                isFixed = false;
                //t.siblings('.js-overscroll-placeholder').remove();
            }
            else if (winScrollTop < offset && !isFixed) {
                t.addClass('fixed');
                t.show();
                //t.after('<div class="js-overscroll-placeholder" style="height: ' + (t.outerHeight(true) + margins) + 'px;"></div>');
                isFixed = true;
            }
        });
    });
}

function  ScrollToTop(event, obj) {
    $("html, body").animate({
        scrollTop: obj.offset().top - 40
    }, 'fast');

}

$(document).ready(function () {

    // Добавление к корневому элементу body класса с названием мобильного браузера
    if (iPad)
        $('body').addClass('ipad');
    if (iOS)
        $('body').addClass('ios');
    if (operaMini)
        $('body').addClass('operamini');
    if (operaMobile)
        $('body').addClass('operamobile');

    // Переключение табов
    tabsSwitch('body');

    // Слайдер
    slider('body');

    // Карусель
    carousel('body');

    // Адаптивная карусель
    carouselResponsive('body');

    // Стилизованный чекбокс
    changeCheckboxAction('body');

    // Стилизованный радиобатон
    changeRadioboxAction('body');

    // Вызов плагина модального окна
    commonPopup('body');

    // Вызов плагина модального окна фото
    mediaPopup('body');

    // Вызов плагина модального окна видео
    youtubeVideo('body');

    // Переключение фото в карусели
    photoSwitch('body');

    // Анимация якоря
    anchorAnimate('body');

    // Toggle - блок
    initToggle('body');

    // Accordeon - блок
    initAccordeon('body');

    // Accordeon - блок реверсивный
    initReverseAccordeon('body');

    // Инициализация стилизованных селектов
    selectStlInit('body');

    // Имитация селекта
    pseudoSelect('body');

    // Инициализация рейтинговых селектов
    selectBarratingInit('body');

    //+/- 1 для инпута
    addOneBox('body');

    // Работа с одиночным выбором даты
    datepickerSimple('body');

    // Комлексная рефлексия
    complexReflex('body');

    // Placeholder polyfill
    placeholder('body');

    // Многофунциональный тултип
    simpleTooltip('body');

    /*Главное выпадающее меню*/
    dropNav('body');

    /*Главное внутреннее выпадающее меню*/
    dropInnerNav('body');

    /*Выпадение блоков топ-меню шапки при клике на кнопку*/
    dropBlock('body');

    /*Выпадение мобильных блоков топ-меню шапки при клике на кнопку*/
    mobileDropBlock('body');

    /*Закрытие инфосообщения с последующим удалением*/
    dropInfoBlock('body');

    // Фильтрация списка
    filterAreaActions('body');

    //Открытие/скрытие контента
    jTruncate('body');

    // Кнопка вверх
    btnUp('body');

    /*Работа с выбором файлов*/
    fileInputActions('body');

    // Разрешение на ввод в инпут только чисел
    forceNumericOnly('body');

    // Разбиение на триады
    setBackspacesSelector('body');


    //Зум изображений
    cloudZoom('body');

    //Добавление соответствующего класса при наведении на элемент
    hoverEl('body');

    //Смена видимости вводимых символов в полях паролей
    passwordVisibility('body');

    /*Адаптивное меню*/
    secondaryNav('body');

    /*Подсчет высоты второстепенного меню*/
    secondaryNavMenuHeight('body');

    //Инициализация плавающей шапки
    headerFly('body');

    //Инициализация плавающего сайдбара
    asideFly('body');

    //Фиксирование минимальной высоты контентной части под высоту меню
    contentAsideHeight('body');

    // Initialise any local time clocks
    initLocalClocks();

    // Start the seconds container moving
    moveSecondHands();

    // Set the intial minute hand container transition, and then each subsequent step
    setUpMinuteHands();

    // инициализация растягивающего родителя блока
    initStretchParent('body');
});