var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/qualityPrint', function(req, res, next) {
  res.render('qualityPrint', { title: 'qualityPrint' });
});

router.get('/whiteTuque', function(req, res, next) {
  res.render('whiteTuque', { title: 'whiteTuque' });
});

router.get('/cosmos', function(req, res, next) {
  res.render('cosmos', { title: 'cosmos' });
});

router.get('/chatApp', function(req, res, next) {
  res.render('chatApp', { title: 'chatApp' });
});

router.get('/sketch', function(req, res, next) {
  res.render('sketch', { title: 'sketch' });
});

router.get('/calculator', function(req, res, next) {
  res.render('calculator', { title: 'calculator' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'game' });
});

router.get('/todo', function(req, res, next) {
  res.render('todo', { title: 'todo' });
});

router.get('/brewery', function(req, res, next) {
  res.render('brewery', { title: 'brewery' });
});

router.get('/unemployment', function(req, res, next) {
  res.render('unemployment', { title: 'unemployment' });
});


module.exports = router;
