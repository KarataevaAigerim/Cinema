// need to fix the line of top ten when press search btn, so it only shows the results of the search


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
                <div class="movie__year">${movie.year}</div>
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
                <div class="movie__year">${movie.year}</div>
            </div>
        `;
        moviesEl.appendChild(movieEl);
    }
    );
}
