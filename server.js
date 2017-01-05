var http = require('http');
var express = require('express');

// 웹 서버 생성
var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(app.router);

app.get('/products', function(req, res){
  res.send(items);
});
app.get('/products/:id', function(req, res){
  var id = Number(req.param('id'));
  if(isNaN(id)){
    res.send({
      errer: '숫자를 입력하세요!!'
    });
  }else if(items[id]){
    res.send(items[id]);
  }else {
    res.send({
      error : "존재하지 않는 데이터입니다!!"
    });
  }

});
app.post('/products', function(req, res){
  var name = req.param('name');
  var price = req.param('price');
  var item = {
    name: name,
    price: price
  };

  //데이터 추가
  items.push(item);

  //응답
  res.send({
    message: "데이터를 추가했습니다.",
    data: item
  });
});
app.put('/products/:id', function(req, res){
  var id = req.param('id');
  var name = req.param('name');
  var price = req.param('price');

  if(items[id]){
    if(name){
      items[id].name = name;
    }
    if(price){
      items[id].price = price;
    }
    res.send({
      message: "데이터를 수정했습니다."
    });
  } else{
    res.send("존재하지 않는 데이터입니다.");
  }
});
app.del('/products/:id', function(req, res){
  var id = req.param('id');
  if(isNaN(id)){
    res.send("숫자를 입력하세요");
  } else if(items[id]){
    items.splice(id, 1);
    res.send({
      message: "데이터를 삭제했습니다."
    });
  } else{
    res.send("존재하지 않는 데이터입니다.");
  }
});

app.all('/data.html', function(req, res){
  var output = '';
  output += '<!DOCTYPE html>';
  output += '<html>';
  output += '<head>';
  output += '      <meta charset="utf-8">';
  output += '    <title>node.js express</title>';
  output += '    </head>';
  output += '  <body>';
  items.forEach(function(item){
  output += '<div>';
  output += '<h1>' + item.name +'</h1>';
  output += '<h1>' + item.price +'</h1>';
});
  output += '    </body>';
  output += '</html>';

  res.send(output);
});
app.all('/data.json', function(req, res){
  res.send(items);
});
app.all('/data.xml', function(req, res){
  var output = '';
  output += '<?xml version = "1.0" encoding = "UTF-8" ?>';
  output += '<products>';
  items.forEach(function (item){
    output += '<product>';
    output += '<name>' + item.name + '</name>';
    output += '<price>' + item.price + '</price>';
    output += '</product>';
  });
  output += '</products>';
  res.type('text/xml');
  res.send(output);
});

var items = [{
  name : '우유',
  price : '2000'
}, {
  name : '커피',
  price : '4000'
}, {
  name : '케이크',
  price : '5000'
}];

app.all('/parameter', function(req, res){
  // variable declare
  var name = req.param('name');
  var region = req.param('region');
  // response
  res.send('<h1>' + name + ":" + region + '</h1>');
});

app.all('/parameter/:id', function(req, res){
  var id = req.param('id');

  res.send('<h1>' + id + '</h1>');
});
/*
app.use(function(req, res){
  res.send('<h1>Hello Middleware</h1>');
});
*/
/*
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
//app.use(express.session());
//app.use(express.static('public'));
//app.use(app.router());
*/

/*
app.use(function(req, res, next){
//  res.send("<h1> 안녕1? </h1>");
  req.test = "req1";
  res.test = "res1";
  next();
});
app.use(function(req, res, next){
  res.send(req.test + "::" + res.test);
  console.log("second");
});
*/
// web server 실행
http.createServer(app).listen(3000, function(){
  console.log("Server Running at http://localhost/:3000");
});
