import { findOrCreateUser, generateJWT, getGarages } from '../utils/utils';

module.exports = (app, express, passport) => {
  const authRouter = express.Router();

  authRouter.get('/', 
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  authRouter.get('/return', 
    passport.authenticate('steam', { failureRedirect: '/'}),
    (req, res) => {
      findOrCreateUser(req.user._json.steamid)
      .then(user => {
        res.cookie('accessToken', generateJWT(user[0]));
        res.redirect(`/login`);
      })
    }
  );

  return authRouter;
}