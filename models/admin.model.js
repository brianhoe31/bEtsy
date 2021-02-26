const Mysql = require('mysql');
const Model = require('./model.js');

class AdminModel extends Model {
    constructor() {
        super();
    }

    async get_table(req, res) {
        let query = "SELECT products.id AS id, products.name AS product, price, description, inventory, categories.name AS category FROM products LEFT JOIN categories ON products.category_id = categories.id";

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

    async get_product(req, res){
        let value = req.params.id;
        let query = "SELECT * FROM products WHERE id= ?";

        const result = await this.executeQuery(query, value);
        return result;
    }
}

const adminModel = new AdminModel;
module.exports = adminModel;