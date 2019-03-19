const express = require('express');
const app = express();
const path = require('path');
let port = process.env.PORT || 3000;
const token = process.env.API_TOKEN || require('../config/token');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

module.exports = app;