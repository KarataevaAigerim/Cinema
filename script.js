const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies (API_URL_POPULAR);
async function getMovies (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
    },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate (rate) {
    if (rate >= 7) {
        return 'green';
    } else if (rate >= 4) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies (data) {
    const moviesEl = document.querySelector('.movies');

    // Clear page
    document.querySelector('.movies').innerHTML = '';

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__poster">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster"/>
                <div class="movie__poster-darkened">
                </div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map((genre) => genre.genre).join(', ')}</div>
                <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
            </div>
            `;
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);
    }
});








































































// function handleFormSubmit() {
//     onSearchClick();
// }

// function onSearchClick() {
//     const query = document.getElementById('searchInput').value;
//     fetchGifs(query);
// }

// function clearInput() {
//     document.getElementById('searchInput').value = ''; 
// }