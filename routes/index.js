var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
app.use(flash());

var Request = require('../models/request.js');

var isAuthenticated = function (req, res, next){
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object.
    // A middleware is allowed to add properties to req and rsp objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

module.exports = function(passport){

    /* GET home page */
    router.get('/', function(req, res) {
        if (!req.user) {
            res.render('index', { title: 'hitch' });
        } else if (req.user.hasReq) {
            res.redirect('/results');
        } else {
            res.redirect('/request');
        }
    });

    /* GET signup page */
    router.get('/signup', function(req, res) {
        if (req.user) {
            res.redirect('/request');
        } else {
            res.render('signup', { title: 'hitch | Sign Up', message: req.flash('message') });
        }
    });

    /* handle signup POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#request',
        failureRedirect: '/signup',
        failureFlash: true,
        successFlash: true
    }));

    /* GET login page */
    router.get('/login', function(req, res) {
        if (!req.user) {
            res.render('login', { title: 'hitch | Login', message: req.flash('message') });
        } else if (req.user.hasReq) {
            res.redirect('/results');
        } else {
            res.redirect('/request');
        }
    });

    /* handle login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/request',
        failureRedirect: '/login',
        failureFlash: true
    }));

    /* handle logout */
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* GET request page. */
    router.get('/request', isAuthenticated, function(req, res){
        if (req.user.hasReq) {
            res.redirect('/results')
        } else {
            res.render('request', { title: 'hitch me a ride!', message: req.flash('message'), logout: true });
        }
    });

    /* handle request POST */
    router.post('/request', function(req, res){
        var newRequest = new Request({
            firstname: req.body['firstname'],
            lastname: req.body['lastname'],
            pickup: req.body['pickup'],
            dropoff: req.body['dropoff'],
            time: req.body['time'],
            phone: req.body['phone'],
            results: []
        });
        if (req.user) {
            req.user.hasReq = true;
            req.user.save();
        };
        newRequest.save(function(err, result) {
            res.redirect('/results');
        });
    });

    /* GET results page. */
    router.get('/results', function(req, res) {
        if (!req.user) {
            var allrequests = [];
            Request.find({firstname: 'test'}, function(err, results) {
                results.forEach(function(request) {
                    allrequests.push(request);
                });
                res.render('results', { title: 'hitch | Results', results: allrequests });
            });
        } else if (!req.user.hasReq) {
            res.redirect('/request');
        } else {
            var allrequests = [];
            Request.find({pickup: 'MIT'}, function(err, results) {
                results.forEach(function(request) {
                    allrequests.push(request);
                });
                res.render('results', { title: 'hitch | Results', results: allrequests, logout: true });
            });
        }
    });

    return router;
}


// geo: geoNear and geoSearch
