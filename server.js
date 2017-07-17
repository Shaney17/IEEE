const express           = require('express');
const bodyParser        = require('body-parser');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const mongoose          = require('mongoose');
const flash             = require('connect-flash');
const methodOverride    = require('method-override'); 

//User model
const User              = require("./models/user");

//DATABASE connect
mongoose.connect("mongodb://shaney:skylab@ds159662.mlab.com:59662/ieee")

//Server setup
const port              = process.env.PORT || 3000;
const app               = express();
const server            = require('http').createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));

//body-parser MW
app.use(bodyParser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//set static folder
app.use(express.static(__dirname + "/public"));

//method override
app.use(methodOverride("_method"));

//connect-flash
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Skylab Editor",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

//Request route files
const   indexRoute          = require("./routes/index.js");
const   editorController    = require("./routes/editor/editor-controller.js"),
        editorSocket        = require("./routes/editor/editor-socket.js")(server)

//CONTROLLER
app.use("/home", indexRoute);
app.use("/editor", editorController);
