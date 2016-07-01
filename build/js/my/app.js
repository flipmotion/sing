//use strict mode;
'use strict';
//owl import
import owlCarousel from '../owl.carousel.min.js';
import thumbs from '../owl.carousel2.thumbs.min.js';

$(document).ready(function(){
	let owl = $('[data-item="slider"]');
	let owlPreviewSmall = $('[data-item="item-preview-slider"]');
	let owlPreview = $('[data-item="slider-preview"]');
	let owlMusicPreview = $('[data-item="slider-music"]');
	let owlMusicPreview2 = $('[data-item="slider-music-2"]');
	let owlMusicPreview3 = $('[data-item="slider-music-3"]');
	let owl2 = $('[data-slider="thumbs"]');

	$('[data-item="navigation"] li').on('click', function(e){
		e.preventDefault();
		var myowl = $(this).parents('.item-preview').find(owlPreviewSmall);
		var myin = this.getAttribute('data-index');
		myowl.trigger('to.owl.carousel', myin);
		//to.owl.carousel
	});

	owl.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		items:1,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		navText: [
		"<i class='my-arrow-left'></i>", 
		"<i class='my-arrow-right'></i>"
		],
		dots: true
	});

	owlMusicPreview.owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots:true,
		items:4,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		navText: [
		"<i class='my-icon left-arr-2'></i>", 
		"<i class='my-icon right-arr-2'></i>"
		],
		dots: true
	});

	owlMusicPreview3.owlCarousel({
		loop:true,
		margin:20,
		nav:true,
		dots:true,
		items:9,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		navText: [
		"<i class='my-icon left-arr-2'></i>", 
		"<i class='my-icon right-arr-2'></i>"
		],
		dots: true
	});

	owlMusicPreview2.owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		dots:true,
		items:6,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		navText: [
		"<i class='my-icon left-arr-2'></i>", 
		"<i class='my-icon right-arr-2'></i>"
		],
		dots: true
	});

	owlPreviewSmall.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		items:1,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		navText: [
		"<i class='my-arrow-left'></i>", 
		"<i class='my-arrow-right'></i>"
		],
		dots: true
	});

	$('[data-item="item-preview-navigation-slider-next"]').click(function() {
		owlPreviewSmall.trigger('next.owl.carousel');
	})

	$('[data-item="item-preview-navigation-slider-prev"]').click(function() {
		owlPreviewSmall.trigger('prev.owl.carousel');
	})

	owlPreview.owlCarousel({
		loop: true,
		items: 1,
		navText: [
		"<i class='my-icon left-arr-3'></i>", 
		"<i class='my-icon right-arr-3'></i>"
		],
		nav:true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		thumbs: true,
		thumbImage: true,
		thumbContainerClass: 'owl-thumbs',
		thumbItemClass: 'owl-thumb-item'
	});

	owl2.owlCarousel({
		loop: true,
		items: 1,
		navText: [
		"<i class='my-icon left-arr-3'></i>", 
		"<i class='my-icon right-arr-3'></i>"
		],
		nav:true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		autoplay:true,
		thumbs: true,
		thumbsPrerendered: true
	});

	var headerH = $('.header').height();
	var sliderH = $('.Slider-main').height();

	$("#my-nav").affix({
		offset: { 
			top: headerH + sliderH + 120 
		}
	});

	$("#my-nav").on('affixed.bs.affix', function(){
		console.log("in vieiw");
	});

	//menu
	var btn = $('[data-item="menu"]');
	var closeMenu = $('[data-item="menu-close"]');
	var Menu = document.querySelector('.Menu');

	btn.on('click',function(e){
		$('html').toggleClass('open');
		var offsetHeader = window.innerHeight - Menu.getBoundingClientRect().top;
		console.log(Menu.getBoundingClientRect().top);
		Menu.style.height = offsetHeader + 'px';
	});

	closeMenu.on('click',function(e){
		$('html').removeClass('open');
	});

	/*focus input-group-addon END*/

	/*Login */
	var Login = {
		ValidationOptions: {
			framework: 'bootstrap',
			locale: 'ru_RU',
			err: {
				container: '.error-block'
			},
			fields: {
				userMail: {
					trigger: 'blur keyup focus',

					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('[data-form="Login"]');
		},
		Validation:function(form){
			$(form).formValidation(this.ValidationOptions).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');
				// For demonstrating purpose, the url is generated randomly
				// to get different response each time
				// In fact, it should be /path/to/your/back-end/
				var url = '/include/auth.php';
				$.ajax({
					url: url,
					data: $form.serialize(),
					dataType: 'json',
					method: 'post'
				}).success(function(response) {
				// If there is error returned from server
				if (response.result === 'error') {
					for (var field in response.fields) {
						fv
								// Show the custom message
								.updateMessage(field, 'blank', response.fields[field])
								// Set the field as invalid
								.updateStatus(field, 'INVALID', 'blank');
							}
						} else {
						window.location.replace("http://get-lp.ru/lk/");
					}
				});
			});
		}
	};
	/*Login END*/

	/*Registration*/
	var Registration = {
		ValidationOptions: {
			framework: 'bootstrap',
			locale: 'ru_RU',
			fields: {
				userMail: {
					trigger: 'blur keyup focus',

					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPassword: {
					trigger: 'blur keyup focus',

					validators: {
						stringLength: {
							min: 6,
							message: 'Длина пароля должна быть более 6 символов!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPasswordConfirm: {
					trigger: 'blur keyup focus',

					validators: {
						identical: {
							field: 'userPassword',
							message: 'Ваши пароли не совпадают!'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('[data-form="registration"]');
		},
		Validation:function(form){
			/*$(form).on('init.field.fv', function(e, data) {
			})*/
			$(form).formValidation(this.ValidationOptions).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');
				// For demonstrating purpose, the url is generated randomly
				// to get different response each time
				// In fact, it should be /path/to/your/back-end/
				var url = '/include/register.php';

				$.ajax({
					url: url,
					data: $form.serialize(),
					dataType: 'json',
					method: 'post'
				}).success(function(response) {
				// If there is error returned from server
				if (response.result === 'error') {
					for (var field in response.fields) {
						fv
								// Show the custom message
								.updateMessage(field, 'blank', response.fields[field])
								// Set the field as invalid
								.updateStatus(field, 'INVALID', 'blank');
							}
						} else {
							$('#registration').modal('hide');
							console.log('success');
							$('#thx').modal('show');
						}
					});
			});
		}
	};
	/*Registration END*/

	/*HelpWithPassword */
	var HelpWithPassword = {
		ValidationOptions: {
			framework: 'bootstrap',
			locale: 'ru_RU',
			fields: {
				userMail: {
					trigger: 'blur keyup focus',

					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('[data-form="HelpWithPassword"]');
		},

		Validation:function(form){
			/*$(form).on('init.field.fv', function(e, data) {
			})*/
			$(form).formValidation(this.ValidationOptions).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');
				// For demonstrating purpose, the url is generated randomly
				// to get different response each time
				// In fact, it should be /path/to/your/back-end/
				var url = ['response.json'];
				$.ajax({
					url: url,
					data: $form.serialize(),
					dataType: 'json',
					method: 'post'
				}).success(function(response) {
				// If there is error returned from server
				if (response.result === 'error') {
					for (var field in response.fields) {
						fv
								// Show the custom message
								.updateMessage(field, 'blank', response.fields[field])
								// Set the field as invalid
								.updateStatus(field, 'INVALID', 'blank');
							}
						} else {
						// Do whatever you want here
						// such as showing a modal ...
					}
				});
			});
		}
	};
	/*HelpWithPassword END*/

	/*NewPassword*/
	var NewPassword = {
		ValidationOptions: {
			framework: 'bootstrap',
			locale: 'ru_RU',
			fields: {
				userPassword: {
					trigger: 'blur keyup focus',

					validators: {
						stringLength: {
							min: 6,
							message: 'Длина пароля должна быть более 6 символов!'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым!'
						},
						blank: {}
					}
				},
				userPasswordConfirm: {
					trigger: 'blur keyup focus',

					validators: {
						identical: {
							field: 'userPassword',
							message: 'Ваши пароли не совпадают!'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('[data-form="NewPassword"]');
		},
		Validation:function(form){
			/*$(form).on('init.field.fv', function(e, data) {
			})*/
			$(form).formValidation(this.ValidationOptions).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');
				// For demonstrating purpose, the url is generated randomly
				// to get different response each time
				// In fact, it should be /path/to/your/back-end/
				var url = ['response.json'];
				$.ajax({
					url: url,
					data: $form.serialize(),
					dataType: 'json',
					method: 'post'
				}).success(function(response) {
				// If there is error returned from server
				if (response.result === 'error') {
					for (var field in response.fields) {
						fv
								// Show the custom message
								.updateMessage(field, 'blank', response.fields[field])
								// Set the field as invalid
								.updateStatus(field, 'INVALID', 'blank');
							}
						} else {
						// Do whatever you want here
						// such as showing a modal ...
					}
				});
			});
		}
	};
	/*NewPassword END*/

	/*TogglePassword*/
	var TogglePassword = {

		initialize: function () {
			this.chengeType();
			this.toggleGlass();
		},
		toggleGlass: function(){
			$('.toggle-password').on('click', function(e){
				$(this).toggleClass('on off');
			});
		},

		chengeType: function () {
			$('.toggle-password').on('click', function(e){
				var input = $(this).parent().find('input'),
				checkType = input.attr('type');

				if(checkType === 'password') {
					input.attr('type', 'text');
				}
				else {
					input.attr('type', 'password');
				}

			});
		}
	}
	/*TogglePassword END*/

	/*all forms init*/
	HelpWithPassword.initialize();
	NewPassword.initialize();
	Login.initialize();
	Registration.initialize();
	TogglePassword.initialize();
	/*all forms init END*/
	if ($(".lk-form").length) {
		LKFORM.init();

	}
});
/*START LKFORM*/
var LKFORM = {};
LKFORM.init = function () {
	this.formListner();
}
LKFORM.formListner = function () {
	var formListner = {
		defaults: {
			Input: $(".lk-form input"),
			userID: $('#userID')
		},
		blur: function () {
			var InputName =  false;
			var InputValue = false;
			var Input = formListner.defaults.Input;
			var UserID = this.defaults.userID.val();

			Input.blur(function () {
				InputName = this.name;
				InputValue = this.value;
				formListner.save(InputName,InputValue,UserID);
			}).keypress(function (e) {
				if (e.keyCode == 13) {
					InputName = this.name;
					InputValue = this.value;
					formListner.save(InputName,InputValue,UserID);
				}
			});
		},
		save: function(param,param2,UserID){
			$.ajax({
				type: "POST",
				url: "/include/account.php",
				data:{name:param,value:param2,UserID:UserID},
				success:function(){
					console.log(UserID);
				},
				error:function(data){alert(data)}
			});
		}
	}
	formListner.blur();
}

/*END LKFORM*/
/*player*/
/*var playlist = [
{
	title: 'Трек 0',
	description: 'Попкорн',
	src: ['mp3/track0.mp3', 'mp3/track0.mp3'],
	time: '1:00'
},
{
	title: 'Blondie',
	description: 'Call me',
	src: ['mp3/Blondie_-_Call_me.mp3', 'Blondie_-_Call_me.ogg'],
	time: '3:31'
},
{
	title: 'Трек 1',
	description: 'Описание трека 1',
	src: ['mp3/track1.mp3', 'mp3/track1.mp3'],
	time: '2:00'
},
{
	title: 'Трек 2',
	description: 'Описание трека 2',
	src: ['mp3/track2.mp3', 'mp3/track2.mp3'],
	time: '3:00'
},
{
	title: 'Трек 3',
	description: 'Описание трека 3',
	src: ['mp3/track3.mp3', 'mp3/track3.mp3'],
	time: '4:00'
}
];

var currentTrack = 0;

function setTrack(id, play) {
	if (play == undefined)
		play = true;

	$('.player audio source').remove();
	for (var i = 0; i < playlist[id].src.length; i++) {
		$('.player audio').append('<source src="' + playlist[id].src[i] + '">');
		$('.player .info .title').html(playlist[id].title);
		$('.player .info .description').html(playlist[id].description);
	}

	if (play) {
		$('.player audio').trigger('load').trigger('play');
	} else {
		$('.player audio').trigger('load');
	}
}

function initPlayer() {
	$('.player audio source').remove();
	for (var i = 0; i < playlist.length; i++) {
		$('.player .playlist').append('<div class="track"><div class="title">' + playlist[i].title + '</div><div class="description">' + playlist[i].description + '</div><div class="time">' + playlist[i].time + '</div></div>');
	}

	setTrack(0, false);
}


$(document).ready(function () {
	initPlayer();

    //Смещение прогресс-бара проигрывания песни
    $('.player audio').on('timeupdate', function () {
    	width = this.currentTime / this.duration * 100;
    	$(this).parents('.player').find('.timeline').css('width', width + '%')
    });

    //Добавляем класс при проигрывании
    $('.player audio').on('play', function () {
    	$('.player audio').removeClass('playing');
    	$(this).addClass('playing');
    });

    $('.player audio').on('ended', function () {
    	console.log('ENDED');
    	$('.player .next').trigger('click');
    });

    //Play/Pause
    $('.player .play').click(function () {
    	if ($('.player audio').hasClass('playing')) {
    		$('.player audio').trigger('pause');
    		$('.player audio').removeClass('playing');
    	} else {
    		$('.player audio').trigger('play');
    		$('.player audio').addClass('playing');
    	}
    });

    //Next button
    $('.player .next').click(function () {
    	if (currentTrack < (playlist.length - 1)) {
    		currentTrack++;
    		setTrack(currentTrack);
    	}
    });


    //Prev button
    $('.player .prev').click(function () {
    	if (currentTrack > 0) {
    		currentTrack--;
    		setTrack(currentTrack);
    	}
    });

    //Клик по треку из списка
    $('.player .track').click(function () {
    	setTrack($(this).index());
    });

    //Клик на кнопке меню плеера
    $('.player .button').click(function () {
    	$(this).toggleClass('open');
    	$('.player .playlist').slideToggle(300);
    });


    var closeTimeout = null;

    $('.player').mouseenter(function () {
    	if (!$(this).hasClass('open')) {
    		playerOpen();
    	}

    	$('.player').addClass('open');
    	clearTimeout(closeTimeout);
    });

    $('.player').mouseleave(function () {
    	closeTimeout = setTimeout(function () {
    		playerClose();
    	}, 500);
    });
});

function playerOpen() {
	$('.player').animate({width: '308px'}, 500, function () {
		$('.player .info, .player .button').fadeIn();
	});
	$('.player .track-line, .player .timeline').animate({height: '5px'}, 500);
}

function playerClose() {
	$('.player .playlist').slideUp();
	$('.player .button').removeClass('open');
	$('.player .info, .player .button').fadeOut(function () {
		$('.player').animate({width: '98px'}, 500);
		$('.player .track-line, .player .timeline').animate({height: '53px'}, 500, function () {
			$('.player').removeClass('open');
		});
	});
}


//Custom scrollbar
(function ($) {
	$(window).load(function () {
		$(".playlist").mCustomScrollbar({
		});
	});
})(jQuery);*/

//file 
$(document).ready(function () {
	//simple file preview manipulations
	var imagesPreview = function(input, placeToInsertImagePreview) {
		if (input.files) {
			var filesAmount = input.files.length;
			if(filesAmount >= 1){
				for (var i = 0; i < filesAmount; i++) {
					var file = input.files[i];
					setUp(placeToInsertImagePreview,file);
				}
				var list = $('.wrap-img').length;
				$('.wrap-img').append('<div class="del"></div>');
				var inputHidden = $($.parseHTML('<input type="hidden" class="hidden">')).attr('value', window.URL.createObjectURL(file));
				$(inputHidden).appendTo('.wrap-img div');
				$('.del').on('click',function(e){
					$(this).parent('.wrap-img').remove();
					var list = $('.wrap-img').length;
					if(list <= 0) {
						placeholdIt(placeToInsertImagePreview);
					}
					calc();
				});
			}
			else {
				placeholdIt(placeToInsertImagePreview);
			}
		}
	};
	function setUp(place,file) {
		var img = $($.parseHTML('<img>')).attr('src', window.URL.createObjectURL(file));
		img.onload = function(e){
			window.URL.revokeObjectURL(this.src);
		}
		
		img.appendTo(place).wrap("<div class='wrap-img' data-title="+file.name.replace(/\s/g, '&nbsp;').replace('—', '-')+"><div></div></div>").addClass('loadedimg');
		$(place).find('.no-photo').remove();
		$(place).addClass('when-upload-photo');
		$(place).removeClass('when-no-photo');
	}

	function placeholdIt(place) {
		$(place).removeClass('when-upload-photo');
		$(place).addClass('when-no-photo');
		$(place).html('<div class="no-photo"><img src="http://placehold.it/120x80"></div>');
	}
	$('[data-item="photo"]').on('change', function() {
		$('div.photo-upload-container.one').html(' ');
		imagesPreview(this, 'div.photo-upload-container.one');
	});

});