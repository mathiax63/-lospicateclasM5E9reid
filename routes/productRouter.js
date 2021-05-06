const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const productsController = require('../controller/productController');
const logDbMiddleware = require('../middlewares/logDbMiddlewares')

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});



const validaciones = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.gif', '.png'];
        if (!file) {
            throw new Error('Debes cargar una imagen válida')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son  ${acceptedExtensions.join(', ')}`);

            }

        }
        return true;
    })
] 


const validacionesEdit = [
   
    body('name').notEmpty().withMessage('En nombre no puede estar en blanco').bail()
    
    .isString().withMessage('Deber ser un String'),

    body('price').notEmpty().withMessage('En precio no puede estar en blanco'),
    body('descuento').notEmpty().withMessage('En descuento no puede estar en blanco')
  
] 















//llamo al multer
const upload = multer({ storage });


router.get('/cart', productsController.cart);


router.get('/create', productsController.create);



router.get('/:id', productsController.show);


router.get('/search', productsController.search)



router.get('/:id/edit',validacionesEdit, productsController.edit);


router.post('/store' ,upload.single('image'),validaciones, productsController.store);


router.put('/:id', upload.single('image'), productsController.update);


router.delete('/:id', productsController.destroy);

module.exports = router;