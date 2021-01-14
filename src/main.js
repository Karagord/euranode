const express = require('express');
const bdd = require('../utils/bdd')
const User = require('../controllers/user').User
const getUsers = require('../controllers/user').getUsers
const moment = require('moment')
const loremIpsum = require("lorem-ipsum").loremIpsum;
const app = express();
const port = 8000;

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/', (req, res) => {
    res.send('hello world')
});
app.get('/get_lorem', (req, res) => {
    console.log("get_lorem")
    res.send({
        lorem: loremIpsum({
            count: 1,                // Number of "words", "sentences", or "paragraphs"
            format: "plain",         // "plain" or "html"
            paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
            paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
            random: Math.random,     // A PRNG function
            sentenceLowerBound: 5,   // Min. number of words per sentence.
            sentenceUpperBound: 15,  // Max. number of words per sentence.
            suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
            units: "sentences",
        })
    })
});
app.get('/get_profiles', async (req, res) => {

    let profiles = await getUsers()
    res.send({ profiles: profiles })
});
app.get('/get_profile', async (req, res) => {
    const profile = new User();
    await profile.readUser(req.query.id)
    res.send({ profile: profile })
});
app.get('/put_profile', (req, res) => {

    const profile = JSON.parse(req.query.updatedProfile);
    const user = new User()
    user.updateUser(profile)
});

app.listen(process.env.PORT || port, async () => {
    bdd.default.up()
    console.log(`Example app listening on port ${port}!`);
});