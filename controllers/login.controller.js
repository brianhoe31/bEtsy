const LoginModel        = require("../models/login.model.js");

class LoginController {

    index(req, res) {
        res.render("../views/login/index");
    }

    new(req, res) {
        res.render("../views/login/new");
    }

    //create a new user login  
    create(req, res) {
        const error = LoginModel.validateRegistration(req, res);
        if(error.length > 0){
            res.render("../views/login/new", {error: error});
        }else {
            //add credentials to the database 
            LoginModel.createUser(req, res);
            //redirect to homepage with a message saying login successfully created
            res.redirect("/");
        }
    }

    login(req, res) {
        //validate login credentials
        const result = LoginModel.validateLogin(req, res);

        if(result == true){
            let sql = LoginModel.checkCredentials(req, res);
            console.log(sql);
        }else{
            res.render("../views/login/index", {error: "Email & Password combination is invalid."});
        }
    }

}

const loginController = new LoginController;

module.exports = loginController;