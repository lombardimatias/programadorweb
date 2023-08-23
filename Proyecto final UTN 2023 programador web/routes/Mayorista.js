var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Mayorista'); //va a llamar a Mayorista.hbs
});

module.exports = router;
