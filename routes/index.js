const express           = require('express');
const mongoose          = require('mongoose');
const router            = express.Router();
const passport          = require('passport');
const flash             = require('connect-flash');
const methodOverride    = require('method-override'); 

const middleware        = require('../middleware/index.js');

const Documents         = require('../models/document.js');
const User              = require('../models/user.js');


router.get("/", function(req, res){
    //Get all the documents from DB
    Documents.find({}, (err, documents) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
        } else {
            res.render("home.html", {documents: documents, currentUser: req.user});
        }
    });
});


// show register form
router.get("/register", function(req, res){
   res.render("register.html"); 
});


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to IEEE " + newUser.username);
            res.redirect("/"); 
        });
    });
});


// show login form
router.get("/login", function(req, res){
   res.render("login.html"); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/home/login",
        failureFlash: true
    }), function(req, res){
});


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged out !");
   res.redirect("/home");
});


module.exports = router;