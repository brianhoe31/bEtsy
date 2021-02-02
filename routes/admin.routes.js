const Express 			    = require("express");
const AdminRoutes 		    = Express.Router();
const AdminController        = require('../controllers/admin.controller');

AdminRoutes.get("/", function(req, res){
    AdminController.index(req, res);
})

AdminRoutes.get("/orders", function(req, res){
    AdminController.orders(req, res);
})

AdminRoutes.get("/orders/show", function(req, res){
    AdminController.orders_show(req, res);
})

AdminRoutes.get("/products", function(req, res){
    AdminController.products(req, res);
})

AdminRoutes.get("/products/edit", function(req, res){
    AdminController.product_edit(req, res);
})

AdminRoutes.get("/products/new", function(req, res){
    AdminController.product_new(req, res);
})

module.exports = AdminRoutes;