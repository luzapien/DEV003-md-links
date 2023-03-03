const { getFile } = require('./api');
const api = require('./api');

// const fetch = require('node-fetch');
// const { url } = require('inspector');

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))

const fileRegex = (path) => {

  getFile(path).then((result) => {
    const arrayObjects = [];
    const regExp = /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
    const urls = result.match(regExp)
    if (!urls) {
      console.log('No tiene urls')
    } else {
      console.log('URLs: ', urls)
      for (let i = 0; i < urls.length; i++) {
        arrayObjects.push({
          href: urls[i][2],
          text: urls[i][1],
          file: path,
        });
        let start = urls[i].indexOf('[');
        let end = urls[i].indexOf(']');
        //  console.log('inicio y fin', start, end);
        const obj = {
          text: urls[i].substring(start + 1, end),
          href: urls[i].substring(end + 2, urls[i].length - 1),
          file: path // ruta del archivo, ruta absoluta debería ir acá
        }
        console.log(obj);
        // urls.forEach((texto) => {
        //   // console.log(texto);
        //   const objectUrl = {
        //     href:urls,
        //     text: texto

        //   }
        //   console.log(objectUrl)
        // })

      }
    }
  })
    .catch((error) => {
      console.log(error)
    });
}
// fileRegex('./texto.md');

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
