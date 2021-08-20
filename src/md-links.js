#!/usr/bin/env node
const api = require('./api');
const cli = require('./cli-methods');
require('colors');
const ora = require('ora');
const message = require('./messages');
const program = require('commander')
    .command('md-links <path>')
    .version('0.1.1', '-V, --version', 'output the current version')
    .description('Parses Markdown files and prints the links it contains, their path, status and stats')
    .option('-v, --validate [value]', 'Validates the links in the .md file', false)
    .option('-s, --stats', 'Statistics associated with the links')
    .addHelpText('after', message.helpMessage)
    .action(function(path, options) {
    const spinner = ora('Loading...').start();
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading...';
    }, 1000);

    api.mdLinks(path, options).then((resp) => {
        spinner.succeed('Loaded');
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
                } else if (url.status > 299) {
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
        spinner.fail('Please check the following error:')
        console.error(error)
    })
})

program.parse(process.argv);

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