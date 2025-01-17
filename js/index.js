const searchInputNode = document.querySelector('.js-search__input'); //
const searchBtnNode = document.querySelector('.js-search__btn'); //
const massageNode = document.querySelector('.js-search__message'); //
const searchListNode = document.querySelector('.js-found-list'); //

// проверка поля ввода
function checkInputField() {
	if (searchInputNode.value.trim() === '') {
		return true;
	}
}

// функция. Скрыть сообщение поиска
function hideSearchMessage() {
	massageNode.classList.remove('show');
}
// функция. Показать сообщение поиска
function showSearchMessage() {
	massageNode.classList.add('show');
}
// функция. Измененить цвета кнопки поиска
function changeSearchBtnBgColor() {
	searchBtnNode.classList.add('dark-bg');
}

// ункция. Плавное появление элементов списка
function showItems(item) {
	item.classList.add('show');
}

//  функция установки текста: "Фильмы не найдены" 
function setRequestMessageText() {
	massageNode.innerText = 'Фильмы не найдены';
}
//  функция установки текста: "Введите название фильма" 
function setValidationMessageText() {
	massageNode.innerText = 'Введите название фильма';
}



// 1) функция получения заголовка фильма
function getMovieFromUser() {
	const title = searchInputNode.value;
	return title;
}


// 2) функция получения списка фильмов
function showMovies() {
	// проверка
	if (checkInputField()) {
		hideSearchMessage();
		setValidationMessageText();
		showSearchMessage();
		return;
	} else {
		const movieTitle = getMovieFromUser();
		hideSearchMessage();
		getMovies(movieTitle);
		//clearInput(searchInputNode);
		return;
	}
}

// функция плавного появления элементов списка фильмом
function smoothShow() {
	if (searchListNode.childNodes) {
		const items = document.querySelectorAll('.found-item');

		if (items) {
			items.forEach(item => {
				showItems(item);
			});
		}
	}
}

// функция создания элементов и их атрибутов
function createCustomElement(tag, attributes) {
	const element = document.createElement(tag);
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	return element;
}

// функция получения данных с сервера с дальнейшей их обработкой
async function getMovies(movieTitle) {
	const currentTitle = movieTitle;
	const url = `https://www.omdbapi.com/?s=${currentTitle}&apikey=d4aa7ddb`;

	try {
		const response = await fetch(url);
		const result = await response.json()
		const arrayMovie = result.Search;
		render(arrayMovie);
		setTimeout(smoothShow, 500);
		changeSearchBtnBgColor();
		return result;

	} catch (error) {
		console.log('При запросе возникла ошибка: ' + error);
		//alert('Ошибка при выполнении запроса!');
		setRequestMessageText();
		showSearchMessage();
		return false;
	}
}




// функция создания элементов и их вывода
function render(array) {

	searchListNode.innerHTML = '';

	array.forEach((item) => {
		const movieUrl = `http://127.0.0.1:5500/pages/movie.html?i=${item.imdbID}`;

		//создание элементов и их атрибутов
		const itemNode = createCustomElement('li', {
			class: 'found-item'
		});
		const itemLinkNode = createCustomElement('a', {
			class: 'found-item__link',
			href: movieUrl,
			target: '_blank'
		});
		const itemContentNode = createCustomElement('div', {
			class: 'found-item__content'
		});
		const itemImageWrapperNode = createCustomElement('div', {
			class: 'found-item__img-wrapper'
		});
		const itemImageNode = createCustomElement('img', {
			class: 'found-item__img',
			src: item.Poster,
			alt: 'Превью ' + item.Title
		});
		const itemDescNode = createCustomElement('div', {
			class: 'found-item__desc'
		});
		const itemTitleNode = createCustomElement('h4', {
			class: 'found-item__title'
		});
		const itemYearNode = createCustomElement('p', {
			class: 'found-item__year'
		});
		const itemCategoryNode = createCustomElement('p', {
			class: 'found-item__category'
		});

		// установка значений
		itemTitleNode.innerHTML = item.Title;
		itemYearNode.innerHTML = item.Year;
		itemCategoryNode.innerHTML = item.Type;

		// вложение элементов
		itemNode.append(itemLinkNode);
		itemLinkNode.append(itemContentNode);
		itemContentNode.append(itemImageWrapperNode);
		itemImageWrapperNode.append(itemImageNode);
		itemContentNode.append(itemDescNode);
		itemDescNode.append(itemTitleNode);
		itemDescNode.append(itemYearNode);
		itemDescNode.append(itemCategoryNode);


		//movieListNode.prepend(itemNode);
		searchListNode.append(itemNode);
	});
}



// хендлер при нажатии кнопки "Найти"
searchBtnNode.addEventListener('click', showMovies);

// событие клик на body
document.body.addEventListener('click', function (e) {
	if (e.target !== searchBtnNode && searchInputNode.value.trim() === '') {
		massageNode.innerText = '';
		hideSearchMessage();
	}
	if (e.target !== searchBtnNode && searchInputNode.value !== '') {
		massageNode.innerText = '';
		showSearchMessage();
	}
});

// хендлер на событие input. Для плавности появления сообщения
searchInputNode.addEventListener('input', hideSearchMessage);

//*********************************** */

// не используется
// функция очистка поля ввода
/* function clearInput(input) {
	input.value = '';
}*/