const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('server');
const server = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
server.use(morgan('tiny'));
server.use(express.static(path.join(__dirname, '/public')));

server.get('/', (req, res) => {
  res.send('Hello...');
});

server.listen(3000, () => {
  debug(`Listening on port ${PORT}`);
});
