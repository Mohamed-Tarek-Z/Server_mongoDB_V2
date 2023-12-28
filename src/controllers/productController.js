var Products = require('../models/products');

class ProductController {
    async getProducts(_req, res, next) {
        try {
            var pros = await Products.find();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(pros);
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req, res, next) {
        try {
            var pro = await Products.create(req.body);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(pro);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            var pro = await Products.findById(req.params.proId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(pro);
        } catch (error) {
            next(error);
        }
    }

    async editProductById(req, res, next) {
        try {
            var pro = await Products.findByIdAndUpdate(req.params.proId, { $set: req.body }, { new: true });
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(pro);
        } catch (error) {
            next(error);
        }
    }

    async deletProductById(req, res, next) {
        try {
            var resp = await Products.findByIdAndRemove(req.params.proId);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;