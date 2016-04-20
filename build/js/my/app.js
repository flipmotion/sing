//use strict mode;
'use strict';
//owl import
import owlCarousel from '../owl.carousel.min.js';
import thumbs from '../owl.carousel2.thumbs.min.js';

$(document).ready(function(){
	let owl = $('[data-item="slider"]');
	let owlPreviewSmall = $('[data-item="item-preview-slider"]');
	let owlPreview = $('[data-item="slider-preview"]');
	
	owl.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:true,
		items:1,
		autoplayHoverPause: true,
		autoplayTimeout: 5000,
		autoplay:true,
		navText: [
		"<i class='my-arrow-left'></i>", 
		"<i class='my-arrow-right'></i>"
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
		autoplayTimeout: 5000,
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
		thumbs: true,
		thumbImage: true,
		thumbContainerClass: 'owl-thumbs',
		thumbItemClass: 'owl-thumb-item'
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
});
/*player*/
var playlist = [
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
//            mouseWheel: {enable: false}
});
	});
})(jQuery);