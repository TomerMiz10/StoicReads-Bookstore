const baseUrl = 'http://localhost:3000';
const form = $('#signup-form');
const confirmPasswordError = $('#confirm-password-error');
const emailError = $('#email-error');
const passwordError = $('#password-error');
const userNameError = $('#userName-error');

form.submit((e) => {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const userName = $('#userName').val();
    const fullName = $('#fullName').val();
    const confirmPassword = $('#confirm-password').val();
    confirmPasswordError.text('');
    emailError.text('');
    passwordError.text('');
    userNameError.text('');
    if(password!==confirmPassword){
        confirmPasswordError.text('passwords do not match');
        return;
    }
    const user = {email, password,userName,fullName};
    console.log(user);
    $.ajax({
        url: baseUrl+'/auth/signup',
        type: 'POST',
        data: user,
        success: function(response) {
            console.log(response);
            alert('You have successfully signed up! now you will redirect to login page');
            window.location.href = 'login.html';
        },
        error: function(xhr, status, error) {
            const errors = xhr.responseJSON;
            if(errors.password)
                passwordError.text(errors.password);
            if(errors.email)
                emailError.text(errors.email);
            if(errors.userName)
                userNameError.text(errors.userName);
        }
    });
})