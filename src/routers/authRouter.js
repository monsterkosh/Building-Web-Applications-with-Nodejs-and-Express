const express = require('express');
const debug = require('debug')('server:authRouter');
const { MongoClient, ObjectId } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  const url =
    'mongodb+srv://dbUser:GolaGumrPWVnwqGH@globomantics.mv2lx.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'Globomantics';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      //   req.login(results.ops[0], () => {)
      req.login(results, () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
