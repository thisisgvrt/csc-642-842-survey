const https = require('https');
const GOOG_API_KEY =  process.env.GOOG_API_KEY || "";

exports.handler = function (event, context, callback) {
    const queryString = event.queryStringParameters['query'];
    var options = {
        host: 'maps.googleapis.com',
        path: encodeURI(`/maps/api/place/autocomplete/json?input=${queryString}&types=address&language=en&key=${GOOG_API_KEY}`),
    };
    httpRequestcallback = (response) => {
        var body = ''
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', () => {
            callback(null, {
                statusCode: 200,
                body: body,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":"application/json"
                }
            });
        });
    }
    const req = https.request(options, httpRequestcallback);
    req.end();
}