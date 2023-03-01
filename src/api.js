const fs = require('fs');
const nodePath = require('path');
const { readFile } = require('fs');


//checar si existe el path
const pathValid = (path) => {
  return fs.existsSync(path)
}
//Comprobar si el path es relativo o absoluto
const isAbsolute = (path) => {
  return nodePath.isAbsolute(path)
}
//Convertir la ruta a absoluta
const turnAbsolut = (path) => {
  return nodePath.resolve(path)
}
//¿Es archivo?
const isFile = (path) => {
  const stats = fs.statSync(path);
  return stats.isFile()
}
//Checar si el archivo es .md

const extname = (path) => {
  return nodePath.extname(path)
}

//Leer el archivo
const getFile = (path) => {
  return new Promise(function (resolve, reject) {
    readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    });
  });
}

module.exports = {
  pathValid,
  isAbsolute,
  turnAbsolut,
  isFile,
  extname,
  getFile
}
