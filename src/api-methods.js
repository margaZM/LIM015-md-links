const fs = require('fs');
const path = require('path');

const validatePath = (pathSent) => fs.existsSync(pathSent); //Verifica si el path existe 

const checkTypePath = (pathSent) =>  fs.lstatSync(pathSent).isDirectory(); //Verifica si es directorio

const arrayFilePath = (pathSent) => {
    const isDirectory = checkTypePath(pathSent);
    let files = [];
    if (isDirectory) {
        const paths = fs.readdirSync(pathSent);
        paths.forEach(element => {
            files = files.concat(arrayFilePath(path.join(pathSent, element)));
        })
    } else {
        files.push(pathSent);
    }
    return files;
};

const listFilesMd = (list) => list.filter(file => path.extname(file) === '.md'); //listar los archivos md

const toPathAbsolute = (list) => { // Pasar a ruta absoluta
    return list.map(element => {
        return path.resolve(element);
    })
};

const readFilesMd = (list) => { //Lee los links de los archivos md
    const regEXp = /\[([^\[]+)\]:?\s?\(?(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
    return list.map(file => {
        const fileContent = fs.readFileSync(file, 'UTF-8');
        const data = fileContent.match(regEXp);

        if (data === null){
            return null;
        }

        const infoUrls = data.map(url => {
            const text = url.match(/\[(.*?)\]\S/);
            const href = url.match(/\((.*?)\)/);
            
            if (text !== null && href !== null) {
                const infoUrl = {
                    file: file,
                    text: text[1].substring(0,50),
                    href: href[1]
                }
                return infoUrl;
            }
        })
        return infoUrls;
    })
};

const getLinks = (arrayLinks) => arrayLinks.flat();

module.exports = { 
    validatePath, 
    checkTypePath, 
    listFilesMd, 
    readFilesMd, 
    arrayFilePath, 
    toPathAbsolute,
    getLinks 
}