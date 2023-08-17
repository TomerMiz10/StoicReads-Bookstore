const baseUrl = 'http://localhost:3000';
const form = $('#signup-form');

form.submit((e) => {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const userName = $('#userName').val();
    const fullName = $('#fullName').val();
    const confirmPassword = $('#confirm-password').val();
    if(password !== confirmPassword){
        alert('passwords are not match');
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
            console.log(errors);
        }
    });
})