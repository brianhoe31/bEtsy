const UserModel = require("../models/user.model.js");

class UserController {

    /* Get request for homepage. */
    index(req, res) {
        res.render("../views/index");
    }

    /* Get request for about page. */
    about(req, res) {
        res.render("../views/about");
    }

    /* Get all products & unique categories & output to product overview page. */
    async products(req, res) {
        const result = await UserModel.getAllProducts();
        const category_filter_result = await UserModel.getUniqueCategory(req, res);

        res.render("../views/user/index", { products: result, category: '', filter: category_filter_result });
    }

    /* Get all products that have the category requested and return related products to the product overview page. */
    async productsShowCategory(req, res) {
        const category_result = await UserModel.getAllCategory(req, res);
        const category_filter_result = await UserModel.getUniqueCategory(req, res);

        res.render("../views/user/index", { products: category_result, category: req.params.category, filter: category_filter_result });
    }

    /** 
    *  DOCU: Get data of a specific product that user is requesting and output details on the product show page. 
    *  If there are products in the cart, also return total items in cart for cart count in header. 
    */
    async productShow(req, res) {
        const result = await UserModel.getProduct(req, res);

        if (req.cookies.cart !== undefined) {
            res.render("../views/user/show", { product: result, cart: UserModel.cartTotal });
            return;
        }
        res.render("../views/user/show", { product: result });
    }

    /* Get data of all items in the cart and output in shopping cart page with total price calculated. */
    async cart(req, res) {
        let cart = [];
        let total = 0;
        if (req.cookies.cart !== undefined) {
            for (let i = 0; i < req.cookies.cart.items.length; i++) {
                let data = await UserModel.getCartProduct(req.cookies.cart.items[i].id);
                cart.push({ item: data, quantity: req.cookies.cart.items[i].quantity });
                total += data[0].price * req.cookies.cart.items[i].quantity;
            }
        }
        res.render("../views/user/cart/index", { cart: cart, total: total });
    }

    /**
    *  DOCU: When 'add product' is hit, updates shopping cart in the cookie.
    *  If nothing in the cart, create new cart cookie.
    *  Check if this item exists in the cart, if it does, add to existing item qty.
    *  Else add to existing list of items in cookie.
    */
    productAddCart(req, res) {
        const id = req.params.id;
        const qty = parseInt(req.body.quantity);


        if (req.cookies.cart === undefined) {
            res.cookie('cart', { items: [{ id: id, quantity: qty }] });

            res.json({ cart_total: UserModel.cartTotal(req, res) })
            return;
        } else {
            for (var i = 0; i < req.cookies.cart.items.length; i++) {
                if (req.cookies.cart.items[i].id === id) {
                    req.cookies.cart.items[i].quantity += qty;

                    res.json({ cart_total: UserModel.cartTotal(req, res) })
                    return;
                }
            }
        }

        let items = req.cookies.cart.items;
        items.push({ id: id, quantity: qty });

        res.cookie('cart', { items: items });
        res.json({ cart_total: UserModel.cartTotal(req, res) })
    }

    /* Cart item counter in header.  Updates for every page */
    getCartTotal(req, res) {
        res.json({ cart_total: UserModel.cartTotal(req, res) });
    }

    /* Take customer data and total order details and add to order list */
    async cartCheckout(req, res) {
        const data = await UserModel.addCustomer(req, res);
        await UserModel.newOrder(req, res);
        await UserModel.createOrderProduct(req, res);
        res.cookie('cart', { items: [] });

        res.render("../views/user/cart/thank_you");
    }
}

const userController = new UserController;

module.exports = userController;