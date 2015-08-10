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


var zvisha=10;
function handle_add(req, res) {
    console.time("dbsave");
    var task = {
        PartitionKey: {'_':'hometasks'},
        RowKey: {'_': req.query.id},
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


// will match request to the root
app.get('/hi', send_hi);
app.get('/add', handle_add);


// Gets string to append data
function get_data(t1, req, res, r, loops) {
    tableSvc.retrieveEntity('mytable', 'hometasks', req.query.id, function(error, result, response){
        loops--;

        if(!error){
            r += JSON.stringify(result);
        } else {
            r += JSON.stringify("Nada :(");
        }
        r += "<br/>Done, ";
        var t2 = new Date();

        if (loops == 0) {
            r += (t2 - t1) + " msec"  + "<br/>";
            res.send(r);
            return;
        } else {
            get_data(t1, req, res, r, loops);
        }

    });
}

app.get('/get', function(req, res) {
    var loops = 5;
    var t1 = new Date();
    var r = "";
    r += 'Starting<br/>';
    get_data(t1, req, res, r, loops);
});

app.get('/', function(req, res) {
    var r = "";
    r += '/add?id=??? to add<br/>';
    r += '/get?id=??? to get<br/>';
    r += '/hi to ping<br/>';
    res.send(r);
});