var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join('public')));
app.listen(3000);

app.get("/greeting", function(req,res) {
    res.send("Hello, "+req.query.name+"! I’m server!");
});

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

    var section = req.query.section;
    var notes = req.session.notes || [];
    var notesForSection = [];
    for(i=0; i < notes.length; i++) {
        if(notes[i].section === section){
            notesForSection.push(notes[i]);
        }
    };
    res.send(notesForSection||[]);
});

app.post("/notes", function(req, res) {
    //to add new note to session.notes
    console.log("adding new note");
    if (!req.session.notes) {
        req.session.notes = [];
        req.session.last_note_id = 0;
    }
    var note = req.body;
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    console.log(req.session.notes);
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

app.post("/sections/add",function(req,res) {
    console.log("adding new section");
    if(req.body.length == 0){
        console.log("req.body.length = 0. adding new section terminated,");
        res.end();
    }
    var newTitle = req.body.section;
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

