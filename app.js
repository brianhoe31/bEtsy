const Express       = require('express');
const App           = Express();
const BodyParser    = require('body-parser')
const CookieParser  = require('cookie-parser');
const Session       = require('express-session')

/* 
    DOCU: Session Provider 
    Set the session settings to be used
*/
let session_setting = {
    secret: 'rabbit',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

/*
DOCU: Setup the express app settings 
Specify the static path, view engine used and etc
*/
App.use(Session(session_setting));
App.set("view engine", "ejs");
App.set("views", __dirname + "/views");
App.use("/public", Express.static(__dirname + "/public"));
App.use(BodyParser.json({limit: '50mb'}));
App.use(BodyParser.urlencoded({limit: '50mb', extended: true}));

/* Routes */
const LoginRoutes       = require("./routes/login.routes");

/* User ROUTES */
App.use("/login", LoginRoutes);

App.listen(8888, function(){
    console.log('Your node js server is running on PORT: 8888');
});