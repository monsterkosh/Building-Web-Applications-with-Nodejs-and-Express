const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookierParser = require('cookie-parser');
const session = require('express-session');

const debug = require('debug')('server');
const server = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');
const { append } = require('express/lib/response');

// MIDDLEWARES - Need to be in order
server.use(morgan('tiny'));
server.use(express.static(path.join(__dirname, '/public')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookierParser());
server.use(session({ secret: 'globomantics' }));

require('./src/config/passport.js')(server);

server.set('views', './src/views');
server.set('view engine', 'ejs');

server.use('/sessions', sessionsRouter);
server.use('/admin', adminRouter);
server.use('/auth', authRouter);

server.get('/', (req, res) => {
  res.render('index', { title: 'MONJS', data: ['a', 'b', 'c'] });
});

server.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});

// GolaGumrPWVnwqGH
