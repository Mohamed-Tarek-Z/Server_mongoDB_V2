var OBags = require('../models/obags');

class OBagController {
    async getOBags(req, res, next) {
        try {
            var obags = await OBags.find({ type: req.query.type });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(obags);
        } catch (error) {
            next(error);
        }
    }

    async deletBagById(req, res, next) {
        try {
            var resp = await OBags.findByIdAndRemove(req.params.obagId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OBagController;