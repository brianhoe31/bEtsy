//add user model
// const UserModel        = require("../models/user.model.js");

class UserController {

    index(req, res){
        res.render("../views/index");
    }

    products(req, res){
        res.render("../views/user/index");
    }

    product_show(req, res){
        res.render("../views/user/show");
    }

    cart(req, res){
        res.render("../views/user/cart/index");
    }

}

const userController = new UserController;

module.exports = userController;