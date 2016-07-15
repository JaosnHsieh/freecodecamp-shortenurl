var express = require('express');
var app = express();

var dic = {};
var number = 0;
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/:url',function(req,res){
    if(dic[req.params.url] !== undefined){
        res.redirect(dic[req.params.url]);
    }
    else{
        res.send('no this short url');
    }
});

app.get('/new/:http//:url',function(req,res){
    var http = req.params.http;
    var url = req.params.url;
    if(/\./g.test(url)===true&&(http=='http:'||http=='https:')){
        dic[number++] = http+'//'+url;
        var obj = {original_url:http+'//'+url , short_url: number-1};
        res.json(obj);
    }
    else{
        res.json({"error":"Invalid url"});
    }

});

app.use('/public',express.static(__dirname+'/public'));

app.use('*',function(req,res){
    res.redirect('/');
});
app.listen(process.env.PORT||8080);

console.log(8080);