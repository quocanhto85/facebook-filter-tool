const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./filter/db');
const app = express();
const http = require('http');
var template = require('./interface/template-main');  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'views')));

// app.get('/', (req, res) => {
//     res.render('index', {title: 'Fanpage Filter Tool'});
// });

 app.use(express.static(path.join(__dirname, '/assets')));

exports.get = (req, res) => {
    db.getData("page", (err, getdata) => {
        if(!err) {
          var strData = "";
          
          for(var i = 0; i < 50; i++) {
              strData = strData + "<li>" + getData.status + "</li>";
          }

          strData = "<ul>" + strData + "</ul>";
          res.writeHead(200, {
              'Content-Type': 'text/html'
          });
          res.write(template.build("Fanpage", "Displaying data", "<p>Status: " + strData));
          res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(template.build("<p> Error: " + err + "</p>"));
            res.end();
        }
    });
}


app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(template.build("Fanpage", "Displaying data", "Status:"));
    res.end();
});


app.listen(db.getPort(), () => { // Listening to port
    console.log(`Server running on port ${db.getPort()}`); 
});

