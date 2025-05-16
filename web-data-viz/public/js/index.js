const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // porta do servidor

// Define a pasta onde o index.html está (ajuste se necessário)
app.use(express.static(path.join(__dirname)));

// Rota principal para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
