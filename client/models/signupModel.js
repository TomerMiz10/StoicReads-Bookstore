const baseUrl = 'http://localhost:3000';
const form = $('#signup-form');

form.submit((e) => {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const userName = $('#userName').val();
    const fullName = $('#fullName').val();
    const user = {email, password,userName,fullName};
    console.log(user);
    // $.ajax({
    //     url: baseUrl+'/auth/signup',
    //     type: 'POST',
    //     data: user,
    //     success: function(response) {
    //         console.log(response);
    //         window.location.href = 'login.html';
    //     },
    //     error: function(xhr, status, error) {
    //         console.log('Failed to signup:', error);
    //     }
    // });
})