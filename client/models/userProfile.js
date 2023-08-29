
const ajaxWrapper = new AjaxWrapper();
const renderProfile = async () => {
    const data = await ajaxWrapper.getAuthData();
    if(data.status) {
        const user = data.user;
        document.getElementById('user-name').textContent = 'userName: ' + user.userName;
        document.getElementById('user-email').textContent = 'Email: ' + user.email;
        await renderHistory(user.userID)
    }
    else {
        alert('Error getting history data')
        window.location.href = 'index.html';
    }
}
const renderHistory = async (userID) => {
    const orders = await ajaxWrapper.getAllOrdersOfUser(userID);
    console.log('orders', orders);
}

document.addEventListener('DOMContentLoaded', renderProfile);