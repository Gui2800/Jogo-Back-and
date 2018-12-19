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

-------------------------------
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title Genius
        style      
            include server.css
    body
        .main
            a(class = 'buuton' href="/random?bt=1")
                .titlecontainer.vermelho#btn1
                    .inner 
            a(class = 'buuton' href="/random?bt=2")
                .titlecontainer.amarelo#btn2 
                    .inner
            a(class = 'buuton' href="/random?bt=3")
                .titlecontainer.verde#btn3
                    .inner  
            a(class = 'buuton' href="/random?bt=4")
                .titlecontainer.azul#btn4
                    .inner 
        script.
            var $ = function(el) { return document.getElementById(el) };
            var ordem = [!{ordem}]; // aqui vem um valor do node
            // se o valor tiver preenchido, entao vai fazer a animacao
            function acende(el) {
                // faz o elemento "el" acender
                document.getElementById(el.toString()).className = ('titlecontainer black')
                console.log("acende " + el);
                setTimeout(function() {
                    // "apaga" o elemento "el"
                    console.log('xxxx = ', el, el == 'btn1');
                    if(el == 'btn1') {
                        document.getElementById(el.toString()).className = ('titlecontainer vermelho')
                    } else if (el == 'btn2') {
                        document.getElementById(el.toString()).className = ('titlecontainer amarelo')
                    } else if (el == 'btn3') {
                        document.getElementById(el.toString()).className = ('titlecontainer verde')
                    } else if (el == 'btn4') {
                        document.getElementById(el.toString()).className = ('titlecontainer azul')
                    } else {
                        console.log('nenhum');
                    }
                    console.log("apaga " + el);
                }, 800);
            }
            
            var i = 0;
            console.log(ordem);
            setInterval(function() {
                if (i < ordem.length) {
                    acende(`btn${ordem[i]}`);
                    i++;
                }
            }, 1000);
