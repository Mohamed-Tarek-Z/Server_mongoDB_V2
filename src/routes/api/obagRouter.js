var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var cors = require('../../middlewares/cors');
var OBagController = require('../../controllers/obagController');

var obagRouter = express.Router();
var obagCont = new OBagController();

obagRouter.route('/')
    .options(cors.corsWithOptions, (_req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        obagCont.getOBags(req, res, next);
    });

obagRouter.route('/:bagId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        obagCont.deletBagById(req, res, next);
    });
module.exports = obagRouter;