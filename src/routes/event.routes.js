const event_model = require("../controller/event.controller");
const {authJwt} = require("../middleware");
// const express = require('express');
// const router = express.Router();

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept",
        );
        next();
    });

    var router = require('express').Router()

    //Insert all events from admin
    router.post('/admin', [authJwt.verifyToken, authJwt.isAdmin], event_model.create)

    //get all events
    router.get('/', event_model.findAll)

    //get event by id
    router.get('/:id', event_model.findOne)

    //Update events by id admin
    router.put('/admin/:id', [authJwt.verifyToken, authJwt.isAdmin],
    event_model.update)

    //delete events by id admin
    router.delete('/admin/:id', [authJwt.verifyToken, authJwt.isAdmin],
    event_model.delete)

    app.use('/api/events', router);
}
