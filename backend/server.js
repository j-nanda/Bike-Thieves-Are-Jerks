const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let latestLocation = {};  // To store the latest location data

app.post('/receive-location', (req, res) => {
    console.log('Location data received:', req.body);
    latestLocation = req.body;
    res.status(200).send('Data received');
});

app.get('/latest-location', (req, res) => {
    res.status(200).json(latestLocation);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});