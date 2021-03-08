const Mysql = require('mysql');
const Model = require('./model.js');

class UserModel extends Model {
    async get_all_products(req, res) {
        const query = "SELECT products.id AS id, products.name AS product, price, description, inventory, images.name AS image, categories.name AS category FROM products LEFT JOIN images ON images.id = (SELECT images.id FROM images WHERE products.id = images.product_id ORDER BY images.id LIMIT 1) LEFT JOIN categories ON products.category_id = categories.id ORDER BY products.name";

        return await this.executeQuery(query);
    }

    async get_all_category(req, res){
        const query = "SELECT products.id AS id, products.name AS product, price, description, inventory, images.name AS image, categories.name AS category FROM products LEFT JOIN images ON images.id = (SELECT images.id FROM images WHERE products.id = images.product_id ORDER BY images.id LIMIT 1) LEFT JOIN categories ON products.category_id = categories.id WHERE categories.name = ?";
        const value = req.params.category;

        return await this.executeQuery(query,value);
    }

    async get_unique_category(req, res){
        const query = "SELECT * FROM categories";

        return await this.executeQuery(query);
    }

    async get_product(req, res){
        const query = "SELECT products.id AS id, products.name AS product, price, description, inventory, images.name AS image, categories.name AS category FROM products LEFT JOIN images ON products.id = images.product_id LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = ?";
        const value = req.params.id;

        return await this.executeQuery(query, value);
    }

    async get_new_customer_id(req, res){
        const query = "SELECT id FROM customers ORDER BY id DESC LIMIT 1";

        return await this.executeQuery(query);
    }

    async get_new_order_id(req, res){
        const query = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";

        return await this.executeQuery(query);
    }

    async get_cart_product(id){
        const query = "SELECT products.id AS id, products.name AS product, price, description, inventory, images.name AS image, categories.name AS category FROM products LEFT JOIN images ON images.id = (SELECT images.id FROM images WHERE products.id = images.product_id ORDER BY images.id LIMIT 1) LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = ?";
        const value = id;

        return await this.executeQuery(query, value);
    }

    //helper function to calculate the cart total
    cart_total(req, res) {
        let cart_total = 0;
        if (req.cookies.cart !== undefined) {
            for (var i = 0; i < req.cookies.cart.items.length; i++) {
                cart_total += req.cookies.cart.items[i].quantity;
            }
        }

        return cart_total;
    }


    async add_customer(req, res){
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const zip = req.body.zipcode;

        const query = "INSERT INTO customers (first_name, last_name, email, street, city, state, zipcode, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(), NOW())";
        const values = [first_name, last_name, email, address, city, state, zip];

        return await this.executeQuery(query, values);
    }

    async new_order(req, res){
        const total = parseFloat(req.body.total).toFixed(2);
        const shipping = parseFloat(total*.1).toFixed(2); 
        const final_total = parseFloat(total*1.1).toFixed(2);
        const status_id = 1;
        const user_data = await this.get_new_customer_id();
        const user_id = user_data[0].id;

        const query = "INSERT INTO orders (user_id, status_id, shipping_cost, total_cost, created_at, updated_at) VALUES (?,?,?,?,NOW(), NOW())";
        const values = [user_id, status_id, shipping, final_total];

        return await this.executeQuery(query, values);
    }

    async create_order_product(req, res){
        const order_data = await this.get_new_order_id();
        const order_id = order_data[0].id;

        for (var i = 0; i < req.cookies.cart.items.length; i++) {
            const quantity = req.cookies.cart.items[i].quantity;
            const product_id = req.cookies.cart.items[i].id;

            const query = "INSERT INTO order_products (order_id, product_id, quantity, created_at, updated_at) VALUES (?,?,?,NOW(), NOW())";
            const values = [order_id, product_id, quantity];

            await this.executeQuery(query, values);
        }

    }
}

const userModel = new UserModel;

module.exports = userModel;