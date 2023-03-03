const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');

const app = express();
const quotesRouter = require('./quotes/quotesRoutes');
const { readQuotes } = require('./stream');
// session
const { ensureAuthentication, authRouter } = require('./session');
const { passportRouter } = require('./passport');
const PORT = process.env.PORT || 4001;

app.listen(PORT);
app.use(express.static('public'));
// auto convert req.body to json
app.use(bodyParser.json());

// catching error
app.use(errorhandler());

//passport
app.use(passportRouter);
// Add your ensureAuthentication middleware below:
app.use('/login', authRouter);
app.get('/shop', ensureAuthentication, (req, res) => {
  // Send the user object to the view page:
  res.render('shop', { user: req.session.user });
});

/** app.param
 * app.param('field has : before', (req,res,next, field of data)=>{})
 */

/** merge router
 * const sorcererRouter = express.Router();
 * const familiarRouter = express.Router({mergeParams: true});
 *  express.Router({mergeParams: true}) tells Express that the familiarRouter should have access to parents passed into its parent router
 * app.use('/sorcerer', sorcererRouter);
 * sorcererRouter.use('/:sorcererId/familiars', familiarRouter);
 * familiarRouter.get('/') ~ familiarRouter.get('/sorcerer/:sorcererId/familiars')
 */

app.use(['/api/quotes', '/api/quotes/random'], async (req, res, next) => {
  const quotes = await readQuotes();
  req.quotes = quotes;
  next();
});
app.use('/api/quotes', quotesRouter);
