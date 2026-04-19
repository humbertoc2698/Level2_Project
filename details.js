async function getMovieDetails() {
    const id = localStorage.getItem("selectedMovie");
    const container = document.getElementById("detailsContainer");

    if (!id) {
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=cd805b8e&plot=full`);
        const data = await response.json();

        let posterHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
        if (data.Poster === "N/A") {
            posterHTML = `<div class="no-poster-big">No Image Available</div>`;
        }

        container.innerHTML = `
            <div class="details-card">
                ${posterHTML}
                <div class="details-info">
                    <h1>${data.Title} (${data.Year})</h1>
                    <p><strong>Rating:</strong> ${data.imdbRating}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Actors:</strong> ${data.Actors}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <hr>
                    <p class="plot-text">${data.Plot}</p>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = "<p>Error loading movie details. Please try again.</p>";
    }
}
getMovieDetails();