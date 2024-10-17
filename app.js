var createError = require('http-errors');
var express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
// Importar middleware de autenticación a nivel global

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos

const { isAuthenticated } = require('./middlewares/authMiddleware');

// Configuración de las sesiones
app.use(session({
  secret: 'tuClaveSecreta', // Cambia esto por una clave secreta que solo tú conozcas
  resave: false, // No volver a guardar la sesión si no ha cambiado
  saveUninitialized: false, // No crear sesiones vacías
  cookie: { secure: false } // Debe ser true si usas HTTPS
}));

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

// se agregan las rutas custom
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

// esto no sabemos que onda si va aca o no
// var authMiddleware = require('./routes/authMiddleware');

// agregamos las dos custom
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);


// Página principal
app.get('/', (req, res) => {
  res.render('login');
});

//app.use('/', indexRouter);
//app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Cargar usuarios desde data.json
function loadUsers() {
  try {
      const data = fs.readFileSync('data/usuarios.json');
      return JSON.parse(data);
  } catch (error) {
      return [];
  }
}

module.exports = app;
