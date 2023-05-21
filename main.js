// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close")

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
})

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
})

// Start when the document is ready 
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}
//  ================= START =======================
function start() {
    addEvents();
}
//  ============ UPDATE & RERENDER===============
function update() {
    addEvents();
    updateTotal();
}
//  ============ ADD EVENTS ===============
function addEvents() {
    // REMOVE ITEMS FROM CART 
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);

    })
    // CHANGE ITEM QUANTITY 
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity)
    })

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart")
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    })
    

    // Buy order 
    const buy_btn = document.querySelector(".btn-buy")
    buy_btn.addEventListener("click", handle_buyOrder);
}

// ==================HANDLE EVENT FUNCTION =====================
let itemsAdded = []


function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price, imgSrc,

    };

    // handle item is already exist

    if (itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    //  Add product to cart
    let cartBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();

}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-tittle").innerHTML)
    alert("Item deleted ");

    update();
}
function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer
    update();

}
function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is no order to place yet \n Please make an order first.")
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your Order is Placed Successfully :) ");
    itemsAdded = [];

    update();
}



// =========== UPDATE & RENDER FUNCTION ===============
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price")
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    // Keep 2 digits after the decimal point 
    total = total.toFixed(2);

    totalElement.innerHTML = total;
}

// ========== HTML COMPONENTS =============== 
function cartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
    <img src=${imgSrc} alt="Image" />
    <div class="detaile-box">
        <div class="cart-product-tittle">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove Cart-->
    <i class='bx bxs-trash-alt cart-remove'></i>
</div>
    `

}

