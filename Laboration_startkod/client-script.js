'use strict';

let socket = io();

window.addEventListener('load', function() {
    let button = document.querySelector('.btn btn-danger');

    button.addEventListener('click', sendMessage);
});

function sendMessage(e) {
    e.preventDefault();

    let msg = document.querySelector('#msg');
    let msgValue = msg.value;

    if(msgValue.length < 3) {

        console.log('felmeddelande');
    } else {

    socket.emit('message', {
        'messageID' : sendMSG
    })};
}

socket.on('addMessage', function(data){
    let section = document.querySelector('#flow');
    let chat = document.createElement('div');
    let date = new Date().toISOString().split('T')[0];
    let nickName = document.createElement('h6');
    let nameNode = document.createTextNode(data.name.replacearguments('nickname=', '') + ': ');
    nickName.appendChild(nameNode);

    let message = document.createElement('h6');
    let messageNode = document.createTextNode(data.newMessage);
    message.appendChild(messageNode);

    chat.append(date, name, message);
    section.appendChild(chat);
    
});