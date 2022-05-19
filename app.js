//Laboration 1
    'use strict';

    // används för att få tillgång till innehållet i "blogPosts.js"
    const blogPosts = require('./blogPosts.js');
    var inlagg = blogPosts.blogPosts;

    // läser in html-filerna som variabler
    var startsida = "index.html";
    var skriv = "skriv.html";
    
    // importerar express, jsdom, fs och body parser samt gör dem till konstanter
    const express = require('express');
    const jsDOM = require('jsdom');
    const fs = require('fs');
    const bodyParser = require('body-parser');
    const { response } = require('express');

    // tilldelar express variabeln app
    let app = express();

    app.use('/public', express.static(__dirname + '/public'));
    app.use(express.urlencoded( {extended : true}));

    // meddelande som visas när servern startar
    app.listen(81, function() {
        console.log('Servern är igång!');
    });

    app.get('/', function(request, response){

        console.log('En utskrift från get...');
        
        fs.readFile(__dirname + '/index.html', function(error, data) {
            if(error){
                console.log('fel');
            }
            else {

                let htmlCode = data;
                // skapar en virtuell DOM
                let serverDOM = new jsDOM.JSDOM(htmlCode);

                // letar upp elementet "section" via js-dom
                let section = serverDOM.window.document.querySelector('section');
                
                // skapar element där datat skrivs in
                for(let i = 0; i < inlagg.length; i++) {
                    
                    let div = serverDOM.window.document.createElement('div');

                    let h4 = serverDOM.window.document.createElement('h4');
                    h4.textContent = inlagg[i].nickName;
                    div.appendChild(h4);
                    
                    let h2 = serverDOM.window.document.createElement('h2');
                    h2.textContent = inlagg[i].msgSubject;
                    div.appendChild(h2);

                    let h6 = serverDOM.window.document.createElement('h6');
                    h6.textContent = inlagg[i].timeStamp;
                    div.appendChild(h6);

                    let p = serverDOM.window.document.createElement('p');
                    p.textContent = inlagg[i].msgBody;
                    div.appendChild(p);
                    
                    // lägger till section i div-elementet, som innehåller all information
                    section.appendChild(div);
                }
                // omvandlar datat till en textsträng
                htmlCode = serverDOM.serialize();

                // skickar response till klienten
                response.send(htmlCode);

            }
        });
    });

        
    app.get('/skriv', function(request, response) {

        response.sendFile(__dirname + '/skriv.html');
    });


    app.post('/skriv', function(request, response) {


            // skapar variabler för namn, ämne och inlägg
            var nickName = request.body.nickname;
            var subject = request.body.subject;
            var msgBody = request.body.msgbody;

            //felhantering för namn, ämne och message
            try {
                // om ämnet är mindre än 3 tecken långt sker en omdirigering till "Skriv inlägg"
                if(Object.keys(subject).length < 3 ) {
                    throw new Error('Ämne är för kort');
                }
                // om inlägget är mindre än 10 tecken långt sker en omdirigering till "Skriv inlägg"
                if(Object.keys(msgBody).length < 10) {
                        
                    throw new Error('meddelande är för kort');
                }
                // om namnet är mindre än 3 tecken långt sker en omdirigering till "Skriv inlägg"
                if(Object.keys(nickName).length < 3) {     
                    throw new Error('Inlägg är för kort');
                }
                // skapar ett objekt av "Date"
                let date = new Date().toISOString().split('T')[0];
                
                // skapar datumsträng för tidsstämpel på inlägg
                inlagg.push({
                    msgBody : request.body.msgbody,
                    subject : request.body.subject,
                    nickName : request.body.nickname,
                    timeStamp : date
                });
                // användaren återvänder till startsidan
                response.redirect('/');
            
        } catch(error) {
            // Det sker en omdiregering till skriv-sidan ifall kraven inte uppfylls
            console.log(error);
            response.redirect('/skriv');
        }

    });
     




