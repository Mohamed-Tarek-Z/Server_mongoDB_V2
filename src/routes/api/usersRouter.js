var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var UserController = require('../../controllers/userController');

var router = express.Router();
var userCont = new UserController();

router.options('*', cors.corsWithOptions, (_req, res) => {
  res.sendStatus(200);
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  userCont.register(req, res, next);
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  userCont.login(req, res, next);
});

router.get('/logout', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  userCont.logout(req, res, next);
});

router.post('/changepassword', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  userCont.changePW(req, res, next);
});

router.post('/resetpassword', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
  userCont.resetPW(req, res, next);
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res, next) => {
  userCont.checkJWT(req, res, next);
});

module.exports = router;