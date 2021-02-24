const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const compression = require('compression')
const helmet = require('helmet');


const app = express();
const db = require("./app/models");
const server = http.createServer(app);


// db.sequelize.sync();
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

var corsOptions = {
  origin: "http://localhost:4001"
};

app.use(helmet());
app.use(compression())
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to web-monitor application." });
});


// scheduler 
require('./app/middleware/scheduler')(app);

// routesF
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/monitor.routes')(app);


// app.use('/api/users', signup);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});