const process = require('process');
require('colors');
const index = require('./index');
const message = require('./messages');
const cli = require('./cli');

const mdLinks = function(path, options) {
    
    return new Promise((resolve, rejects) => {
        const isValid = index.validatePath(path);
        let urls;

        if( isValid ) {
            const allFiles = index.arrayFilePath(path);
            const filesMd = index.listFilesMd(allFiles);

            if (filesMd.length === 0) {
                rejects(message.whitOutFilesMd.red);
            } 
            else {
                const filesMdAbsolute = index.toPathAbsolute(filesMd);
                const arrayLinks = index.readFilesMd(filesMdAbsolute);
                if (arrayLinks[0] === null) {
                    rejects(message.whitOutLinks.red);
                }
                urls = index.getLinks(arrayLinks)
            }
            if (options.validate === true) {
                resolve(cli.optionValidate(urls));
            } else {
                resolve(urls);
            }
        } else {
            rejects(message.invalidPath.red);
        };
    })
};

module.exports = { mdLinks }
// const checkLinks = (url) => {
//     url.forEach(element => {
//         console.log(element)
//     });
// }

// const onlyMd = index.typePath(route);
// // console.log(onlyMd)
// const list = index.listFiles(route)
// console.log(list)



// const [,, pathSent] = process.argv;
// const [,,, ...options] = process.argv;
// const [,, route] = process.argv;
// const routeAbsolute = index.validateRoute(route);
// console.log(routeAbsolute)
// const allFiles = index.listFiles(routeAbsolute );
// console.log(allFiles)
// const onlyMd = index.listFilesMd(allFiles);
// console.log(onlyMd)
// const urlData = index.checkLinks(onlyMd)
// console.log(urlData)
// var url_analizada = /^(\w+):\/\/([^\/]+)([^]+)$/.exec(urls[0][7]);
// console.log(url_analizada)
// for (let i=0; i<urlsObject.length; i++){
//     for (let j=0; j<urls[i].length; j++) {
//         // let url = new URL(urls[i][j]);
//         // const message = {
//         //     // path: index.toPathAbsolute(),
//         //     href: url.href,
//         //     text: url.origin
//         // }
//         // // return new Promise((resolve, rejects) => {
//         // //     resolve(`${message.path} ${message.href} ${message.text}`)
//         // // })
//         // let promise =  new Promise((resolve, rejects) => {
//         //     resolve(`${message.path}  ${message.href}  ${message.text}`)
//         // })
//         // promise.then((result) => {
//         //     console.log(result)
//         // })
//         // console.log(`${message.path} ${message.href} ${message.text}`);
//     }
// }


// imtento de hacer promesa 
// if( index.validatePath(path) ) {
//     return new Promise((resolve, rejects) => { 
//         if (filesMdAbsolute.length === 0) {
//             rejects(
//             `       Error: no hay 
//                 archivos .md para analizar`
//             );
//             return;
//         } 
//         else {
//             for (const url of urls) {
//                 message = {
//                 path: url.filePath,
//                 href: url.urlsArray,
//                 // text: urlsObject[i]
//                 }
//             resolve(`${message.path}  ${message.href}`);
//             // return `${message.path}  ${message.href}`;
//             }
//         }
//     })
// }else {
//     console.error('Error: ${path} es una ruta inválida');
//     return;
// }

//comentario intento crear nueva funcion
    // const validateFalse = () => {
    //     if( index.validatePath(path) ) {
    //         return new Promise((resolve, rejects) => { 
    //         if (filesMdAbsolute.length === 0) {
    //             rejects(
    //             `       Error: no hay 
    //                 archivos .md para analizar`
    //             );
    //             return;
    //         } 
    //         else {
    //             for (const url of urls) {
    //                 message = {
    //                 path: url.filePath,
    //                 href: url.urlsArray,
    //                 // text: urlsObject[i]
    //                 }
    //             resolve(`${message.path}  ${message.href}`);
    //             return `${message.path}  ${message.href}`;
    //             }
    //         }
    //     })
    //     } else {
    //     console.error('Error: ${path} es una ruta inválida');
    //     return;
    //     }
    // }

    //peticion http
    // https.get(urlNew.host + urlNew.pathname, (response) => {
//     let data = '';
//     response.on('data', (chunk) => {
//         data += chunk;
//     });
//     response.on('end', () => {
//         console.log(data)
//     })
// })