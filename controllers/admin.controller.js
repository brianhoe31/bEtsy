//add admin model
// const AdminModel        = require("../models/admin.model.js");

class AdminController {

    //load the main Dashboard page
    index(req, res){
        res.render("../views/admin/index");
    }

    orders(req, res){
        res.render("../views/admin/orders/index");
    }

    orders_show(req,res){
        res.render("../views/admin/orders/show");
    }

    products(req, res){
        res.render("../views/admin/products/index");
    }

    product_edit(req, res){
        res.render("../views/admin/products/edit");
    }

    product_new(req, res){
        res.render("../views/admin/products/new");
    }

}

const adminController = new AdminController;

module.exports = adminController;