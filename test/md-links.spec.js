const index = require('../src/api-methods');
const cli = require('../src/cli-methods');
const api = require('../src/api');
require('colors');

const _mock_arrayLinks = 
[
  [
    {
      file: '/home/marga/mock/mock.md',
      text: 'crehana',
      href: 'https://www.crehana.com/ve/'
    },
    {
      file: '/home/marga/mock/mock.md',
      text: 'LMS',
      href: 'https://lms.laboratoria.la/'
    }
  ]
]

const _mock_links = 
[
  {
    file: '/home/marga/mock/mock.md',
    text: 'crehana',
    href: 'https://www.crehana.com/ve/',
  },
  {
    file: '/home/marga/mock/mock.md',
    text: 'LMS',
    href: 'https://lms.laboratoria.la/',
  }
]

const _mock_links_stats = 
[
  {
    file: '/home/marga/mock/mock.md',
    text: 'crehana',
    href: 'https://www.crehana.com/ve/',
    status: 404,
    ok: 'Failed'
  },
  {
    file: '/home/marga/mock/mock.md',
    text: 'LMS',
    href: 'https://lms.laboratoria.la/',
    status: 200,
    ok: 'Ok'
  }
]

const _mock_links_fail = 
[
  {
    file: '/home/marga/mock/mockfail.md',
    text: 'migraciones',
    href: 'https://www.migraciones.gob.ve/',
  }
]

const _mock_links_fail_stats = [{
  file: '/home/marga/mock/mockfail.md',
  text: 'migraciones',
  href: 'https://www.migraciones.gob.ve/',
  status: 500,
  ok: 'Failed'
}]

describe('validatePath(pathSent)', () => {
  it ("Deberia ser una funcion", () => {
    expect(typeof index.validatePath).toBe('function');
  });

  it("Should return true if path exist", () => {
    expect(index.validatePath('../../laboratoria')).toBe(true);
  });

  it("Should return false if it doesn't exist", () => {
    expect(index.validatePath('../../laborato')).toBe(false);
  });
});

describe('checkTypePath(pathSent)', () => {
  it ("It should be a function", () => {
    expect(typeof index.checkTypePath).toBe('function');
  });

  it("Should return true if it is directory", () => {
    const result = index.checkTypePath("/home/marga/test");
    expect(result).toBe(true);
  });

  it("Should return false if it is file", () => {
    const result = index.checkTypePath("/home/marga/test/hello-world.js");
    expect(result).toBe(false);
  });
});

describe('arrayFilePath(pathSent)', () => {
  it ("It should be a function", () => {
    expect(typeof index.arrayFilePath).toBe('function');
  });

  it("Should return list files with path absolute if it is directory", () => {
    const result = index.arrayFilePath("/home/marga/test/prueba");
    expect(result).toEqual(['/home/marga/test/prueba/holamundo.js', '/home/marga/test/prueba/test2.md']);
  });
});

describe('listFilesMd(list)', () => {
  it ("It should be a function", () => {
    expect(typeof index.listFilesMd).toBe('function');
  });
  it ("Should return list of files only md of directory", () => {
    expect(index.listFilesMd(['README.md', 'Vídeos','baby-steps.js','hello-world.js'])).toEqual(['README.md']);
  });
  it ("Should be null if you don't have .md files", () => {
    expect(index.listFilesMd(['Vídeos','baby-steps.js','hello-world.js'])).toEqual([]);
  });
});

describe('toPathAbsolute(list)', () => {
  it ("It should be a function", () => {
    expect(typeof index.toPathAbsolute).toBe('function');
  });
  it ("Should return list of files with path absolute", () => {
    expect(index.toPathAbsolute([ '../../test/test.md' ])).toEqual([ '/home/marga/test/test.md' ]);
  });
});

describe('readFilesMd(list)', () => {
  it ("Should be a function", () => {
    expect(typeof index.readFilesMd).toBe('function');
  });
  it ("Should return null if the array is empty", () => {
    expect(index.readFilesMd(['/home/marga/sinlinks/prueba/sinlinks.md'])).toEqual([null]);
  });
  it ("Should return an array of arrays from each directory", () => {
    expect(index.readFilesMd(['/home/marga/mock/mock.md'])).toEqual(_mock_arrayLinks);
  });
});

describe('getLinks(list)', () => {
  it ("Should be a function", () => {
    expect(typeof index.getLinks).toBe('function');
  });
  it ("Should return an array of objects from each link", () => {
    expect(index.getLinks(_mock_arrayLinks)).toEqual(_mock_links);
  });
});

//*************** API.JS ************************/

describe('mdLinks(path, option)', () => {
  it ("Should be a function", () => {
    expect(typeof api.mdLinks).toBe('function');
  });
  it ("Should return an error for invalid path", (done) => {
    api.mdLinks('../../te', {validate: false}).catch((resp) => {
      expect(resp)
      .toEqual(`Error: ../../te is a invalid path`);
      done();
    })
  });
  it ("Should return an array of objects for valid path and validate: false", (done) => {
    api.mdLinks('/home/marga/mock/mock.md', {validate: false}).then((resp) => {
      expect.assertions(1);
      expect(resp)
      .toEqual(_mock_links);
      done();
    })
  });
  it ("Should return an array of objects including status and ok", (done) => {
    api.mdLinks('/home/marga/mock/mock.md', {validate: true}).then((resp) => {
      expect(resp)
      .toEqual(_mock_links_stats);
      done();
    })
  });
});


//*************** CLI-METHODS.JS ************************/

describe('optionValidate(url)', () => {
  it ("Should be a function", () => {
    expect(typeof cli.optionValidate).toBe('function');
  });

  it ("Should return an object with status and ok of the links", (done) => {
    cli.optionValidate(_mock_links).then((resp) => {
      expect(resp).toEqual(_mock_links_stats);
      done();
    })
  })

  it ("the fetch fails with an error", (done) => {
    cli.optionValidate(_mock_links_fail).then((resp) => {
      expect(resp).toEqual(_mock_links_fail_stats);
      done();
    })
  })
});

describe('optionStats(urls)', () => {
  it ("Should be a function", () => {
    expect(typeof cli.optionStats).toBe('function');
  });
  it ("Should return an object", () => {
    const result = cli.optionStats(_mock_links_stats)
    expect(result).toEqual({Total: 2, Unique: 2});
  });
});

describe('optionStatsValidate(urls)', () => {
  it ("Should be a function", () => {
    expect(typeof cli.optionStatsValidate).toBe('function');
  });
  it ("Should return an object", () => {
    const result = cli.optionStatsValidate(_mock_links_stats);
    expect(result).toEqual({Total: 2, Unique: 2, Broken: 1});
  });
});


