let iconCart = document.querySelector(".cart_logo");
let closeCart = document.querySelector(".close-shopping-cart");

let checkoutButton = document.querySelector(".checkout-shopping-cart");

let body = document.querySelector("body");
let listProductHTML = document.querySelector(".product-grid");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".cart_logo span");
let runningTotalHTML = document.querySelector(".running-total");

let customerInfo = [];
let carts = [];

const getsessiondata = () => {
    customerInfo = JSON.parse(localStorage.getItem("session"));
};
getsessiondata();

console.log(customerInfo);

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
});
checkoutButton.addEventListener("click", () => {
    if (carts.length <= 0) {
        alert("Add an item to continue");
    } else {
        location.replace("../checkout.html");
    }
});

const addCartToMemory = () => {
    spanUpdate();
    localStorage.setItem("cart", JSON.stringify(carts));
};

listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains("plus") ? "plus" : "minus";
        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id === product_id);
    if (positionItemInCart >= 0) {
        if (type === "plus") {
            carts[positionItemInCart].quantity += 1;
            spanUpdate();
        } else {
            let valueChange = carts[positionItemInCart].quantity - 1;
            spanUpdate();
            if (valueChange > 0) {
                spanUpdate();
                carts[positionItemInCart].quantity = valueChange;
                spanUpdate();
            } else {
                spanUpdate();
                carts.splice(positionItemInCart, 1);
                spanUpdate();
            }
        }
        spanUpdate();
        addCartToMemory();
        addCartToHTML();
    }
};

/* ------------------------------------------------------------------------------------------------ */

const addCartToHTML = () => {
    listCartHTML.innerHTML = ``;
    let totalQuantity = 0;
    let totalPrice = 0;

    if (carts.length > 0) {
        carts.forEach((cart) => {
            let product = findProductById(cart.product_id);
            if (product) {
                totalQuantity += cart.quantity;
                totalPrice += product.price * cart.quantity;

                let newCart = document.createElement("div");
                newCart.classList.add("shop-cart-item");
                newCart.dataset.id = cart.product_id;

                newCart.innerHTML = `
                    <div class="image-shop-cart">
                        <img src="${product.image}" alt="" />
                    </div>
                    <div class="shop-cart-item-name">${product.name}</div>
                    <div class="item-price">$ ${product.price * cart.quantity}</div>
                    <div class="item-quantity">
                        <span class="minus"> < </span>
                        <span> ${cart.quantity} </span>
                        <span class="plus"> > </span>
                    </div>
                `;
                listCartHTML.appendChild(newCart);
            }
        });
    }

    runningTotalHTML.innerHTML = `Total: $ ${totalPrice.toFixed(2)}`;
    iconCartSpan.innerText = totalQuantity;
};

/* const findProductById = (productId) => {
    const items = JSON.parse(localStorage.getItem("items"));
    console.log(items.find((item) => item.id === parseInt(productId)));
    return items.find((item) => item.id === parseInt(productId));
};
 */

const spanUpdate = () => {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;

    carts.forEach((cart) => {
        totalQuantity += cart.quantity;
    });

    const spanElement = document.querySelector(".cart_logo span");
    spanElement.innerText = totalQuantity;
};

const initApp = () => {
    if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        spanUpdate();
        addCartToHTML();
    }
};

initApp();
