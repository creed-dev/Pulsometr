// jQuery
$(document).ready(function () {
	// Tabs
	$('ul.catalog__tabs').on(
		'click',
		'li:not(.catalog__tab_active)',
		function () {
			$(this)
				.addClass('catalog__tab_active')
				.siblings()
				.removeClass('catalog__tab_active')
				.closest('div.container')
				.find('div.catalog__content')
				.removeClass('catalog__content_active')
				.eq($(this).index())
				.addClass('catalog__content_active');
		}
	);
});

// Splide slider
document.addEventListener('DOMContentLoaded', function () {
	new Splide('#image-slider', {
		cover: true,
		width: '1100px',
		height: '600px',
		pagination: false,
		start: 1,
		rewind: true,
	}).mount();
});

// PHPMailer
function send(event, php) {
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	var req = new XMLHttpRequest();
	req.open('POST', php, true);
	req.onload = function () {
		if (req.status >= 200 && req.status < 400) {
			json = JSON.parse(this.response);

			// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
			if (json.result == 'success') {
				// Если сообщение отправлено
				document.querySelectorAll('form').forEach(item => {
					item.reset();
				});
				document.querySelector('#consultation').style.display = 'none';
				document.querySelector('#order').style.display = 'none';
				document.querySelector('.overlay').style.display = 'block';
				document.querySelector('#thanks').style.display = 'block';
			} else {
				// Если произошла ошибка
				alert('Ошибка. Сообщение не отправлено');
			}
			// Если не удалось связаться с php файлом
		} else {
			alert('Ошибка сервера. Номер: ' + req.status);
		}
	};

	// Если не удалось отправить запрос. Стоит блок на хостинге
	req.onerror = function () {
		alert('Ошибка отправки запроса');
	};
	req.send(new FormData(event.target));
}

// Ссылки в каталоге товаров
const more = document.querySelectorAll('.catalog-item__link');
const back = document.querySelectorAll('.catalog-item__back');

more.forEach(item => {
	item.addEventListener('click', e => {
		e.preventDefault();
		const itemWrapper = item.closest('.catalog-item__wrapper');
		itemWrapper
			.querySelector('.catalog-item__content')
			.classList.toggle('catalog-item__content_active');
		itemWrapper
			.querySelector('.catalog-item__list')
			.classList.toggle('catalog-item__list_active');
	});
});

back.forEach(item => {
	item.addEventListener('click', e => {
		e.preventDefault();
		const itemWrapper = item.closest('.catalog-item__wrapper');
		itemWrapper
			.querySelector('.catalog-item__content')
			.classList.toggle('catalog-item__content_active');
		itemWrapper
			.querySelector('.catalog-item__list')
			.classList.toggle('catalog-item__list_active');
	});
});

// Модальные окна
document.querySelectorAll('[data-modal=consultation]').forEach(item => {
	item.addEventListener('click', () => {
		document.querySelector('.overlay').style.display = 'block';
		document.querySelector('#consultation').style.display = 'block';
	});
});

document.querySelectorAll('.modal__close').forEach(item => {
	item.addEventListener('click', () => {
		document.querySelector('.overlay').style.display = 'none';
		document.querySelector('#consultation').style.display = 'none';
		document.querySelector('#order').style.display = 'none';
		document.querySelector('#thanks').style.display = 'none';
	});
});

const buyBtn = document.querySelectorAll('.catalog-item__btn');
const itemTitle = document.querySelectorAll('.catalog-item__title');

buyBtn.forEach(item => {
	item.addEventListener('click', e => {
		const titleTarget = itemTitle[e.target.dataset.id].textContent;
		document.querySelector('[data-modal=title]').textContent = `${titleTarget}`;
		document.querySelector('.overlay').style.display = 'block';
		document.querySelector('#order').style.display = 'block';
	});
});

// Валидация форм
function validateForm(form) {
	new JustValidate(form, {
		rules: {
			name: {
				required: true,
				minLength: 2,
			},
			email: {
				required: true,
				email: true,
			},
			phone: {
				required: true,
			},
		},
		messages: {
			name: {
				required: 'Это поле является обязательным',
				minLength: 'Минимальное значение символов - 2',
			},
			email: {
				required: 'Это поле является обязательным',
				email: 'Введите email в правильном формате',
			},
			phone: {
				required: 'Это поле является обязательным',
			},
		},
	});
}

validateForm('#main-form');
validateForm('#modal-consultation-form');
validateForm('#modal-order-form');

// Маска для номера телефона
const maskSelector = document.querySelectorAll('[data-validate-field=phone]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(maskSelector);

// Кнопка перехода к верхушки сайта
const goTopBtn = document.querySelector('.pageup');

window.addEventListener('scroll', function () {
	if (window.pageYOffset > document.documentElement.clientHeight) {
		goTopBtn.classList.add('pageup_active');
	}
	if (window.pageYOffset < document.documentElement.clientHeight) {
		goTopBtn.classList.remove('pageup_active');
	}
});

// Плавный переход по якорям
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const blockID = anchor.getAttribute('href').substr(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});
}
