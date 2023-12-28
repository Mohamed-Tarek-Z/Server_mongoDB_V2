var Clients = require('../models/clients');

class ClientController {
    async getClients(_req, res, next) {
        try {
            var clients = await Clients.find();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(clients);
        } catch (error) {
            next(error);
        }
    }

    async addNewClient(req, res, next) {
        try {
            var client = await Clients.create(req.body);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async deletclients(req, res, next) {
        try {
            var resp = await Clients.deleteMany({ _id: { $in: req.body.ids } });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }

    async getClientById(req, res, next) {
        try {
            var client = await Clients.findById(req.params.clientId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async editClientById(req, res, next) {
        try {
            var client = await Clients.findByIdAndUpdate(req.params.clientId, {
                Clientname: req.body.Clientname, img: req.body.img
            }, { new: true });
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async deletClientById(req, res, next) {
        try {
            var resp = await Clients.findByIdAndRemove(req.params.clientId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClientController;