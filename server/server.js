const express = require('express');
const port = process.env.PORT || 5000;
const app = express()
const path = require('path');

pathdir = path.join(__dirname, '../public');

app.use(express.static(pathdir));

app.get('/', (req, res) => {
    res.render('index.html');
})

app.listen(5000, () => {
    console.log(`server listening on ${port}`);
})
