
const { mdLinks } = require('./index');
// const { getFile } = require('./api');
mdLinks('./texto.md', false).then((resp) => {
  console.log('RESPONSE FROM CLI ->', resp)
})
  .catch((error) => {
    console.log(error)
  });


//Realizar aqui los options, se pueden instalar librerías en la terminal, aquí se le da el diseñp, esta parte la verá el usuario
//dejarlo al final
