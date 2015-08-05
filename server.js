/**
 * Created by zvshte on 7/30/2015.
 */

var storage = require('node-persist');

//you must first call storage.init or storage.initSync
storage.initSync();

//then start using it
storage.setItem('callcount',0);
console.log(storage.getItem('callcount'));

var batman = {
    first: 'Bruce',
    last: 'Wayne',
    alias: 'Batman'
};

storage.setItem('batman',batman);
console.log(storage.getItem('batman').alias);


var http = require('http');
var port = process.env.PORT || 888;
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('callcount =  ' + storage.getItem('callcount'));
    res.end(storage.getItem('batman'));
    storage.setItem('callcount',storage.getItem('callcount')+1);
}).listen(port);
