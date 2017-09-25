const express = require('express');
const router = express.Router();

router.route('/')
  .get(function (req, res) {
    res.render('wikipage');
  })
  .post(function (req, res) {
    res.render('wikipage');
  });

router.get('/add', function (req, res) {
  res.render('addpage');
});

module.exports = router;
