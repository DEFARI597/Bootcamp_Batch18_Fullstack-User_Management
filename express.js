const express = require('express');
const fs = require('fs');
const path = require('path');
const { isValidName, isValidEmail, isValidPhone } = require('./validator');
const app = express();


app.set('view engine', 'ejs');


function logger(req, res, next) {
    console.log(`[${req.method}]`, req.url);
    next();
}

app.use(logger)

function validateUser(req, res, next) {
    const name = req.query.name;
    const email = req.query.email;
    const phone = req.query.phone;

    if (!name || !phone) {
        return res.status(400).send('Bad Request: Query parameters name and phone are required');
    }

    const allowedQueries = ['name', 'email', 'phone'];
    const queryKeys = Object.keys(req.query);
    const hasInvalidQuery = queryKeys.some(key => !allowedQueries.includes(key));

    if (hasInvalidQuery) {
        return res.status(400).send('Bad Request: Invalid or unexpected query parameter detected');
    }

    if (!isValidName(name)) {
        return res.status(400).send('Bad Request: Invalid Name format');
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).send('Bad Request: Invalid Email format');
    }

    if (!isValidPhone(phone)) {
        return res.status(400).send('Bad Request: Invalid Phone format');
    }

    next();
}

app.get('/add-users', validateUser, (req, res) => {
    const name = req.query.name;
    const email = req.query.email || "-";
    const phone = req.query.phone;

    const usersFilePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(usersFilePath)) {
        const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
        if (fileContent.trim()) {
            users = JSON.parse(fileContent);
        }
    }

    const newUser = { name, email, phone };
    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

    res.status(201).send('Data user berhasil disimpan di users.json!');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
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
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => {
    console.log('Server Running On Port 3000');
});