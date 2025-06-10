// Data for items (could be fetched from an API)
const products = [
    { id: 1, name: "Zara Jeans", price: 20.00 },
    { id: 2, name: "Polo Shirt", price: 23.00 },
   
];

// Cart array to store added items
let cart = [];

// Select DOM elements
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");
const cartPopup = document.getElementById("cart-popup");
const cartButton = document.getElementById("cart-btn");
const closeCartButton = document.getElementById("close-cart");

// Function to update cart and total
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    // Loop through cart items and display them
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
            <span>Quantity: ${item.quantity}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>`;
        cartItems.appendChild(listItem);
        total += item.price * item.quantity;
    });

    // Update total price
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id == productId);

    if (existingProduct) {
        // Increase the quantity if the product is already in the cart
        existingProduct.quantity++;
    } else {
        // Add new product to the cart with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Event listener for Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        const productId = this.closest(".product").getAttribute("data-id");
        addToCart(productId);
    });
});

// Event listener for Remove Item buttons in the cart
cartItems.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-item")) {
        const productId = event.target.getAttribute("data-id");

        // Find the product in the cart
        const product = cart.find(item => item.id == productId);

        if (product.quantity > 1) {
            // Decrease the quantity if there are more than 1 in the cart
            product.quantity--;
        } else {
            // Remove the product from the cart if the quantity is 1
            cart = cart.filter(item => item.id != productId);
        }

        updateCart();
    }
});

// Event listener for Checkout button
checkoutButton.addEventListener("click", function() {
    if (cart.length > 0) {
        alert(`Checkout complete! Total: $${totalElement.innerText.split('$')[1]}`);
        cart = [];
        updateCart();
        closeCart();
    } else {
        alert("Your cart is empty!");
    }
});

// Event listener to open cart popup
cartButton.addEventListener("click", function() {
    cartPopup.style.display = "block";
});

// Event listener to close cart popup
closeCartButton.addEventListener("click", function() {
    cartPopup.style.display = "none";
});
