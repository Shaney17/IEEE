var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
   username:String,
   password:String,
   documents: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "documents"
      }   
   ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);