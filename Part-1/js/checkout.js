document.addEventListener("DOMContentLoaded", function () {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var items = JSON.parse(localStorage.getItem("items"));
    var cartItemsContainer = document.getElementById("cart-items");
    var totalQuantityElement = document.getElementById("total-quantity");
    var totalQuantity = 0;
    var totalPrice = 0;

    cart.forEach(function (cartItem) {
        var item = items.find(function (item) {
            return item.id == cartItem.product_id;
        });
        if (item) {
            var cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            var itemPrice = item.price * cartItem.quantity;
            totalPrice += itemPrice;
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>Name: ${item.name}</p>
                    <p>Quantity: ${cartItem.quantity}</p>
                    <p>Price: $${itemPrice.toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalQuantity += cartItem.quantity;
        }
    });

    totalQuantityElement.textContent = totalQuantity;
    var totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
    totalPriceElement.id = "total-price"; // Add ID to the total price element
    cartItemsContainer.appendChild(totalPriceElement); // Append total price element to container

    var checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get items and session data from localStorage
        var items = JSON.parse(localStorage.getItem("items"));
        var session = JSON.parse(localStorage.getItem("session"));

        // Retrieve user's balance from session data
        var userBalance = session.money_balance || 0;

        // Calculate total price of items in the cart
        var totalCartPrice = 0;
        var cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach(function (cartItem) {
            var item = items.find(function (item) {
                return item.id == cartItem.product_id;
            });
            if (item) {
                totalCartPrice += item.price * cartItem.quantity;
                // Decrease the quantity of the item in localStorage
                var index = items.findIndex(function (item) {
                    return item.id == cartItem.product_id;
                });
                if (index !== -1) {
                    items[index].quantity -= cartItem.quantity;
                }
            }
        });

        if (totalCartPrice > userBalance) {
            alert("Insufficient balance. Please remove some items and come back.");
            window.location.href = "index.html";
            return;
        }

        // Deduct the total price from the user's balance
        session.money_balance -= totalCartPrice;
        localStorage.setItem("session", JSON.stringify(session));

        // Proceed with the order
        cart.forEach(function (cartItem) {
            var item = items.find(function (item) {
                return item.id == cartItem.product_id;
            });
            if (item) {
                var purchase = {
                    customer: session.username,
                    quantity: cartItem.quantity,
                };

                item.purchaseHistory.push(purchase);
            }
        });

        localStorage.setItem("items", JSON.stringify(items));

        // Clear the cart after successful order
        localStorage.removeItem("cart");

        alert("Order submitted successfully!");
        window.location.href = "index.html";
    });
});
