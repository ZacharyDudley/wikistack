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
    User.findOne({
      where: {
        name: req.body.author
      }
    }).then(function(foundUser){
      if (!foundUser) {
        User.build({
          name: req.body.authorName,
          email: req.body.authorEmail
        });
      }
    })

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: true
    });

    page.save()
    .then(function(savedPage){
      console.log(savedPage.route);
      res.redirect(savedPage.route);
    })
    .catch(function(error){
      console.error(error);
    }
);
  });

  router.get('/add', function (req, res) {
    res.render('addpage');
  });

  router.get("/:urlTitle", function (req, res){
    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(page){
      //res.json(page);
      res.render('wikipage', {page});
    })
  });
module.exports = router;
