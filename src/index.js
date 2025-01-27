const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const sessions = require('express-session');
const Handlebars = require('handlebars');
const flash = require('connect-flash');
const passport = require('passport');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


// Initiliazations 
const app = express();
require('./database');
require('./config/passport');
// Settings 

app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    //-------------------------------------------------PARA OCUPAR LIBREMENTE MONGO
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');





// Middlewares 
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(sessions({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



// Routes 
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//app.use(require('./routes/publicacion'));

// Statics Files
app.use(express.static(path.join(__dirname,'public')));



// Server is listenning 
app.listen(app.get('port'),()=>{
    console.log('Server on port: ', app.get('port'));
});



















/*
La solucion mas optima es instalar el siguiente modulo

npm install @handlebars/allow-prototype-access

Luego de eso en el index.js principal  agregan lo siguiente:

const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
*/