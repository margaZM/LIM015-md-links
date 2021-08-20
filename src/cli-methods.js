const fetch = require('node-fetch');
let messageStats = {};

const optionValidate = (urls) => {
    const newUrls = urls.map((url) => {
        const onlyUrl = url.href;
        return fetch(onlyUrl)
        .then((res) => {
            url.status = res.status; 
            res.statusText !== 'OK' ? url.ok = 'Failed' : url.ok = 'Ok';
            return url;
        })
        .catch((error) => {
            if (error) {
                url.status = 500;
                url.ok = 'Failed'
                return url;
            }
        })
    })
    return Promise.all(newUrls);
}

const optionStats = (urls) => {
    let countedUrls = urls.reduce(function (allUrls, url) {
    return (url.href in allUrls ? allUrls[url.href]++ : allUrls[url.href] = 1, allUrls) 
    }, {})
    const unique = Object.values(countedUrls);
    messageStats.Total = urls.length;
    messageStats.Unique = unique.length;
    return messageStats;
}

const optionStatsValidate = (urls) => {
    let countedBroken = 0;
    for (const url of urls) {
        if (url.status > 299) {
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
