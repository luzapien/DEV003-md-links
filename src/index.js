const { getFile } = require('./api');
const api = require('./api');

const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))

const  fileRegex = (path) => {
  
  getFile(path).then((result) => {
  const regExp = /\!?\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
  const urls = result.match(regExp)
  if (!urls) {
    console.log('No tiene urls')
  } else {
    console.log('URLs: ', urls)
  }
})
  .catch((error) => {
    console.log(error)
  });
}

function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      resolve('La ruta si existe')
      //comprobar si es absoluta
      console.log(api.isAbsolute(path));
      if (!api.isAbsolute(path)) {
        console.log(api.turnAbsolut(path));
      }
      if (api.isFile(path)) {
        console.log('Is file?' + api.isFile(path))
      }
      if (api.extname(path) === '.md') {
      fileRegex(path)
      } else {
        console.log('No es md')
      }
    } else {
      //Si no existe la ruta rechaza la promesa.
      reject('La ruta no existe');
    }
  });
}
// function getLinks(path) {
//   // const regExp =  /\[([^\[]+)\](\(.*\))/gm;
//   const stats = fs.statSync(path);
//   console.log('Is file?' + stats.isFile());
//   // const links = stats.match(regExp)
// }



module.exports = {
  mdLinks
};
