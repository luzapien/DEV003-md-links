const { mdLinks } = require('../src/index');
const fs = require('fs');
const nodePath = require('path');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('It should resolve if the path exist', () => {
   return (mdLinks('./texto.md')).then((r) => {
    expect(r).toBe('La ruta si existe')
   })
  });
  it('It should validate if is absolute', () => {
    expect(nodePath.isAbsolute('./texto.md')).toBe(false);
  });
  // it('It should turn the path to absolute', () => {
  //   expect(nodePath.resolve('./texto.md')).toBe();
  // });
  it('It should check if is a .md extension', () => {
    const ext = nodePath.extname('./texto.md');
    expect(ext).toBe('.md');
  })
  it('It should reject if the path does not exist', () => {
return (mdLinks('./doesnotexist.md')).catch((error) => {
expect(error).toBe('La ruta no existe')
})
});

});
