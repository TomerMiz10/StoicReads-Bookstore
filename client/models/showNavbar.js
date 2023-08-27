document.addEventListener('DOMContentLoaded', async function() {
    const navbarContainer = document.getElementById('navbar-container');
    const xhr =await new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            navbarContainer.innerHTML = this.responseText;
        }
    };
    await xhr.open('GET', 'navbar.html', true);
    xhr.send();
});