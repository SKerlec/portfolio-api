const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API status: running')
});

const apiKey = process.env.SENDGRID_API_KEY;

app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey(apiKey);
    const msg = {
        to: 'sholmes.dev@gmail.com',
        from: 'SKerlec7693@gmail.com',
        subject: 'Portfolio Contact from: ' + req.body.name,
        text: 'Email: ' + req.body.email + ' ' + 'Message: ' + '"' + req.body.message + '"'
    }
    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            });
        });
});



const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})