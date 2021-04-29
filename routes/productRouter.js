const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controller/productController');


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

//llamo al multer
const upload = multer({ storage });


router.get('/cart', productsController.cart);


router.get('/create', productsController.create);



router.get('/:id', productsController.show);


router.get('/search', productsController.search)



router.get('/:id/edit', productsController.edit);


router.post('/store' ,upload.single('image'), productsController.store);


router.put('/:id', upload.single('image'), productsController.update);


router.delete('/:id', productsController.destroy);

module.exports = router;