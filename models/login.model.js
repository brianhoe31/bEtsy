const Mysql = require('mysql');
const md5 = require('md5');
const Model = require('./model.js');
const e = require('express');
const { resolveInclude } = require('ejs');


class LoginModel extends Model {

    ///////REGISTRATION PAGE //////////
    //Check all input fields meet proper guidelines.
    validateRegistration(req, res) {
        let error = [];
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            error.push('Must be a valid email address.');
        }

        if (req.body.password.length < 1) {
            error.push('Password must be at least 5 characters');
        } else if (req.body.password !== req.body.password_confirmation) {
            error.push('Passwords must be matching');
        }
        return error;
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
        let error = [];
        const email_regex = /\S+@\S+\.\S+/;

        if (!email_regex.test(req.body.email)) {
            error.push("Enter a valid email");
        }
        if (req.body.password.length < 1) {
            error.push("Password must  be at least 5 characters");
        }
        return error;
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

    //solution without async/await////
    // checkCredentials(req, res) {
    //     return new Promise((resolve, reject) =>{
    //         const query = "SELECT email, password, salt FROM users WHERE email = ? LIMIT 1";
    //         const value = [req.body.email];

    //         //added a resolve so that when this.executequery is resolved, it gets resolved out here and then sent back to controller
    //         resolve(this.executeQuery(query, value).then((sqlData) => {
    //             const password = md5(req.body.password + sqlData[0].salt);

    //             if(sqlData[0].password == password){
    //                 return sqlData;
    //             }else {
    //                 return "error";
    //             }
    //         })); 
    //     })
    // }

}

const loginModel = new LoginModel;

module.exports = loginModel;