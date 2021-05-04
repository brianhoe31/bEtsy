const LoginModel = require("../models/login.model.js");

class LoginController {
    //load login page
    index(req, res) {
        const error = req.session.error;
        req.session.error = [];

        res.render("../views/login/index", { error: error});
    }

    //load new registration page
    new(req, res) {
        const error = req.session.error;
        req.session.error = [];

        res.render("../views/login/new", { error: error });
    }

    //create a new user login  
    async create(req, res) {
        const error = LoginModel.validateRegistration(req, res);
        if (error > 0) {
            res.redirect("/login/new");
        } else {
            const result = await LoginModel.duplicateEmail(req, res);
            if (result === false) {
                LoginModel.createUser(req, res);
                res.redirect("/");
            } else {
                res.redirect("/login/new");
            }
        }
    }

    //validate login credentials
    async login(req, res) {
        const result = LoginModel.validateLogin(req, res);

        if (result > 0) {
            res.redirect("/login");
        } else {
            const user = await LoginModel.checkCredentials(req, res);

            if (user) {
                res.redirect("/admin");
            } else {
                req.session.error.push('Email/password combination not valid.');
                res.redirect("/login");
            }
        }
    }
}

const loginController = new LoginController;

module.exports = loginController;