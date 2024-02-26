const carArray = JSON.parse(window.localStorage.getItem("squareEyesCart")) || [];
function displayCheckout() {
    let checkoutSum = 0;
    let checkoutHTML = ``;

    carArray.forEach((item, index) => {
        if (item.onSale) {
            checkoutSum += item.discountedPrice;
        } else {
            checkoutSum += item.price;
        }
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

    checkoutHTML += `<li class="checkoutTotal"><span>Total:</span><span>$${checkoutSum.toFixed(2)}</span></li>`;
    document.querySelector(".order-summary").innerHTML = checkoutHTML;
    attachRemoveButtonListeners();
}

function attachRemoveButtonListeners() {
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.dataset.index);
            carArray.splice(index, 1);
            localStorage.setItem("squareEyesCart", JSON.stringify(carArray));
            displayCheckout();
        });
    });
}
displayCheckout();

