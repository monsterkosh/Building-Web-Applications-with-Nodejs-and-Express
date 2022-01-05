const express = require('express');
const debug = require('debug')('server');
const morgan = require('morgan');
const server = express();
const path = require('path');

server.use(morgan('tiny'));
server.use(express.static(path.join(__dirname, '/public')));

server.get('/', (req, res) => {
  res.send('Hello...');
});

server.listen(3000, () => {
  debug('Listening on port 3000');
});
