const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const responseTime = require('response-time');

const controller = require('./controllers');
let port = process.env.PORT || 3000;
const token = process.env.API_TOKEN || require('../config/token');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(cors());
app.use(responseTime());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/api/homicides', (req, res) => {
    controller.getNypdData()
        .then(data => {
            res.send(data.data)
        }).catch((err) => console.log(err));
});

app.get(`/api/homicides/:year`, (req, res) => {
    controller.getNypdData(req.params.year)
        .then(data => {
            res.send(data.data)
        }).catch((err) => console.log(err));
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

module.exports = app;