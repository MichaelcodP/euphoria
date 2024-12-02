// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss 
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	// Отримання елемента слайдера
	const priceSlider = document.getElementById('range');
	
	if (priceSlider) {
		const filterRangeFrom = priceSlider.querySelector('.price-filter__input--from');
		const filterRangeTo = priceSlider.querySelector('.price-filter__input--to');

		// Перевірка на існування полів введення
		if (!filterRangeFrom || !filterRangeTo) {
			console.error("Range entry field not found.");
			return;
		}

		// Ініціалізація noUiSlider
		noUiSlider.create(priceSlider, {
			start: [20, 80], // Початкові значення
			connect: true,
			range: {
				'min': 0,
				'max': 100
			},
			format: wNumb({
				decimals: 0,
				thousand: '',
			})
		});
		// Оновлення значень при переміщенні слайдера
		// Updated value when the slider is moved
		priceSlider.noUiSlider.on('update', function (values, handle) {
			filterRangeFrom.value = `$${values[0]}`;
			filterRangeTo.value = `$${values[1]}`;
		});
		// Оновлення слайдера при зміні значень у полях введення
		filterRangeFrom.addEventListener('change', function () {
			const filterRangeValue = +filterRangeFrom.value.replace("$", '');
			priceSlider.noUiSlider.setHandle(0, filterRangeValue);
		});
		filterRangeTo.addEventListener('change', function () {
			const filterRangeValue = +filterRangeTo.value.replace("$", '');
			priceSlider.noUiSlider.setHandle(1, filterRangeValue);
		});
		/*
		const priceStart = document.getElementById('price-start');
		const priceEnd = document.getElementById('price-end');
		priceStart.addEventListener('change', setPriceValues);
		priceEnd.addEventListener('change', setPriceValues);
		
		function setPriceValues() {
			let priceStartValue;
			let priceEndValue;
			if (priceStart.value != '') {
				priceStartValue = priceStart.value;
			}
			if (priceEnd.value != '') {
				priceEndValue = priceEnd.value;
			}
			priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
		}
			*/
	}
}
// Запуск функції після завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
	rangeInit();
});
