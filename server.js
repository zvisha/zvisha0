/**
 * Created by zvshte on 7/30/2015.
 */

var express = require('express');
var app = express();
var azure = require('azure-storage');

//then start using it
//storage.setItem('callcount',0);
//console.log(storage.getItem('callcount'));


console.log("Starting :)");
var http = require('http');
var port = process.env.PORT || 888;
app.set('port', port);
http.createServer(app).listen(app.get('port'),
                                function(){
                                    console.log("Express server listening on port " + app.get('port'));
                                });
/*
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.time("load");
    var z = storage.getItem('callcount');
    var y = 0;
   // for (x = 0; x < 100000; x++) {
   //     y++;
   // }
    console.timeEnd("load");
    res.write('callcountX =  ' + y + z);
    res.end("");
    storage.setItem('callcount',z+1);
}).listen(port);
*/

// will match request to the root

console.time("xxx");
var t = process.hrtime();
tableSvc = azure.createTableService("zvishastore0",
                                        "RFsvglPDm/vFbHiG1hbXCrejCtob63EQM62b/PFinTWzWfaisjIVv8X9/7579ckhYCTCcM6Yd/T3LyZdyM4cDw==");
tableSvc.createTableIfNotExists('mytable', function(error, result, response){
    if(!error){
        // Table exists or created
        console.timeEnd("xxx");
        console.log("!error");
    } else {
        console.timeEnd("xxx");
        console.log("error");
    }
});

function makeFuncs() {
    var zvisha=10;
    function handle_add(req, res) {
        console.time("dbsave");
        var task = {
            PartitionKey: {'_':'hometasks'},
            RowKey: {'_': req.query.xxx},
            description: {'_':'take out the trash'},
            dueDate: {'_':new Date(2015, 6, 20), '$':'Edm.DateTime'}
        };

        tableSvc.insertEntity('mytable',task, function (error, result, response) {
            if(!error){
                // Entity inserted
                res.send('Ok' + ++zvisha);
                console.timeEnd("dbsave");
                console.log("insertEntity Ok");
                console.log(result);
                console.log(response);
            } else {
                res.send('Nak ' + ++zvisha);
                console.timeEnd("dbsave");
                console.log("insertEntity NAK");
                console.log(result);
                console.log(response);
            }
        });
    }

    function send_hi(req, res) {
        res.send('Hello ' + ++zvisha);
    }
    return {f1: handle_add, f2: send_hi};
}


// will match request to the root
var x = makeFuncs();
app.get('/add1', x.f1);
app.get('/add2', x.f2);

app.get('/get', function(req, res) {
    var r = "";
    r += 'Starting<br/>';
    tableSvc.retrieveEntity('mytable', 'hometasks', '1', function(error, result, response){
        if(!error){
            r += JSON.stringify(result);
        }
        r += "<br/>Done";
        res.send(r);
    });

});