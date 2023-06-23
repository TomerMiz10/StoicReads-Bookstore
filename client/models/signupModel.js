$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        var fullName = $('#fullname').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var age = $('#age').val();

        // Perform validation if needed
        if (age < 13) {
            alert('most be older than 13 to sign up!');
            return;
        }


        var userData = {
            fullName: fullName,
            email: email,
            password: password,
            age: age
        };

        // Send the user data to the server using AJAX or other methods
        // Example AJAX code:
        $.ajax({
            url: 'http://localhost:3000/users',
            type: 'POST',
            data: userData,
            success: function(response) {
                // Handle success response
                console.log('User created:', response);
                // Redirect to success page or perform other actions
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.log('Failed to create user:', error);
                // Display error message or perform other actions
            }
        });
    });
});