var createError = require('http-errors');
var express = require('express');
var os = require('os');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var formdata = require("express-form-data");
var mongoose = require("mongoose");
var UserModel = require("./models/User");
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
/**
 *        R o u t e r
 */
var authRouter = require("./routes/auth");
const { update } = require('./models/User');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(formdata.parse({
  uploadDir: os.tmpdir(),
  autoClean: true
}));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect('mongodb://localhost:27017/ArticleSystem')
  .then(function (result) {
    console.log("Success");
  })
  .catch(function (err) {
    console.log("Error");
  })

//Database Operation
// async function databaseOperation() {
//   //Insert the user in MongoDB database
//   const newUser = await UserModel.create({
//     email: 'strike10310522@gmail.com',
//     password: '123456',
//     name: 'strike',
//     gender: 'M'
//   });
//   //Find a single user
//   const firstUser = await UserModel.findOne({});
//   console.log(firstUser);
//   //update the user
//   const updateUser = await UserModel.findOne({ name: 'strike'});
//   updateUser.password = '987654';
//   updateUser.gender = 'F';
//   await updateUser.save(); //update the user
//   console.log(updateUser);

// }
// databaseOperation();

module.exports = app;
