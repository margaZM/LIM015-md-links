#!/usr/bin/env node
const api = require('./api');
const cli = require('./cli');
const spinner = require('./spinner');
const logUpdate = require('log-update');
require('colors');
// var emoji = require('node-emoji');
const program = require('commander')
    .version('0.1.0')
    .command('md-links <path>')
    .description('Parses Markdown files and prints the links it contains, their path, status and stats')
    .option('-v, --validate [value]', 'Validates the links in the .md file', false)
    .option('-s, --stats', 'Statistics associated with the links')
    .action(function(path, options) {

    api.mdLinks(path, options).then((resp) => {
        // spinner.spinner();
        if (options.stats === true && options.validate === true) {
            let stats = cli.optionStats(resp);
            stats.Broken = cli.optionStatsValidate(resp).Broken;
            console.log(`${ 'Total:'.bold } ${stats.Total}`);
            console.log(`${ 'Unique:'.bold } ${stats.Unique}`);
            console.log(`${ 'Broken:'.bold } ${stats.Broken}`);
            // console.log('otra cosa')
        } else if (options.stats === true && options.validate === false) {
            let urls = resp;
            const stats = cli.optionStats(urls);
            console.log(`${ 'Total:'.bold } ${stats.Total}`)
            console.log(`${ 'Unique:'.bold } ${stats.Unique}`)

        } else if ( options.validate === true ) {
            for (const url of resp) {
                if(url.status < 299) {
                    console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text} ${'|'.yellow} ${url.status} ${'|'.yellow} ✅ ${url.ok.green}`)
                    console.log('------------------------------------------------------------------')
                } else {
                    console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text} ${'|'.yellow} ${url.status} ${'|'.yellow} ❌ ${url.ok.red}`)
                    console.log('------------------------------------------------------------------')
                }
            }
        } else {
            for (const url of resp) {
                console.table(`${url.file} ${'|'.yellow} ${url.href} ${'|'.yellow} ${url.text}`)
                console.log('------------------------------------------------------------------')
            }
        }
    })
    .catch((error)=> {
        console.error(error)
    })
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