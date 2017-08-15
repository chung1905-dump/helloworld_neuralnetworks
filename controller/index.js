var fs = require('fs');

var controller = {
    htmlPath: '',
    resObject: {},

    init: function (req, res) {
        this.htmlPath = this.getViewFile(req);
        this.resObject = res;
    },

    execute: function (req, res) {
    },

    render: function () {
        fs.readFile(this.htmlPath, function (err, data) {
            if (err !== null) {
                this.writeErr(err, this.res);
            } else {
                this.writeData(data, this.res);
            }
        });
    },

    getViewFile: function (req) {
        console.log(req);
        var filePath = 'view/index.html';
        if (req[0] !== '') {
            if (req.length === 1) {
                filePath = 'view/' + req[0] + '/index.html';
            } else {
                filePath = 'view/' + req[0] + '/' + req[1] + '.html';
            }
        }
        return filePath;
    },

    writeErr: function (err, res) {
        console.log(err);
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404');
        res.end();
    },

    writeData: function (data, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
};

module.exports = controller;