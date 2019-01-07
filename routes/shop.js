const express = require('express');
const path = require('path');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProductsList);
router.get('/products/:productId', shopController.getProduct);
router.post('/cart', shopController.postCart);
router.get('/cart', shopController.getCart);
router.post('/cart-delete-item', shopController.postCartDelete);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.get('/api/profile', shopController.getProfile);
router.post('/api/myprofile', shopController.postProfile);
module.exports = router;
