const { mdLinks } = require('../src/index');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
it('It should reject if the path does not exist', () => {
return (mdLinks('./doesnotexist.md')).catch((error) => {
expect(error).toBe('La ruta no existe')
})
});

});
