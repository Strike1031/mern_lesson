var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//create json parser
var jsonParser = bodyParser.json();
var urlencondedParser = bodyParser.urlencoded({extended: false});


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(express.json());
/**
 *      Routing
 */
app.get("/", function(req, res, next) {
    res.send("Hello world!");
});

app.post("/auth/login", jsonParser, function(req, res, next) {
    const {username, password} = req.body;
    console.log(req);
    res.send("Okay");
});

app.listen(5000);
