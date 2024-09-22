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
        correctX = 1340;
        correctY = 840;
    } else if (character === 'wenda') {
        correctX = 773;
        correctY = 529;   
    } else if (character === 'wizard') {
        correctX = 115;
        correctY = 864;
    } else if (character === 'odlaw') {
        correctX = 503;
        correctY = 745;
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
        let playername = req.body.playerName;
        const time = req.body.time;

        if (!playername) {
            playername = 'Anonymus'
        }
    
        await pool.query('INSERT INTO times (playername, time) VALUES ($1, $2)', [playername, time]);
        res.json({ message: 'successful database operation'});    
    } catch (err) {
        console.error(err);
    }
});

router.get('/high-scores', async (req, res) => {
    try {
        const scores = await pool.query('SELECT * FROM times ORDER BY time');
        res.json(scores.rows);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;