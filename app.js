const Express       = require('express');
const App           = Express();
const BodyParser    = require('body-parser')
const CookieParser  = require('cookie-parser');
const Session       = require('express-session')
const database      = require('./config/database.js');

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
const AdminRoutes       = require("./routes/admin.routes");
const UserRoutes        = require("./routes/user.routes");

/* User ROUTES */
App.use("/", UserRoutes);
App.use("/login", LoginRoutes);
App.use("/admin", AdminRoutes);


App.listen(3000, function(){
    console.log('Your node js server is running on PORT: 3000');
});