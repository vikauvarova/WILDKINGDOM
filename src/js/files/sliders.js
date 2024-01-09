/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Controller, Parallax } from 'swiper/modules';
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
	if (document.querySelector('.hero__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		const mainSlider = new Swiper('.hero__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Controller, Parallax],
			observer: true,
			observeParents: true,
			parallax: true,
			slidesPerView: "auto",
			loop: true,
			spaceBetween: 30,
			//autoHeight: true,
			speed: 800,
			// centeredSlides: true,

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.hero__arrow--left',
				nextEl: '.hero__arrow--right',
			},
			breakpoints: {
				320: {
					centeredSlides: true,
					spaceBetween: 15
				},
				768: {
					centeredSlides: true,
					spaceBetween: 30
				},
				1200: {
					centeredSlides: false,
					spaceBetween: 30
				},
			},
			// Події
			on: {
				init: function (slider) {
					slider.slides.forEach(slide => {
						const imageSrc = slide.querySelector('.slide-hero__image').getAttribute('src');
						const topImage = `
							<div class="slide-hero__top-image">
								<img src="${imageSrc}" alt="Image">
							</div>
						`;
						const slideContent = slide.querySelector('.slide-hero__content');
						slideContent.insertAdjacentHTML('beforeend', topImage);
					});
				}
			}
		});
	}
	if (document.querySelector('.reviews__slider')) {
		new Swiper('.reviews__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			loop: true,
			spaceBetween: 30,
			autoHeight: true,
			speed: 800,
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.reviews__arrow--prev',
				nextEl: '.reviews__arrow--next',
			}
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