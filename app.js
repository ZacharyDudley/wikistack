const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = express.Router();
const router = require('./routes/index.js');
const models = require('./models/');
var app = express();

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views');

app.use(express.static('public'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);

models.db.sync({force: true})
.then(function(){
    app.listen(3000, function(){
       console.log('listening on port 3000');
    });

})
.catch(console.error);





