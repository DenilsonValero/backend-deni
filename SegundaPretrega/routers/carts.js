const express = require('express');
const fs = require('fs');
const router = express.Router();


const carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8'));


router.get('/', (req, res) => {
    res.json(carts);
});

// Ruta para obtener un carrito por ID
router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/', (req, res) => {
    const newCart = req.body;
    carts.push(newCart);
    fs.writeFileSync('./data/carts.json', JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
});

module.exports = router;

