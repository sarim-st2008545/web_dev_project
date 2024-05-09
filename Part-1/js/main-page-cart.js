initApp();

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const sessionData = JSON.parse(localStorage.getItem("session"));

        // Check if user is logged in and is a customer
        if (sessionData && sessionData.userType === "customer" && sessionData.loggedIn) {
            const productId = this.dataset.productId;
            const product = findProductById(productId);
            console.log(product);

            if (product) {
                const cartItem = {
                    product_id: productId,
                    quantity: 1, // Set initial quantity to 1
                    price: product.price, // Add the price of the product to the cart
                };

                addToCart(cartItem);
                console.log("Item added to cart successfully!");
            } else {
                alert("Product not found!");
            }
        } else {
            alert("Please log in as a customer to add items to the cart.");
        }
    });
});

// Function to find product by ID
function findProductById(productId) {
    console.log(productId);
    const items = JSON.parse(localStorage.getItem("items"));
    console.log(items);
    const product = items.find((item) => item.id == productId);
    console.log(product);
    return product;
}

// Function to add item to cart
function addToCart(item) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItemIndex = carts.findIndex((cartItem) => cartItem.product_id === item.product_id);

    if (existingItemIndex !== -1) {
        carts[existingItemIndex].quantity += 1;
    } else {
        carts.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(carts));

    initApp();
}
