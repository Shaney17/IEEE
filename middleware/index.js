const Documents = require('../models/document.js');

var middewareObj = {};

middewareObj.checkDocumentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Documents.findById(req.params.id, function(err, foundDocument){
           if(err){
               req.flash("error", "Không tìm thấy văn bản");
               res.redirect("back");
           }  else {
               // does user own the Document?
            if(foundDocument.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Bạn không có quyền truy cập văn bản này");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Xin hãy đăng nhập");
        res.redirect("back");
    }
};


middewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Xin hãy đăng nhập");
    res.redirect("/organization/login");  
};


module.exports = middewareObj;