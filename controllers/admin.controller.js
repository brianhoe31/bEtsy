const AdminModel = require("../models/admin.model.js");
const formidable = require('formidable');

class AdminController {

    //load the main Dashboard page
    index(req, res) {
        res.render("../views/admin/index");
    }

    orders(req, res) {
        res.render("../views/admin/orders/index");
    }

    orders_show(req, res) {
        res.render("../views/admin/orders/show");
    }

    products(req, res) {
        res.render("../views/admin/products/index");
    }

    product_edit(req, res) {
        res.render("../views/admin/products/edit");
    }

    product_new(req, res) {
        res.render("../views/admin/products/new");
    }

    create_new_product(req, res) {
        AdminModel.add_product();

        res.redirect("/admin/products/new");
    }

    product_new_category(req, res) {
        console.log(req.body);
    }

    products_new_images(req, res) {
        const form = formidable({ multiples: true });

        form.on('fileBegin', function (name, files) {
            files.path = process.cwd() + '/public/images/' + files.name;
        });

        form.on('file', function (name, files) {
            console.log('Uploaded ' + files.name);
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ fields, files });
        });
    }

}

const adminController = new AdminController;

module.exports = adminController;