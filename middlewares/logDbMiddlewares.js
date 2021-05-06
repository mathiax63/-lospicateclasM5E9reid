const fs = require('fs')



// Los MiddleWare son funciones
function logDbMiddleware(req,res, next){
fs.appendFileSync('DBlog.txt', ' - Se creó un registro al ingresar en:' + req.url )
next()
}logDbMiddleware

module.exports = logDbMiddleware