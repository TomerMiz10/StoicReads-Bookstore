// Define redirectToLogin function in the global scope
function redirectToLogin() {
    window.location.href = `${baseUrl}/login`;
}

$(document).ready(function() {
    const signUpButton = $('#sign-up-button');
    const loginButton = $('#login-button');

    // Function to fetch the authentication status from the backend
    function getAuthenticationStatus() {
        return $.ajax({
            url: baseUrl + '/auth',
            type: 'GET',
            dataType: 'json'
        }).then(data => data.isAuthenticated);
    }

    // Function to update the navbar buttons based on authentication status
    function updateNavbarButtons() {
        getAuthenticationStatus().then(function(authenticated) {
            console.log(authenticated);
            if (authenticated) {
                signUpButton.css('display', 'none');
                loginButton.css('display', 'none');
            } else {
                signUpButton.css('display', 'block');
                loginButton.css('display', 'block');
            }
        });
    }

    // Update the navbar buttons when the DOM is ready
    updateNavbarButtons();

    // Event delegation approach to handle click event on login button
    $(document).on("click", "#login-button", function(e) {
        e.preventDefault();
        redirectToLogin();
    });
});
