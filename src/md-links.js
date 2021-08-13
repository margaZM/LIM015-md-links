#!/usr/bin/env node
const api = require('./api');
require('colors');
const program = require('commander')
    .version('0.1.0')
    .command('md-links <path>')
    .description('Valid links inside file markdown')
    .option('-v, --validate [value]', 'valid links', false)
    .action(function(path, options) {
        api.mdLinks(path, options).then((resp) => {
            for (const url of resp) {
                if ( options.validate === false ) {
                    console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text}`)
                    console.log('------------------------------------------------------------------')
                }else {
                    if(url.status < 299){
                        console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text} ${'|'.yellow} ${url.status} ${'|'.yellow}   U+08A7 ${url.ok.green}`)
                        console.log('------------------------------------------------------------------')

                    } else {
                        console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text} ${'|'.yellow} ${url.status.red} ${'|'.yellow}  ${url.ok.red}`)
                        console.log('------------------------------------------------------------------')
                    }
                }
            }
        });
    })

program.parse(process.argv);
// api.mdLinks(pathSent, options).then((resp) => {
//     console.log(resp)
//     // resp.forEach(element => {
//     //     console.log(`${element.file} ${element.href} ${element.text} ${element.status} ${element.ok}`)
//     // });
// });

// Dar formato de tabla
// if ( options.validate === false ) {
//     // console.table(`${url.file} ${'*'.yellow} ${url.href} ${'*'.yellow} ${url.text}`)
//     // console.log('------------------------------------------')
//     // console.table(
//     //     resp.map(r => {
//     //         return {
//     //         "path": `${r.file}`,
//     //         "Short Option": `${r.href}`,
//     //         Description: `${r.text}`
//     //         };
//     //     })
//     // )
// }