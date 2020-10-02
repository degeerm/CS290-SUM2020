/*Basic Setup*/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main_layout'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4119);

var session = require('express-session');
app.use(express.static('public'));

var mysql = require('./dbcon.js');

/*Pages*/

/*Home Page*/
app.get('/',function(req,res){

  context = {};
  context.style='homeStyle.css';
  context.title = 'Home Page';
  res.render('home', context); 
});

/*Form Page*/
app.get('/form-page', function(req, res){
  context = {};
  context.style = 'formStyle.css';
  context.title = 'Form Page';
  res.render('form', context);
});

/*Used in conjunction with Form Page.
  Submits information to MYSQL database.*/
app.get('/insert-opinion', function(req, res, next){
  var context = {};
  console.log("IM HERE");
  mysql.pool.query('INSERT INTO `proj_opinion` (`name`, `opinion`, `longRes`) VALUES (?, ?, ?)', 
    [req.query.name, 
    req.query.opinion, 
    req.query.longRes], 
    function(err, result){
      if(err){
        next(err);
        return;
      }
      context.result = "Sent successfully";
      res.send(context);
    }); 
});

/*Misinformation Page*/
app.get('/misinformation', function(req, res){
  context = {};
  context.style = 'misInfoStyle.css';
  context.title = 'Misinformation';
  res.render('misinfo', context)

});

/*Information Page*/
app.get('/information', function(req, res){
  context = {};
  context.style = 'infoStyle.css';
  context.title = 'Information';
  res.render('info-page', context)

});

/*To be used for database testing*/
app.get('/reset-table',function(req,res,next){
  mysql.pool.query('DROP TABLE IF EXISTS proj_opinion', function(err){
    mysql.pool.query('CREATE TABLE proj_opinion('+
      'id INT PRIMARY KEY AUTO_INCREMENT,'+
      'name VARCHAR(255) NOT NULL,'+
      'opinion VARCHAR(255),'+
      'longRes VARCHAR(500))',
      function(err){
        res.redirect('/');
    })
  });
});

/*Error Pages*/
app.use(function(request,response){
  response.status(404);
  response.render('404');
});

app.use(function(error, request, response, next){
  console.error(error.stack);
  response.type('plain/text');
  response.status(500);
  response.render('500');
});

/*Console message for starting server*/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
