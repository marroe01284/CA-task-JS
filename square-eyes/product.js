// window.localStorage.removeItem('squareEyesCart');
const carArray = JSON.parse(window.localStorage.getItem("squareEyesCart")) || []
const addToCartButton = document.querySelector(".add-btn")
const params = new URLSearchParams(window.location.search);
const movieID = params.get("id");
const cartCounter = document.querySelector(".cartNotification")
let selectedMovie;

    console.log(movieID);
    fetch(`https://api.noroff.dev/api/v1/square-eyes/${movieID}`)
        .then(response => response.json())
        .then(movieDetails => {
            const productContainer = document.getElementById("movie-product");
            selectedMovie = movieDetails
            console.log(selectedMovie)
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
                <button class="add-btn" type="submit">Add to cart</button>
            </div>
            </div>
            `;
        });

    

console.log(addToCartButton)
console.log(selectedMovie)
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
        carArray.push(selectedMovie);
        localStorage.setItem("squareEyesCart", JSON.stringify(carArray));
        updateCartCounter()
    }
});

function updateCartCounter() {
    const cartCounter = document.querySelector(".cartNotification");
    if (cartCounter) {
        const cartArrayLength = carArray.length;
        cartCounter.textContent = cartArrayLength.toString(); // Update the text content with the cart array length

        // Toggle the display style based on the cart array length
        if (cartArrayLength === 0) {
            cartCounter.style.display = "none"; // Hide the cart counter if the array is empty
        } else {
            cartCounter.style.display = "flex"; // Show the cart counter if the array has items
        }
    } else {
        console.error("Cart counter element not found.");
    }
}