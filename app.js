const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./filter/db');
// const data = require('./fetch');
// const dataFetch = data.find({});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

// app.get('/', function(req, res) {
//     dataFetch.exec((err, data) => {
//         if(err) throw err;
//         res.render('index', {title: 'Fanpage Filter Tool', records: data});
//     });    
// });

app.get('/', (req, res) => {
    res.render('index', {title: 'Fanpage Filter Tool'});
});

app.listen(db.getPort(), () => {
    console.log(`Server running on port ${db.getPort()}`); 
});
