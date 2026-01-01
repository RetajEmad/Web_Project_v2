// REQUIREMENT: Use jQuery for DOM manipulation
$(document).ready(function() {
    
    // Converted vanilla JS event listener to jQuery's .on()
    $("#addcartbtn").on("click", function (event) {
        
        // This stops the page from doing anything unexpected, like trying to submit a form, 
        // though it's not strictly necessary for this button.
        event.preventDefault(); 

        // Use jQuery for DOM lookups and content retrieval
        let name  = $("#pname").text().trim();
        let priceText = $("#pprice").text().trim();
        let img   = $("#pimage").attr('src'); 

        // Clean up price string
        let price = priceText.replace("EGP", "").replace(",", "").trim();

        // Use localStorage as before
        localStorage.setItem("cart_name", name);
        localStorage.setItem("cart_price", price);
        localStorage.setItem("cart_img", img);
        localStorage.setItem("cart_qty", 1);

        // Change URL handling to a proper relative path (removes the hardcoded 'file:///' path)
        window.location.href = "cart.html";
    });
});