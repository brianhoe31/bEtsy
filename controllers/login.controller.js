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
        let error = LoginModel.validateRegistration(req, res);
        if(error.length > 0){
            res.render("../views/login/new", {error: error});
        }else {
            //add credentials to the database 
            //redirect to homepage with a message saying login successfully created
            res.redirect("/login/index");
        }
    }

    validateLogin(req, res) {
        //validate login credentials
    }

}

const loginController = new LoginController;

module.exports = loginController;