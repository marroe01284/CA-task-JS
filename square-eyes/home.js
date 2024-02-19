// const movieContainer = document.querySelector(".movie-container");




// function displayMovies (){
//     fetch("https://api.noroff.dev/api/v1/square-eyes")
//     .then(function (getResponse) {
//         return getResponse.json();
//     })
//     .then(result => {
//         let movies = result;
//         console.log(movies);
//         for(var i = 0; i < movies.length; i++){
//             if(movies[i].onSale === false){
//                 console.log(movies.id);
//                 movieContainer.innerHTML += `
//                 <div class="movie-card"> 
//                 <img class="poster" src="${movies[i].image}">
//                 <div class="movie-details">
//                 <h2 id="movieTitle">${movies[i].title}</h2>
//                 <span class="genre"> Genre: ${movies[i].genre}</span>
//                 <span class="description">${movies[i].description}</span>
//                 <div class="price-rating">
//                 <span class="rating"> Rating ${movies[i].rating}</span>
//                 <span class="price">${movies[i].price}</span>
//                 </div>
//                 <a href="product.html?id=${movies[i].id}">
//                 <button class="buy"> Buy movie</button>
//                 </a>
//                 </div>
//                 </div>`
//             }else{
//                 movieContainer.innerHTML += `
//                 <div class="movie-card"> 
//                 <img class="poster" src="${movies[i].image}">
//                 <div class="movie-details">
//                 <h2 id="movieTitle">${movies[i].title}</h2>
//                 <span class="genre"> Genre: ${movies[i].genre}</span>
//                 <span class="description">${movies[i].description}</span>
//                 <div class="price-rating">
//                 <span class="rating"> Rating ${movies[i].rating}</span>
//                 <span class="price-disc">${movies[i].price}</span>
//                 <span class="disc-price"> ${movies[i].discountedPrice}</span>
//                 </div>
//                 <a href="product.html?id=${movies[i].id}">
//                 <button class="buy"> Buy movie</button>
//                 </a>
//                 </div>
//                 </div>`
//             }
//         }
//     });
// }

// displayMovies()
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
    movieContainer.innerHTML = ""; // Clear existing content
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
                <button class="buy">Buy movie</button>
            </a>
            <button class="add-to-cart" onclick="addToCart('${movie.id}')">Add to Cart</button>
        </div>
        </div>`;

    return movieCard;
}
function createGenreButtons(movies) {
    // Clear existing buttons
    // filterButtonsContainer.innerHTML = "";

    const genres = [...new Set(movies.map(movie => movie.genre))];
    genres.forEach(genre => {
        const button = document.createElement("button");
        button.textContent = genre;
        button.onclick = () => filterMovies(genre);
        filterButtonsContainer.appendChild(button);
    });
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
function addToCart(movieId) {
    // You can implement the logic to add the movie to the shopping cart here
    console.log(`Added movie with ID ${movieId} to the cart`);
    cartItemCount++;
    updateCartNotification();
}
function updateCartNotification() {
    cartNotification.textContent = cartItemCount;
    cartNotification.classList.remove('hidden');
}

function hideCartNotification() {
    cartNotification.classList.add('hidden');
}
