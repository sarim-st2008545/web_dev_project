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
const sellerId = JSON.parse(localStorage.getItem("session")).sellerId;

const addStock = document.querySelector("#submit");
addStock.addEventListener("click", addProductStock);

/* function addProductStock(event) {
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
        // stock = JSON.parse(localStorage.getItem("items")) || [];

        async function fetchDataFromAPI() {
            try {
                const response = await fetch("http://localhost:3000/api/products");
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return [];
            }
        }
        fetchDataFromAPI()
            .then((data) => {
                stock = data;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            }) || [];

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

        console.log(product);

        // Get existing stock from local storage
        // stock = JSON.parse(localStorage.getItem("items")) || [];

        async function updateStockFromAPI() {
            try {
                stock = await fetchDataFromAPI();
                console.log("stock " + stock);
            } catch (error) {
                console.error("Error fetching data:", error);
                stock = []; // Set stock to an empty array in case of error
            }
        }
        updateStockFromAPI();

        // Add new product to stock
        stock.unshift(product);

        // Save updated stock to local storage
        localStorage.setItem("items", JSON.stringify(stock));

        form.reset();

        // Display a success message
        alert("Product added to stock successfully!");
    };
} */

async function addProductStock(event) {
    event.preventDefault();
    event.returnValue = false;

    const form = document.querySelector("#productForm");
    const formData = new FormData(form);

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async function () {
        const base64Image = reader.result;
        formData.set("image", base64Image);
        formData.set("sellername", sellerName);
        formData.set("purchaseHistory", "[]");

        const product = {};
        formData.forEach((value, key) => {
            if (key === "purchaseHistory") {
                product[key] = JSON.parse(value);
            } else {
                product[key] = value;
            }
        });

        const correctFormatProduct = {};
        correctFormatProduct.name = product.name;
        correctFormatProduct.type = product.type;
        correctFormatProduct.price = parseFloat(product.price);
        correctFormatProduct.image = product.image;
        correctFormatProduct.material = product.material;
        correctFormatProduct.gender = product.gender;
        correctFormatProduct.color = product.color;
        correctFormatProduct.description = product.description;
        correctFormatProduct.quantity = parseInt(product.stock);
        correctFormatProduct.sellerId = sellerId;

        console.log(correctFormatProduct);

        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(correctFormatProduct),
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }

        form.reset();
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

async function updateItem(itemId, newQuantity) {
    const allItems = await fetchDataFromAPI();
    console.log(allItems);
    const index = allItems.findIndex((item) => item.id == itemId);
    allItems[index].quantity = newQuantity;

    const updatedItem = allItems[index];
    console.log(updatedItem);

    const response = await fetch(`http://localhost:3000/api/products/${itemId}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    console.log(data);
    displaySellerItems();
}

// Function to display seller items in the grid
async function displaySellerItems() {
    // const allItems = JSON.parse(localStorage.getItem("items"));
    const allItems = await fetchDataFromAPI();

    console.log("all-items", allItems);
    const sellerItems = filterItemsBySeller(allItems, sellerId);

    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = itemsToHTMLSellerView(sellerItems).join("");
}
function itemsToHTMLSellerView(items) {
    return items.map(
        (item) => `<div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-details">
            <h2 class="product-name">${item.name}</h2>
            <p class="seller-name">Sold by: ${sellerName}</p>
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
                <button class="update-btn" onClick="updateItem('${item.id}', document.getElementById('quantity${item.name}').value)">Update</button>
            </div>
        </div>
    </div>`
    );
}
async function displaySaleHistory() {
    const allItems = await fetchDataFromAPI();
    const sellerItems = filterItemsBySeller(allItems, sellerId);
    const productGridSaleHistory = document.querySelector(".product-grid-sale-history");

    const saleHistoryCards = await generateSaleHistoryCard(sellerItems);
    productGridSaleHistory.innerHTML = saleHistoryCards.join("");
}

async function generateSaleHistoryCard(items) {
    console.log("items in sale history");
    console.log(items);
    return Promise.all(
        items.map(async (item) => {
            const quantitySold = await fetchQuantitySold(item.id);
            const customerList = await fetchCustomerList(item.id);

            return `
		  <div class="sale-history-product-card">
			<img src="${item.image}" alt="${item.name}" />
			<div class="product-details">
			  <h2 class="product-name">${item.name}</h2>
			  <p class="price-text">Sold at <span class="price">$${item.price}</span></p>
			  <p class="stock-remaining-text">Stock Remaining : <span class="quantity">${item.quantity}</span></p>
			  <p class="stock-sold-text">Items Sold : <span class="quantity-sold">${quantitySold}</span></p>
			  <h2 class="customer-list-heading">Customer List</h2>
			  <ul class="customer-list">${customerList.join("")}</ul>
			</div>
		  </div>
		`;
        })
    );
}

async function fetchQuantitySold(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}?stat=quantity`);
        const quantitySold = await response.json();
        return quantitySold;
    } catch (error) {
        console.error("Error fetching quantity sold:", error);
        return 0;
    }
}

async function fetchCustomerList(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}?stat=customers`);
        const customerList = await response.json();
        return customerList.map((customer) => `<li class="customer-name">${customer}</li>`);
    } catch (error) {
        console.error("Error fetching customer list:", error);
        return [];
    }
}

function filterItemsBySeller(items, sellerId) {
    return items.filter((item) => item.sellerId === sellerId);
}

// Calculate the bank account balance of the seller

function calculateSellerBalance(items, sellerId) {
    const session = JSON.parse(localStorage.getItem("session"));
    return session.sellerBalance;
}

// const filteredItems = filterItemsBySeller(
// 	JSON.parse(localStorage.getItem("items")),
// 	sellerName
// );
const filteredItems = filterItemsBySeller(fetchDataFromAPI(), sellerName);
const sellerBalance = calculateSellerBalance(filteredItems, sellerId);

console.log(sellerBalance);

document.querySelector(".seller_Name").innerHTML = `${sellerName} (Balance: $${sellerBalance.toFixed(2)})`;

const usersData = JSON.parse(localStorage.getItem("users"));

const sellerIndex = usersData.sellers.findIndex((seller) => seller.username === sellerName);

// if (sellerIndex !== -1) {
// 	const filteredItems = filterItemsBySeller(
// 		JSON.parse(localStorage.getItem("items")),
// 		sellerName
// 	);

if (sellerIndex !== -1) {
    const filteredItems = filterItemsBySeller(fetchDataFromAPI(), sellerName);
    const sellerBalance = calculateSellerBalance(filteredItems, sellerName);

    usersData.sellers[sellerIndex].bank_account.bank_account_balance = sellerBalance;

    localStorage.setItem("users", JSON.stringify(usersData));
} else {
    console.error("Seller not found");
}
