
// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MDBConnect = require('./controllers/Connection.js')
const apiRoutes = require('./routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Basic routing from puble files
//Serve static assit CSS
app.use(express.static('public'));

//Basic routing from HTML file
app.get('/', (req, res) => {
  //Serve an HTML file
  res.sendFile(__dirname + '/views/index.html');
});

//Initialize connection
MDBConnect()
  .then(db => {
    //Initialize Routing for api
    apiRoutes(app, db);
}).catch(error => console.log(error));


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + listener.address().port);
});
