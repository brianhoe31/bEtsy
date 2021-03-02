const UserModel = require("../models/user.model.js");

class UserController {

    index(req, res) {
        res.render("../views/index");
    }

    about(req, res) {
        res.render("../views/about");
    }

    async products(req, res) {
        //get all products 
        const result = await UserModel.get_all_products();
        const category_filter_result = await UserModel.get_unique_category(req, res);

        res.render("../views/user/index", { products: result, category: '', filter: category_filter_result });
    }

    async products_show_category(req, res) {
        //get category products
        const category_result = await UserModel.get_all_category(req, res);
        const category_filter_result = await UserModel.get_unique_category(req, res);

        res.render("../views/user/index", { products: category_result, category: req.params.category, filter: category_filter_result });
    }

    async product_show(req, res) {
        const result = await UserModel.get_product(req, res);

        res.render("../views/user/show", { product: result });
    }

    cart(req, res) {
        res.render("../views/user/cart/index");
    }

    //when 'add product' is hit, updates shopping cart in the cookie
    async product_add_cart(req, res){
        // const id = req.params.id;
        // const qty = parseInt(req.body.quantity);

        res.cookie('test', 'test');

        if(req.cookies.cart === undefined){
            console.log('run');
            res.cookie('cart', {items: 1});
            console.log('this ran ', document.cookie);
        }else{
            for(var i=0; i<req.cookies.cart.items.length; i++){
                if(req.cookies.cart.items[i].id === id){
                    req.cookies.cart.items[i].quantity += qty;

                    await this.product_show(req, res);
                    // next();
                }
            }
        }
        
        let items = req.cookies.cart.items;
        items.push({id: id, quantity: qty});

        res.cookie('cart', {items: items});

        
        await this.product_show(req, res);
    }

}

const userController = new UserController;

module.exports = userController;