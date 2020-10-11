const { resolveSoa } = require('dns');
const express = require('express');
const path = require('path');
const { getFriends, updateFriends } = require('../db/index.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/cards/:id', (req, res) => {
    // slice from beginning of id to the . before svg
    const id = req.params.id.slice(0, req.params.id.indexOf('.'));
    res.sendFile(path.join(__dirname, `../node_modules/cardsJS/cards/${id}.svg`));
})

app.get('/api/friends', (req, res) => {
    getFriends((error, result) => {
        if (error) {
            res.sendStatus(500);
        }

        res.status(200).send(result);
    })
})

app.post('/api/update', (req, res) => {
    const { name } = req.body;

    updateFriends(name);

    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})