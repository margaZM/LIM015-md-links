#!/usr/bin/env node
const api = require('./api');
const [,, pathSent, ...options] = process.argv;

api.mdLinks(pathSent, options).then((resp) => {
    console.log(resp)
    // resp.forEach(element => {
    //     console.log(`${element.file} ${element.href} ${element.text} ${element.status} ${element.ok}`)
    // });
});