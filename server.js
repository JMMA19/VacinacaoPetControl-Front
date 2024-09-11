const express = require('express');

const app = express();

app.use(express.static('./dist/VacinacaoPetControl-Front'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/VacinacaoPetControl-Front/'}),
);

app.listen(process.env.PORT || 8080);
