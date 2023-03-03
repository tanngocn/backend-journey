const express = require('express');
const { getRandomElement } = require('../utils');
const { writeQuotes } = require('../stream');
const quotesRouter = express.Router();

quotesRouter.get('/random', async (req, res, next) => {
  const quote = getRandomElement(req.quotes);
  res.send({
    quote,
  });
});

quotesRouter.get('/:id', async (req, res, next) => {
  const quote = req.quotes.find((f) => f.id == req.params.id);
  res.send({
    quote,
  });
});
// big file
quotesRouter.post('/', async (req, res, next) => {
  const length = req.quotes.length;
  req.quotes.push({ ...req.query, id: length + 1 });
  await writeQuotes(req.quotes);
  res.send({ quote: req.query });
});

quotesRouter.get('/', async (req, res, next) => {
  if (!req.query.person) {
    res.send({
      quotes: req.quotes,
    });
  } else {
    const find = req.quotes.filter((f) => f.person === req.query.person);
    res.send({
      quotes: find,
    });
  }
});

module.exports = quotesRouter;
