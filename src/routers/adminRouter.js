const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:adminRouter');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbUser:GolaGumrPWVnwqGH@globomantics.mv2lx.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'Globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to MongoDB');

      const db = client.db(dbName);
      const response = await db.collection('sessions').insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = adminRouter;
