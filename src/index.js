const fs = require('fs');
const nodePath = require('path');

const mdLinks = (path, options) => {
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (fs.existsSync(path)) {
      //comprobar si es absoluta
      if (nodePath.isAbsolute(path)) {
        resolve('La ruta es absoluta')
      } else {
        // const fileContent = fs.readFileSync(path).toString()
        //Convertir la ruta a absoluta
        const resolvePath = nodePath.resolve(path)
        resolve(resolvePath)
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
