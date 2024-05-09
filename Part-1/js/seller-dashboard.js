const display = document.querySelector(".please");
display.style.display = "grid";

const sellNew = document.querySelector(".Sell-Product");
sellNew.addEventListener("click", addProduct);
function addProduct() {
    const display = document.querySelector(".please");
    display.style.display = "grid";

    const remove = document.querySelector(".Sale-History-Page");
    remove.style.display = "none";

    const remove2 = document.querySelector(".Current-Catalogue-Page");
    remove2.style.display = "none";
}

const history = document.querySelector(".Sale-History");
history.addEventListener("click", showHistory);
function showHistory() {
    const display = document.querySelector(".Sale-History-Page");
    display.style.display = "grid";

    const remove = document.querySelector(".Current-Catalogue-Page");
    remove.style.display = "none";

    const remove2 = document.querySelector(".please");
    remove2.style.display = "none";
}

const catalogue = document.querySelector(".Current-Catalogue");
catalogue.addEventListener("click", showCtalogue);
function showCtalogue() {
    const display = document.querySelector(".Current-Catalogue-Page");
    display.style.display = "block";

    const remove = document.querySelector(".Sale-History-Page");
    remove.style.display = "none";

    const remove2 = document.querySelector(".please");
    remove2.style.display = "none";
}

let stock = [];
const sellerName = JSON.parse(localStorage.getItem("session")).username;

const addStock = document.querySelector("#submit");
addStock.addEventListener("click", addProductStock);

function addProductStock(event) {
    event.preventDefault();
    event.returnValue = false;

    // Get the form element by its ID
    const form = document.querySelector("#productForm");

    // Create FormData object from the form
    const formData = new FormData(form);

    // Convert image to base64
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const base64Image = reader.result;

        // Add base64 image to the form data
        formData.set("image", base64Image);
        formData.set("sellername", sellerName);
        formData.set("purchaseHistory", "[]");

        // Get existing stock from local storage
        stock = JSON.parse(localStorage.getItem("items")) || [];

        // Find the maximum ID from existing items
        let maxId = 0;
        stock.forEach((item) => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });

        // Set the ID for the new product as an integer
        const newId = parseInt(maxId) + 1;
        formData.set("id", newId);

        const product = {};

        formData.forEach((value, key) => {
            if (key === "id") {
                product[key] = parseInt(value); // Convert id to integer
            } else if (key === "purchaseHistory") {
                product[key] = Array.isArray(value) ? value : []; // Store array if value is already an array, otherwise store empty array
            } else if (key === "stock") {
                product["quantity"] = value; // Store stock value as quantity
            } else {
                product[key] = value;
            }
        });

        // Get existing stock from local storage
        stock = JSON.parse(localStorage.getItem("items")) || [];

        // Add new product to stock
        stock.unshift(product);

        // Save updated stock to local storage
        localStorage.setItem("items", JSON.stringify(stock));

        form.reset();

        // Display a success message
        alert("Product added to stock successfully!");
    };
}

// ----------------------------------------------------------------------------------------

// Display name of the Seller
// const sellerName = JSON.parse(localStorage.getItem("session")).username;
document.querySelectorAll(".seller_Name").forEach((element) => {
    element.innerHTML = sellerName;
});

const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        const pageName = item.classList[1];
        showPage(`${pageName}-Page`);
    });
});

function showPage(pageName) {
    // Hide all seller pages
    const pages = document.querySelectorAll(".seller-Page");
    pages.forEach((page) => {
        page.style.display = "none";
    });

    // Show the selected page
    const selectedPage = document.querySelector(`.${pageName}`);
    if (selectedPage) {
        console.log(selectedPage);
        selectedPage.style.display = "block";
        if (selectedPage === document.querySelector(".Current-Catalogue-Page")) displaySellerItems();
        if (selectedPage === document.querySelector(".Sale-History-Page")) displaySaleHistory();
    }
}

// Log Out
const logOutButton = document.querySelector(".log-out-button");
logOutButton.addEventListener("click", () => {
    localStorage.removeItem("session");
    localStorage.removeItem("cart");
    window.location.href = "login.html";
});

function updateItem(itemName, newQuantity) {
    const allItems = JSON.parse(localStorage.getItem("items"));

    const index = allItems.findIndex((item) => item.name === itemName);

    allItems[index].quantity = newQuantity;
    console.log(allItems[index]);

    localStorage.setItem("items", JSON.stringify(allItems));
    displaySellerItems();
}

// Function to display seller items in the grid
function displaySellerItems() {
    const allItems = JSON.parse(localStorage.getItem("items"));
    console.log("all-items", allItems);
    const sellerItems = filterItemsBySeller(allItems, sellerName);

    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = itemsToHTMLSellerView(sellerItems).join("");
}

function displaySaleHistory() {
    const allItems = JSON.parse(localStorage.getItem("items"));
    const sellerItems = filterItemsBySeller(allItems, sellerName);

    const productGridSaleHistory = document.querySelector(".product-grid-sale-history");
    productGridSaleHistory.innerHTML = generateSaleHistoryCard(sellerItems).join("");
}

function itemsToHTMLSellerView(items) {
    return items.map(
        (item) => `<div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-details">
            <h2 class="product-name">${item.name}</h2>
            <p class="seller-name">Sold by: ${item.sellername}</p>
            <p class="price">$${item.price}</p>
            <p class="description">${item.description}</p>
            <ul class="attributes">
                <li><strong>Gender:</strong> ${item.gender}</li>
                <li><strong>Type:</strong> ${item.type}</li>
                <li><strong>Color:</strong> ${item.color}</li>
                <li><strong>Material:</strong> ${item.material}</li>
                <li><strong>Quantity:</strong> ${item.quantity}</li>

            </ul>
            <div class="quantity-update">
                <input type="number" class="inputNO" id="quantity${item.name}" name="quantity" placeholder="Enter new quantity">
                <button class="update-btn" onClick="updateItem('${item.name}', document.getElementById('quantity${item.name}').value)">Update</button>
            </div>
        </div>
    </div>`
    );
}

function generateSaleHistoryCard(items) {
    return items.map(
        (item) => `
        <div class="sale-history-product-card">
            <img src="${item.image}" alt="${item.name}" />
            <div class="product-details">
                <h2 class="product-name">${item.name}</h2>
                <p class="price-text">Sold at <span class="price">$${item.price}</span></p>
                <p class="stock-remaining-text">Stock Remaining : <span class="quantity">${item.quantity}</span></p>
                <p class="stock-sold-text">Items Sold : <span class="quantity-sold">${calculateQuantitySold(item)}</span></p>
                <h2 class="customer-list-heading">Customer List</h2>
                <ul class="customer-list">${generateCustomerList(item)}</ul>
            </div>
        </div>
    `
    );
}

function calculateQuantitySold(item) {
    console.log(item);
    return item.purchaseHistory.reduce((total, purchase) => total + purchase.quantity, 0);
}

function generateCustomerList(item) {
    return item.purchaseHistory.map((purchase) => `<li class="customer-name">${purchase.customer}</li>`).join("");
}

function filterItemsBySeller(items, sellerName) {
    return items.filter((item) => item.sellername === sellerName);
}

// Calculate the bank account balance of the seller

function calculateSellerBalance(items, sellerName) {
    console.log(items);
    let totalEarnings = 0;

    items.forEach((item) => {
        item.purchaseHistory.forEach((purchase) => {
            totalEarnings += purchase.quantity * item.price;
        });
    });

    return totalEarnings;
}

const filteredItems = filterItemsBySeller(JSON.parse(localStorage.getItem("items")), sellerName);
const sellerBalance = calculateSellerBalance(filteredItems, sellerName);

console.log(sellerBalance);

document.querySelector(".seller_Name").innerHTML = `${sellerName} (Balance: $${sellerBalance.toFixed(2)})`;

const usersData = JSON.parse(localStorage.getItem("users"));

const sellerIndex = usersData.sellers.findIndex((seller) => seller.username === sellerName);

if (sellerIndex !== -1) {
    const filteredItems = filterItemsBySeller(JSON.parse(localStorage.getItem("items")), sellerName);
    const sellerBalance = calculateSellerBalance(filteredItems, sellerName);

    usersData.sellers[sellerIndex].bank_account.bank_account_balance = sellerBalance;

    localStorage.setItem("users", JSON.stringify(usersData));
} else {
    console.error("Seller not found");
}
