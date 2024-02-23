const movieContainer = document.querySelector(".movie-container");
const filterButtonsContainer = document.getElementById("filterButtons");
const cartNotification = document.getElementById("cartNotification")
let cartItemCount = 0;
displayMovies();

function displayMovies() {
    fetch("https://api.noroff.dev/api/v1/square-eyes")
        .then(response => response.json())
        .then(movies => {
            renderMovies(movies);
            createGenreButtons(movies);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function renderMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const priceElement = movie.onSale ?
        `<span class="price-disc">${movie.price}</span>
        <span class="disc-price">${movie.discountedPrice}</span>` :
        `<span class="price">${movie.price}</span>`;

    movieCard.innerHTML = `
        <img class="poster" src="${movie.image}">
        <div class="movie-details">
            <h2 id="movieTitle">${movie.title}</h2>
            <span class="genre">Genre: ${movie.genre}</span>
            <span class="description">${movie.description}</span>
            <div class="price-rating">
                <span class="rating">Rating: ${movie.rating}</span>
                ${priceElement}
            </div>
            <a href="product.html?id=${movie.id}">
                <button class="buy">Watch Movie</button>
            </a>
        </div>
        </div>`;

    return movieCard;
}
function createGenreButtons(movies) {
    filterButtonsContainer.innerHTML = "";

    const genres = [...new Set(movies.map(movie => movie.genre))];
    genres.forEach(genre => {
        const button = document.createElement("button");
        button.textContent = genre;
        button.onclick = () => filterMovies(genre);
        filterButtonsContainer.appendChild(button);
    });
    const showAllButton = document.createElement("button");
    showAllButton.textContent = "Show All";
    showAllButton.onclick = () => displayAllMovies();
    filterButtonsContainer.appendChild(showAllButton);
}


function filterMovies(genre) {
    fetch("https://api.noroff.dev/api/v1/square-eyes")
        .then(response => response.json())
        .then(movies => {
            const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
            renderMovies(filteredMovies);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayAllMovies() {
    displayMovies();
}

