const { getFile } = require('./api');
const api = require('./api');

const fileRegex = (path, options) => {
  console.log('Looking for URLs...')
  getFile(path).then((result) => {
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
        // console.log(arrayObjects);
      }
      if (!options) {
        console.log(arrayObjects)
      } else {
        arrayObjects.forEach((object) => {
          fetch(object.href)
            .then((resultFetch) => {
              object.status = resultFetch.status
              object.ok = resultFetch.ok
              console.log(object)
            }).catch((error) => {
              const errorObject = {
                href: object.href,
                text: object.text,
                file: object.file,
                status: 404,
                ok: false
              }
              console.log(errorObject)
            })
        })
      }
    }
  })
    .catch((error) => {
      console.log(error)
    });
}
//fileRegex('./texto.md', false );

function mdLinks(path, options) {
  console.log('Resolving path...')
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      const pathValidation = {
        pathRelative: api.turnAbsolut(path),
        pathAbsolute: api.isFile(path),
        pathIsFile: api.extname(path)
      }
      console.log('Path info:', pathValidation)
      if (api.extname(path) === '.md') {
        resolve(fileRegex(path, options))
      } else {
        console.log('No es md')
      }
    } else {
      reject('La ruta no existe');
    }
  });
}


module.exports = {
  mdLinks,
  fileRegex
};
