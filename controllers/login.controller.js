const { checkCredentials } = require("../models/login.model.js");
const LoginModel = require("../models/login.model.js");

class LoginController {

    index(req, res) {
        res.render("../views/login/index");
    }

    new(req, res) {
        res.render("../views/login/new");
    }

    //create a new user login  
    create(req, res) {
        const error = LoginModel.validateRegistration(req, res);
        if (error.length > 0) {
            res.render("../views/login/new", { error: error });
        } else {
            //add credentials to the database 
            LoginModel.createUser(req, res);
            //redirect to homepage with a message saying login successfully created
            res.redirect("/");
        }
    }

    async login(req, res) {
        //validate login credentials
        const result = LoginModel.validateLogin(req, res);

        if (result.length > 0) {
            res.render("../views/login/index", { error: result });
        } else {
            //check if the email exists & if the password matches
            //if it doesn't, then return error 'email/password don't match'
            let user = await LoginModel.checkCredentials(req, res);

            if (user) {
                res.redirect("/admin");
            } else {
                res.render("../views/login/index", { error: ['Email/password do not match.'] });
            }
        }
    }


    //solve with .then rather than async/await
    // async login(req, res){
    //     const result = LoginModel.validateLogin(req, res);

    //     if(result.length > 0){
    //         res.render("../views/login/index", {error: result});
    //     } else {
    //         LoginModel.checkCredentials(req,res).then((data) =>{
    //             console.log('Controller:', data);
    //         })
    //     }
    // }
}

const loginController = new LoginController;

module.exports = loginController;