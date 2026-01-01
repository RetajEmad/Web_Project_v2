document.addEventListener("DOMContentLoaded", function() {
    const totalAmountSpan = document.getElementById('total-amount');
    const paymentForm = document.getElementById('payment-form');
    const paymentMessage = document.getElementById('payment-message');
    
    // 1. Get total amount from localStorage
    const finalTotal = localStorage.getItem('final_total');
    
    if (finalTotal) {
        // Display the total amount
        totalAmountSpan.textContent = parseFloat(finalTotal).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        // Handle case where cart is empty or total is missing
        totalAmountSpan.textContent = '0.00';
        paymentMessage.textContent = 'Your cart is empty. Please add an item to checkout.';
        paymentMessage.className = 'message error';
        document.getElementById('pay-button').disabled = true;
    }

    // 2. Handle form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // --- Client-Side Validation ---
        const cardNumberInput = document.getElementById('cardNumber');
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            paymentMessage.textContent = 'Please enter a valid 16-digit card number.';
            paymentMessage.className = 'message error';
            return;
        }

        paymentMessage.textContent = 'Processing payment...';
        paymentMessage.className = 'message';
        document.getElementById('pay-button').disabled = true;

        // --- Prepare Data for Backend (Keys MUST match PHP $_POST) ---
        const formData = {
            cardName: document.getElementById('cardName').value.trim(),
            cardNumber: cardNumberInput.value,
            expiry: document.getElementById('expiry').value, 
            cvv: document.getElementById('cvv').value        
        };

        // --- AJAX Call to PHP Backend (Replaces setTimeout) ---
        $.ajax({
            url: 'save_card_data.php', 
            type: 'POST',              
            data: formData,             
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // **Critical Success Action: Clear the cart and local storage data**
                    localStorage.removeItem('cart_name');
                    localStorage.removeItem('cart_price');
                    localStorage.removeItem('cart_img');
                    localStorage.removeItem('cart_qty');
                    localStorage.removeItem('final_total');
                    
                    paymentMessage.textContent = '✅ Payment Successful! Data Logged (ID: ' + response.log_id + '). Redirecting...';
                    paymentMessage.className = 'message success';
                    
                    // Redirect user to the homepage after 3 seconds
                    setTimeout(() => {
                        window.location.href = "project home.html"; 
                    }, 3000);

                } else {
                    paymentMessage.textContent = '❌ Logging Failed: ' + response.message;
                    paymentMessage.className = 'message error';
                    document.getElementById('pay-button').disabled = false;
                }
            },
            error: function(xhr, status, error) {
                paymentMessage.textContent = '❌ Network Error. Could not connect to server.';
                paymentMessage.className = 'message error';
                document.getElementById('pay-button').disabled = false;
            }
        });
    });
});