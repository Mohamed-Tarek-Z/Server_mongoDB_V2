var express = require('express');
var bags = require('./api/bagRouter');
var obags = require('./api/obagRouter');
var products = require('./api/productRouter');
var orders = require('./api/orderRouter');
var users = require('./api/usersRouter');
var clients = require('./api/clientsRouter');

var router = express.Router();

/* GET home page. */

router.use('/users', users);
router.use('/clients', clients);
router.use('/products', products);
router.use('/orders', orders);
router.use('/bags', bags);
router.use('/obags', obags);

router.get('/', (_req, res) => {
  res.send('this is the index route');
});

router.all('/', (_req, res) => {
  res.statusCode = 403;
  res.send('Method not implemented');
});

module.exports = router;
