const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    const product = {
        title: '',
        price: '',
        description: '',
        imageUrl: '',
    }
    res.render('admin/edit-product', {
        product: product,
        docTitle: 'Add Product',
        path: 'add-prod',
        buttonText: 'Add Product',
        actionRoute: 'add-product'
    })
}
exports.postAddProduct = (req, res, next) => {
    // send the data to model for storing
    const id = null;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(id , title, imageUrl, price, description);
    product.save();
    res.redirect(`/`);
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.id;
    Product.findById(prodId, prod => {
        if (!prod) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: prod,
            docTitle: 'Edit Product Detail',
            path: 'edit-prod',
            editing: editMode,
            buttonText: 'Update Product',
            actionRoute: 'edit-product'
        });
    });
}
exports.getProducts = (req, res, next) => {
    // concerns model to get data for view
    Product.fetchAll((products) => {
        // model obliges and return the data which is then fed to view 
        res.render('admin/products', {
            prods: products,
            docTitle: 'Admin Product list',
            path: 'admin-product-list'
        })
    });
}
exports.postEditProduct = (req, res, next) => {
    id = req.body.id;
    title = req.body.title;
    imageUrl = req.body.imageUrl;
    description = req.body.description;
    price = req.body.price;

    const updatedProduct = new Product(id, title, imageUrl, price, description);
    updatedProduct.save();
        res.redirect('/admin/admin-products')
}

exports.deleteProduct = (req, res, next) =>{
    const id = req.body.id;
    Product.deleteProduct(id);
    res.redirect('/admin/admin-products');
}