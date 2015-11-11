$('.spinner').spinner({
  min: 0,
  max: 100
});
$('#contactsPhone').inputmask({
  mask: '+37599 999-99-99'
});
/*swipe*/
/*$(function() {
  $(".wrapper").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      $(this).text("You swiped " + direction );  
    }
  });

  //Set some options later
  $("#test").swipe( {fingers:2} );
});*/
/* меню поиск */
$('#submit__search').on('click',function(){
	if ($('#search').val()==='Аккустические системы'){
		$('.not__found').css('display', 'none');
		$('.success').css('display', 'inline-block');
	}
 	else {
 		$('#text__search').html($('#search').val());
 		$('.success').css('display', 'none');
 		$('.not__found').css('display', 'inline-block');

 	}
 	$('#submit__search').css('background', "url('images/form_submit_active.png') no-repeat center center");
 	$('#submit__search__close').css('display', 'inline-block');

});
$('#submit__search__close').on('click',function(){
	$('#modal-sidebar-two').css('display', 'none');
	$('body').removeClass('modal-open').css('padding-right', '0');
	$('.modal-backdrop').remove();
	$('#submit__search').css('background', "url('images/form_submit.png') no-repeat center center");
	$(this).css('display', 'none');
});

/* корзина */
$('#basket_button').on('click',function(){

if ($('#basket_calculate').text() === '0'){
	$('#modal-sidebar-zero').modal('show');
	}
else { 	$('#modal-sidebar').modal('show'); }
});

/*разбиение на столбцы */
$(document).ready(function(){
  $('.list_col').liColl({
    c_unit: 'px', // '%' или 'px' При указании '%' — ширина 'c_width' игнорируется
    n_coll: 2,    //колличество колонок
    c_width: 262, //Ширина колонок в 'px'
    p_left: 20   //отступ слева %           
  });
})
/*слайдер для footer */

$('.bxslider').bxSlider({
  minSlides: 1,
  maxSlides: 4,
  slideWidth: 282,
  slideMargin: 10
});
/*слайдер для footer slick*/
/*
$('.bxslider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
*/
$(function(){
if ($("html").width() < 599) {
  $('#bs-example-navbar-collapse-1').addClass('in');
}

alert($("html").width());
});

/* Filtr dlja content*/
$(function() {

  var newSelection = "";

  $("#content_all a").click(function(){

      $(".content__product").fadeTo(200, 0.10);

    $("#content_all a").removeClass("current");
    $(this).addClass("current");

    newSelection = $(this).attr("rel");

    $(".col-xs-6").not("."+newSelection).slideUp();
    $("."+newSelection).slideDown();

      $(".content__product").fadeTo(600, 1);

  });

});
/* Filtr dlja content*/
$(function() {

  var newSelection = "";

  $("#content_all_ms li a").click(function(){

      $(".content__product").fadeTo(200, 0.10);

    $("#content_all a").removeClass("current");
    $(this).addClass("current");

    newSelection = $(this).attr("rel");

    $(".col-xs-6").not("."+newSelection).slideUp();
    $("."+newSelection).slideDown();

      $(".content__product").fadeTo(600, 1);

  });

});
/*hover dlja social knopok*/
$('.s-vk').hover(
function(){
  $('.s-fb').css('background-position', '96px 32px');
  $('.s-tw').css('background-position', '64px 32px');
  $('.s-yt').css('background-position', '32px 32px');
},
function(){
  $('.s-fb').css('background-position', '96px 0');
  $('.s-tw').css('background-position', '64px 0');
  $('.s-yt').css('background-position', '32px 0');
});

$('.s-fb').hover(
function(){
  $('.s-vk').css('background-position', '0 32px');
  $('.s-tw').css('background-position', '64px 32px');
  $('.s-yt').css('background-position', '32px 32px');
},
function(){
  $('.s-vk').css('background-position', '0 0');
  $('.s-tw').css('background-position', '64px 0');
  $('.s-yt').css('background-position', '32px 0');
});

$('.s-tw').hover(
function(){
  $('.s-fb').css('background-position', '96px 32px');
  $('.s-vk').css('background-position', '0 32px');
  $('.s-yt').css('background-position', '32px 32px');
},
function(){
  $('.s-fb').css('background-position', '96px 0');
  $('.s-vk').css('background-position', '0 0');
  $('.s-yt').css('background-position', '32px 0');
});

$('.s-yt').hover(
function(){
  $('.s-fb').css('background-position', '96px 32px');
  $('.s-tw').css('background-position', '64px 32px');
  $('.s-vk').css('background-position', '0 32px');
},
function(){
  $('.s-fb').css('background-position', '96px 0');
  $('.s-tw').css('background-position', '64px 0');
  $('.s-vk').css('background-position', '0 0');
});
