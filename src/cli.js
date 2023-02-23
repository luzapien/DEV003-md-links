
const { mdLinks } = require('./index');

mdLinks('./README.md').then((resp) => {
  console.log(resp)
})
.catch((error) => {
  console.log(error)
});
// console.log(__dirname)
