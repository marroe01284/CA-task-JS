const carArray = JSON.parse(window.localStorage.getItem("squareEyesCart")) || [];
function displayCheckout() {
    // Initialize the checkoutSum and checkoutHTML variables
    let checkoutSum = 0;
    let checkoutHTML = ``;

    // Loop through each movie in carArray
    carArray.forEach((item, index) => {
        // Increment checkoutSum based on the price of the movie
        if (item.onSale) {
            checkoutSum += item.discountedPrice;
        } else {
            checkoutSum += item.price;
        }

        // Add HTML markup for the movie card
        checkoutHTML += `
            <li class="checkoutProductCard">
                <img class="movie-image" src="${item.image}" alt="${item.title}">
                <div class="checkoutProductCardDetails">
                    <h3>${item.title}</h3>
                    <span class="checkoutPreviousPrice">$ ${item.onSale ? item.discountedPrice : item.price}</span>
                    <button class="remove-btn" data-index="${index}">Remove</button> <!-- Add data-index attribute -->
                </div>
            </li>`;
    });

    // Add HTML markup for the total
    checkoutHTML += `<li class="checkoutTotal"><span>Total:</span><span>$${checkoutSum.toFixed(2)}</span></li>`;

    // Set the innerHTML of the order summary container
    document.querySelector(".order-summary").innerHTML = checkoutHTML;

    // Attach event listeners to remove buttons
    attachRemoveButtonListeners();
}

// Function to attach event listeners to remove buttons
function attachRemoveButtonListeners() {
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(this.dataset.index);
            carArray.splice(index, 1); // Remove the item from the carArray
            localStorage.setItem("squareEyesCart", JSON.stringify(carArray)); // Update local storage
            displayCheckout(); // Update the checkout display
        });
    });
}

// Call displayCheckout to initially display the checkout items
displayCheckout();

// const carArray = JSON.parse(window.localStorage.getItem("squareEyesCart")) || [];
// let checkoutSum = 0; // Initialize total sum to zero
// let checkoutHTML = ``;

// function displayCheckout() {
//     carArray.forEach((item, index) => {
//         if (item.onSale) {
//             checkoutSum += item.discountedPrice;
//             checkoutHTML += `
//                 <li class="checkoutProductCard">
//                     <img class="movie-image" src="${item.image}" alt="movie.image.alt">
//                     <div class="checkoutProductCardDetails">
//                         <h3>${item.title}</h3>
//                         <span class="checkoutPreviousPrice">$ ${item.discountedPrice}</span>
//                         <button class="remove-btn" data-index="${index}">Remove</button>
//                     </div>
//                 </li>`;
//         } else {
//             checkoutSum += item.price;
//             checkoutHTML += `
//                 <li class="checkoutProductCard">
//                     <img class="movie-image" src="${item.image}" alt="movie.image.alt">
//                     <div class="checkoutProductCardDetails">
//                         <h3>${item.title}</h3>
//                         <span class="checkoutPreviousPrice">$ ${item.price}</span>
//                         <button class="remove-btn" data-index="${index}">Remove</button>
//                     </div>
//                 </li>`;
//         }
//     });

//     checkoutHTML += `<li class="checkoutTotal"><span>Total:</span><span>${checkoutSum.toFixed(2)}</span></li>`;

//     document.querySelector(".order-summary").innerHTML = checkoutHTML;
// }

// // Call the displayCheckout function
// displayCheckout();

// document.querySelectorAll(".remove-btn").forEach(button => {
//     button.addEventListener("click", function() {
//         const index = parseInt(this.dataset.index);
//         carArray.splice(index, 1); // Remove item from carArray
//         localStorage.setItem("squareEyesCart", JSON.stringify(carArray)); // Update local storage
//         displayCheckout(); // Update the checkout display

//         // Remove the parent element (li) from the DOM
//         const parentLi = this.closest(".checkoutProductCard");
//         parentLi.remove();
//     });
// });




// export function displayCheckout(){
//     let checkoutSummary = document.querySelector(".checkout-summary");
//     let checkoutSum = 0;
//     let checkoutHTML =``
//     //Display items inside checkout summary
// cartArray.forEach((item)=>{
//     if(item.onSale) {
//         checkoutSum += item.discountedPrice;
//         checkoutHTML += `
//     <li class="checkoutProductCard">
//     <img src="${item.image.url}" alt="jacket.image.alt">
//     <div class="checkoutProductCardDetails">
//             <h3>${item.title}</h3>
//          <span class="checkoutPreviousPrice">${item.discountedPrice}</span>
//          </div>
//     </li>
//     `
//     }
//     if(!item.onSale){
//         checkoutSum += item.price;
//         checkoutHTML += `
//     <li class="checkoutProductCard">
//     <img src="${item.image.url}" alt="jacket.image.alt">
//     <div class="checkoutProductCardDetails">
//             <h3>${item.title}</h3>
//          <span class="checkoutPreviousPrice">${item.price}</span>
//          </div>

// </li>
//     `;
//     }

// })
//     checkoutHTML += `
//                     <li class="checkoutTotal"><span>Total:</span><span>${checkoutSum.toFixed(2 )}</span></li>`
//     checkoutSummary.innerHTML = checkoutHTML

// }

