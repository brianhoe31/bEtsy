const AdminModel = require("../models/admin.model.js");
const formidable = require('formidable');

class AdminController {

    //load the main Dashboard page
    index(req, res) {
        res.render("../views/admin/index");
    }

    async orders(req, res) {
        const result = await AdminModel.get_orders(req, res);

        res.render("../views/admin/orders/index", {orders: result});
    }

    async orders_show(req, res) {
        const result = await AdminModel.get_order(req, res);

        res.render("../views/admin/orders/show", {order: result});
    }

    async products(req, res) {
        const result = await AdminModel.get_table(req, res);

        res.render("../views/admin/products/index", {products: result, page: 1});
    }

    async products_page(req, res) {
        const result = await AdminModel.get_table(req, res);

        res.render("../views/admin/products/index", {products: result, page: req.params.id});
    }

    async product_edit(req, res) {
        const result = await AdminModel.get_product(req, res);

        res.render("../views/admin/products/edit", {product: result});
    }

    async products_remove_confirm(req, res) {
        const result = await AdminModel.get_product(req, res);

        res.render("../views/partials/delete", {product: result});
    }

    async products_remove(req, res) {
        await AdminModel.delete_product(req, res);

        res.redirect("/admin/products");
    }

    product_new(req, res) {
        res.render("../views/admin/products/new", {error: req.session.error});
    }

    async create_new_product(req, res) {
        AdminModel.validate_form(req, res);

        if(req.session.error.length === 0){
            await AdminModel.add_product(req, res);

            await AdminModel.add_product_images(req, res);
            //delete files in the images folder 

            res.redirect("/admin/products");
        }else{
            res.redirect("/admin/products/new");
        }    
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
            req.session.image_files = files.file;

            res.render("../views/partials/image_preview", {files:req.session.image_files});
        });
    }

    products_remove_img_queue(req, res){
        for(var i=0; i< req.session.image_files.length; i++){
            if(req.session.image_files[i].name === req.params.id){
                req.session.image_files.splice(i,1);

                res.render("../views/partials/image_preview", {files:req.session.image_files});
            }
        }
    }
}

const adminController = new AdminController;

module.exports = adminController;