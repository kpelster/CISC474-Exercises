const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();
const port = 8080;

app.use(function (req, res, next) {
    const { url, path: routePath } = req;
    console.log('Request: Timestamp;', new Date().toLocaleString(), ',URL(' + url + '), PATH(' + routePath + ').');
    next();
});

app.use('/', express.static(path.join(__dirname, '')))

app.listen(port, () => {
    console.log('Server running on port ' + port + '...')
});

app.get('/api/v1/listUsers', function (req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

app.delete('/api/v1/deleteUser', function (req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + req.query["user"]];
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
                console.error(err); return;
            }
        });
        console.log(data);
        res.end(JSON.stringify(data));
    });
});


app.post('/api/v1/addUser', function(req,res){

    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        var jsondata = JSON.parse(data);
        // add data to json
        jsondata.push({name: req.name, password:req.password, profession:req.profession, id:data.id})
        var newjson = JSON.stringifgy(data);
        // write back to json
        fs.writeFile(__dirname + "/data/" + "users.json", newjson, 'utf8', callback)
    });
});


app.post('/api/v1/filterUser', function(req,res){

    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        user =  data["user" + req.query["id"]];
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
                console.error(err); return;
            }
        });
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
