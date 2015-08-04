/**
 * Created by zvshte on 7/30/2015.
 */

var http = require('http');
var port = process.env.PORT || 888;
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Zvisha oman 2 node.js, random is ' + (Math.random()*100).toFixed());
}).listen(port);
