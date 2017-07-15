var express         = require('express');
var bodyParser      = require('body-parser');

const port          = process.env.PORT || 3000;

//Server setup
var app             = express();
var server = require('http').createServer(app);
server.listen(port, () => console.log("Server is running..."));

//body-parser MW
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//set static folder
app.use(express.static(__dirname + "/public"));

//Request route files
var editorController  = require("./routes/editor/editor-controller.js"),
    editorSocket      = require("./routes/editor/editor-socket.js")(server)

//CONTROLLER
app.use("/editor", editorController);
