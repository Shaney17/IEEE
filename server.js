var express     = require('express');
var bodyParser  = require('body-parser');

var app         = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));

//Server setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3000, () => console.log("Server is running..."));

//CONTROLLER
app.get("/", (req, res) => {
  res.render("index.html");
});

io.on('connection', (socket) => {
  console.log("1 user connected");
  socket.on('cliSendData', (data) => {
    socket.broadcast.emit('serSendData', data);
  });
});

app.post("/save", (req, res) => {
  console.log(req.body.editor_content);
  res.redirect("back");
});
