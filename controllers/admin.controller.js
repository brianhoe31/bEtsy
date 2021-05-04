const AdminModel = require("../models/admin.model.js");
const Formidable = require('formidable');

class AdminController {

    //load the main Dashboard page
    index(req, res) {
        res.render("../views/admin/index");
    }

    async orders(req, res) {
        const result = await AdminModel.getOrders(req, res);

        res.render("../views/admin/orders/index", {orders: result});
    }

    async ordersShow(req, res) {
        const result = await AdminModel.getOrder(req, res);

        res.render("../views/admin/orders/show", {order: result});
    }

    async products(req, res) {
        const result = await AdminModel.getTable(req, res);

        res.render("../views/admin/products/index", {products: result, page: 1});
    }

    async productsPage(req, res) {
        const result = await AdminModel.getTable(req, res);

        res.render("../views/admin/products/index", {products: result, page: req.params.id});
    }

    async productEdit(req, res) {
        const result = await AdminModel.getProduct(req, res);

        res.render("../views/admin/products/edit", {product: result});
    }

    async productsRemoveConfirm(req, res) {
        const result = await AdminModel.getProduct(req, res);

        res.render("../views/partials/delete", {product: result});
    }

    async productsRemove(req, res) {
        await AdminModel.deleteProduct(req, res);

        res.redirect("/admin/products");
    }

    productNew(req, res) {
        res.render("../views/admin/products/new", {error: req.session.error});
    }

    async createNewProduct(req, res) {
        AdminModel.validateForm(req, res);

        if(req.session.error.length === 0){
            await AdminModel.addProduct(req, res);

            await AdminModel.addProductImages(req, res);
            //delete files in the images folder 

            res.redirect("/admin/products");
        }else{
            res.redirect("/admin/products/new");
        }    
    }

    productNewCategory(req, res) {
        console.log(req.body);
    }

    productsNewImages(req, res) {
        const form = Formidable({ multiples: true });

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

    productsRemoveImgQueue(req, res){
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