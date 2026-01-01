
let name = localStorage.getItem("cart_name");
let price = Number(localStorage.getItem("cart_price"));
let img = localStorage.getItem("cart_img");
let qty = Number(localStorage.getItem("cart_qty"));
let cartIsPopulated = !!name; // Check if the item name exists

const cartItemContainer = document.querySelector('.cartitem');
const checkoutBtn = document.getElementById("checkoutBtn");
const qtyInput = document.getElementById("qty");
const removeItemBtn = document.getElementById("removeItemBtn");


function updateDisplay() {
    if (cartIsPopulated) {
        
        document.getElementById("itemName").textContent = name;
        document.getElementById("itemPrice").textContent = price.toFixed(2);
        document.getElementById("itemImg").src = img;
        qtyInput.value = qty;
        
        updateTotal();
        
    } else {
        // Display empty cart message
        document.querySelector('h1').textContent = "Your Cart is Empty";
        if (cartItemContainer) {
             cartItemContainer.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <p>No items in your cart. <a href="project product.html" style="color: #D94948;">Start Shopping!</a></p>
                </div>
            `;
        }

        if (checkoutBtn) checkoutBtn.disabled = true;
    }
}

// --- Total Calculation Function ---
function updateTotal() {
    if (!cartIsPopulated) return;

    let q = Number(qtyInput.value);
    // Ensure quantity is not negative
    if (q < 1) {
        q = 1;
        qtyInput.value = 1;
    }

    let total = price * q;

    document.getElementById("totalPrice").textContent = total.toFixed(2);

    // Save current quantity and final total to local storage
    localStorage.setItem("cart_qty", q);
    localStorage.setItem("final_total", total.toFixed(2));
}

// --- Item Deletion Logic ---
if (removeItemBtn) {
    removeItemBtn.addEventListener("click", function () {
        // 1. Remove ALL cart-related items from localStorage
        localStorage.removeItem("cart_name");
        localStorage.removeItem("cart_price");
        localStorage.removeItem("cart_img");
        localStorage.removeItem("cart_qty");
        localStorage.removeItem("final_total"); 

        // 2. Update state and refresh the view
        cartIsPopulated = false;
        alert("Item removed from cart.");
        updateDisplay();
    });
}


// --- Event Listeners and Initial Load ---
if (cartIsPopulated) {
    qtyInput.addEventListener("input", updateTotal);
    
    checkoutBtn.addEventListener("click", function () {
        // Ensure total is updated right before checkout
        updateTotal(); 
        window.location.href = "payment.html";
    });
}


// Run on page load
updateDisplay();