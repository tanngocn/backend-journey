const express = require('express');
const app = express();
const quotesRouter = require('./quotes/quotesRoutes');

const PORT = process.env.PORT || 4001;

app.listen(PORT);
app.use(express.static('public'));
app.use('/api/quotes', quotesRouter);
