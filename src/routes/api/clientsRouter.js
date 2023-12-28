var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var clientController = require('../../controllers/clientController');

var cliRouter = express.Router();
var cliCont = new clientController();

cliRouter.route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        cliCont.getClients(req, res, next);
    }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        cliCont.addNewClient(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on products');
    }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        cliCont.deletclients(req, res, next);
    });

cliRouter.route('/:cliId')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        cliCont.getClientById(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on particular product');
    }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        cliCont.editClientById(req, res, next);
    }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        cliCont.deletProductById(req, res, next);
    });

module.exports = cliRouter;