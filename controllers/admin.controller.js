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

    async products(req, res) {
        const result = await AdminModel.get_table(req, res);

        res.render("../views/admin/products/index", {products: result});
    }

    async product_edit(req, res) {
        const result = await AdminModel.get_product(req, res);

        res.render("../views/admin/products/edit", {product: result});
    }

    product_new(req, res) {
        res.render("../views/admin/products/new");
    }

    async create_new_product(req, res) {
        AdminModel.validate_form(req, res);

        if(req.session.error.length === 0){
            let data = await AdminModel.add_product(req, res);
            console.log('sql data is : ', data);

            res.json(true);
            console.log('sent to db');
        }else{
            res.render("../views/partials/error.ejs", {errors: req.session.error});
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

            res.render("../views/partials/image_preview.ejs", {files:req.session.image_files});
        });
    }

    async save_images(req, res) {
        
    }

    products_remove_img_queue(req, res){
        for(var i=0; i< req.session.image_files.length; i++){
            if(req.session.image_files[i].name === req.params.id){
                req.session.image_files.splice(i,1);

                res.render("../views/partials/image_preview.ejs", {files:req.session.image_files});
            }
        }
    }
}

const adminController = new AdminController;

module.exports = adminController;