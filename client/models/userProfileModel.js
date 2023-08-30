
const ajaxWrapper = new AjaxWrapper();
const renderProfile = async () => {
    const data = await ajaxWrapper.getAuthData();
    if(data.status) {
        const user = data.user;
        document.getElementById('user-name').textContent = 'UserName: ' + user.userName;
        document.getElementById('user-email').textContent = 'Email: ' + user.email;
        await renderHistory(user._id);
    }
    else {
        alert('Error getting history data')
        window.location.href = 'index.html';
    }
}
const renderHistory = async (userID) => {
    const data = await ajaxWrapper.getAllOrdersOfUser(userID);
    const orders = data.ordersOfUser;
    const ordersList = document.getElementById('orders-list');
    if (!orders || orders.length === 0) {
        const noOrders = document.createElement('p');
        noOrders.textContent = 'No orders yet';
        ordersList.appendChild(noOrders);
        return;
    }
    console.log('orders', orders)
    for (const order of orders) {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'card mt-3';

        const orderBody = document.createElement('div');
        orderBody.className = 'card-body';

        const orderDate = document.createElement('p');
        orderDate.textContent = 'Order Date: ' + new Date(order.orderDate).toLocaleDateString();
        orderBody.appendChild(orderDate);

        const orderTotal = document.createElement('p');
        orderTotal.textContent = 'Total Price: ' + order.totalPrice;
        orderBody.appendChild(orderTotal);

        const orderItems = document.createElement('ul');
        for (const item of order.items) {
            const li = document.createElement('li');
            const bookDetails = await ajaxWrapper.getBookDetailsByObjectID(item.bookId);
            li.textContent = `Book name: ${bookDetails.title} | Quantity: ${item.quantity}`;
            orderItems.appendChild(li);
        }
        orderBody.appendChild(orderItems);

        orderDiv.appendChild(orderBody);
        ordersList.appendChild(orderDiv);
    }
}

document.addEventListener('DOMContentLoaded', renderProfile);