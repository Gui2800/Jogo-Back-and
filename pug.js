var express = require('express');

var app = express();

const pug = require('pug');
const compiledFunction = pug.compileFile('teste.pug');

console.log(compiledFunction({
   name: 'Timothy'
}));

app.get('/pug', (req, res) => {
    res.send(compiledFunction({

    }));
});

app.listen(4000, () => {
    console.log('Escutando em localhost:4000');
  })
