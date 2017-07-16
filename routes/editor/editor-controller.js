var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

//CONTROLLER
router.get("/:id", (req, res) => {
  res.render("editor.html", {id: req.params.id});
});

router.post("/:id/save", (req, res) => {
  console.log(req.body.editor_content);
  res.redirect("back");
});

module.exports = router;
