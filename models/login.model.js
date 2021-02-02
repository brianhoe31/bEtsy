const Mysql         = require('mysql');
const md5           = require('md5');
const Model         = require('./model.js');


class LoginModel extends Model {

    validateRegistration(req, res) {
        let error = [];
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            error.push('Must be a valid email address.');
        }

        if (req.body.password.length < 5) {
            error.push('Password must be at least 5 characters');
        } else if (req.body.password !== req.body.password_confirmation) {
            error.push('Passwords must be matching');
        }

        return error;
    }

    createUser(req, res) {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = md5(req.body.password);


    }

}

const loginModel = new LoginModel;

module.exports = loginModel;