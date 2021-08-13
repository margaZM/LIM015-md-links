const [,, pathSent, ...options] = process.argv;
const helpMessage = `
md-links <path-to-file> [options]

Uso:

${ ' $ md-links <path-to-file>'.bgGray  }                           acción por default que analiza el archivo Markdown, 
imprime los links que contiene, junto con la ruta del archivo donde aparece y el texto que hay dentro 
del link (truncado a 50 caracteres).

    $ md-links ./some/example.md
    ./some/example.md http://algo.com/2/3/ Link a algo
    ./some/example.md https://otra-cosa.net/algun-doc.html algún doc
    ./some/example.md http://google.com/ Google

Opciones:

${'$ md-links ./some/example.md --validate'.bgGray }            analiza si el link funciona o no y devuelve su status.

    $ md-links ./some/example.md --validate
    ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    ./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
    ./some/example.md http://google.com/ ok 301 Google

${'$ md-links ./some/example.md --stats '.bgGray }              devuelve estadísticas básicas sobre los links.
    $ md-links ./some/example.md --stats
    Total: 3
    Unique: 3

${ '$ md-links ./some/example.md --stats --validate'.bgGray }     devuelve estadísticas de los resultados de la validación.
    $ md-links ./some/example.md --stats --validate
    Total: 3
    Unique: 3
    Broken: 1
`

const whitOutFilesMd = `
    Error: no hay 
    archivos .md para analizar
`                

const whitOutLinks = `            
    Error: no hay 
    links para analizar
`

const whitOutPath = `
    Error: por favor ingrese la ruta del 
    archivo a analizar 
`

const invalidPath = `
    Error: ${pathSent} es una 
    ruta inválida
`
module.exports = {
    helpMessage,
    whitOutFilesMd,
    whitOutLinks,
    whitOutPath,
    invalidPath
}