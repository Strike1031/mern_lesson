var express = require('express');
var app = express();

app.get("/", function(req, res, next) {
    res.send("Hello world!");
});

app.post("/auth/login", function(req, res, next) {
    res.send("Okay");
});

app.listen(5000);
