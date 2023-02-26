const fs = require('fs');
const nodePath = require('path');

//checar si existe el path
const pathValid = (path) => {
  return fs.existsSync(path)
}

//Comprobar si el path es relativo o absoluto
const isAbsolute = (path) =>{
  return nodePath.isAbsolute(path)
}

//Convertir la ruta a absoluta
const turnAbsolut = (path) => {
  return nodePath.resolve(path)
}

// export const  readFile =  fs.readFile('./texto.md','utf-8', (error,data) => {
//   if(error) throw error;
//   console.log(data)
// })

// const readFile = (path) => {
//   return fs.readFile(path,'utf-8', (error,data) => {
//     if(error) throw error;
//     console.log(data)
//   });
// }
module.exports = {
  pathValid,
  isAbsolute,
  turnAbsolut
}
