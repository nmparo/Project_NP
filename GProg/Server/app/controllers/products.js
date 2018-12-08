var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    async = require('async'),
    mongoose = require('mongoose'),
    Products = mongoose.model('Products'),
    asyncHandler = require('express-async-handler'),
    passportService = require('../../config/passport'),
    passport = require('passport');

    var requireLogin = passport.authenticate('local', { session: false });
    var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get all products');
        let query = Products.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));

    router.get('/products/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Get product %s', req.params.id);
        await Products.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Creating product');
        var products = new Products(req.body);
        const result = await products.save()
        res.status(201).json(result);
    }));

    router.put('/products', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Updating products');
        await Products.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));

    router.delete('/products/:id', requireAuth, asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting product %s', req.params.id);
        await Products.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));

};


