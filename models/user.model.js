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
}

const userModel = new UserModel;

module.exports = userModel;