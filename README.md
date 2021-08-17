# Markdown Links

## Índice

- [1. Preámbulo](#1-preámbulo)
- [2. Resumen del proyecto](#2-resumen-del-proyecto)
- [3. Plan de acción](#3-plan-de-acción)
- [4. Guia de uso](#4-guia-de-uso)
- [5. Instalación](#8-Instalación)
- [6. Checklist](#9-checklist)

---

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Resumen del proyecto

En este proyecto creamos una herramienta de línea de comando (CLI) que permite extraer links dentro de archivos markdown, evalua su estatus y presenta estadísticas de los mismos.


## 3. Plan de acción 

Como parte de la planificación de este proyecto, se elaboró un plan de acción en Github Projects considerando un milestone por cada sprint y los issues necesarios para poder hacer
seguimiento del progreso de acuerdo al tiempo estipulado, además se usó la plataforma de [lucid-app](https://lucid.app/documents#/dashboard) para elaborar el diagrama de flujo con los pasos necesarios para culminar el proceso, el cual presentamos a continuación: 

![diagrama](https://github.com/margaZM/LIM015-md-links/blob/dev/src/images/diagrama.png?raw=true)

## 4. Guia de Uso

La librería se puede ejecutar de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no valida si las URLs responden ok o no,
solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si se pasa la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También es posible combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

## 5. Instalación 

Para instalar la librería use el comando: 

`npm install margaZM-mdlinks`


## 6. Checklist

### General

- [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa soporte para directorios
- [ ] Implementa `options.validate`

### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`
- [ ] Implementa `--stats`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).