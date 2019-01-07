const express = require('express');
const path = require('path');

const adminController  = require('../controllers/admin');
const router = express.Router();

// localhost:3000/admin/add-product matches this router
// concerned controller method is called
router.get('/add-product',adminController.getAddProduct);
router.post('/add-product' , adminController.postAddProduct);
router.get('/admin-products' , adminController.getProducts);
router.post('/edit-product/', adminController.postEditProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/delete-product', adminController.deleteProduct);
exports.routes = router;