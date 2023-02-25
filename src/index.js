const fs = require('fs');
const api = require('./api');
const nodePath = require('path');
// import  readFile from './api.js';
// console.log(readFile);


function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      //comprobar si es absoluta
      const checkAbsolutPath = api.isAbsolute(path)
      console.log(checkAbsolutPath);
      if (!checkAbsolutPath) {
        const convertedToAbsolut = api.turnAbsolut(path)
        console.log(convertedToAbsolut);
      }
      const ext = nodePath.extname(path);
      console.log(ext);
      if(ext){
        const readFile = fs.readFile(path,'utf-8', (error,data) => {
           if(error) throw error;
           console.log(data)
         });
        resolve(readFile);
       }
    } else {
      //Si no existe la ruta rechaza la promesa.
      reject('La ruta no existe');
    }


  });
}

module.exports = {
  mdLinks
};


// // console.log(isDirectory('./README.md'));
// // // Mostrar los archivos del directorio
// // const readDir = (path) => fs.readdirSync(path);
// //  console.log(readDir('./README.md'));

// //leer archivos archivos
// //  fs.readFile(path,'utf-8', (error,data) => {
// //   if(error) throw error;
// //   console.log(data)
// // })


// const gettinLinks = (path) => {
// const regExp = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/g;
// const files = getMdFiles(path);
// console.log('===========> segunda función')
// console.log(files);
// const getLinks = files.match(regExp);
// console.log(getLinks);
// }
// gettinLinks('./texto.md')
