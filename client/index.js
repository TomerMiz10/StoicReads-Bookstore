//show navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            navbarContainer.innerHTML = this.responseText;
        }
    };
    xhr.open('GET', 'navbar.html', true);
    xhr.send();
});

//Todo: add filtering by category
 const handleFilterByCategory = (category) => {
     alert('category is : '+category);
 }

