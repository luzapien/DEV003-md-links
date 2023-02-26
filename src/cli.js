
const { mdLinks, getLinks } = require('./index');

mdLinks('./texto.md').then((resp) => {
  console.log(resp)
})
.catch((error) => {
  console.log(error)
});
// console.log(__dirname)
getLinks('./texto.md');
