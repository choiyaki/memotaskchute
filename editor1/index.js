var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  console.log("Hello World!!");
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!!\n');
  
  
});

app.listen(app.get('port'), function() {
  console.log('HellowWorld app is running on port', app.get('port'));
});

//１:モジュールのロード
const http = require('http');
const fs = require('fs');

//２:サーバーオブジェクトの作成
const server = http.createServer((req,res)=>{
  //３:ファイル読み込み
  fs.readFile('index.html','UTF-8',
  (error, data)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
  });
});

//４:待ち受け開始
server.listen(3000);
console.log('Server running');
