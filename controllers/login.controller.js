//require admin model

class LoginController {

    index(req, res) {
        res.render("../views/login/index.ejs");
    }

    new(req, res) {
        res.render("../views/login/new.ejs");
    }

    create(req, res) {
        //validate post request 
        //create a new user login 
    }

    validateLogin(req, res) {
        //validate login credentials
    }

    validateRegistration(req, res) {
        //validate new user registration form
    }

}

const loginController = new LoginController;

module.exports = loginController;