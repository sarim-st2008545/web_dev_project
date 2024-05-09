document.addEventListener("DOMContentLoaded", function () {
    var session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
        window.location.href = "login.html";
        return;
    }

    var purchaseHistoryContainer = document.getElementById("purchase-history");

    var userTitle = document.getElementById("user-title");
    userTitle.textContent = "Purchase History for " + session.username;

    var session = JSON.parse(localStorage.getItem("session"));
    var users = JSON.parse(localStorage.getItem("users"));

    // Update money balance in users data from session
    if (session && session.userType === "customer") {
        var userIndex = users.customers.findIndex(function (customer) {
            return customer.username === session.username;
        });
        if (userIndex !== -1) {
            users.customers[userIndex].money_balance = session.money_balance;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    const userData = JSON.parse(localStorage.getItem("users"));

    const user = userData.customers.find((customer) => customer.username === session.username);

    if (user) {
        const userBalance = user.money_balance.toFixed(2);

        var userBalanceElement = document.getElementById("user-balance");
        userBalanceElement.textContent = `User Balance: $${userBalance}`;
    } else {
        console.error("User not found");
    }

    const customerId = session.customerId;
    const apiUrl = `http://localhost:3000/api/customers/${customerId}?stat=purchaseHistory`;

    // Fetch user's purchase history from the API
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user purchase history");
            }
            return response.json();
        })
        .then((userPurchaseHistory) => {
            // Render user's purchase history
            userPurchaseHistory.forEach((purchase) => {
                const purchaseHistoryItem = document.createElement("div");
                purchaseHistoryItem.classList.add("purchase-history-item");
                purchaseHistoryItem.innerHTML = `
          <img src="${purchase.image}" alt="${purchase.itemName}">
          <div>
              <p>Item: ${purchase.itemName}</p>
              <p>Quantity: ${purchase.quantity}</p>
          </div>
      `;
                purchaseHistoryContainer.appendChild(purchaseHistoryItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching user purchase history:", error);
        });

    var logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", function () {
        // Remove session and cart from localStorage
        localStorage.removeItem("session");
        localStorage.removeItem("cart");

        // Redirect to login page
        window.location.href = "login.html";
    });
});
