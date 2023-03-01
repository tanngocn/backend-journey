const express = require('express');
const { getRandomElement } = require('../utils');
const { readQuotes, writeQuotes } = require('../stream');
const quotesRouter = express.Router();

quotesRouter.get('/random', async (req, res, next) => {
  const quotes = await readQuotes();
  const quote = getRandomElement(quotes);
  res.send({
    quote,
  });
});

// big file
quotesRouter.post('/', async (req, res, next) => {
  const quotes = await readQuotes();
  quotes.push(req.query);
  await writeQuotes(quotes);
  //   fs.writeFile(url, JSON.stringify(quotes), readDataCallback);
  res.send({ quote: req.query });
});

quotesRouter.get('/', async (req, res, next) => {
  const quotes = await readQuotes();
  if (!req.query.person) {
    res.send({
      quotes,
    });
  } else {
    const find = quotes.filter((f) => f.person === req.query.person);
    res.send({
      quotes: find,
    });
  }
});

module.exports = quotesRouter;
