const baseUrl = 'http://localhost:3000';
const form = $('#login-form');
const emailError = $('#email-error');
const passwordError = $('#password-error');

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
        success: function(response) {
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