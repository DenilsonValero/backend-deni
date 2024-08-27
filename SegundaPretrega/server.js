const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views');

app.use('/products', productsRouter);
app.use('/api/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

    socket.on('deleteProduct', (productId) => {
        io.emit('removeProduct', productId);
    });
});


httpServer.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

httpServer.listen(8081, () => {
    console.log('Servidor escuchando en el puerto 8081');
});
