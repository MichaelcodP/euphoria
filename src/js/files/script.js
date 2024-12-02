// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Строгий режим
"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
	if (targetElement.closest('[data-spoller]')) {
		const currentElement = targetElement.closest('[data-spoller]');
		if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
			currentElement.classList.toggle('active');
		}
		slideToggle(currentElement.nextElementSibling);
	}
	if (targetElement.closest('.rating__input')) {
		const currentElement = targetElement.closest('.rating__input');
		const rating = currentElement.closest('.rating');
		if (rating.classList.contains('rating--set')) {
			starRatingGet(rating, currentElement);
		}
	}
	if (targetElement.closest('[data-tabs-button]')) {
		const currentElement = targetElement.closest('[data-tabs-button]');
		setTab(currentElement);
	}
}

// Spollers
const spollers = document.querySelectorAll('[data-spoller]')
if (spollers.length) {
	spollers.forEach(spoller => {
		spoller.dataset.spoller !== 'open' ? spoller.nextElementSibling.hidden = true : spoller.classList.add('active')
	});
	// Filter
	const filterTitle = document.querySelector('.filter__title')
	if (filterTitle) {
		//window.addEventListener('resize', someFunc);
		const breakPointValue = filterTitle.dataset.spollerMedia;
		const breakPoint = breakPointValue ? `(${breakPointValue.split(',')[0]}-width:${breakPointValue.split(',')[1]}px)` : null
		if (breakPoint) {
			const matchMedia = window.matchMedia(breakPoint)
			matchMedia.addEventListener("change", (e) => {
				const isTrue = e.matches
				if (isTrue) {
					slideUp(filterTitle.nextElementSibling)
					filterTitle.classList.remove('active')
				} else {
					slideDown(filterTitle.nextElementSibling)
					filterTitle.classList.add('active')
				}
			})
		}
	}
}

let slideDown = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		target.hidden = false;
		let height = target.offsetHeight;

		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.overflow = 'hidden';
		target.style.height = 0;

		target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;

		target.style.height = `${height}px`;

		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('margin-top')

		setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');
		}, duration);
	}
}
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		let height = target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;
		target.style.height = `${height}px`;

		target.offsetHeight;

		target.style.overflow = 'hidden';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.height = 0;

		setTimeout(() => {
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('margin-top')

			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');

			target.hidden = true;
		}, duration);
	}
}
let slideToggle = (target, duration = 500) => {
	target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}

//-------
// Filter
//-------

// Price
/* const filterRange = document.querySelector('.price-filter__range');
if (filterRange) {
	const filterRangeFrom = document.querySelector('.price-filter__input--from');
	const filterRangeTo = document.querySelector('.price-filter__input--to');
	noUiSlider.create(filterRange, {
		start: [0, 100],
		connect: true,
		range: {
			'min': 0,
			'max': 100
		},
		format: wNumb({
			decimals: 0,
			thousand: '',
			prefix: '$'
		})
	});
	filterRange.noUiSlider.on('update', function (values, handle) {
		filterRangeFrom.value = `${values[0]}`;
		filterRangeTo.value = `${values[1]}`;

	});
	filterRangeFrom.addEventListener('change', function () {
		filterRange.noUiSlider.setHandle(0, filterRangeFrom.value);
	});
	filterRangeTo.addEventListener('change', function () {
		filterRange.noUiSlider.setHandle(1, filterRangeTo.value);
	});
} */

// Catalog
const catalogItems = document.querySelector('.catalog__items');
if (catalogItems) {
	loadProducts();
}

async function loadProducts() {
	try {
		const response = await fetch("json/products.json");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
		}
		const responseData = await response.json();
		initProducts(responseData);
	} catch (error) {
		console.error("Failed to load products:", error);
		alert(`Failed to load products: ${error.message}`);
	}
}

function initProducts(data) {
	const productsList = data.products
	if (productsList.length) {
		let productTemplate = ``;
		productsList.forEach(productItem => {
			productTemplate += `<article class="item-product">`
			productTemplate += `<a href="#" class="item-product__favorite ${productItem.favorite ? 'item-product__favorite--active' : null} _icon-favorite"></a>`
			if (productItem.image) {
				productTemplate += `<a href="${productItem.url}" class="item-product__picture-link">`
				productTemplate += `<img src="${productItem.image}" class="item-product__image" alt="Image">`
				productTemplate += `</a>`
			}
			productTemplate += `<div class="item-product__body">`
			productTemplate += `<h4 class="item-product__title">`
			productTemplate += `<a href="${productItem.url}" class="item-product__link-title">${productItem.title}</a>`;
			productTemplate += `</h4>`
			if (productItem.label) {
				productTemplate += `<div class="item-product__label">${productItem.label}</div>`
			}
			productTemplate += `<div class="item-product__price">${productItem.price}</div>`
			productTemplate += `</div>`
			productTemplate += `</article>`
		});
		catalogItems.innerHTML = productTemplate;
	}
}

// Tabs
function setTab(tabElement) {
	const tabsParent = tabElement.closest('[data-tabs]');

	const tabsButtons = Array.from(tabsParent.querySelectorAll('[data-tabs-button]'));
	const tabsActiveButton = tabsParent.querySelector('[data-tabs-button].active');
	tabsActiveButton.classList.remove('active');
	tabElement.classList.add('active');

	const currentButtonIndex = tabsButtons.indexOf(tabElement);
	const tabsElements = tabsParent.querySelectorAll('[data-tabs-element]');

	tabsElements.forEach(tabsElement => {
		tabsElement.hidden = true;
	});

	tabsElements[currentButtonIndex].hidden = false;
}