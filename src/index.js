const { getFile, readAllFiles } = require('./api');
const api = require('./api');


function mdLinks(path, options) {
  console.log('Resolving path...')
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      const pathValidation = {
        pathRelative: api.turnAbsolut(path),
        pathAbsolute: api.isAbsolute(path),
        pathIsFile: api.isFile(path),
        pathIsMd: api.extname(path)
      }
      console.log('Path info:', pathValidation)
      if(!pathValidation.pathIsFile){
        console.log(readAllFiles(path))
      }
      if (api.extname(path) === '.md') {
        getFile(path).then((result) => {
          // console.log(result)
          const arrayObjects = [];
          const regExp = /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
          const urls = result.match(regExp)
          if (!urls) {
            console.log('This file does not have URLs')
          } else {
            // console.log('URLs: ', urls)
            for (let i = 0; i < urls.length; i++) {
              let start = urls[i].indexOf('[');
              let end = urls[i].indexOf(']');
              //  console.log('inicio y fin', start, end);
              arrayObjects.push({
                href: urls[i].substring(end + 2, urls[i].length - 1),
                text: urls[i].substring(start + 1, end),
                file: path // ruta del archivo, ruta absoluta debería ir acá
              })
            }
            // return arrayObjects
          }
          if (!options) {
            resolve(arrayObjects);
          } else {
            api.fetchRequest(arrayObjects).then((resArray) => {
              resolve(resArray);
            })
          }
        })
      } else {
        console.log('No es md')
      }
    } else {
      reject('La ruta no existe');
    }
  });
}
// mdLinks('./texto.md')

module.exports = {
  mdLinks,
  // fileRegex
};
