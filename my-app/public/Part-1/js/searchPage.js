document.addEventListener("DOMContentLoaded", () => {
    // Function to convert items data to HTML markup
    function itemsToHTML(items) {
        return items
            .map(
                (product) => `<div class="product-card">
                <img src="${product.image}" alt="${product.name}" />
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="price">$ ${product.price}</p>
                    <p class="description">${product.description}</p>
                    <ul class="attributes">
                        <li><strong>Gender:</strong> ${product.gender}</li>
                        <li><strong>Type:</strong> ${product.type}</li>
                        <li>
                            <strong>Size:</strong>
                            <select class="size-dropdown">
                                  <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large" selected>Large</option>
                            </select>
                        </li>
                        <li><strong>Material:</strong> ${product.material}</li>
                    </ul>
                    <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>`
            )
            .join("");
    }

    // Retrieve filtered items and search query from localStorage
    const filteredItems = JSON.parse(localStorage.getItem("filteredItems"));
    const searchQuery = localStorage.getItem("searchQuery");

    // Update the page with the filtered items and search query
    const productGrid = document.querySelector(".product-grid");
    const searchQuerySpan = document.querySelector(".search-query");

    searchQuerySpan.innerHTML = searchQuery;
    productGrid.innerHTML = itemsToHTML(filteredItems);
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
                    alert("Item added to cart successfully!");
                } else {
                    alert("Product not found!");
                }
            } else {
                alert("Please log in as a customer to add items to the cart.");
            }
        });
    });

    // Clear localStorage to avoid data persisting across sessions
    localStorage.removeItem("filteredItems");
    localStorage.removeItem("searchQuery");
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
