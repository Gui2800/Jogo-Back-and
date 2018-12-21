
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pug = require('pug');
const url = require('url')
const compiledFunction = pug.compileFile('teste.pug');
const jogar = pug.compileFile('server.pug');
const sobreojogo = pug.compileFile('sobreojogo.pug');
const sobre = pug.compileFile('sobre.pug');
const comojogar = pug.compileFile('comojogar.pug');
const perdeu = pug.compileFile('perdeu.pug');

const app = express();



app.get('/jogar', (req, res) => {
    res.send(jogar({
    }));
});
app.use(cookieParser());
app.use(session({secret: 'Shhhhh'}));

//const pug = require('pug');
//const jogar = pug.compileFile('.pug');
var number = Math.floor(Math.random() * 4);

var pontos = 0;

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
                pontos++;
            }else {
                console.log('errou');
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
                //adicionar mais 1 no score
        }  else {
            teste = false;
            // var pontos = req.session.num_click - 1;
            req.session.colors = [];
            req.session.num_click = 0;
            req.session.click = [];
            res.send(perdeu({
            }));
            return;
        }
    }
    console.log("sess:");
    for (k in req.session) {
        console.log(`sess[${k}] = ${req.session[k]}`);
    }
    console.log("--");
    console.log("--");
    res.send(jogar({
        ordem: (req.session.num_click == 0 ? req.session.colors.join(",") : ""),
        pontos: req.session.colors.length
    }));
});


app.get('/genius', (req, res) => {
    res.send(compiledFunction({
    }));
});
  
app.get('/sobreojogo', (req, res) => {
    res.send(sobreojogo({
    }));
});


app.get('/comojogar', (req, res) => {
    res.send(comojogar({
    }));
});

app.get('/sobre', (req, res) => {
    res.send(sobre({
    }));
});
app.listen(4000, () => {
    console.log('Se ligue la pvte');
  })



