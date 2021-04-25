const express = require('express');
const { dirname } = require('path');
const app = express()
const puerto = process.env.PORT

const methodOverride = require("method-override")



const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const path = require('path');
console.log('anda')
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

/*app.get('/', (req, res) => {
    res.render("home");
});*/
app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/products", productRouter)
//para que ande los ruter se debe descomentar el de arriba

// app.use("/", userRouter);


app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
})
 
app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});

