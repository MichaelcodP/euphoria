/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.hero')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.hero', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			autoHeight: true,
			speed: 800,
			parallax: true,
			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			
			pagination: {
				el: '.hero__pagination',
				clickable: true,
			},
			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.hero__arrow--next',
				nextEl: '.hero__arrow--prev',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.new__slider')) {
		new Swiper('.new__slider', {
			// Optional parameters
			modules: [Navigation, Pagination],
			loop: true,
			autoHeight: true,
			speed: 800,
			spaceBetween: 38,
			slidesPerView: 4,
			// Navigation arrows
			navigation: {
				nextEl: '.new__arrow--right',
				prevEl: '.new__arrow--left',
			},
	
			// Responsive breakpoints
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1.5,
					spaceBetween: 15
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				// when window width is >= 480px
				650: {
					slidesPerView: 3,
					spaceBetween: 25
				},
				// when window width is >= 640px
				991: {
					slidesPerView: 4,
					spaceBetween: 38
				}
			}
		});
	}
	if (document.querySelector('.reviews__slider')) {
		new Swiper('.reviews__slider', {
			// Optional parameters
			modules: [Pagination],
			loop: true,
			// autoHeight: true,
			speed: 800,
			spaceBetween: 23,
			slidesPerView: 3,
			// If we need pagination
			pagination: {
				el: '.reviews__pages',
				clickable: true
			},
			// Responsive breakpoints
			breakpoints: {
				320: {
					slidesPerView: 1.3,
					spaceBetween: 15
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				991: {
					slidesPerView: 3,
					spaceBetween: 23,
				}
			}
		});
	}
	const mainProduct = document.querySelector('.main-product');
if (mainProduct) {
	const mainProductSliderImages = document.querySelectorAll('.main-product__slider img');
	let mainProductThumbSlider;

	if (mainProductSliderImages.length) {
		const productImagesBlock = document.querySelector('.main-product__images');
		let mainProductThumbSliderTemplate = `<div class="main-product__thumb-slider thumb-slider">`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__slider swiper">`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__wrapper swiper-wrapper">`
		mainProductSliderImages.forEach(mainProductSliderImage => {
			const srcImage = mainProductSliderImage.getAttribute('src').replace('/slider/', '/slider/thumbs/');
			mainProductThumbSliderTemplate += `<div class="thumb-slider__slide swiper-slide">
				<img src="${srcImage}" class="thumb-slider__image" alt="Image">
			</div>`
		});
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `<div class="thumb-slider__arrows">`
		mainProductThumbSliderTemplate += `
			<button type="button" class="thumb-slider__arrow thumb-slider__arrow--up _icon-ch-up"></button>
			<button type="button" class="thumb-slider__arrow thumb-slider__arrow--down _icon-ch-down"></button>
		`
		mainProductThumbSliderTemplate += `</div>`
		mainProductThumbSliderTemplate += `</div>`

		productImagesBlock.insertAdjacentHTML("afterbegin", mainProductThumbSliderTemplate)

		mainProductThumbSlider = new Swiper('.thumb-slider__slider', {
			// Optional parameters
			loop: true,
			direction: "vertical",
			spaceBetween: 20,
			// autoHeight: true,
			speed: 800,
			slidesPerView: 3,
		});
	}

	const mainProductSlider = new Swiper('.main-product__slider', {
		// Optional parameters
		modules: [Navigation, Pagination],
		loop: true,
		// direction: "vertical",
		// autoHeight: true,
		// Navigation arrows
		navigation: {
			nextEl: '.thumb-slider__arrow--down',
			prevEl: '.thumb-slider__arrow--up',
		},
		keyboard: {
			enabled: true,
		},
		speed: 800,
		spaceBetween: 0,
		slidesPerView: 1,
		thumbs: {
			swiper: mainProductThumbSlider
		},
	});
}
}

// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});