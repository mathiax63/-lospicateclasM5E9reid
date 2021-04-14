const express = require('express');
const { dirname } = require('path');
const app = express()
const puerto = process.env.PORT
const path = require('path');
console.log('anda')
app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render("home");
});

app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});

app.get("/login", (req, res) => {
    res.render("login" )
} )
app.get("/register", (req, res) => {
    res.render ("register" )
} )