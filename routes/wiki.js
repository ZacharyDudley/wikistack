const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.route('/')
  .get(function (req, res) {
    res.redirect('..');
    //res.render('wikipage');
  })
  .post(function (req, res) {
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    page.save()
    //.then(res.redirect();
    res.json(req.body);
    //res.render('wikipage');
  });
  
  router.get('/add', function (req, res) {
    res.render('addpage');
  });
  
  router.get("/:urlTitle", function (req, res){
    var url = Page.findAll({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    //res.json(url);
    res.redirect(url);
  });
module.exports = router;
