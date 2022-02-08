const socket = io();

const chatbox = document.getElementById('chatbox');
const input = document.getElementById('input');
const username = document.getElementById('username');
const button = document.getElementById('send');

//cia mano client code
function sendMessage(username, msg){
    socket.emit('message', username, msg);
}
//listening event 
socket.on('receivedMessage', (username, msg ) =>{


    console.log(`${username} : ${msg}`);
    const div = document.createElement('div');
    const usernameElement = document.createElement('span');
    const messageElement = document.createElement('span');

    usernameElement.innerText = username;
    messageElement.innerText = msg;

    usernameElement.classList.add('badge', 'bg-secondary');

    div.appendChild(usernameElement);
    div.appendChild(messageElement);
    chatbox.appendChild(div);
})

button.onclick = (e) => {
    sendMessage(username.value, input.value);    
    input.value = '';
}
