const pageTitle = document.querySelector('head title');
const movieListNode = document.querySelector('.js-movie-list');
const movieImageNode = document.querySelector('.js-movie__img');
const movieItemTitleNode = document.querySelector('.js-movie__title');
const movieItemYearNode = document.querySelector('.js-movie-item__year');
const movieItemRatingNode = document.querySelector('.js-movie-item__rating');
const movieItemDateNode = document.querySelector('.js-movie-item__date');
const movieItemDurationNode = document.querySelector('.js-movie-item__duration');
const movieItemGenreNode = document.querySelector('.js-movie-item__genre');
const movieItemDirectorNode = document.querySelector('.js-movie-item__director');
const movieItemScenarioNode = document.querySelector('.js-movie-item__scenario');
const movieItemActorsioNode = document.querySelector('.js-movie-item__actors');
const movieDescriptionTextNode = document.querySelector('.js-movie-description__text');

const movieHeaderNode = document.querySelector('.js-movie-header');
const movieSectionNode = document.querySelector('.js-movie__section');


//const params = new URLSearchParams(location.search); не работает
let params = new URLSearchParams(document.location.search);
let movieId = params.get('i');



// функция получения данных о фильме с сервера с дальнейшей их обработкой
async function getMovieData(movieFromUser) {
	const url = `https://www.omdbapi.com/?i=${movieId}&apikey=d4aa7ddb`;
	try {
		const response = await fetch(url);
		const result = await response.json()
		setDataMovie(result);
		addShowClassMoviePage();
		return result;

	} catch (error) {
		console.log('При запросе возникла ошибка: ' + error);
		alert('Ошибка при выполнении запроса!');
		return false;
	}
}

// функция плавного появления контента на странице фильма
function addShowClassMoviePage() {
	movieHeaderNode.classList.add('show');
	movieSectionNode.classList.add('show');
}

// функция установки данных о фильме на страницу
function setDataMovie(result) {
	pageTitle.innerText = result.Title;
	movieImageNode.src = result.Poster;
	movieImageNode.alt = 'Poster for ' + result.Title;
	movieItemTitleNode.innerText = result.Title;
	movieItemYearNode.textContent = result.Year;
	movieItemRatingNode.textContent = result.Rated;
	movieItemDateNode.textContent = result.Released;
	movieItemDurationNode.textContent = result.Runtime;
	movieItemGenreNode.textContent = result.Genre;
	movieItemDirectorNode.textContent = result.Director;
	movieItemScenarioNode.textContent = result.Writer;
	movieItemActorsioNode.textContent = result.Actors;
	movieDescriptionTextNode.textContent = result.Plot;
}

getMovieData();