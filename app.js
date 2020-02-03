var express = require('express');
var app = express();

var hotelRoute = require('./routes/hotelRoute');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



const sql = require('mssql');
var connectionString = "mssql://rido:asd@127.0.0.1:1433/HotelManagementSystemDb";
(async() => {
    try {
        await sql.connect(connectionString);
        console.log("baglandik");
    } catch (e) {
        console.log(e);
    }
})();



app.get("/", function(req, res) {
    res.render("home");
});

app.use('/hotel', hotelRoute);


var port = 4000;

app.listen(port);