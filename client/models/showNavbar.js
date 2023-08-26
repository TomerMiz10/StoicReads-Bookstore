
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

function updateCartCount(userId) {
    const cartItemCountElement = document.getElementById('cart-item-count');
    $.ajax({
        url: baseUrl + '/cart/getCart/' + userId,
        type: 'GET',
        success: function(cartItems) {
            cartItemCountElement.textContent = cartItems.length;
        },
        error: function(error){
            console.error('Error fetching cart. Please try again.', error);
        }
    });
}

window.onload = async () => {
    const response = await fetch(baseUrl + '/auth/status', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if (data.status) {
        updateCartCount(data.userId);
    }
    else {
        alert('Please login to view your cart')
        window.location.href = 'login.html';
    }
}