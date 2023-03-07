const fs = require('fs');
const nodePath = require('path');
const { readFile } = require('fs');
const path = require('path');



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
  return nodePath.extname(path);
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
const readFiles = (path, data) =>{
  const arrayObjects = [];
  const regExp = /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
  const urls = data.match(regExp)
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
    return arrayObjects
  }
}
// getFile('./texto.md').then((result) => {
//   console.log(readFiles('./texto.md', result))
// })
  // console.log(result)
    

//Array de objetos con petición HTTP
const fetchRequest = (arrayObjects) => {
  return new Promise((resolve) => {
    const arrayPromise = [];
    arrayObjects.forEach((object) => {
      const fetchPromise = fetch(object.href)
      arrayPromise.push(fetchPromise);
    })
    Promise.allSettled(arrayPromise).then((result) => {
      for (let i = 0; i < result.length; i++) {
        let okValue;
        if (result[i].status === 'fulfilled') { //Se valida el estado de la petición HTTP
          result[i].value.ok ? okValue = 'ok' : okValue = 'fail'
          arrayObjects[i].status = result[i].value.status
          arrayObjects[i].ok = okValue
        } else {
          okValue = 'fail'
          arrayObjects[i].status = 404
          arrayObjects[i].ok = okValue
        }
      }
      resolve(arrayObjects)
    })
  })
}
//Leer directorios
const readDir = (path) => {
  const files = fs.readdirSync(path)
  return files
}

function readAllFiles(path, arrayOfFiles = []){
	const files = fs.readdirSync(path)
	files.forEach(file => {
		const stat = fs.statSync(`${path}/${file}`)
		if(stat.isDirectory()){
			readAllFiles(`${path}/${file}`, arrayOfFiles)
		}else{
			arrayOfFiles.push(`${path}/${file}`)
		}
	}
	)
	return arrayOfFiles
}
// console.log(readAllFiles('./directorio'))


module.exports = {
  pathValid,
  isAbsolute,
  turnAbsolut,
  isFile,
  extname,
  getFile,
  readFiles,
  fetchRequest,
  readDir,
  readAllFiles
}
