const API_KEY = 'a61bd329-6b11-4fcd-bb21-27e2f5b44bbd';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type-TOP_100_POPULAR_FILMS&page=1"

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

function showMovies (data){
    const moviesEl = document.querySelector('movies');
    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__poster">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__rating">${movie.rating}</div>
        `;
        moviesEl.appendChild(movieEl);
    });
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