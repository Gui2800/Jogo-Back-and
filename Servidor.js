var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({secret: 'H A H A'}));

app.get('/', function(req, res){
    var n = Math.floor(Math.random() * 4)% 4;
    if (req.session.colors){
        req.session.colors.push(n);
    } else {
        req.session.colors = [n];
    }
    res.send("colors" + req.session.colors);
}); 

app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
  })
