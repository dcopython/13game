const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/cards/:id', (req, res) => {
    // slice from beginning of id to the . before svg
    const id = req.params.id.slice(0, req.params.id.indexOf('.'));

    res.sendFile(path.join(__dirname, `../node_modules/cardsJS/cards/${id}.svg`));
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})