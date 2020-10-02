/*Setting up all required packages*/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'mainLayout'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 3567);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var session = require('express-session');
app.use(express.static('public'));

var mysql = require('./dbcon.js');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/*Get a list of workouts from the rows. To be used to get usable
  data from pool queries.*/
function getWorkoutsFromRows(rows, stringOrNot){
  var newWorkouts = [];
  for(var exercise in rows){
    var newWorkout = {
      "name": rows[exercise].name, 
      "reps": rows[exercise].reps, 
      "weight": rows[exercise].weight, 
      "date":rows[exercise].date, 
      "id":rows[exercise].id
    };
    
    if (stringOrNot){
      /*Changes the boolean value to a string for formatting for
      user if its for home page for LBS*/
      if(rows[exercise].lbs){
        newWorkout.lbs = "lbs";
      }
      else{
        newWorkout.lbs = "kg";
      }
      
      /*Changes the date value to MM-DD-YYYY if date exists*/
      if (newWorkout.date != '0000-00-00'){
        newWorkout.date = newWorkout.date.toString();
        var datearray = newWorkout.date.split("-");
        newWorkout.date = datearray[1] + '/' + datearray[2] + '/' + datearray[0];
      /*Change the date value to None if no date exists.*/
      }else{
        newWorkout.date = "None";
      }
    }else{
      /*Regularly send LBS and date otherwise since its not for
      formatting*/
      newWorkout.lbs = rows[exercise].lbs;
    }
    newWorkouts.push(newWorkout);
  }
  return newWorkouts; 
}
 
/*Home Page (get request)*/
app.get('/', function(req, res, next){
  var context = {};
  /*If the user is updating information*/
  if (req.query.id){
    var context = {};
    mysql.pool.query('SELECT * FROM `exercises` WHERE id=?',
    [req.query.id], function(err, rows, fields){
      if(err){       
        next(err);
        return;
      }
      var list = [];
      list = getWorkoutsFromRows(rows, false);
      context.oldWorkout = list[0];
      context.title = "Update";
      context.style = "updatestyle.css"
      res.render("update", context);
    });

  /*If you're just rendering the home page*/
  }else{
    /*SELECT all existing items in database*/
    mysql.pool.query('SELECT * FROM exercises', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      var newWorkouts = [];
      newWorkouts = getWorkoutsFromRows(rows, true);    

      context.exercises = newWorkouts;
      context.style = "homestyle.css";
      context.title = "Home";
      res.render("home", context);
    });
  }
});

/*Home page (post)*/
app.post('/', function(req, res, next){
  var context = {};
  var addPost = require('./public/javascript/rowScript');
  /*Add all exercises in post request to table*/
  var listExercises = req.body.exercises;

  for (var i = 0; i < listExercises.length; i++){
    addPost.addNewPost(listExercises[i]);
  }
  mysql.pool.query('SELECT * FROM exercises', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    var newWorkouts = [];
    newWorkouts = getWorkoutsFromRows(rows, true);    

    context.exercises = newWorkouts;
    res.send(context);
  });
});

/*Inserting a workout*/
app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query('INSERT INTO `exercises` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)', 
    [req.query.name, 
    req.query.reps, 
    req.query.weight, 
    req.query.date, 
    req.query.measurement], 
    function(err, result){
      if(err){
        next(err);
        return;
      } 
    context.insertId = result.insertId;
    res.send(JSON.stringify(context));
  });
});

/*Used on the update page to decide what information to
  keep*/
app.get('/update', function(req, res, next){
  var context = {};

  /*Get all of the old workouts*/
  mysql.pool.query("SELECT * FROM `exercises` WHERE id=?", 
  [req.query.id], function(err, result){
    if(err){       
      next(err);
      return;
    }
    var oldValues = result[0]

    if (req.query.name ===""){
      req.query.name = oldValues.name;
    }
    /*turns check into a boolean value*/
    if(req.query.measurement === "on"){
      req.query.measurement = "1";
    }
    else{
      req.query.measurement = "0";
    }

    /*Update values IFF new value is different*/
    mysql.pool.query('UPDATE `exercises` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', 
    [req.query.name || oldValues.name, 
    req.query.reps || oldValues.reps, 
    req.query.weight || oldValues.weight, 
    req.query.date || oldValues.date, 
    req.query.measurement, 
    req.query.id],
    function(err, result){
      /*Go back to homepage to render results*/  
      res.redirect('/');
    });
  });
});

/*Delete a workout*/
app.get('/delete-workout', function(req, res, next) {
  var context = {};
  mysql.pool.query('DELETE FROM `exercises` WHERE id = ?', 
  [req.query.id],function(err, result){
    res.send(JSON.stringify(context));
  });
});

/*Reset Table Function*/
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query('DROP TABLE IF EXISTS exercises', function(err){
    mysql.pool.query('CREATE TABLE exercises('+
      'id INT PRIMARY KEY AUTO_INCREMENT,'+
      'name VARCHAR(255) NOT NULL,'+
      'reps INT,'+ 'weight INT,'+'date DATE,'+
      'lbs BOOLEAN)',
      function(err){
        context.results = "Table reset";
        context.style = "homestyle.css";
        context.title = "Home";
        res.render('home',context);
    })
  });
});

/*Error Pages*/
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

/*Print message to port when site is up and running*/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
