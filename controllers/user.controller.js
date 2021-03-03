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

        if(req.cookies.cart !== undefined){
            let cart_total = 0;
            for(var i=0; i<req.cookies.cart.items.length; i++){
                cart_total += req.cookies.cart.items[i].quantity;
            }
            res.render("../views/user/show", { product: result, cart: cart_total });
            return;    
        }

        res.render("../views/user/show", { product: result });
    }

    cart(req, res) {
        res.render("../views/user/cart/index");
    }

    //when 'add product' is hit, updates shopping cart in the cookie
    product_add_cart(req, res){
        const id = req.params.id;
        const qty = parseInt(req.body.quantity);

        //if nothing in the cart, create new cart cookie
        if(req.cookies.cart === undefined){
            res.cookie('cart', {items: [{id: id, quantity: qty}]});


            res.json({cart_total: this.cart_total(req, res)})
            return;
        }else{
            //check if this item exists in the cart, if it does, add to existing item qty
            for(var i=0; i<req.cookies.cart.items.length; i++){
                if(req.cookies.cart.items[i].id === id){
                    req.cookies.cart.items[i].quantity += qty;

                    res.json({cart_total: this.cart_total(req, res)})
                    return;
                }
            }
        }
        
        //else add to existing list of items in cookie
        let items = req.cookies.cart.items;
        items.push({id: id, quantity: qty});

        res.cookie('cart', {items: items});
        res.json({cart_total: this.cart_total(req, res)})
    }

    //helper function to calculate the cart total
    cart_total(req, res){
        let cart_total = 0;
            for(var i=0; i<req.cookies.cart.items.length; i++){
                cart_total += req.cookies.cart.items[i].quantity;
            }
        return cart_total;
    }

    //cart item counter in header.  Updates for every page
    get_cart_total(req, res){
        res.json({cart_total: this.cart_total(req, res)});
    }

}

const userController = new UserController;

module.exports = userController;