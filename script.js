const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd'; 
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_RELEASE = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=MAY&page=1";
const API_URL_PREMIERE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_BEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";




// const form = document.querySelector('form');
// const search = document.querySelector('.header__search');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
//     if (search.value) {
//         try {
//             const response = await fetch(apiSearchUrl, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-API-KEY": API_KEY,
//                 }
//             });
//             const data = await response.json();
//             displaySearchResults(data); // Use the new function to display results
//             search.value = '';
//         } catch (error) {
//             console.error('Search failed:', error);
//             // Optionally, update the UI to notify the user that the search failed
//         }
//     }
// });



// Search
const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}&apikey=${API_KEY}`;
    if (search.value) {
        fetchSearchResults(apiSearchUrl);
        search.value = '';
    }
});

function fetchSearchResults(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
}


function displaySearchResults(data) {
    const searchResultsContainer = document.querySelector('.search-results');
    searchResultsContainer.innerHTML = ''; // Clear the previous search results

    data.films.forEach(movie => {
        const element = document.createElement('div');
        element.className = 'movie';
        element.innerHTML = `
            <div class="movie__poster">
                <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}"/>
            </div>
            <div class="movie__info">
                <h3>${movie.nameRu}</h3>
                <p>${movie.genres.map(genre => genre.genre).join(', ')}</p>
                <div>Rating: ${movie.rating}</div>
            </div>
        `;
        searchResultsContainer.appendChild(element);
    });
}

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
  
//     const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
//     if (search.value) {
//       getMovies(apiSearchUrl);
//       search.value = "";
//     }
//   });




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




// refactored code

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
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(genre => genre.genre).join(' • ')}</div>
          ${showRating ? `<div class="movie__rating movie__rating--${getClassByRate(movie.rating)}">${movie.rating}</div>` : ''}
        </div>
      `;
      moviesEl.appendChild(li);
    });
  
    new Glide(`.${containerClass}`, {
      type: 'slider',
      startAt: 0,
      perView: 4
    }).mount();
  }

fetchAndDisplayMovies(API_URL_BEST, 'movies-best', 'films', true);  // Show ratings
fetchAndDisplayMovies(API_URL_AWAIT, 'movies-await', 'films', false);  // Hide ratings
fetchAndDisplayMovies(API_URL_RELEASE, 'movies-release', 'releases', false);  // Hide ratings
fetchAndDisplayMovies(API_URL_PREMIERE, 'movies-premiere', 'items', false);  // Hide ratings































































