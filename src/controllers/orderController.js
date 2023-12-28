var Bags = require('../models/bags');
var OBags = require('../models/obags');
var Orders = require('../models/orders');

class OrderController {
    async getOrders(req, res, next) {
        try {
            var orders = await Orders.find({ createdAt: { $gte: req.query.start, $lte: req.query.end } });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    async createOrder(req, res, next) {
        try {
            var bags = await Bags.find({ _id: { $in: req.body.bags } });
            if (bags.every((bag) => { return bag.type._id == req.body.type; })) {
                if (bags.every((bag) => { return bag.lot == req.body.lot; })) {
                    if (bags.length == req.body.bagsNumber) {
                        var bagsFromPallets = [];
                        var obagids = [];
                        var orderWight = bags.reduce((was, bag) => {
                            return was + bag.netWight;
                        }, 0);
                        for (const bag of bags) {
                            if (!bagsFromPallets.includes(bag.pallet)) {
                                bagsFromPallets.push(bag.pallet);
                            }
                            //create obag from bag
                            var obag = await OBags.create({
                                type: bag.type, lot: bag.lot, marked: bag.marked,
                                numberOfCones: bag.numberOfCones, wightOfEmptyBag: bag.wightOfEmptyBag,
                                totalWight: bag.totalWight, netWight: bag.netWight, pallet: bag.pallet, box: bag.box
                            });
                            obagids.push(obag._id);
                            await bag.remove();
                        }
                        var obags = await OBags.find({ _id: { $in: obagids } });
                        var order = await Orders.create({
                            client: req.body.client,
                            type: req.body.type,
                            lot: req.body.lot,
                            bagsNumber: req.body.bagsNumber,
                            bags: obags,
                            wight: orderWight,
                            pallets: bagsFromPallets
                        });
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(order);
                    } else {
                        res.statusCode = 405;
                        res.end('Error in bags number');
                    }
                } else {
                    res.statusCode = 405;
                    res.end('Bags in Order should be of the same Lot');
                }
            } else {
                res.statusCode = 405;
                res.end('Bags in Order should be of the same Type');
            }
        } catch (error) {
            next(error);
        }
    }

    async getOrderById(req, res, next) {
        try {
            var order = await Orders.findById(req.params.orderId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        } catch (error) {
            next(error);
        }
    }

    async retriveOrderById(req, res, next) {
        try {
            var order = await Orders.findById(req.params.orderId);
            var obags = await OBags.find({ _id: { $in: order.bags } });
            for (const obag of obags) {
                //create new bag from obag
                await Bags.create({
                    type: obag.type, lot: obag.lot, marked: obag.marked,
                    numberOfCones: obag.numberOfCones, wightOfEmptyBag: obag.wightOfEmptyBag,
                    totalWight: obag.totalWight, netWight: obag.netWight, pallet: obag.pallet,
                    box: obag.box, retrivedFromOrder: true
                });
                await obag.remove();
            }
            var resp = await Orders.findByIdAndRemove(req.params.orderId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (err) {
            next(err);
        }
    }

    async deletOrderById(req, res, next) {
        try {
            var resp = await Orders.findByIdAndRemove(req.params.orderId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OrderController;