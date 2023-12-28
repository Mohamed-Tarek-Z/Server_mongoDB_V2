var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var ProductController = require('../../controllers/productController');

var proRouter = express.Router();
var proCont = new ProductController();

proRouter.route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        proCont.getProducts(req, res, next);
    }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        proCont.addProduct(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on products');
    }).delete(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('Delete opration is not supported on products');
    });

proRouter.route('/:proId')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        proCont.getProductById(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on particular product');
    }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        proCont.editProductById(req, res, next);
    }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        proCont.deletProductById(req, res, next);
    });

module.exports = proRouter;