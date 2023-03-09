const { getFile } = require('./api');


// const fetch = require('node-fetch');
// const { url } = require('inspector');

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

// fetch('https://es.wikipedia.org/wiki/Markdown')
//   .then((response) => console.log(response))
  

const fileRegex = (path) => {

  getFile(path).then((result) => {
    const arrayObjects = [];
    const regExp = /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
    const urls = result.match(regExp)
    if (!urls) {
      console.log('No tiene urls')
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
      // console.log(arrayObjects);
      arrayObjects.forEach((object) => {
        fetch(object.href)
          .then((resultFetch) => {
            object.status = resultFetch.status
            object.ok = resultFetch.ok
            console.log(object)
          }).catch((error) => {
            const objeto = {
              href: object.href,
              text: object.text,
              file: object.file,
              status: 404,
              ok: false
            } 
            console.log(objeto)
          })
      })
    }
  })
    .catch((error) => {
      console.log(error)
    });
}
fileRegex('./texto.md');
