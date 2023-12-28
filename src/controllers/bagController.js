var Bags = require('../models/bags');

class BagController {

    async getStock(_req, res, next) {
        try {
            var bags = await Bags.find();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bags);
        } catch (error) {
            next(error);
        }
    }

    async getBags(req, res, next) {
        try {
            var bags = await Bags.find({ type: req.query.type });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bags);
        } catch (error) {
            next(error);
        }
    }

    async addNewBag(req, res, next) {
        try {
            var bags = await Bags.find({ pallet: req.body.pallet, type: req.body.type, lot: req.body.lot });
            if (bags.length > 0 && bags.length < 20) {
                if (bags[0].marked == req.body.marked) {
                    var bag = await Bags.create({
                        type: req.body.type, lot: req.body.lot, marked: req.body.marked,
                        numberOfCones: req.body.numberOfCones, wightOfEmptyBag: req.body.wightOfEmptyBag,
                        totalWight: req.body.totalWight, netWight: req.body.netWight, pallet: req.body.pallet,
                        box: req.body.box, retrivedFromOrder: req.body.retrivedFromOrder
                    });
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bag);
                } else {
                    var err = new Error('Marking problem');
                    err.status = 419;
                    next(err);
                }
            } else if (bags.length >= 20) {
                var err = new Error('pallet is full');
                err.status = 420;
                next(err);
            } else {
                var bag = await Bags.create({
                    type: req.body.type, lot: req.body.lot, marked: req.body.marked,
                    numberOfCones: req.body.numberOfCones, wightOfEmptyBag: req.body.wightOfEmptyBag,
                    totalWight: req.body.totalWight, netWight: req.body.netWight, pallet: req.body.pallet,
                    box: req.body.box, retrivedFromOrder: req.body.retrivedFromOrder
                });
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(bag);
            }
        } catch (error) {
            next(error);
        }
    }

    async editBags(req, res, next) {
        try {
            var oldBags = await Bags.find({ _id: { $in: req.body.ids } });
            if (oldBags.length > 0) {
                for (const oBag of oldBags) {
                    var bags = await Bags.find({ type: req.body.type, lot: req.body.lot, pallet: req.body.pallet });
                    if (bags.length > 0 && bags.length < 20) {
                        if (bags[0].marked == oBag.marked) {
                            await Bags.findByIdAndUpdate(oBag._id, {
                                type: req.body.type, lot: req.body.lot, pallet: req.body.pallet
                            });
                        } else {
                            var err = new Error('Marking problem');
                            err.status = 419;
                            next(err);
                        }
                    } else if (bags.length >= 20) {
                        if (oBag.pallet == req.body.pallet) {
                            await Bags.findByIdAndUpdate(oBag._id, {
                                type: req.body.type, lot: req.body.lot, pallet: req.body.pallet
                            });
                        } else {
                            var err = new Error('pallet is full');
                            err.status = 420;
                            next(err);
                        }
                    } else {
                        await Bags.findByIdAndUpdate(oBag._id, {
                            type: req.body.type, lot: req.body.lot, pallet: req.body.pallet
                        });
                    }
                }
                var newBags = await Bags.find({ _id: { $in: req.body.ids } });
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(newBags);
            } else {
                var err = new Error('bags not found');
                err.status = 404;
                next(err);
            }

        } catch (error) {
            next(error);
        }
    }

    async deletbags(req, res, next) {
        try {
            var resp = await Bags.deleteMany({ _id: { $in: req.body.ids } });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }

    async getBagById(req, res, next) {
        try {
            var bag = await Bags.findById(req.params.bagId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bag);
        } catch (error) {
            next(error);
        }
    }

    async editBagById(req, res, next) {
        try {
            var oBag = await Bags.findById(req.params.bagId);
            var bags = await Bags.find({ type: req.body.type, lot: req.body.lot, pallet: req.body.pallet });
            if (bags.length > 0 && bags.length < 20) {
                if (bags[0].marked == req.body.marked) {
                    var bag = await Bags.findByIdAndUpdate(req.params.bagId, {
                        type: req.body.type, lot: req.body.lot, marked: req.body.marked,
                        numberOfCones: req.body.numberOfCones, wightOfEmptyBag: req.body.wightOfEmptyBag,
                        totalWight: req.body.totalWight, netWight: req.body.netWight, pallet: req.body.pallet,
                        box: req.body.box, retrivedFromOrder: req.body.retrivedFromOrder
                    }, { new: true });
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bag);
                } else {
                    var err = new Error('Marking problem');
                    err.status = 419;
                    next(err);
                }
            } else if (bags.length >= 20) {
                if (oBag.pallet == req.body.pallet) {
                    var bag = await Bags.findByIdAndUpdate(req.params.bagId, {
                        type: req.body.type, lot: req.body.lot, marked: req.body.marked,
                        numberOfCones: req.body.numberOfCones, wightOfEmptyBag: req.body.wightOfEmptyBag,
                        totalWight: req.body.totalWight, netWight: req.body.netWight, pallet: req.body.pallet,
                        box: req.body.box, retrivedFromOrder: req.body.retrivedFromOrder
                    }, { new: true });
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bag);
                } else {
                    var err = new Error('pallet is full');
                    err.status = 420;
                    next(err);
                }
            } else {
                var bag = await Bags.findByIdAndUpdate(req.params.bagId, {
                    type: req.body.type, lot: req.body.lot, marked: req.body.marked,
                    numberOfCones: req.body.numberOfCones, wightOfEmptyBag: req.body.wightOfEmptyBag,
                    totalWight: req.body.totalWight, netWight: req.body.netWight, pallet: req.body.pallet,
                    box: req.body.box, retrivedFromOrder: req.body.retrivedFromOrder
                }, { new: true });
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(bag);
            }
        } catch (error) {
            next(error);
        }
    }

    async deletBagById(req, res, next) {
        try {
            var resp = await Bags.findByIdAndRemove(req.params.bagId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BagController;