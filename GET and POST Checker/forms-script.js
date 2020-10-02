/*Basic Setup*/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main_layout'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3999);


/*Get Request*/
app.get('/',function(request,response){
  var context = {};
  var params = [];
  for (var p in request.query){
    params.push({'pName':p, 'pValue':request.query[p]});
  }
  context.getData = params;
  response.render('get-page', context);
});

/*Post Request*/
app.post('/', function(request,response){
  var postParams = [];
  var getParams = [];
  var context = {};
  for (var p in request.body){
    postParams.push({'pName':p,'pValue':request.body[p]})
  }
  context.postData = postParams;

  for (var p in request.query){
    getParams.push({'pName':p, 'pValue':request.query[p]});
  }
  context.getData = getParams;
  response.render('post-page', context);
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
