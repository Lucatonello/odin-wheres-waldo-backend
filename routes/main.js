const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.post('/guess/:character', async (req, res) => {
    let character = req.params.character; 
    let guessX = req.body.clientX;
    let guessY = req.body.clientY;
    let correctX = null;
    let correctY = null;

    if (character === 'waldo') {
        correctX = 773;
        correctY = 529;   
    } else if (character === 'wizard') {
        correctX = 115;
        correctY = 864;
    } else {
        return res.status(400).json({ message: "Invalid character" });
    }

    if (
        guessX >= correctX - 40 && guessX <= correctX + 40 &&
        guessY >= correctY - 40 && guessY <= correctY + 40
    ) {
        res.json({ success: true, message: 'Correct!' }); 
    } else {
        res.json({ success: false, message: 'Try again!'});
    }

});

router.post('/addtime', async (req, res) => {
    try {
        const playername = req.body.playerName;
        const time = req.body.time;
    
        await pool.query('INSERT INTO times (playername, time) VALUES ($1, $2)', [playername, time]);
        res.json({ message: 'successful database operation'});    
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;