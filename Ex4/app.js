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
        // parse current data
        var jsondata = JSON.parse(data);
        // get length of data
        let length = Object.keys(jsondata).length + 1;

        // add data to json
        let name = req.query["name"];
        let password = req.query["password"];
        let profession = req.query["profession"];
        let id = req.query["id"];

        // create new user data
        let newUserData = {
            "name" : name, 
            "password" : password, 
            "profession" : profession, 
            "id": id
        }

        // create key for user
        let newUserName = "user" + length.toString();

        // add entry to json file
        jsondata[newUserName] = newUserData

        // write back to json
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(jsondata), err => {
            if (err) {
                console.error(err); return;
            }
        });
        res.end(JSON.stringify(jsondata));
    });
});


app.post('/api/v1/signin', async function (req, res) {
    //Check if uid exists in database
    //if it doesnt add uid and username with uid as key to all other info
    //Get game data
    let uid = req.query["uid"];
    let username = req.query["username"];

    let usersUidRef = rtdb.child(userRef, String(uid));
    let newUser = {
        "username": username
    }
    rtdb.update(usersUidRef, newUser);

    let mapRef = rtdb.ref(db, "Users/" + String(uid) + "/Maps");
    let maps = {};
    rtdb.get(mapRef).then(ss => {
        ss.forEach(map => {
            maps[map.key] = map.val();
        })
        res.end(JSON.stringify(maps));
    })
});


app.get('/api/v1/filterUsers', function(req,res){

    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function (err, data) {
        console.log("HEHEHEHEHEH");
        console.log(data);
        let id = req.query["id"]
        data= JSON.parse(data);

        let filteredData = [];

        Object.keys(data).forEach(function(key) {
            console.log(key, data[key]);
            if(data[key].id == id){
                filteredData.push(data[key])
            }
        });

        console.log(filteredData);
        res.end(JSON.stringify(filteredData));
        
    });
});
