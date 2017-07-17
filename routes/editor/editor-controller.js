const express       = require('express');
const mongoose      = require('mongoose');
const router        = express.Router();
const bodyParser    = require('body-parser');
const passport      = require('passport');
const middleware    = require('../../middleware/index.js');

const Documents     = require('../../models/document.js');
const User          = require('../../models/user.js');

//CONTROLLER
router.get("/new",middleware.isLoggedIn, (req, res) => {
  res.render("document/new.html");
});

router.post("/add", middleware.isLoggedIn, (req, res) => {
  var name = req.body.title;
  var content = req.body.editor_content;
  var author  = {
    id: req.user._id,
    username: req.user.username
  };

  var newDoc = {name: name, content: content, author: author};

  //check empty value
  var checkEmptyValue = false;
  for(var key in newDoc){
      if(newDoc[key] === ""){
          checkEmptyValue = true;
      }
  }
  if(checkEmptyValue){
      req.flash("error", "Vui lòng điền đủ các thông tin");
      res.redirect("/home");
  } else {
      // Create a new campground and save to DB
      Documents.create(newDoc, function(err, newlyCreated){
          if(err){
              req.flash("error", "Có lỗi xảy ra, vui lòng thử lại sau");
              res.redirect("back");
              console.log(err);
          } else {
              req.flash("success", "Successfully added Campground !");
              //redirect back to campgrounds page
              res.redirect("/home");
          }
      });
  }

  res.redirect("back");
});

router.get("/:id", (req, res) => {
  res.render("editor.html", {id: req.params.id});
});



module.exports = router;
