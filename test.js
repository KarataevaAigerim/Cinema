// Internet code

const favoriteBtn = document.querySelector("#favorite");

let isFavoritesShown = false;

// Retrieve favorite movies from local storage
function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  }
  

const favoriteMovies = getFavoriteMovies();

const isFavorite = favoriteMovies.some(
    (favoriteMovie) => getMovieId(favoriteMovie) == movieID
  );

//********************Getting favorites */
favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const favoriteMovies = getFavoriteMovies();
    displayMovies(favoriteMovies, true);
  });
  


//****************************Favorites */
async function toggleFavorite(button, selectedId) {
    if (!localStorage.getItem("favoriteMovies")) {
      localStorage.setItem("favoriteMovies", "[]");
    }
  
    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    const movie = movies.find((movie) => getMovieId(movie) == selectedId);
    const isFavorite = favoriteMovies.some(
      (favoriteMovie) => getMovieId(favoriteMovie) == selectedId
    );
  
    if (isFavorite) {
      favoriteMovies = favoriteMovies.filter(
        (favoriteMovie) => getMovieId(favoriteMovie) != selectedId
      );
      button.classList.remove("movie__favorite");
  
      if (isFavoritesShown) {
        let movieElement = button.closest(".movie");
        movieElement.classList.add("hide-movie");
        setTimeout(() => {
          movieElement.remove();
        }, 500);
      }
    } else {
      favoriteMovies.push(movie);
      button.classList.add("movie__favorite");
    }
  
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }
  



// LocalStorage
// function toggleHeart(movie) {
//     return function(event) {
//         const heartBtn = event.currentTarget;
//         const index = favorites.findIndex(fav => fav.id === movie.id); // Assuming each movie has a unique 'id' property

//         if (index > -1) {
//             // Movie is already a favorite, remove it
//             favorites.splice(index, 1);
//             heartBtn.classList.remove('red-heart');
//             heartBtn.classList.add('grey-heart');
//         } else {
//             // Movie is not a favorite, add it
//             favorites.push(movie);
//             heartBtn.classList.add('red-heart');
//             heartBtn.classList.remove('grey-heart');
//         }

//         // Update localStorage
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//     };
// }