const Mysql = require('mysql');
const Model = require('./model.js');

class AdminModel extends Model {
    constructor() {
        super();
    }

    async get_table(req, res) {
        let query = "SELECT products.id AS id, products.name AS product, price, description, inventory, images.name AS image, categories.name AS category FROM products LEFT JOIN images ON images.id = (SELECT images.id FROM images WHERE products.id = images.product_id ORDER BY images.id LIMIT 1) LEFT JOIN categories ON products.category_id = categories.id;";

        const result = await this.executeQuery(query);
        return result;
    }

    validate_form(req, res) {
        req.session.error = [];

        if (!req.body.name || !req.body.description || !req.body.inventory || !req.body.price) {
            req.session.error.push('Must include all fields');
        } else if (!req.session.image_files) {
            req.session.error.push('Must Upload Photos First');
        } else if (req.session.image_files.length < 4) {
            req.session.error.push('Must include 4 images');
        }
    }

    async add_product(req, res) {
        const name = req.body.name;
        const desc = req.body.description;
        const inv = req.body.inventory;
        const price = req.body.price;
        const category = req.body.category;

        let values = [category, name, price, desc, inv];
        let query = "INSERT INTO products (category_id, name, price, description, inventory, created_at, updated_at) VALUES (?,?,?,?,?,NOW(), NOW())";

        const result = await this.executeQuery(query, values);
        return result;
    }

    async get_orders(req, res){
        const query = "SELECT orders.id, orders.status_id, orders.shipping_cost, orders.total_cost, customers.first_name, orders.created_at FROM orders LEFT JOIN customers ON orders.user_id = customers.id";

        const result = await this.executeQuery(query);
        return result;
    }

    async get_order(req, res){
        const query = "SELECT orders.id AS id, orders.status_id AS status, orders.shipping_cost AS shipping, orders.total_cost as total, products.id AS item_id, order_products.quantity AS quantity, products.name AS item_name, products.price AS price, customers.first_name AS first_name, customers.last_name AS last_name, customers.street AS address, customers.city AS city, customers. state AS state, customers.zipcode AS zipcode FROM orders LEFT JOIN order_products ON orders.id = order_products.order_id LEFT JOIN products ON order_products.product_id = products.id LEFT JOIN customers ON orders.user_id = customers.id WHERE orders.id = ?";
        const value = req.params.id;

        const result = await this.executeQuery(query, value);
        return result;
    }

    async get_product(req, res){
        let value = req.params.id;
        let query = "SELECT * FROM products LEFT JOIN images ON products.id = images.product_id WHERE products.id = ?";

        const result = await this.executeQuery(query, value);
        return result;
    }

    async get_new_product_id(req, res){
        let query = "SELECT * FROM products ORDER BY id DESC LIMIT 1";

        const result = await this.executeQuery(query);
        return result;
    }

    async add_product_images(req, res){
        const data = await this.get_new_product_id();
        const id = data[0].id;

        for(var i=0; i< req.session.image_files.length; i++){
            const name = req.session.image_files[i].name;
            const values = [id, name];

            let query = "INSERT INTO images (product_id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";

            await this.executeQuery(query, values);
        }
        req.session.image_files = [];
    }

    async delete_product(req, res){
        let value = req.params.id;
        let query1 = "DELETE FROM images WHERE product_id = ?"
        let query2 = "DELETE FROM products WHERE id = ?; ";
        
        await this.executeQuery(query1, value);
        await this.executeQuery(query2, value);
    }
}

const adminModel = new AdminModel;
module.exports = adminModel;