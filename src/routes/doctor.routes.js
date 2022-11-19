/*
/api/doctors
/api/doctors/:id

*/

const doctors = require('../controller/doctor.controller')
const { authJwt } = require("../middleware");


module.exports = function (app)  {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
    

    
    var router = require('express').Router()
    // Untuk insert new doctors admin
    router.post('/admin', 
    [authJwt.verifyToken, authJwt.isAdmin],
    doctors.create)

    // Get all doctors
    router.get('/', doctors.findAll)

    // Get doctor by id
    router.get('/:id', doctors.findOne)

    // update doctor by id admin
    router.put('/admin/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    doctors.update)

    // delete doctor by id admin
    router.delete('/admin/:id', 
    [authJwt.verifyToken, authJwt.isAdmin],
    doctors.delete)

    app.use('/api/doctors', router)
}
