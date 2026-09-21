const express = require('express');
const fs = require('fs');
const path = require('path');
const { isValidName, isValidEmail, isValidPhone } = require('./validator');
const User = require('./user');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/add-users', validateUser, async (req, res) => {
    try {
        const name = req.query.name;
        const email = req.query.email || "-";
        const phone = req.query.phone;

        const exists = await User.checkExistsByName(name);
        if (exists) {
            return res.status(409).send(`Conflict: User with name "${name}" already exists`);
        }

        const newUser = await User.create({ name, email, phone });
        res.status(201).send(`Data user berhasil disimpan di PostgreSQL! ID: ${newUser.id}`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/users', async (req, res) => {
    try {
        const data = await User.getAll();
        res.render('users', { data });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/users/:id', (req, res) => {
    console.log(req.params.id);
    res.send('User Detail');
});

app.get('/api/users', async (req, res) => {
    try {
        const data = await User.getAll();
        res.json(data);
    } catch (error) {
        console.error('Error fetching API users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Any unmatched routes in express will fallback to 404 (handled in app.js or here)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;