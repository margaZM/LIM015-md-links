require('colors');

const helpMessage = `
Examples:

${ ' $ md-links <path-to-file>'.bgGray  }                        Parses Markdown files and prints the links it contains, their path, status and stats.
    $ md-links ./some/example.md
    ./some/example.md http://algo.com/2/3/ Link a algo
    ./some/example.md https://otra-cosa.net/algun-doc.html algún doc
    ./some/example.md http://google.com/ Google

${'$ md-links ./some/example.md --validate'.bgGray }           Analyze if the link works or not and returns its status.

    $ md-links ./some/example.md --validate
    ./some/example.md http://algo.com/2/3/ ok 200 Link a algo
    ./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
    ./some/example.md http://google.com/ ok 301 Google

${'$ md-links ./some/example.md --stats '.bgGray }             Returns basic statistics about the links.
    $ md-links ./some/example.md --stats
    Total: 3
    Unique: 3

${ '$ md-links ./some/example.md --stats --validate'.bgGray }   Returns statistics of the validation results.
    $ md-links ./some/example.md --stats --validate
    Total: 3
    Unique: 3
    Broken: 1
`

const whitOutFilesMd = `
        ${ 'Error:'.red }  there is no
        .md files to analyze
`                

const whitOutLinks = `            
        ${ 'Error:'.red }  there is no
        links to analyze
`

const whitOutPath = `
        ${ 'Error:'.red } please enter the path of the
        file to analyze
`

module.exports = {
    helpMessage,
    whitOutFilesMd,
    whitOutLinks,
    whitOutPath,
}