document.addEventListener("DOMContentLoaded", function (){
    const params = new URLSearchParams(window.location.search);
    const movieID = params.get("id");
    console.log(movieID);
    fetch(`https://api.noroff.dev/api/v1/square-eyes/${movieID}`)
        .then(response => response.json())
        .then(movieDetails => {
            const productContainer = document.getElementById("movie-product");

            productContainer.innerHTML = `
            <div class="container">
            <div class="img-container">
                <img src="${movieDetails.image}" alt="poster">
            </div>
            <div class="movie-detailed">
                <h2>${movieDetails.title}</h2>
                <p>${movieDetails.description}</p>
                <p>Genre: ${movieDetails.genre}</p>
                <p>Released: ${movieDetails.released}</p>
                <p>Rating: ${movieDetails.rating}</p>
                <button>Add to cart</button>
            </div>
            </div>
            `;
        });
});