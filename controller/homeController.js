const archivoModel = require('../models/productsModel')
const productModel = archivoModel('productsDataBase') 

let homeController = {

    show: (req, res) => {
        console.log('Soy Home Contoller - Leo el Json productos ')

        const products = productModel.all();

        res.render('home', { products });


    }


}


module.exports = homeController