const Model = require('./model.js');
const md5 = require('md5');
const { response } = require('express');


class LoginModel extends Model {
    constructor() {
        super();
    }
    ///////REGISTRATION PAGE //////////
    /* Check all input fields meet proper guidelines. */
    validateRegistration(req, res) {
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            req.session.error.push('Must be a valid email address.');
        }

        if (req.body.password.length < 5) {
            req.session.error.push('Password must be at least 4 characters');
        } else if (req.body.password !== req.body.password_confirmation) {
            req.session.error.push('Passwords must be matching');
        }

        return req.session.error.length;
    }

    /* Check if there's a duplicate email already existing. */
    async duplicateEmail(req, res, next) {
        const query = "SELECT * FROM users WHERE email = ?";
        const value = req.body.email;

        try {
            const data = await this.executeQuery(query, value);

            if (data.length === 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            next(err);
        }

    }

    /* Add new user to the database. */
    async createUser(req, res, next) {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;

        /* sorts 'juice' into a shuffled salt */
        const salt = ('juice').split('').sort(function () { return 0.5 - Math.random() }).join('');
        const password = md5(req.body.password + salt);

        let response_data = { status: false, result: {}, err: null };

        try {
            const query = "INSERT INTO users (first_name, last_name, email, password, salt, admin, created_at, updated_at) VALUES (?,?,?,?,?,0,NOW(), NOW())";
            const values = [first_name, last_name, email, password, salt];

            response_data = this.executeQuery(query, values);
            response_data.status = true;
        } catch (err) {
            response_data.err = err;
            response_data.message = "Error creating new user";
        }

    }

    ///////LOGIN PAGE //////////
    /* Check all input fields meet proper guidelines. */
    validateLogin(req, res) {
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            req.session.error.push("Enter a valid email");
        }
        if (req.body.password.length < 4) {
            req.session.error.push("Password must  be at least 4 characters");
        }

        return req.session.error.length;
    }

    /* Check if the account exists & validate password. */
    async checkCredentials(req, res) {
        let response_data = { status: false, result: {}, err: null };

        try {
            const query = "SELECT email, passwor, salt FROM users WHERE email = ? LIMIT 1";
            const value = [req.body.email];

            response_data.status = true;
            response_data.result = await this.executeQuery(query, value);

            if (!response_data.result) {
                return false;
            }

            const password = md5(req.body.password + response_data.result[0].salt);

            if (password !== response_data.result[0].password) {
                return false
            }
        } catch (err) {
            response_data.err = err;
            response_data.message = `Error #${response_data.err.errno}: Failed to Check Credentials`;
        }
        return response_data;
    }

}

const loginModel = new LoginModel;

module.exports = loginModel;