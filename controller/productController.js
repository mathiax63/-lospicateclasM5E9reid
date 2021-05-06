// Requerimos el array de productos
//de esta forma no ahi que tocar la data desde el controler
const archivoModel = require("../models/productsModel")
const productModel = archivoModel('productsDataBase');
const { validationResult } = require('express-validator');

let productController = {

    home: (req, res) => {
        console.log('entro al home del produt controller y redirijo')

        res.redirect('/')

    },

// Función que muestra el detalle del producto, cuando hacemos click en la foto
    show: (req, res) => {
        console.log('me hicieron click :' + req.params.id)

        //        let product = productModel.find((value)=>value.id===req.params.id)

//se cambia todo los productModel por la nueva variable que almacena el product venido del model
        let product = productModel.find(req.params.id)

        console.log(product)
        if (product) {
            res.render('productDetail', { product });
        } else {
            res.render('not-found');
        }
    },

// Función que muestra el formulario de crear Productos
    create: (req, res) => {
        console.log('entre a crear')
        res.render('productCreate');
    },
// Función que simula el almacenamiento, en este caso en array
store: (req, res) => {
    console.log('Entre a store')
    console.log(req.files);
    
    console.log('-----Verifico si hay errores');
    const errores = validationResult(req);
    // Esta instrucción muestra todo el array
    console.log(errores);
    if (errores.errors.length > 0) {
        return res.render("productCreate", {
            erroresControlados: errores.mapped(),
            camposDevueltos: req.body

        })};
 // Atrapo los contenido del formulario
    const product = req.body;

     // Verificar si viene un archivo, para nombrarlo  
     product.image = req.file ? req.file.filename : '';
  
    console.log(product.image)

// Delego la responsabilidad al modelo para crear producto  
   console.log(product)
// Cuidade sólo mando el cuerpo del FORM, el Id me lo asigna el Modelo  
productModel.create(product);

    res.redirect('/')

},

// FUnción que muestra el formulario de edición
    edit: (req, res) => {
        console.log('ESTOY ENTRANDO AL METODO EDIT:')

        let product =productModel.find(req.params.id);

        console.log(product)
        if (product) {
            res.render('productEdit', { product });
        } else {
            res.render('not-found');
        }
    },


// Función que realiza cambios en el producto seleccionado
update: (req, res) => {
    console.log("Entré al update")
    // Armo la estructura del registro auxiliar (product)

    let  product = req.body;
  

    console.log(' soy la nueva: ' +req.body.image)
    console.log('soy la vieja '+ req.body.oldImage)
    product.id = req.params.id;

 
      product.image = req.file ? req.file.filename : req.body.oldImagen;
      const errores = validationResult(req);
      let newProductValues = req.body;
      newProductValues.id = req.params.id;

      if (errores.errors.length > 0) {
        return res.render('productEdit', {
            erroresControlados: errores.mapped(),
            camposDevueltos: req.body

        });
    }

    
      if (req.body.image===undefined) {
        product.image = product.oldImage
    } else {
        // Actualizaron la foto, saco su nombre del proceso
        product.image = req.file.filename 
    }
    delete product.oldImage;

    product.id = req.params.id;
    
      console.log('.......MOSTRA LA IMAGEN.......')
    console.log(product.image)
    console.log(product)
   
    

    delete product.oldImage;
  // Elimino de la estructura auxiliar, porque no existe en Json 
    


    // Delego la responsabilidad al modelo que actualice
    productModel.update(product);
      

    res.redirect('/')
},

// Función que elimina del Array productModel ek producto seleccionado
    destroy: (req, res) => {
        productModel.delete(req.params.id); 

        res.redirect('/')
    },


    cart: (req, res) => {
        res.render('productCreate');
    },

    search: (req, res) => {

        let dataABuscar = req.query
        res.sed(dataABuscar)
    }

}


module.exports = productController