'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const io = require('socket.io')(http);

app.use(cookieParser());
app.use(express.urlencoded( { extended : true }));
app.use('/public', express.static(__dirname + '/public'));

let server = http.listen(82, () =>{
    console.log('server is running');
});

app.get('/', (req, res) => {
    
    let cookie = req.cookies.nickName;

    if(cookie===undefined){
        res.sendFile(__dirname + '/loggain.html');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + '/favicon.ico');
});

app.post('/index', function (req, res) {

    res.cookie('nickName', req.body.nickname, {maxAge: 1000*60*60*24});
    console.log('kaka satt');
    res.redirect('/index');
});

io.on('connection', function(socket){
    let cookieString = socket.handshake.headers.cookie;
    let cookielist = mymodule.parseCookies(cookieString);
    if(cookielist.nickName != null){
        socket.nickName = cookielist.nickName;
    }
    
    socket.on('newBackGround', function(data){
        io.emit('bytbild', {'imageid': data.backgroundid, 'time': mymodule.getTimeStamp(), 'name': socket.nickName, 'banana': 'yes'});
    })
});