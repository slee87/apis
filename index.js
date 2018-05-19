var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
    
// routes

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

var todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);
    
// start listening

app.listen(process.env.PORT, () => {
    console.log("Server is listening...");
});