// scripts.js

// document.getElementById('searchButton').addEventListener('click', function() {
//     const query = document.getElementById('searchInput').value;
//     fetchMovies(query, 'searchResults');
// });

// function fetchMovies(category, sectionId) {
//     let url = '';
//     const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/';
//     const apiKey = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd';

//     // Depending on the API's available endpoints, adjust these
//     switch (category) {
//         case 'topRated':
//             url = `${baseUrl}films/top?type=TOP_100_POPULAR_FILMS`;
//             break;
//         case 'comingSoon':
//             url = `${baseUrl}films/premieres?year=2023&month=JUNE`;
//             break;
//         case 'popular':
//             url = `${baseUrl}films/top?type=TOP_AWAIT_FILMS`;
//             break;
//         default:
//             console.log('Unknown category');
//             return;
//     }

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'X-API-KEY': apiKey,
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data && data.films) {  // Adjust this depending on the actual response structure
//             renderMovies(data.films, sectionId);  // Assuming 'data.films' is the array of films
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching movies:', error);
//         alert('Failed to fetch movies. Please check console for more details.');
//     });
// }

// function renderMovies(movies, sectionId) {
//     const section = document.getElementById(sectionId);
//     const container = section.querySelector('.movie-container');
//     container.innerHTML = '';

//     movies.forEach(movie => {
//         const movieEl = document.createElement('div');
//         movieEl.className = 'movie';
//         movieEl.innerHTML = `
//             <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster">
//             <div class="movie__title">${movie.nameRu}</div>
//             <div class="movie__rating">${movie.rating}</div>
//         `;
//         container.appendChild(movieEl);
//     });
// }


// function updateFavorites(movie) {
//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     if (favorites.some(f => f.id === movie.id)) {
//         favorites = favorites.filter(f => f.id !== movie.id);
//     } else {
//         favorites.push(movie);
//     }
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     renderMovies(favorites, 'favorites'); // Refresh favorites section
// }

// window.addEventListener('load', () => {
//     // Optionally, fetch initial data for each section
//     fetchMovies('topThisMonth', 'topThisMonth');
//     fetchMovies('comingSoon', 'comingSoon');
//     fetchMovies('bestMovies', 'bestMovies');
//     fetchMovies('digitalReleases', 'digitalReleases');
//     // Load favorites from local storage
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     renderMovies(favorites, 'favorites');
// });
