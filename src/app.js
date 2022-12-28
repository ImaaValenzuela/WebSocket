const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');

const prodRouter = require('./routes/ProductRouter.js');
const cartRouter = require('./routes/CartRouter.js');

const app = express();
const httpServer = app.listen(8080, ()=> console.log('listening'));
httpServer.on('error', ()=> console.log('Error'));
const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    req.io = io;
    next();
})

app.use('/', prodRouter);
app.use('/api/carts', cartRouter);

const messages = []

io.on('connection', socket =>{
    console.log('new cliente connected');

    socket.on('post', data =>{
        prodRouter.post
        io.emit('logs', messages)
    })
    socket.on('delete', data =>{
        messages.push(data)
        io.emit('logs', messages)
    })
})