const { getFile, readAllFiles } = require('./api');
const api = require('./api');


function mdLinks(path, options) {
  console.log('Resolving path...')
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      const pathValidation = {
        pathAbsolute: api.isAbsolute(path),
        turnPathToAbsolute: api.turnAbsolut(path),
        pathIsFile: api.isFile(path),
      }
      // console.log('Path info:', pathValidation)
      if (pathValidation.pathIsFile && api.extname(path) === '.md') {
        getFile(path).then((result) => {
          !options ? resolve(api.readFiles(path, result))
            : api.fetchRequest(api.readFiles(path, result)).then((resArray) => resolve(resArray))
        })
      } else {
        const files = api.readAllFiles(path)
        let promises = []
        files.forEach((path) => {
          // recursividad
          promises.push(mdLinks(path, options))
        });

        Promise.all(promises).then((responses) => {
          // resolve(...responses)
          let responsesArr = []
          for (let i = 0; i < responses.length; i++) {
            const res = responses[i]
            for (let j = 0; j < res.length; j++) {
              const object = res[j]
              responsesArr.push(object)
            }
          }

          resolve(responsesArr)
        })
      }
    } else {
      reject('La ruta no existe');
    }
  })
}


// mdLinks('./directorio', true)

module.exports = {
  mdLinks,
  // fileRegex
};
