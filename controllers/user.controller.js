const UserModel = require("../models/user.model.js");

class UserController {

    index(req, res){
        res.render("../views/index");
    }

    async products(req, res){
        //get all products 
        const result = await UserModel.get_all_products();
        const category_filter_result = await UserModel.get_unique_category(req, res);

        res.render("../views/user/index", {products: result, category:'', filter: category_filter_result});
    }

    async products_show_category(req, res){
        //get category products
        const category_result = await UserModel.get_all_category(req, res);
        const category_filter_result = await UserModel.get_unique_category(req, res);

        res.render("../views/user/index", {products: category_result, category: req.params.category, filter: category_filter_result});
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