/*
/api/articles
/api/articles/:id

*/

const articles = require('../controller/article.controller')
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
    // Untuk insert new articles admin
    router.post('/admin', 
    [authJwt.verifyToken, authJwt.isAdmin],
    articles.create)

    // Get all articles
    router.get('/', articles.findAll)

    // Get article by id
    router.get('/:id', articles.findOne)

    // update article by id admin
    router.put('/admin/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    articles.update)

    // delete article by id admin
    router.delete('/admin/:id', 
    [authJwt.verifyToken, authJwt.isAdmin],
    articles.delete)

    app.use('/api/articles', router)
}
