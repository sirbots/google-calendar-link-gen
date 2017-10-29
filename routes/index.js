var express = require('express');
var hbs = require('hbs');
var router = express.Router();
var fs = require('fs')
var app = express();


// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// register the partials
hbs.registerPartials(__dirname + '/../views/partials');


/* GET homepage */
router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Google Calendar Event Link Generator', layout: '/layouts/layout.hbs' });
});




module.exports = router;
