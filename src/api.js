#!/usr/bin/env node 
const process = require('process');
const { rejects } = require('assert');
const { resolve } = require('path');
const fetch = require('node-fetch');
require('colors');

const index = require('./index');
const message = require('./messages');
const cli = require('./cli');

const mdLinks = function(path, options = false) {
    const isValid = index.validatePath(path);
    let urls;

    if( isValid ) {
        const allFiles = index.arrayFilePath(path);
        const filesMd = index.listFilesMd(allFiles);

        if (filesMd.length === 0) {
            process.stderr.write(message.whitOutFilesMd);
            return;
        } 
        else {
            const filesMdAbsolute = index.toPathAbsolute(filesMd);
            const arrayLinks = index.readFilesMd(filesMdAbsolute);
            if (arrayLinks[0] === null) {
                process.stderr.write(message.whitOutLinks);
                return;
            }
            urls = index.getLinks(arrayLinks)
        }

    } else {
        if(pathSent === '--help'){
            process.stdout.write(message.helpMessage)
        }else if (pathSent === undefined) {
            process.stderr.write(message.whitOutPath.red);
        } else {
            process.stderr.write(message.invalidPath.red);
        return;
        }
    };

    if (options.length === 0 ) {
        return new Promise((resolve, rejects) => {
            resolve(urls);
            rejects(error);
        })
    } else {

        if (options.length === 1){
            if (options[0] === '--validate') {
                return new Promise((resolve, rejects) => {
                    resolve(cli.optionValidate(urls));
                    rejects(error)
                })
            } else if (options[0] === '--stats') {
                return new Promise((resolve, rejects) => {
                    resolve(cli.optionStats(urls));
                    rejects(error)
                })

            } else {
                console.error(('orden no encontrada'));
            }
        } else if (options.length === 2) {
            if (options[0] === '--stats' && options[1] === '--validate') {
                return new Promise((resolve, rejects) => {
                    cli.optionValidate(urls)
                    .then(val => {
                        let messageStats = cli.optionStats(urls);
                        messageStats.Broken = cli.optionStatsValidate(val).Broken;
                        resolve(messageStats)
                    })
                })
            } else {
                console.error(('orden no encontrada'));
            }
        }
    }
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