const suggestionForm = document.getElementById("suggestionForm");
const feedback = document.getElementById("formFeedback");

suggestionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const movie = document.getElementById("movieTitle").value;

    suggestionForm.style.display = "none"; 
    
    feedback.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3>Thanks for the suggestion, ${name}!</h3>
            <p>We'll look into adding <strong>${movie}</strong> to the movie list.</p>
            <br>
            <a href="index.html" style="color: blue;">Back to Search</a>
        </div>
    `;
});