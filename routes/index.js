const express = require('express');
const router = express.Router();
const wiki = require('./wiki.js');
const user = require('./user.js');
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.use('/wiki', wiki);
router.use('/user', user);

router.get('/', function(req, res){
    Page.findAll({
        where: {
            status: true
        }
    })
    .then(function(articles){
        res.render('index', {articles: articles});   
    })
});

router.get('/wiki/', wiki);

module.exports = router;
