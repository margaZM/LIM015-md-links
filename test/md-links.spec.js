const { validatePath, checkTypePath, readFilesMd, listFilesMd, toPathAbsolute, arrayFilePath } = require('../src/index');


describe('validatePath(pathSent)', () => {

  it ("Deberia ser una funcion", () => {
    expect(typeof validatePath).toBe('function');
  });

  it("Should return true if path exist", () => {
    expect(validatePath('../../laboratoria')).toBe(true);
  });

  it("Should return false if it doesn't exist", () => {
    expect(validatePath('../../laborato')).toBe(false);
  });
});

describe('checkTypePath(pathSent)', () => {

  it ("It should be a function", () => {
    expect(typeof checkTypePath).toBe('function');
  });

  it("Should return true if it is directory", () => {
    const result = checkTypePath("/home/marga/test");
    expect(result).toBe(true);
  });

  it("Should return false if it is file", () => {
    const result = checkTypePath("/home/marga/test/hello-world.js");
    expect(result).toBe(false);
  });

});

describe('arrayFilePath(pathSent)', () => {

  it ("It should be a function", () => {
    expect(typeof arrayFilePath).toBe('function');
  });

  it("Should return list files with path absolute if it is directory", () => {
    const result = arrayFilePath("/home/marga/test/prueba");
    expect(result).toEqual(['/home/marga/test/prueba/holamundo.js', '/home/marga/test/prueba/test2.md']);
  });

  //test asincrono
});

describe('listFilesMd(list)', () => {
  it ("It should be a function", () => {
    expect(typeof listFilesMd).toBe('function');
  });
  it ("Should return list of files only md of directory", () => {
    expect(listFilesMd(['README.md', 'Vídeos','baby-steps.js','hello-world.js'])).toEqual(['README.md']);
  });
  it ("Should be null if you don't have .md files", () => {
    expect(listFilesMd(['Vídeos','baby-steps.js','hello-world.js'])).toEqual([]);
  });
});

describe('toPathAbsolute(list)', () => {
  it ("It should be a function", () => {
    expect(typeof toPathAbsolute).toBe('function');
  });
  it ("Should return list of files with path absolute", () => {
    expect(toPathAbsolute([ '../../test/test.md' ])).toEqual([ '/home/marga/test/test.md' ]);
  });
});

describe('readFilesMd(list)', () => {
  it ("Should be a function", () => {
    expect(typeof readFilesMd).toBe('function');
  });
  it ("Should return null if the array is empty", () => {
    expect(readFilesMd(['/home/marga/sinlinks/prueba/sinlinks.md'])).toEqual([null]);
  });
  // it ("Should return array de object con file, text and href", () => {
  //   expect(toPathAbsolute(false)).toEqual([]);
  // });
});