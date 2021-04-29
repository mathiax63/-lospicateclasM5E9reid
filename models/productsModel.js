const fs = require('fs');
const path = require('path');

const model = function (name) {
    console.log('entre al modelo')
    console.log(name)
    return {
    //este vuelve dinamico la ruta
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),

// este lee el json y lo pasa a objeto literal
readFile: function ( ){
    let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
    return JSON.parse(tableContents) || [];
},


// este graba y despues lo pasa a formato json
writeFile : function(contents) {
    let tableContents = JSON.stringify(contents, null, ' ');
    fs.writeFileSync(this.tablePath, tableContents);
},
//este averigual el ultimo id del array de objetos

nextId:function() {
    let rows = this.readFile();
    //se utiliza pop porque toma el ultio objeto literl
    let lastRow = rows.pop();

    return lastRow.id ? ++lastRow.id : 1;
},
// este lee todos los registos del archivo 
all: function() {
    console.log('Estoy buscando los productos ahora')
    return this.readFile();
},
// este busca un id
find:function(id) {
    let rows = this.readFile();
    // es como la ejercicion en PG de delet y put tomando el id con "=="" para que tome tanto numero como string siempre y cuando sean lo mismo  
    return rows.find(product => product.id == id);
},
// agrega un registro que paso por parámetro
create:function(row) {
    //este lee el archivo de json
    let rows = this.readFile();
    // este averigua cual es el último id y lo actualiza, utilizando la funcion con el pop
    row.id = this.nextId();
    //este agrega el nuevo parametro en el array
    rows.push(row);
    //este graba el array en el archivo
    this.writeFile(rows);
    //y por ultimo retorna el último id generado
    return row.id;
},

//para actualizar archivos

update:function(row) {
 

    //se lee el json
    let rows = this.readFile();

//se utiliza el map para que tome y devuelva un array modificado
    let updatedRows = rows.map(oneRow => {

//ase la funcion para encontrar un id
        if (oneRow.id == row.id) {

//retorna el elemento encontrado
            return row;
        }

        return oneRow;
    });

    // escribo el archivo
    console.log(updatedRows)

    this.writeFile(updatedRows);

// devuelve el id encontrado
    return row.id;

},

// este elimina un el registrado en el archivo según su id    
        delete: function(id) {

            console.log('Elimino :' + id)
            //lee el json
            let rows = this.readFile();
            //de ese json filtra el id  encontrado
            let updatedRows = rows.filter(row => {

                return row.id != id;
            });

            this.writeFile(updatedRows);
        }





};
}
module.exports = model