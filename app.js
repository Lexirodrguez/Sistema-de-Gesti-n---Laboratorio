require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var pacientesRouter = require("./routes/rutapaciente");
var examenesRouter = require("./routes/rutaexamenes");
var resultadosRouter = require("./routes/rutaresultados");
var analisisRouter = require("./routes/rutaanalisis");
var authRouter = require("./routes/rutausuarios");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.locals.usuario = null;
    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            res.locals.usuario = decoded;
        } catch (e) {
            res.locals.usuario = null;
        }
    }
    next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use("/pacientes", pacientesRouter);
app.use("/examenes", examenesRouter);
app.use("/resultados", resultadosRouter);
app.use("/analisis", analisisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
