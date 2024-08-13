const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

// Rutas para productos
app.use('/products', productsRouter);
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/carts', cartsRouter);
app.use('/api/carts', cartsRouter);

// Escuchar en los puertos 8080 y 8081
app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

app.listen(8081, () => {
    console.log('Servidor escuchando en el puerto 8081');
});
