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

AdminRoutes.get("/products/edit/:id", function(req, res){
    AdminController.product_edit(req, res);
})

AdminRoutes.get("/products/new", function(req, res){
    AdminController.product_new(req, res);
})

AdminRoutes.post("/products/new", function(req, res){
    AdminController.create_new_product(req, res);
})

AdminRoutes.post("/products/new/category", function(req, res){
    AdminController.product_new_category(req, res);
})

AdminRoutes.post("/products/new/images", function(req, res){
    AdminController.products_new_images(req, res);
})

AdminRoutes.post("/products/delete/images/:id", function(req, res){
    AdminController.products_remove_img_queue(req, res);
})

AdminRoutes.get("/products/delete/:id", function(req, res){
    AdminController.products_remove_confirm(req, res);
})

AdminRoutes.post("/products/delete/:id", function(req, res){
    AdminController.products_remove(req, res);
})

AdminRoutes.get("/products/:id", function(req, res){
    AdminController.products_page(req, res);
})

module.exports = AdminRoutes;