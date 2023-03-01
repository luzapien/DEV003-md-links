
const { mdLinks } = require('./index');
// const { getFile } = require('./api');

mdLinks('./texto.md').then((resp) => {
  console.log(resp)
})
  .catch((error) => {
    console.log(error)
  });
// console.log(__dirname)

//Realizar aqui los options, se pueden instalar librerías en la terminal, aquí se le da el diseñp, esta parte la verá el usuario
//dejarlo al final
