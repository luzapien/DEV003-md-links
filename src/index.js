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
      console.log(api.isAbsolute(path));
      if (!api.isAbsolute(path)) {
        console.log(api.turnAbsolut(path));
       
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
function getLinks (path){
  // const regExp =  /\[([^\[]+)\](\(.*\))/gm;
  const stats = fs.statSync(path);
  console.log('Is file?' + stats.isFile());
  // const links = stats.match(regExp)
}


module.exports = {
  mdLinks,
  getLinks
};
