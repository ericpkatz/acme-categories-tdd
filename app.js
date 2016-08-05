var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({ cache: false });

var app = express();

module.exports = app;

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function(req, res, next){
  res.render('index', { title: 'Welcome to Acme Categories', categories: db.getCategories() });
});

app.use('/categories', require('./routes/categories'));
