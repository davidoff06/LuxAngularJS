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
    res.send(req.session.notes||[]);
});
app.post("/notes", function(req, res) {
    if (!req.session.notes) {
        req.session.notes = [];
        req.session.last_note_id = 0;
    }
    var note = req.body;
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    res.end();
});

app.delete("/notes", function(req, res){
    var id = req.query.id;
    var notes = req.session.notes || [];
    var updateNotesList = [];
    for (var i=0; i<notes.length; i++){
        if(notes[i].id != id) {
            updateNotesList.push(notes[i]);
        }
    }
    req.session.notes = updateNotesList;
    res.end();
});


//temporary hardcoded as we don't have MongoDB part
var sections = [{title:"Work"},{title:"Vacation"},{title:"Children"}];

app.get("/sections", function(req,res) {
    res.send(sections||[]);
});

