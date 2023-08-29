document.addEventListener('DOMContentLoaded', async function() {
    const navbarContainer = document.getElementById('navbar-container');
    const xhr =await new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            navbarContainer.innerHTML = this.responseText;
            setNavbarState();
        }
    };
    await xhr.open('GET', 'navbar.html', true);
    xhr.send();
});



const setNavbarState = async () => {
    try {
        const response = await fetch(baseUrl + '/auth/status', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if (data.status) {
            // User is logged in
            document.getElementById("signupNav").style.display = "none";
            document.getElementById("loginNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "block";
            document.getElementById("userProfile").style.display = "block";

            if (data.user.isAdmin) {
                // User is also an admin
                document.getElementById("adminNav").style.display = "block";
            }
        } else {
            document.getElementById("signupNav").style.display = "block";
            document.getElementById("loginNav").style.display = "block";
            document.getElementById("adminNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "none";
            document.getElementById("userProfile").style.display = "none";
            welcomeMessage.text('Welcome to Stoic Reads book store! Browse books from our collections! Sign up or login to make a purchase.');
        }
    } catch (error) {
        console.error('Error fetching user status:', error);
    }
};

document.addEventListener('DOMContentLoaded', setNavbarState);
