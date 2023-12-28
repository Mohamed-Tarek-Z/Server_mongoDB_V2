var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var BagController = require('../../controllers/bagController');
// test
var bagRouter = express.Router();
var bagCont = new BagController();


bagRouter.route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.getBags(req, res, next);
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.addNewBag(req, res, next);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.editBags(req, res, next);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.deletbags(req, res, next);
    });

bagRouter.get('/stock', cors.corsWithOptions, (req, res, next) => {
    bagCont.getStock(req, res, next);
});

bagRouter.route('/:bagId')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.getBagById(req, res, next);
    }).put(cors.corsWithOptions, (_req, res) => {
        res.statusCode = 405;
        res.end('put opration is not supported on particular bags');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.editBagById(req, res, next);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        bagCont.deletBagById(req, res, next);
    });


module.exports = bagRouter;