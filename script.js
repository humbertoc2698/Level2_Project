let watchlist;
const savedData = localStorage.getItem("myWatchlist");

if (savedData !== null) {
    watchlist = JSON.parse(savedData);
} else {
    watchlist = [];
}

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const buttonSearch = document.getElementById("searchBtn");

async function getData() {
    const searchTerm = searchInput.value;

    if (searchTerm === "") {
        alert("Please type a movie name!");
        return;
    }

    movieContainer.innerHTML = "<p>Loading movies...</p>";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=cd805b8e`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieContainer.innerHTML = "<p>No movies found. Try another One</p>";
        }
    } catch (error) {
        console.log("Error:", error);
        movieContainer.innerHTML = "<p>Something went wrong</p>";
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = "";

    movies.forEach(function(movie) {
        const title = movie.Title;
        const year = movie.Year;
        const poster = movie.Poster;
        const id = movie.imdbID;

        let visualArea;
        if (poster === "N/A") {
            visualArea = `<div class="no-poster">No Image</div>`;
        } else {
            visualArea = `<img src="${poster}" alt="${title}">`;
        }

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            ${visualArea} 
            <div class="movie-info">
                <h3>${title}</h3>
                <p>${year}</p>
                <button onclick="viewDetails('${id}')">View Details</button>
                <button class="add-btn" onclick="addOneToWatchlist('${id}')">Add to List</button>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}

function addOneToWatchlist(id) {
    if (watchlist.includes(id) === false) {
        watchlist.push(id);
        const textToSave = JSON.stringify(watchlist);
        localStorage.setItem("myWatchlist", textToSave);
        alert("Saved to your watchlist");
    } else {
        alert("This movie is already in your list");
    }
}

function viewDetails(id) {
    localStorage.setItem("selectedMovie", id);
    window.location.href = "details.html";
}
buttonSearch.addEventListener("click", getData);