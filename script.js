const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd'; 
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_RELEASE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/releases?year=2024&month=MAY&page=1";
const API_URL_PREMIERE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_BEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";


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


function showBestMovies(data) {
    const moviesEl = document.querySelector('.movies-best .glide__slides');
    moviesEl.innerHTML = '';

    data.films.slice(0, 10).forEach(movie => {
        const li = document.createElement('li');
        li.className = 'glide__slide';
        li.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu} class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
                <div class="movie__year">${movie.year}</div>
            </div>
        `;
        moviesEl.appendChild(li);
    });

    new Glide('.movies-best', {
        type: 'carousel',
        startAt: 0,
        perView: 5
    }).mount();
}

function showAwaitMovies(data) {
    const moviesEl = document.querySelector('.movies-await .glide__slides');
    moviesEl.innerHTML = '';

    // Get the top 10 films
    const topTenFilms = data.films.slice(0, 10);

    // Append each movie as a list item to the carousel
    topTenFilms.forEach((movie) => {
        const li = document.createElement('li');
        li.className = 'glide__slide';
        li.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="movie__year">${movie.year}</div>
            </div>
        `;
        moviesEl.appendChild(li);
    });

    // Initialize Glide.js on the .movies-await container
    new Glide('.movies-await', {
        type: 'carousel',
        startAt: 0,
        perView: 5
    }).mount();
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

// Rating color
function getClassByRate (rate) {
    if (rate >= 7) {
        return 'green';
    } else if (rate >= 4) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Digital releases
getDigitalReleases(API_URL_RELEASE);
async function getDigitalReleases(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY, 
        },
    });
    const respData = await resp.json();
    showDigitalReleases(respData);
}

function showDigitalReleases(data) {
    const moviesEl = document.querySelector('.movies-release .glide__slides');
    moviesEl.innerHTML = '';

    data.releases.slice(0, 10).forEach(movie => {
        const li = document.createElement('li');
        li.className = 'glide__slide';
        li.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
                <div class="movie__year">${movie.year}</div>
            </div>
        `;
        moviesEl.appendChild(li);
    });

    new Glide('.movies-release', {
        type: 'carousel',
        startAt: 0,
        perView: 5
    }).mount();
}




































































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