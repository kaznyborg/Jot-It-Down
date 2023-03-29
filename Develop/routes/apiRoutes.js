const router = require("express").Router();

router.get('/', (req,res)=> {
    //get all the notes from db
    res.json(`GOT YOUR ${req.method} REQUEST`);
})

router.post('/', (req,res)=> {
    //add notes to db
    res.json(`GOT YOUR ${req.method} REQUEST`);
});

//BONUS delete note as well
router.delete('/', (req,res)=> {
    res.json(`GOT YOUR ${req.method} REQUEST`);
})

module.exports = router;

