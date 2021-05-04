const UserModel = require("../models/user.model.js");

class UserController {

    //get homepage
    index(req, res) {
        res.render("../views/index");
    }

    //get about page
    about(req, res) {
        res.render("../views/about");
    }

    //get product overview page 
    async products(req, res) {
        //get all products 
        const result = await UserModel.getAllProducts();
        const category_filter_result = await UserModel.getUniqueCategory(req, res);

        res.render("../views/user/index", { products: result, category: '', filter: category_filter_result });
    }

    //get product overview page specific to a category filter
    async productsShowCategory(req, res) {
        //get category products
        const category_result = await UserModel.getAllCategory(req, res);
        const category_filter_result = await UserModel.getUniqueCategory(req, res);

        res.render("../views/user/index", { products: category_result, category: req.params.category, filter: category_filter_result });
    }

    async productShow(req, res) {
        const result = await UserModel.getProduct(req, res);

        if (req.cookies.cart !== undefined) {
            res.render("../views/user/show", { product: result, cart: UserModel.cartTotal });
            return;
        }

        res.render("../views/user/show", { product: result });
    }

    //calculating the shopping cart quantity in header 
    async cart(req, res) {
        let cart = [];
        let total = 0;
        if( req.cookies.cart !== undefined){
            for(let i =0; i<req.cookies.cart.items.length; i++){
                let data = await UserModel.getCartProduct(req.cookies.cart.items[i].id);
                cart.push({item:data, quantity:req.cookies.cart.items[i].quantity});
                total += data[0].price * req.cookies.cart.items[i].quantity;
            }
        }

        res.render("../views/user/cart/index",{cart: cart, total:total});
    }

    //when 'add product' is hit, updates shopping cart in the cookie
    productAddCart(req, res) {
        const id = req.params.id;
        const qty = parseInt(req.body.quantity);

        //if nothing in the cart, create new cart cookie
        if (req.cookies.cart === undefined) {
            res.cookie('cart', { items: [{ id: id, quantity: qty }] });


            res.json({ cart_total: UserModel.cartTotal(req, res) })
            return;
        } else {
            //check if this item exists in the cart, if it does, add to existing item qty
            for (var i = 0; i < req.cookies.cart.items.length; i++) {
                if (req.cookies.cart.items[i].id === id) {
                    req.cookies.cart.items[i].quantity += qty;

                    res.json({ cart_total: UserModel.cartTotal(req, res) })
                    return;
                }
            }
        }

        //else add to existing list of items in cookie
        let items = req.cookies.cart.items;
        items.push({ id: id, quantity: qty });

        res.cookie('cart', { items: items });
        res.json({ cart_total: UserModel.cartTotal(req, res) })
    }

    //cart item counter in header.  Updates for every page
    getCartTotal(req, res) {
        res.json({ cart_total: UserModel.cartTotal(req, res) });
    }

    async cartCheckout(req, res) {
        //take customer data and add it to the 'customers' table in DB 
        const data = await UserModel.addCustomer(req, res);
        await UserModel.newOrder(req, res);
        await UserModel.createOrderProduct(req, res);
        res.cookie('cart', { items: [] });

        res.render("../views/user/cart/thank_you");
    }
}

const userController = new UserController;

module.exports = userController;