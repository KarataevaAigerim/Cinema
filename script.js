const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd'; 
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_RELEASE = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY&page=1";
const API_URL_PREMIERE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_BEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function isFavorite(movie) {
    return favorites.some(fav => fav.filmId === movie.filmId);
}


// Search
const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${encodeURIComponent(search.value)}`;
    if (search.value) {
        fetchSearchResults(apiSearchUrl);
        search.value = '';
    }
});

function fetchSearchResults(url) {
    const options = {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error fetching search results:', error));
}

function displaySearchResults(data) {
    const searchResultsContainer = document.querySelector('.search-results');
    searchResultsContainer.innerHTML = ''; // Clear the previous search results

    // Use slice to get only the first 12 movies
    (data.films || []).slice(0, 12).forEach(movie => {
        const element = document.createElement('div');
        element.className = 'movie';
        element.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
                <div class="movie__year">${movie.year}</div>
            </div>
            <div class="movie__info">
                <div class="movie__details">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.slice(0, 2).map(genre => genre.genre).join(' • ')}</div>
              </div>
              <button class="heart-btn ${isFavorite(movie) ? 'heart-active' : ''}">
                    <i class="fas fa-heart"></i>
              </button>
              <div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>
            </div>
        `;
        searchResultsContainer.appendChild(element);
        // Attach the event listener to the heart button
        element.querySelector('.heart-btn').addEventListener('click', toggleHeart(movie));
    });
}

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

// get and display different categories movies
  async function fetchAndDisplayMovies(url, containerClass, dataKey, showRating = false) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const respData = await resp.json();
    displayMovies(respData[dataKey], containerClass, showRating);
  }  

  function displayMovies(movies, containerClass, showRating = false) {
    const moviesEl = document.querySelector(`.${containerClass} .glide__slides`);
    moviesEl.innerHTML = '';
  
    movies.slice(0, 10).forEach(movie => {
        const li = document.createElement('li');
        li.className = 'glide__slide';
        li.innerHTML = `
            <div class="movie__poster">
              <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
              <div class="movie__poster-darkened"></div>
              <div class="movie__year">${movie.year}</div>
            </div>
            <div class="movie__info">
                <div class="movie__details">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.slice(0, 2).map(genre => genre.genre).join(' • ')}</div>
              </div>
              <button class="heart-btn ${isFavorite(movie) ? 'heart-active' : ''}">
                    <i class="fas fa-heart"></i>
              </button>
              
              ${showRating ? `<div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>` : ''}
            </div>
        `;
        moviesEl.appendChild(li);
        // Attach the event listener to the heart button
        li.querySelector('.heart-btn').addEventListener('click', toggleHeart(movie));
    });

    // carousel from Slide.js 
    new Glide(`.${containerClass}`, {
      type: 'carousel',
      breakpoints: {
        1024: {
          perView: 4
        },
        600: {
          perView: 2
        },
        400: {
          perView: 1
        }
      },
      startAt: 0,
      perView: 5
    }).mount();
}

fetchAndDisplayMovies(API_URL_BEST, 'movies-best', 'films', true);  // Show ratings
fetchAndDisplayMovies(API_URL_AWAIT, 'movies-await', 'films', false);  // Hide ratings
fetchAndDisplayMovies(API_URL_RELEASE, 'movies-release', 'releases', false);  // Hide ratings
fetchAndDisplayMovies(API_URL_PREMIERE, 'movies-premiere', 'items', false);  // Hide ratings

// Favorites functionality

  function toggleHeart(movie) {
    return function(event) {
        const heartBtn = event.currentTarget;
        // Correcting the findIndex usage
        const index = favorites.findIndex(fav => fav.filmId === movie.filmId);
        
        if (index > -1) {
            // Movie is already a favorite, remove it
            favorites.splice(index, 1);
            heartBtn.classList.remove('heart-active'); // Remove active class correctly
        } else {
            // Movie is not a favorite, add it
            favorites.push(movie);
            heartBtn.classList.add('heart-active'); // Add active class correctly
        }

        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };
}

function displayFavorites() {
    const favoriteMoviesContainer = document.querySelector('.favorite-movies');
    favoriteMoviesContainer.innerHTML = ''; // Clear previous contents
    favorites.forEach(movie => {
        const element = document.createElement('div');
        element.className = 'movie';
        element.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster-img"/>
                <div class="movie__poster-darkened"></div>
                <div class="movie__year">${movie.year}</div>
            </div>
            <div class="movie__info">
                <div class="movie__details">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__category">${movie.genres.slice(0, 2).map(genre => genre.genre).join(' • ')}</div>
                </div>
                <button class="heart-btn ${isFavorite(movie) ? 'heart-active' : ''}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        favoriteMoviesContainer.appendChild(element);
        element.querySelector('.heart-btn').addEventListener('click',toggleHeart(movie));
    });
}

// Call this function on page load or when needed
displayFavorites();














































