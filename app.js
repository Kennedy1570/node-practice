const express = require('express');
const app = express();
app.use(express.json());
const {fakeFirebaseLogin} = require('./authService');

//should route to login page
app.get('/login', (req, res) => {
    res.send('Login Page');
});

//should return 200 and user object when valid credentials are provided
app.post('/login', async (req, res) => {
    if (!req.body ||!req.body.email || !req.body.password) {
        return res.status(400).json('Email and password are required');
    }
    try {
        const user = await fakeFirebaseLogin(req.body.email, req.body.password);
        res.json(user);
    } catch (error) {
        res.status(401).json('Invalid credentials');
    }
});
//should return a page not found error if login page doesnt exist
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

module.exports = app;