
const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username');

let guestName = '';

usernameInput.addEventListener('change', function () {
    guestName = usernameInput.value.trim() || 'Guest';
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    guestName = usernameInput.value.trim() || 'Guest';

    socket.emit('chat message', {
        user: guestName,
        text: message
    });

    input.value = '';
});

socket.on('chat message', function (data) {
    const messageElement = document.createElement('div');

    messageElement.textContent = `${data.user}: ${data.text}`;
    messageElement.style.padding = '10px';
    messageElement.style.marginBottom = '8px';
    messageElement.style.background = '#252530';
    messageElement.style.borderRadius = '8px';

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('chat notification', function (message) {
    const notification = document.createElement('p');

    notification.textContent = message;
    notification.style.textAlign = 'center';
    notification.style.color = '#a1a1aa';
    notification.style.fontSize = '13px';

    messages.appendChild(notification);
    messages.scrollTop = messages.scrollHeight;
});