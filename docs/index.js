var express = require('express');
var app = express();

var http = require('http');
var fs = require('fs');
var server = http.createServer();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    fs.readFile('./editor1.html', 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('not found!');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});
//server.listen(ポート番号, ホスト名);
console.log('server listening ...');


/*function(request, response) {
  console.log("Hello World!!");
  response.writeHead(200, {'Content-Type': 'text/plain'});


//response.end('Hello heroku!!\n');
  
});*/

app.listen(app.get('port'), function() {
  console.log('HellowWorld app is running on port', app.get('port'));
});
