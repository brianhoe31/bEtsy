const { checkCredentials } = require("../models/login.model.js");
const LoginModel = require("../models/login.model.js");

class LoginController {

    index(req, res) {
        const error = req.session.error;
        req.session.error = [];

        res.render("../views/login/index", { error: error});
    }

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

    async login(req, res) {
        //validate login credentials

        const result = LoginModel.validateLogin(req, res);

        if (result > 0) {
            res.redirect("/login");
        }
        // const user = await LoginModel.checkCredentials(req, res);

        // if (user) {
        //     res.redirect("/admin");
        // } else {
        //     res.redirect("/login");
        // }
    }

}

const loginController = new LoginController;

module.exports = loginController;