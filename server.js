const express = require('express');
const morgan = require('morgan');

const sessionsRouter = require('./src/routers/sessionsRouter');
const debug = require('debug')('server');
const server = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

server.use(morgan('tiny'));
server.use(express.static(path.join(__dirname, '/public')));

server.set('views', './src/views');
server.set('view engine', 'ejs');

server.use('/sessions', sessionsRouter);

server.get('/', (req, res) => {
  res.render('index', { title: 'MONJS', data: ['a', 'b', 'c'] });
});

server.listen(3000, () => {
  debug(`Listening on port ${PORT}`);
});
