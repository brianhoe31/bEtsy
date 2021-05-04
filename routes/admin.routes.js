const Express 			    = require("express");
const AdminRoutes 		    = Express.Router();
const AdminController        = require('../controllers/admin.controller');

AdminRoutes.get("/", function(req, res){
    AdminController.index(req, res);
})

AdminRoutes.get("/orders", function(req, res){
    AdminController.orders(req, res);
})

AdminRoutes.get("/orders/:id", function(req, res){
    AdminController.ordersShow(req, res);
})

AdminRoutes.get("/products", function(req, res){
    AdminController.products(req, res);
})

AdminRoutes.get("/products/edit/:id", function(req, res){
    AdminController.productEdit(req, res);
})

AdminRoutes.get("/products/new", function(req, res){
    AdminController.productNew(req, res);
})

AdminRoutes.post("/products/new", function(req, res){
    AdminController.createNewProduct(req, res);
})

AdminRoutes.post("/products/new/category", function(req, res){
    AdminController.productNewCategory(req, res);
})

AdminRoutes.post("/products/new/images", function(req, res){
    AdminController.productsNewImages(req, res);
})

AdminRoutes.post("/products/delete/images/:id", function(req, res){
    AdminController.productsRemoveImgQueue(req, res);
})

AdminRoutes.get("/products/delete/:id", function(req, res){
    AdminController.productsRemoveConfirm(req, res);
})

AdminRoutes.post("/products/delete/:id", function(req, res){
    AdminController.productsRemove(req, res);
})

AdminRoutes.get("/products/page=:id", function(req, res){
    AdminController.productsPage(req, res);
})

module.exports = AdminRoutes;