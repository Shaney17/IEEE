var mongoose = require("mongoose");

var docSchema = ({
    name: String, 
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});
module.exports = mongoose.model("documents", docSchema);