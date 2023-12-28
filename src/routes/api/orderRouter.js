var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var OrderController = require('../../controllers/orderController');

var orderRouter = express.Router();
var orderCont = new OrderController();

orderRouter.route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        orderCont.getOrders(req, res, next);
    }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        orderCont.createOrder(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on Order');
    }).delete(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('Delete opration is not supported on Order');
    });

orderRouter.route('/:orderId')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        orderCont.getOrderById(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on particular Order');
    }).post(cors.corsWithOptions, (_req, res, next) => {
        res.statusCode = 405;
        res.end('post opration is not supported on particular Order');
    }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        orderCont.deletOrderById(req, res, next);
    });

orderRouter.route('/retrive/:orderId')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        orderCont.retriveOrderById(req, res, next);
    });

module.exports = orderRouter;