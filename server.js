const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const paises = require('./paises.json');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'cliente')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/buscar', function(req, res) {
    const { search } = req.query;
    let resultados = paises;
    if (search) {
        resultados = resultados.filter((pais) => pais.toLowerCase().includes(search.toLowerCase()))
    }
    res.json(resultados);
})


app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
})