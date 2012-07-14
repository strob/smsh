var http = require('http');
var qs = require('querystring');
var url = require('url');

var MAP = {};                   // phone number -> msg
var WAITING = [];

function serialize() {
    return JSON.stringify(MAP);
}

function flush() {
    WAITING.forEach(function(res) {
        res.end(serialize());
    });
    WAITING = [];
}

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var reqUrl = url.parse(req.url, true);
    var path = reqUrl.path;

    if(path.indexOf('gate') == 1) {
        // SMS Gateway

        req.content = '';
        req.addListener("data", function(chunk) {
	    req.content += chunk;
        });
        req.addListener("end", function() {
            var data = qs.parse(req.content);
            console.log("GOT DATA", data);

            MAP[data.from] = data.message;
            flush();

            res.end(JSON.stringify({payload: {
                success: true,
            }}));
        });

    }
    else if(path.indexOf('poll') == 1) {
        res.end(serialize());
    }
    else if(path.indexOf('change') == 1) {
        WAITING.push(res);
    }
    else {
        res.end(JSON.stringify({error: "command not recognized"}));
    }
}).listen(9119, '127.0.0.1');

console.log('server running at http://127.0.0.1:9119/');
