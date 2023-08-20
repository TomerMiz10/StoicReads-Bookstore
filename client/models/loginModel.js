const baseUrl = 'http://localhost:3000';
const form = $('#login-form');
const emailError = $('#email-error');
const passwordError = $('#password-error');
const baseURL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch(baseUrl+'/auth/status', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if(data.status) {
        alert('You are already logged in! going back to main page');
        window.location.href = 'index.html';
    }});

form.submit((e) => {
    e.preventDefault();
    emailError.text('');
    passwordError.text('');
    const email = $('#email').val();
    const password = $('#password').val();
    const user = {email, password};
    $.ajax({
        url: baseUrl+'/auth/login',
        type: 'POST',
        data: user,
        xhrFields: {
            withCredentials: true
        },
        success:async function(response) {
            console.log(response);
            alert('You have successfully logged in!');
            window.location.href = 'index.html';
        },
        error: function(xhr, status, error) {
            const errors = xhr.responseJSON;
            if(errors.password)
                passwordError.text(errors.password);
            if(errors.email)
                emailError.text(errors.email);
        }
    });
})