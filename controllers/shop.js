const Product = require('../models/product')
const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: 'shop'
        })
    });
}

exports.getProductsList = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Product list',
            path: 'product-list'
        })
    });
}

exports.getProduct = (req, res, next) => {
    // productId comes from router
    const prodId = req.params.productId;
    Product.findById(prodId, prod => {
        res.render('shop/product-detail', {
            product: prod,
            docTitle: 'Product detail',
            path: 'product-list'
        })
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (prod of products) {
                const cartProductData = cart.products.find(p => p.id === prod.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: prod,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                products: cartProducts,
                cartValue: cart.totalPrice,
                docTitle: 'Cart',
                path: 'cart'
            })
        })

    });
}

exports.postCart = (req, res, next) => {
    //  console.log('PRODID------------ ' , req.body)
    const prodId = req.body.productId;
    //  console.log('PRODUCTID ================', prodId);
    Product.findById(prodId, (product) => {
        // 5.  console.log('Product.findById ->', prodId);
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}
exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.id;
    const product = Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Index',
            path: 'Index'
        })
    });
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            prods: products,
            docTitle: 'Checkout',
            path: 'checkout'
        })
    });
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/orders', {
            prods: products,
            docTitle: 'Orders',
            path: 'orders'
        })
    });
}

exports.getProfile = (req, res, next) => {
    const user = [{
        id: '023344',
        name: 'sumit',
        title: 'UI DEV',
        experience: 2,
        skill: 'MEAN'
    }];
    return res.status(200).json(user);

}

exports.postProfile = (req, res, next) => {
    //  console.log('POSTED -> ', req.body);
    res.status(200).json({
        message: 'Successfully Posted'
    });
}