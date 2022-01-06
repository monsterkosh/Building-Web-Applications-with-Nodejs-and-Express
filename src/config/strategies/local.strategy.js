const { MongoClient } = require('mongodb');
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('server:localStrategy');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        const url =
          'mongodb+srv://dbUser:GolaGumrPWVnwqGH@globomantics.mv2lx.mongodb.net?retryWrites=true&w=majority';
        const dbName = 'Globomantics';

        (async function name() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected to the MongoDB');

            const db = client.db(dbName);
            const user = await db.collection('users').findOne({ username });

            if (user && user.password == password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
