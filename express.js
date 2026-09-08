const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'homepage.html'));
});

app.get('/users', (req, res) => {
    const fileContent = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
    const data = JSON.parse(fileContent);
    res.render('users', { data });
});

app.get('/users/:id', (req, res) => {
    console.log(req.params.id);
    res.send('User Detail');
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});