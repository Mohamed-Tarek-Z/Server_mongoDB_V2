var User = require('../models/user');
var authenticate = require('../middlewares/authenticate');
var passport = require('passport');

class UserController {

    register(req, res, next) {
        User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
            if (err) {
                return next(err)
            } else {
                if (req.body.username)
                    user.username = req.body.username;

                user.save((err, _user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        this.login(req, res, next);
                    });
                });
            }
        });
    }

    login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err)
                return next(err);
            if (!user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'login UnSuccessful!', err: info });
            } else {
                req.logIn(user, (err) => {
                    if (err) {
                        res.statusCode = 401;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: false, status: 'login UnSuccessful!', error: 'Could not login' });
                    } else {
                        var token = authenticate.getToken({ _id: req.user._id });
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'login Successful!', token: token });
                    }
                });
            }
        })(req, res, next);
    }

    logout(req, res, next) {
        req.logout();
        res.clearCookie('session-id');
        res.redirect('/');
    }

    async changePW(req, res, next) {
        try {
            var user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.json({ success: false, message: 'User not found' });
            } else {
                user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
                    if (err) {
                        if (err.name === 'IncorrectPasswordError') {
                            res.json({ success: false, message: 'Incorrect password' });
                        } else {
                            res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                        }
                    } else {
                        res.json({ success: true, message: 'Your password has been changed successfully' });
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }

    async resetPW(req, res, next) {
        try {
            var user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.json({ success: false, message: 'User not found' });
            } else {
                user.setPassword(req.body.newpassword, async (err, user) => {
                    if (err) {
                        if (err.name === 'IncorrectPasswordError') {
                            res.json({ success: false, message: 'Password could not be saved.Please try again!' });
                        }
                    } else {
                        var saved = await user.save();
                        if (saved)
                            res.json({ success: true, message: 'Your new password has been saved successfully' });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }

    checkJWT(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ status: 'JWT invalid!', success: false, err: info });
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ status: 'JWT valid!', success: true, info: info, user: user });
            }
        })(req, res);
    }
}
module.exports = UserController;