const ajaxWrapper = new AjaxWrapper();
const socket = io(ajaxWrapper.baseUrl);
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

async function getUserData() {
    try {
        const userData = await ajaxWrapper.getAuthData();
        return userData;
    } catch (err) {
        console.log("Error getting user data at chat room", err);
    }
}

async function joinChat() {
    const userData = await getUserData();
    const name = userData.user.userName;
    appendMessage(`Welcome to the chat room ${name}`);
    socket.emit('new-user', name);
}

function setupSocketListeners() {
    socket.on('chat-message', data => {
        appendMessage(`${data.name}: ${data.message}`, data.name === name);
    });

    socket.on('user-connected', name => {
        appendMessage(`${name} connected`);
    });

    socket.on('user-disconnected', name => {
        appendMessage(`${name} disconnected`);
    });
}

function setupMessageForm() {
    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            appendMessage(`You: ${message}`, true);
            socket.emit('send-chat-message', message);
            messageInput.value = '';
        }
    });
}

function appendMessage(message, isUserMessage) {
    const messageElement = document.createElement('div');
    const messageText = document.createElement('p');

    // Wrap the username part in a <strong> element
    const username = isUserMessage ? 'You:' : message.split(':')[0];
    const messageContent = isUserMessage ? message.substring(4) : message.substring(username.length + 1);

    const usernameElement = document.createElement('strong');
    usernameElement.textContent = username;

    messageText.appendChild(usernameElement);
    messageText.appendChild(document.createTextNode(messageContent));

    messageElement.appendChild(messageText);

    // Add 'message' class to the created div
    messageElement.className = 'message';

    // Add 'user-message' class for user's messages
    if (isUserMessage) {
        messageElement.classList.add('user-message');
    }

    messageContainer.appendChild(messageElement);
}


async function authStatus() {
    try {
        const userData = await ajaxWrapper.getAuthData();
        if (!userData.status) {
            alert("Only users can access the chat room");
            window.location = '../views/index.html';
        }
    } catch (err) {
        console.log('error when checking auth status', err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await authStatus();
    await joinChat();
    setupSocketListeners();
    setupMessageForm();
});
