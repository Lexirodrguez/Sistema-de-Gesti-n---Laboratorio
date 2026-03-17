var express = require('express');
var router = express.Router();
const { verificarToken } = require('../middleware/auth');

/* GET home page. */
router.get('/', verificarToken, function (req, res, next) {
  res.render('index', { title: 'Laboratorio' });
});

module.exports = router;

