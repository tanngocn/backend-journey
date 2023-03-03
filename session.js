const express = require('express');
const session = require('express-session');

const authRouter = express.Router();
// create session store
const store = new session.MemoryStore();

/** session
 *  @install
 *  npm i express-session
 *  @cookie
 *    @maxAge time expires
 *    @secure it's only sent to server via HTTPS
 *    @sameSite allow a cross-site cookie through different browsers.
 * when login success
 * setting sessions
 *  req.session.authenticated = true
 *  req.session.user = {info user}
 */
// POST request for logging in
/** NOTE
 * @quiz1  Which of the following accurately describes the relationship between @sessions and @cookies ?
 * @result @Cookies store @session identifiers in the browser so that user requests can retrieve session data.
 * @quiz2 What is the @secret property used for?
 * @result To encrypt the session identifier when communicating between the client and server
 * @quiz3 What of the following is an advantage of using @session cookies over @localStorage ?
 * @result Cookies are compatible with HTML4 and HTML5 while localStorage is only available with HTML5.
 * @quiz4 Which of the following is an advantage of @localStorage and @sessionStorage over cookies?
 * @result @localStorage has larger capacity per domain than @cookies do.
 *
 */

function ensureAuthentication(req, res, next) {
  // Complete the if statement below:
  if (req.session.authenticated) {
    return next();
  } else {
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

authRouter.use(
  session({
    secret: 'dDAkhdkjasfks',
    resave: false,
    cookie: { maxAge: 172800000, secure: true, sameSite: 'none' },
    saveUninitialized: false,
    store,
  })
);

authRouter.post('/', (req, res) => {
  const { username, password } = req.body;
  db.users.findByUsername(username, (err, user) => {
    if (!user) return res.status(403).json({ msg: 'No user found!' });
    if (user.password === password) {
      req.session.authenticated = true;
      req.session.user = {
        username,
        password,
      };
      res.redirect('/shop');
    } else {
      res.status(403).json({ msg: 'Bad Credentials' });
    }
  });
});

module.exports = {
  authRouter,
  ensureAuthentication,
};
