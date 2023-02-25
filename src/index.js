const fs = require('fs');
const api = require('./api');
// import  readFile from './api.js';
// console.log(readFile);


// console.log(isDirectory('./README.md'));
// // Mostrar los archivos del directorio
// const readDir = (path) => fs.readdirSync(path);
//  console.log(readDir('./README.md'));

//leer archivos archivos
//  fs.readFile(path,'utf-8', (error,data) => {
//   if(error) throw error;
//   console.log(data)
// })


// // Getting .md files
//   function getMdFiles(path) {
//     let mdFilesArr = [];
//     // Check if inputPath is a file 
//     if (isDirectory(path) === false && isFileMarkdown(inputPath)) {
//       // Turn path into absolute
//       let absolutePath = turnAbsolute(inputPath);
//       // Add path to the mdFilesArr
//       mdFilesArr.push(absolutePath);
//     } else if (isDirectory(inputPath)) {
//       // If so, read directory
//       readDir(inputPath).forEach((file) => {
//         // Join paths for each file
//         let joinedPaths = path.join(inputPath, file);
//         // Turn paths into absolute 
//         let absolutePaths = turnAbsolute(joinedPaths);
//         // Add paths to the mdFilesArr
//         mdFilesArr = [...mdFilesArr, ...getMdFiles(absolutePaths)];
//       });
//     }
//     return mdFilesArr;
//   }

function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    //Identificar si la ruta existe.
    if (api.pathValid(path)) {
      //comprobar si es absoluta
      if (!api.isAbsolute(path)) {
        resolve(api.turnAbsolut(path));
        fs.readFile(path,'utf-8', (error,data) => {
          if(error) throw error;
          console.log(data)
        })
        
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
