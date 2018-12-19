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

    
PUG    
    
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
-------------------------
    
SERVIDOR


const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const url = require('url')

const app = express();

app.use(cookieParser());
app.use(session({secret: 'H A H A'}));

const pug = require('pug');
const compiledFunction = pug.compileFile('server.pug');
var number = Math.floor(Math.random() * 4);

app.get('/teste', (req, res) => {
    
})

app.get('/random', function(req, res){
    var parts = url.parse(req.url, true);
    var query = parts.query;
    var bt = query.bt
    console.log(bt);
    
    console.log("sess:");
    for (k in req.session) {
        console.log(`sess[${k}] = ${req.session[k]}`);
    }
    console.log("--");
    
    var click = true;
    //var clique = req.session.click;
    if (!req.session.click) {
        req.session.click = [];
    }
    console.log(req.session.click);
    //var valorInput = letras.vi;
    if (!req.session.colors) {
        req.session.colors = [];
    }
    // Verificar a quantidade de clicks
    if(!req.session.num_click) {
        req.session.num_click = 0;
    }
    
    if (bt) {
        req.session.num_click++;
        req.session.click.push(bt);
    }
    
    //Pra quebra a url para fazer o segundo array
    var sessao = req.session.colors;
    var teste = true;   
    console.log(req.session.num_click);
    console.log(req.session.click);
    console.log(req.session.colors);
    if(req.session.num_click == req.session.colors.length) {
        for (let i = 0; i < sessao.length; i++) {
            console.log(sessao);
            console.log(i);
            if (req.session.colors[i] == req.session.click[i] && teste){
                console.log('acertou');
            }else {
                console.log('errou');
                //Se errar encerra a sessão 
                //não Destruir sessão
                //req.session.destroy(compiledFunction, () => {
                //    // teste = false;
                //});
                teste = false;
            }
        }
        var addColor = teste;
        if (addColor) {
            var n = 1 + (Math.floor(Math.random() * 4)% 4);
            req.session.colors.push(n);
                console.log(req.session.colors);
                req.session.num_click = 0;
                req.session.click = [];
        }  else {
            teste = false;
            req.session.colors = [];
            req.session.num_click = 0;
            req.session.click = [];
            res.send("Errou <a href=\"/random\">voltar</a>");
            return;
        }
    }
    console.log("sess:");
    for (k in req.session) {
        console.log(`sess[${k}] = ${req.session[k]}`);
    }
    console.log("--");
    console.log("--");
    res.send(compiledFunction({
        ordem: (req.session.num_click == 0 ? req.session.colors.join(",") : "")
    }));
});

app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
})

-----------------------
    
CSS

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
a {
    display: inline-block;
    margin-top: -4px;
}
.main {
    padding-top: 4px;
    width: 200px;
    height: 200px;
}
.titlecontainer {
    border: none;
    width: 100px;
    height: 100px;
    display: inline-block;
    text-align: center;
}
.vermelho {
    background-color: red;
    border-top-left-radius: 100%;
}
/*.vermelho .inner {
    border-top-left-radius: 100%;
    background: white;
    width: 70%;
    height: 70%;
    position: relative;
    top: 30%;
    left: 30%;
}*/
.amarelo {
    background-color: yellow;
    border-top-right-radius: 100%;
}

.verde {
    background-color: green;
    border-bottom-left-radius: 100%;
}
.azul {
    background-color: blue;
    border-bottom-right-radius: 100%;
}

/*-------------*/

.black1{
    background-color: white;
    border-radius: 100%;
}
