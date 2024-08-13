const express = require('express');
const fs = require('fs');
const router = express.Router();

// Leer productos desde el archivo JSON
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

// Ruta para listar todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

module.exports = router;
