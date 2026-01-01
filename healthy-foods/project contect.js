document.getElementById("loginbtn").addEventListener("click", function (event) {
    // 1. Prevent default form submission (in case the button is still type="submit")
    event.preventDefault(); 

    // 2. Gather form data values
    let firstName = document.getElementById("firstnameinp").value.trim();
    let lastName  = document.getElementById("lastnameinp").value.trim();
    let email     = document.getElementById("gemailinp").value.trim();
    let message   = document.getElementById("disinp").value.trim(); 
    
    // Check if any gender radio button is selected
    let genderSelected = document.querySelector('input[name="gender"]:checked');

    let missingFields = [];

    // 3. Check for empty fields
    if (firstName === '') {
        missingFields.push("First Name");
    }
    if (lastName === '') {
        missingFields.push("Last Name");
    }
    if (email === '') {
        missingFields.push("E-mail");
    }
    if (message === '') {
        missingFields.push("Description");
    }
    if (!genderSelected) {
        missingFields.push("Gender selection");
    }

    // 4. Send an ALARM if any fields are missing
    if (missingFields.length > 0) {
        let alertMessage = "🚨 Please fill out the following required fields:\n";
        alertMessage += missingFields.join('\n'); 
        alert(alertMessage);
        return; 
    }

    // =========================================================================
    // 5. NEW STEP: AJAX SUBMISSION
    // =========================================================================
    
    // 5a. Prepare the data payload to match the PHP script's expected names.
    // Note: Your JS calls it 'lastName', but the PHP script expects 'secondName'.
// Inside your AJAX setup in project contect.js:
// ... (Your validation checks for firstName, lastName, email, message)

    // If validation passes, proceed with AJAX
    
    // Create the data payload
    let formData = {
        firstName: firstName,
        secondName: lastName, // Must match $second variable in PHP
        email: email,
        message: message
    };

    $.ajax({
        url: 'project_contact.php', 
        type: 'POST',              
        data: formData,             // Sends the data payload
        dataType: 'json',          
        
        success: function(response) {
            if (response.success === true) {
                alert("✅ Success! Message sent and saved.");
                document.querySelector('form').reset(); 
            } else {
                alert("❌ Server Error: " + response.message);
            }
        },
        error: function() {
            alert("❌ Network Error. Check XAMPP and URL.");
        }
    });
});