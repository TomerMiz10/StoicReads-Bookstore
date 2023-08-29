
const ajaxWrapper = new AjaxWrapper();
const renderHistory = async () => {
    const data = await ajaxWrapper.getAuthData();
    if(data.status) {
        console.log('data:', data);
    }
    else {
        alert('Error getting history data')
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', renderHistory);