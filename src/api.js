const index = require('./api-methods');
const message = require('./messages');
const cli = require('./cli-methods');

const mdLinks = function(path, options) {
    
    return new Promise((resolve, rejects) => {

        const isValid = index.validatePath(path);
        let urls;

        if( isValid ) {
            const allFiles = index.arrayFilePath(path);
            const filesMd = index.listFilesMd(allFiles);

            if (filesMd.length === 0) {
                rejects(message.whitOutFilesMd);
            } 
            else {
                const filesMdAbsolute = index.toPathAbsolute(filesMd);
                const arrayLinks = index.readFilesMd(filesMdAbsolute);
                if (arrayLinks[0] === null) {
                    rejects(message.whitOutLinks);
                }
                urls = index.getLinks(arrayLinks)
                urls = data.filter(element => element !== null && element !== undefined);
            }
            if (options.validate === true) {
               resolve(cli.optionValidate(urls));
            } else {
                resolve(urls);
            }
        } else {
            rejects(`
            ${ 'Error:'.red } ${path} is a
            invalid path
            `);
        };
    })
};

module.exports = { mdLinks }