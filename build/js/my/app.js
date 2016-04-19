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