 const displayDesiredNavs = async () => {
    const response = await fetch(baseUrl + '/auth/status', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if (data.status) {
        document.getElementById('logout-button').style.display = 'block';
        document.getElementById('loginNav').style.display = 'none';
        document.getElementById('signupNav').style.display = 'none';
        document.getElementById('adminNav').style.display =  data.user.isAdmin ? 'block' : 'none';
    }
    else {
        document.getElementById('logout-button').style.display = 'none';
        document.getElementById('loginNav').style.display = 'block';
        document.getElementById('signupNav').style.display = 'block';
        document.getElementById('adminNav').style.display = 'none';
    }
}
window.addEventListener('DOMContentLoaded', async function(){
  await displayDesiredNavs();
});