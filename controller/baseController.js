const requestPromise = require('request-promise');

exports.sendJsonRequest = async (method, uri, qs, headers) => {
    const requestOptions = {
        method,
        uri,
        qs,
        headers
    };
    
    let data = await requestPromise(requestOptions);
    if(data) {
        return JSON.parse(data)
    } else {
        return false;
    }
}