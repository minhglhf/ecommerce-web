const express = require('express');
const env = require('dotenv');

const mongoose = require('mongoose');
const app = express();

env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGGO_DB_USERNAME}:${process.env.MONGGO_DB_PASSWORD}@nodetuts.7eeft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("database connect")
    }).catch(() => {
        console.log("error connect")
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "hello from server"
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})