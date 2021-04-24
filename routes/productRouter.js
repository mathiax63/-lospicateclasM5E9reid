const express = require('express');
const router = express.Router();

const productsController = require('../controller/productController');



router.get('/cart', productsController.cart);


router.get('/create', productsController.create);



router.get('/:id', productsController.show);


router.get('/search', productsController.search)



router.get('/:id/edit', productsController.edit);


router.post('/store', productsController.store);


router.put('/:id', productsController.update);


router.delete('/:id', productsController.destroy);

module.exports = router;