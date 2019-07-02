const http = require('http');
const express = require('express')
const path = require('path')

const port = 8080;

const app = express();
const router = express.Router();

// router.get('/lib', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client/lib'))
// });

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use(express.static(__dirname + '/client'));
app.listen(port)