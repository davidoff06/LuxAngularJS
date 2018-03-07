var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join('public')));
app.listen(3000);


//to use MongoDB need to have Server version installed
// and run client: <mongo ddb server path\bin\mongod.exe> --dbpath <new folder path - to store the data>
//more ingormation https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-windows/
//for UI Mongo - use MongoDB Compass

//mongo db connection initialization
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
//adding new DB . name tutor
var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function(){
    console.log("mongo db is opened!");
    db.collection('notes', function(error, notes) {
        if(error) return console.log(error);
        db.notes = notes;
    });
    db.collection('users', function(error, users) {
        if(error) return console.log(error);
        db.users = users;
    });
    console.log("open function ends");
});
//end of db connection

var session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));


app.get("/notes", function(req,res) {

    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });

});

app.post("/notes", function(req, res) {
    //to add new note to session.notes
    console.log("adding new note");
    var note = req.body;
    db.notes.insert(note);//test mongo insert
    console.log(note);
    res.end();
});

app.delete("/notes", function(req, res){
    console.log("Removing note...");
    var id = req.query.id;
    var notes = req.session.notes || [];
    var updateNotesList = [];
    for (var i=0; i<notes.length; i++){
        if(notes[i].id != id) {
            updateNotesList.push(notes[i]);
        }
    }
    req.session.notes = updateNotesList;
    console.log(req.session.notes);
    res.end();
});


//temporary hardcoded as we don't have MongoDB part
var sections = [
    {id:0,title:"Work"},
    {id:1,title:"Vacation"},
    {id:2,title:"Children"}
];

app.get("/sections", function(req,res) {
    res.send(sections||[]);
});

app.post("/sections",function(req,res) {
    console.log("adding new section");
    if(req.body.length == 0){
        console.log("req.body.length = 0. adding new section terminated,");
        res.end();
    }
    var newTitle = req.body.section; //for post - data in body
    console.log(req);
    var newId;
    if(sections.length == 0) {
        newId = 0;
    } else {
        newId = sections.length
    };
    var newSection = {id:newId, title: newTitle};
    sections.push(newSection);
    console.log(sections);
    res.end();
});

app.get("/checkUser", function(req,res) {
    console.log("checkUser function");
    res.send(req.query.user.length>2);
});

app.post("/users", function(req, res) {
    console.log("adding new user");
    var user = req.body;
    db.users.insert(user, function(resp){
        req.session.userName = req.body.userName;
        console.log("new user "+user+' succesfully added');
        res.end();
    });
});


