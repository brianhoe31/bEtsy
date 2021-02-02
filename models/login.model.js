const Mysql = require('mysql');
const md5 = require('md5');
const Model = require('./model.js');
const e = require('express');
const { resolveInclude } = require('ejs');


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

    validateLogin(req, res) {
        let error = [];
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            error.push('Must be a valid email address.');
        }
        if (req.body.password.length < 5) {
            error.push('Password must be at least 5 characters');
        }

        if (error.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    checkCredentials(req, res){
        const query = "SELECT email, password, salt FROM users WHERE email = ?";
        const value = [req.body.email];
        
        let result = this.executeQuery(query, value).then((sqlData) => {
            const password = md5(req.body.password + sqlData[0].salt);

            console.log(password);
            console.log('STORED PASSWORD: ' + sqlData[0].password)
            if (sqlData[0].password == password) {
                resolve(sqlData);
            }else {
                reject("Error: doesn't exist");
            }
        });
        return result;
    }

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
}

const loginModel = new LoginModel;

module.exports = loginModel;