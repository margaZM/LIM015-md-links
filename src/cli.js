#!/usr/bin/env node 
const fetch = require('node-fetch');
let messageStats = {};

const optionValidate = (urls) => {
    const newUrls = urls.map((url) => {
        return fetch(url.href)
        .then((res) => {
            url.status = res.status; 
            url.ok = res.statusText;
            return url;
        })
        .catch((error) => {
            error.message;
            return error.message;
        })
    })
    return Promise.all(newUrls);
}

const optionStats = (urls) => {
    let countedUrls = urls.reduce(function (allUrls, url) {
    return (url.href in allUrls ? allUrls[url.href]++ : allUrls[url.href]=1, allUrls) 
    }, {})
    const unique = Object.values(countedUrls)
    messageStats.Total = urls.length;
    messageStats.Unique = unique.length;
    return messageStats;
}

const optionStatsValidate = (urls) => {
    let countedBroken = 0;
    for (const url of urls) {
        if (url.status === 404) {
        countedBroken++;
        }
    }
    messageStats.Broken = countedBroken;
    return messageStats;
}

module.exports = {
    optionValidate,
    optionStats, 
    optionStatsValidate,
}
