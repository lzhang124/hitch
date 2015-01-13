var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'hitch' });
});

router.get('/login', function(req, res) {
    res.render('login', {title: 'Login'});
});

router.get('/register', function(req, res) {
    res.render('register', {title: 'Register'});
});

app.post('/register', function(req, res) {
    console.log(req.body);
});

// // ADD THESE BACK IN WHEN THE VIEWS FILES ARE CREATED


// router.get('/request_match', function(req, res) {
//     res.render('request_match', {title: 'Request Match'});
// });

// router.get('/results', function(req, res) {
//     res.render('results', {title: 'Results'});
// });

module.exports = router;
