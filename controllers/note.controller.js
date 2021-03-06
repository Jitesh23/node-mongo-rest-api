const Note = require('../models/notes.model');

exports.create = (req, res) =>{
    //validate request

    if (!req.body.content){
        return res.status(400).send({
            message: 'Content Can Not Be Empty'
        });
    }

    //Create Note

    let newNote = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    newNote.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send({
            message: err.message || "Some error occured while creating the note"
        })
    });



}

exports.findAll = (req, res) => {
    Note.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retriving notes"
        })
    })
}

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId).then(note => {
        if (!note) {
            res.status(404).send({
                message: "Note not found with id" + req.params.noteId
            })
        }
        res.send(note);
    })
    .catch(err => {
        
        if (err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        return res.status(500).send({
            message: "Error retriving note with id  " + req.params.noteId
        })

    })
}

exports.update = (req, res) => {
    if (!req.body.content){
        return res.status(400).send({
            message: 'Note content can not be empty'
        })
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    },{
        new: true
    }).then(note =>{
        if (!note) {
             return res.status(404).send({
                message: 'Note not found with id' + req.params.noteId
            })
        }

        res.send(note);

    }).catch(err => {
        if (err.kind === 'ObjectId'){
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.noteId
            })
        }

        return res.status(500).send({
            message: 'Error while retriving note with id ' + req.params.noteId
        })
    })
}

exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId).then(note=> {

        if (!note){
            return res.status(404).send({
                message: 'Note not found with note id ' + req.params.noteId
            })
        }

        res.send('Note deleted successfully');
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound'){
            return res.status(404).send({
                message: 'Note not found with note id ' + req.params.noteId
            })
        }

        return res.status(500).send({
            message: 'Could not delete note with id ' + req.params.noteId
        })
    })
}