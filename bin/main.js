#!/usr/bin/env node

var fs = require('fs');

var writeErr = function (err, res) {
    console.log(err);
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('404');
    res.end();
};

var writeData = function (data, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
};

var html = function (req, res) {
    console.log(req);
    var filePath = 'view/index.html';
    if (req[0] === '') {
        fs.readFile(filePath, function (err, data) {
            writeData(data, res);
        });
    } else {
        if (req.length === 1) {
            filePath = 'view/' + req[0] + '/index.html';
        } else {
            filePath = 'view/' + req[0] + '/' + req[1] + '.html';
        }
        fs.readFile(filePath, function (err, data) {
            if (err !== null) {
                writeErr(err, res);
            } else {
                writeData(data, res);
            }
        });
    }
};

var running = function (req, res) {
    var u = req.url.match('^[^?]*')[0].split('/').slice(1);
    html(u, res);
};

var server = require('http').createServer(running);

var io = require('socket.io')(server);

// io.sockets.on('connection', function (client) {
//
//     io.emit('online', ++onlineNow);
//     console.log(onlineNow + ' online');
//
//     var address = client.handshake.address;
//     // console.log(address);
//     console.log('New connection from ' + address);
//
//     client.on('minhdi', function (data) {
//         console.log(data);
//         data.v = (data.v === 0) ? 1 : 0;
//         io.emit('doiphuongdi', data);
//     });
//
//     client.on('send', function (data) {
//         console.log(data);
//         io.emit('nhan', data);
//     });
//
//     client.on('disconnect', function () {
//         console.log(--onlineNow + ' online');
//     });
//
// });
server.listen(9000);