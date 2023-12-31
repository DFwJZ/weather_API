var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ratelimit = require("express-rate-limit"); // apply rate limit to all requests

var indexRouter = require("./routes/index");
var registerRouter = require("./routes/register");
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

//built-in middleware for json
app.use(express.json());
//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//server static files from public folder
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/", indexRouter);
app.use("/register", registerRouter); // register route
app.use("/auth", authRouter); // authorization route

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//api request rate limiter
var apiLimiter = ratelimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
});

app.use(apiLimiter); // apply to all requests

// Start the server
console.log("Starting server...");

module.exports = app;
