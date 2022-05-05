//Laboration 1

app.get('/', function(request, response) {

    var startsida = "index.html";
    
    const express = require('express');
    const jsDOM = require('jsdom');
    const fs = require('fs');

    let app = express();

    app.use('/public', express.static(__dirname + '/staic'));

    app.use(express.urlencoded( {extended : true}));

    app.listen(81, function() {
        console.log('Servern är igång!');
    });
/*
    app.get('/', function(request, response){
        console.log('En utskrift från get...');
        response.sendFile(__dirname + 'index.html');
    });

    app.post('/', function(request, response) {
        console.log('En utskrift från post...');
        
        fs.readFile(__dirname + 'index.html', function(error, data){
            if(error){
                console.log('fel');
            }
            else{
                let htmlCode = data;

                let serverDOM = new jsDOM.JSDOM(htmlCode);

                let section = serverDOM.window.document.querySelector('section');

                htmlCode = serverDOM.serialize();

                response.send(htmlCode);
            
            }
        })
    
    
    });
// response.sendFile(__dirname + '/static/html/index.html);
*/
});


