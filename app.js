var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//randomizer 
var csv = require("fast-csv");
// Require the 'request' module.
// Install it with `npm install --save request`.
var request = require('request');
var http = require('http');
var URL = "http://open.canada.ca/data/dataset/4ed351cf-95d8-4c10-97ac-6b3511f359b7/resource/d0df95a8-31a9-46c9-853b-6952819ec7b4/download/inventory.csv";
var tempArray = [];

function fast_csv_read_url(url) {
	// Let request return the document pointed to by the URL
	// as a readable stream, and pass it to csv.fromStream()
	csv.fromStream(request(url), {
			headers: true
		})
		//  .validate(function(data){
		//    return data.size > 100; //all persons must be under the age of 50
		//    })
		//  .on("data-invalid", function(data){
		//
		//  })
		.on("data", function(data) {
			tempArray.push(data);
		}).on("end", function() {
			var randomIndex = Math.floor(Math.random() * tempArray.length);
			console.log("Title: " + tempArray[randomIndex].title_en);
			console.log("Description: " + tempArray[randomIndex].description_en);
			console.log("Link: " + tempArray[randomIndex].portal_url_en);
		});
}



//test



 var something = function() {
    console.log('something')
  }
