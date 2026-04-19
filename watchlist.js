const savedData = localStorage.getItem("myWatchlist");
let watchlist = savedData ? JSON.parse(savedData) : [];

const container = document.getElementById("watchlistContainer");
async function loadWatchlist() {
    if (watchlist.length === 0) {
        return;
    }
    container.innerHTML = "<p>Loading your list...</p>";
    let allMoviesHTML = "";
    try {
        for (let id of watchlist) {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=cd805b8e`);
            const movie = await response.json();

            allMoviesHTML += `
                <div class="movie-card">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="${movie.Title}">
                    <div class="movie-info">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                        <button onclick="removeFromWatchlist('${movie.imdbID}')" style="background-color: red;">Remove</button>
                    </div>
                </div>
            `;
        }
        container.innerHTML = allMoviesHTML;
    } catch (error) {
        container.innerHTML = "<p>Error loading watchlist.</p>";
    }
}

function removeFromWatchlist(id) {
    watchlist = watchlist.filter(function(movieId) {
        return movieId !== id;
    });
    localStorage.setItem("myWatchlist", JSON.stringify(watchlist));
    location.reload();
}
loadWatchlist();