//use strict mode;
'use strict';
//owl import
import owlCarousel from '../owl.carousel.min.js';


$(document).ready(function(){
	let owl = $('[data-item="slider"]');
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

	owlPreview.owlCarousel({
		items:1,
		thumbs: true,
		thumbsPrerendered: true
	});

	var headerH = $('.header').height();
	var sliderH = $('.Slider-main').height();

	$("#my-nav").affix({
		offset: { 
			top: headerH + sliderH 
		}
	});
	$("#my-nav").on('affixed.bs.affix', function(){
		console.log("Меню навигации была прикреплена. Теперь она не прокручивается вместе со страницей.");
	});
});