const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_RELEASE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/releases?year=2024&month=MAY&page=1";
const API_URL_PREMIERE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_BEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";

// top 10 Best movies 
getBestMovies (API_URL_BEST);
async function getBestMovies (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
    },
    });
    const respData = await resp.json();
    showBestMovies(respData);
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

// Show best top 10 movies

function showBestMovies(data) {
    const moviesEl = document.querySelector('.movies-best');

    // Clear previous movie listings
    // moviesEl.innerHTML = ''; easier way to clear the page
    document.querySelector('.movies-best').innerHTML = '';

    // Get the top 10 films only
    const topTenFilms = data.films.slice(0, 10);

    topTenFilms.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
            </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}

// Top 10 Awaited movies 

getAwaitMovies(API_URL_AWAIT);
async function getAwaitMovies (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
    },
    });
    const respData = await resp.json();
    showAwaitMovies(respData);
}

function showAwaitMovies(data) {
    const moviesEl = document.querySelector('.movies-await');
    moviesEl.innerHTML = '';

    const topTenFilms = data.films.slice(0, 10);

    topTenFilms.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
            </div>
        `;
        moviesEl.appendChild(movieEl);
    }
    );
}



// Search
const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getBestMovies(apiSearchUrl);
        search.value = '';
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