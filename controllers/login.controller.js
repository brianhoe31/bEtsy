const LoginModel = require("../models/login.model.js");

class LoginController {
    /* Load login page with any errors from previously attempted login. */
    index(req, res) {
        const error = req.session.error;
        req.session.error = [];

        res.render("../views/login/index", { error: error });
    }

    /* Load new registration page with errors from previously attempted registration attempt. */
    new(req, res) {
        const error = req.session.error;
        req.session.error = [];

        res.render("../views/login/new", { error: error });
    }

    /** 
    *  DOCU: Validate that email is a valid email, password is more than 5 characters, and password matches password confirmation field.
    *  If there's an error, redirect to new registration page and output errors.
    *  If successful, check that email does not currently exist in database, and if it does, then return to new registration page with error message.
    *  If email is unique, then send user to login page.
    */
    async create(req, res) {
        const error = LoginModel.validateRegistration(req, res);
        if (error > 0) {
            res.redirect("/login/new");
        } else {
            const result = await LoginModel.duplicateEmail(req, res);
            if (result === false) {
                await LoginModel.createUser(req, res);
                res.redirect("/");
            } else {
                req.session.error.push("Email already exists");
                res.redirect("/login/new");
            }
        }
    }

    /** 
    *  DOCU: Validate email has an existing account & password matches email combination.
    *  Return error to login page with error if credentials are not valid.
    *  Send user to admin dashboard if credentials are correct.
    */

    async login(req, res) {
        const result = LoginModel.validateLogin(req, res);

        if (result > 0) {
            res.redirect("/login");
        } else {
            const user = await LoginModel.checkCredentials(req, res);

            if (user.result && !user.err) {
                res.redirect("/admin");
            } else if (user.result && user.err) {
                req.session.error.push(user.message);
                res.redirect("/login");
            } else {
                req.session.error.push('Email/password combination not valid.');
                res.redirect("/login");
            }
        }
    }
}

const loginController = new LoginController;

module.exports = loginController;