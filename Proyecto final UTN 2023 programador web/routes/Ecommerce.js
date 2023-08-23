var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //.render para llamar al archivo .hbs
  res.render('Ecommerce'); //va a llamar a Ecommerce.hbs
});

module.exports = router;
