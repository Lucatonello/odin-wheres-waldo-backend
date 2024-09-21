const express = require('express');
const router = express.Router();

router.post('/guess/:character', async (req, res) => {
    let character = req.params.character; 
    let guessX = req.body.clientX;
    let guessY = req.body.clientY;
    let correctX = null;
    let correctY = null;

    if (character === 'waldo') {
        correctX = 1241;
        correctY = 707;   
    } else if (character === 'wizzard') {
        correctX = 1858;
        correctY = 111;
    } else {
        return res.status(400).json({ message: "Invalid character" });
    }

    if (
        guessX >= correctX - 40 && guessX <= correctX + 40 &&
        guessY >= correctY - 40 && guessY <= correctY + 40
    ) {
        res.json({ succes: true, message: 'Correct!'}); 
    } else {
        res.json({ succes: false, message: 'Try again!'});
    }

});

module.exports = router;