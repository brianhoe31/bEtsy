const AdminModel = require("../models/admin.model.js");
const Formidable = require('formidable');

class AdminController {

    /* Load the main Dashboard page */
    index(req, res) {
        res.render("../views/admin/index");
    }

    /* Get all orders and order information and display on orders index page */
    async orders(req, res) {
        const result = await AdminModel.getOrders(req, res);

        res.render("../views/admin/orders/index", { orders: result });
    }

    /* Get information of a specific order and display on show page */
    async ordersShow(req, res) {
        const result = await AdminModel.getOrder(req, res);

        res.render("../views/admin/orders/show", { order: result });
    }

    /* Get all products & product information & display on products index page */
    async products(req, res) {
        const result = await AdminModel.getTable(req, res);

        res.render("../views/admin/products/index", { products: result, page: 1 });
    }

    /* Get request for products inventory page result */
    async productsPage(req, res) {
        const result = await AdminModel.getTable(req, res);

        res.render("../views/admin/products/index", { products: result, page: req.params.id });
    }

    /* Product edit page for specific product item */
    async productEdit(req, res) {
        const result = await AdminModel.getProduct(req, res);

        res.render("../views/admin/products/edit", { product: result });
    }

    /* Get all data for specific product page.  Output on jquery pop up that shows all product details. */
    async productsRemoveConfirm(req, res) {
        const result = await AdminModel.getProduct(req, res);

        res.render("../views/partials/delete", { product: result });
    }

    /* Confirm removal of specific product. */
    async productsRemove(req, res) {
        await AdminModel.deleteProduct(req, res);

        res.redirect("/admin/products");
    }

    /* Get new product page. */
    productNew(req, res) {
        res.render("../views/admin/products/new", { error: req.session.error });
    }

    /**
    *  DOCU: Validate all form fields are filled, photos must be uploaded, and must be 4 photos included.
    *  Return to form if validation does not return successfully and output error message.
    *  Create product & add images if form validation returns successfully.
    *  Render products page after success. 
    */
    async createNewProduct(req, res) {
        AdminModel.validateForm(req, res);

        if (req.session.error.length === 0) {
            await AdminModel.addProduct(req, res);

            await AdminModel.addProductImages(req, res);
            //delete files in the images folder 

            res.redirect("/admin/products");
        } else {
            res.redirect("/admin/products/new");
        }
    }

    /* TODO: Create a form field that allows admin to create a new category in database. */
    productNewCategory(req, res) {
    }

    /** 
    *  DOCU: Ajax request to use Formidable to upload multiple image files.
    *  Save files to local storage and to the session.
    *  Return saved image files to the partials to be displayed in the preview. 
    */
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

            res.render("../views/partials/image_preview", { files: req.session.image_files });
        });
    }

    /* Remove specific image from the image queue */
    productsRemoveImgQueue(req, res) {
        for (var i = 0; i < req.session.image_files.length; i++) {
            if (req.session.image_files[i].name === req.params.id) {
                req.session.image_files.splice(i, 1);

                res.render("../views/partials/image_preview", { files: req.session.image_files });
            }
        }
    }
}

const adminController = new AdminController;

module.exports = adminController;