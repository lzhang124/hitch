var express = require('express');
var router = express.Router();
var app = express();

// Inport models file into the router TEST
// var models = require('../models/models');
// models.Photo

// Connect to the database over Mongoose TEST
// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/test') // CHANGE THIS LATER!!! run 'mongod' on terminal

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'hitch' });
});

router.get('/signup', function(req, res) {
    res.render('signup', {title: 'hitch | Sign Up'});
    // THIS IS PART OF THE TEST - need to write route to render image 
    // models.Photo.findOne({_id: photoId}, function(err, result) {
    //     res.render('photo', {photo: result});
    // });
});

router.get('/login', function(req, res) {
    res.render('login', {title: 'hitch | Login'});
});

router.get('/login', function(req, res) {
    res.render('login', {title: 'Login'});
});

router.get('/request', function(req, res){
    res.render('request', {title: 'hitch me a ride!'});
});

// // ADD THESE BACK IN WHEN THE VIEWS FILES ARE CREATED

// router.get('/results', function(req, res) {
//     res.render('results', {title: 'Results'});
// });

// THIS IS PART OF THE TEST
// router.post('/signup', function(req, res) {
//     // create a new photos object
//     var newPhoto = new models.Photo({
//         url: req.body['submitted-url'],
//         caption: req.body['caption']
//     });

//     newPhoto.save(function(err, result) {
//         res.redirect('/photos/' + result._id)
//     })
// });

module.exports = router;
