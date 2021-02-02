const Express 			    = require("express");
const UserRoutes 		    = Express.Router();
const UserController        = require('../controllers/user.controller');

UserRoutes.get("/", function(req, res){
    UserController.index(req, res);
})

UserRoutes.get("/products", function(req, res){
    UserController.products(req, res);
})

UserRoutes.get("/products/:id", function(req, res){
    UserController.product_show(req, res);
})

UserRoutes.get("/cart", function(req, res){
    UserController.cart(req, res);
})



module.exports = UserRoutes;