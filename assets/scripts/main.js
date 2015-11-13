$('.spinner').spinner({
    min: 0,
    max: 100
  });
  $('#contactsPhone').inputmask({
    mask: '+37599 999-99-99'
});
//search
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
    $('#js-form-group').css('z-index','203');
  });
  $('#submit__search__close', obj).on('click',function(){
    $('#modal-sidebar-two').css('display', 'none');
    $('body').removeClass('modal-open').css('padding-right', '0');
    $('.modal-backdrop').remove();
    $('#submit__search').css('background', "url('images/form_submit.png') no-repeat center center");
    $(this).css('display', 'none');
  });
//basket
  $('#basket_button').on('click',function(){

  if ($('#basket_calculate').text() === '0'){
    $('#modal-sidebar-zero').modal('show');
    }
  else {  $('#modal-sidebar').modal('show'); }
  $('#js-button').removeClass('glyphicon-chevron-down').addClass('glyphicon-remove');
  $('#basket_icon').css('font-weight', 'bold');
  $('#js-form-group').css('z-index','199');
  });
  /* корзина */
  $('.js-basket_button', obj).on('click',function(){

    if ($('.js-basket_calculate').text() === '0')
        {$('#modal-sidebar-zero').modal('show'); }
    else {  $('#modal-sidebar').modal('show'); }
  $('.js-button').removeClass('glyphicon-chevron-down').addClass('glyphicon-remove');
  $('#js-form-group').css('z-index','199');
  });

// liColl
$('.list_col').liColl({
    c_unit: 'px', // '%' или 'px' При указании '%' — ширина 'c_width' игнорируется
    n_coll: 2,    //колличество колонок
    c_width: 262, //Ширина колонок в 'px'
    p_left: 20   //отступ слева %           
  });

// bxslider
  $('.bxslider').bxSlider({
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 282,
    slideMargin: 10
  });

//определение разрешения
if ($("html").width() < 599) {
    $('#bs-example-navbar-collapse-1').addClass('in');
  }

  else if ($("html").width() = 800) {
    $('#bs-example-navbar-collapse-1').removeClass('in');
  }
  alert($("html").width());

//фильтр
  var newSelection = "";

  $("#content_all a").on('click',function(){

      $(".content__product").fadeTo(200, 0.10);

    $("#content_all a").removeClass("current");
    $(this).addClass("current");

    newSelection = $(this).attr("rel");

    $(".js-product").not("."+newSelection).slideUp();
    $("."+newSelection).slideDown();

      $(".content__product").fadeTo(600, 1);
  });

  //соц. иконки
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