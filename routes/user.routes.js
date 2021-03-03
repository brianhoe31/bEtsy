const Express 			    = require("express");
const UserRoutes 		    = Express.Router();
const UserController        = require('../controllers/user.controller');

UserRoutes.get("/", function(req, res){
    UserController.index(req, res);
})

UserRoutes.get("/products", function(req, res){
    UserController.products(req, res);
})

UserRoutes.get("/about", function(req, res){
    UserController.about(req, res);
})

UserRoutes.get("/products/:category", function(req, res){
    UserController.products_show_category(req, res);
})

UserRoutes.get("/products/shop/:id", function(req, res){
    UserController.product_show(req, res);
})

UserRoutes.post("/products/shop/:id", function(req, res){
    UserController.product_add_cart(req, res);
})

UserRoutes.get("/cart", function(req, res){
    UserController.cart(req, res);
})

UserRoutes.get("/cart_total", function(req, res){
    UserController.get_cart_total(req, res);
})

module.exports = UserRoutes;