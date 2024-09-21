const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const router = require('./routes/main');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => console.log('Server running on port', PORT));