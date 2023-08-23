var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Marketplace'); //va a llamar a Marketplace.hbs
});

module.exports = router;

