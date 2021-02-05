const Mysql = require('mysql');
const Model = require('./model.js');
const md5 = require('md5');


class LoginModel extends Model {

    ///////REGISTRATION PAGE //////////
    //Check all input fields meet proper guidelines.
    validateRegistration(req, res) {
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            req.session.error.push('Must be a valid email address.');
        }

        if (req.body.password.length < 4) {
            req.session.error.push('Password must be at least 4 characters');
        } else if (req.body.password !== req.body.password_confirmation) {
            req.session.error.push('Passwords must be matching');
        }

        return req.session.error.length;
    }

    async duplicateEmail(req, res){
        const query = "SELECT * FROM users WHERE email = ?";
        const value = req.body.email;

        const data = await this.executeQuery(query, value);

        if(data.length === 0){
            return false;
        }else{
            return true;
        }
    }

    //Add new user to the db
    createUser(req, res) {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;

        //sorts 'juice' into a shuffled salt
        const salt = ('juice').split('').sort(function () { return 0.5 - Math.random() }).join('');
        const password = md5(req.body.password + salt);


        const query = "INSERT INTO users (first_name, last_name, email, password, salt, admin, created_at, updated_at) VALUES (?,?,?,?,?,0,NOW(), NOW())";
        const values = [first_name, last_name, email, password, salt];

        const result = this.executeQuery(query, values);
    }

    ///////LOGIN PAGE //////////
     //Check all input fields meet proper guidelines.
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

    //Check if the account exists & validate password
    async checkCredentials(req, res) {
        const query = "SELECT email, password, salt FROM users WHERE email = ? LIMIT 1";
        const value = [req.body.email];

        // let result = this.executeQuery(query, value)
        const user = await this.executeQuery(query, value);
        
        const password = md5(req.body.password + user[0].salt);

        if (password == user[0].password) {
            return user;
        } else {
            return false;
        }
    }

}

const loginModel = new LoginModel;

module.exports = loginModel;