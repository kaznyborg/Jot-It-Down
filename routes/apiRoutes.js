const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get('/', (req,res)=> {
    //get all the notes from db
    console.info(`GOT YOUR ${req.method} REQUEST`);
    const dataFromJSON = fs.readFileSync('./db/db.json', 'utf8');
    res.json(JSON.parse(dataFromJSON));
});

router.post('/', (req,res)=> {
    //add notes to db
    console.info(`GOT YOUR ${req.method} REQUEST`);
    const {title, text} = req.body;
    if  (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        const currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        currentNotes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) =>
        err
        ? console.err(err)
        : console.log(`Note for ${newNote.title} has been taken`)
        );
        const response = {
            status: 'Saved Note',
            body: newNote,
        };

        console.log(response)
        res.status(201).json(response);

    } else {
        res.status(500).json('Your not was not Saved');
    }
});

//BONUS delete note as well
router.delete('/', (req,res)=> {
    res.json(`GOT YOUR ${req.method} REQUEST`);
    let data = fs.readFileSync('./db/db/json', 'utf8');
    const dataFromJSON = JSON.parse(data)
    const newNotes = dataFromJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});

module.exports = router;

