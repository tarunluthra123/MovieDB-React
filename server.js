const express = require('express');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static(path.join(__dirname, './build')));
app.use('/api', require('./backend/api').route)

app.get('/ping', function (req, res) {
    const obj = {
        1: "one",
        2: "two",
        3: "three"
    }
    return res.send(obj);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("Server started on " + PORT));