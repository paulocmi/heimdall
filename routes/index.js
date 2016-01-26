var express = require('express');
var router = express.Router();

// Render the home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', user: req.user });
});

router.get('/login', function(req, res) {
  return res.render("login");
});

router.get('/logout', function(req, res) {
  return res.render("logout");
});

module.exports = router;
