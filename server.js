const express = require('express');
const serveStatic = require('serve-static');
const request = require('request');
const app = express();
const username = process.env.username || "petur";
const password = process.env.password || "petur";
const url = process.env.url || "";

const routes = require('./backend/routes')(app);
const models = require('./backend/models');
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27017/sl-lager");

app.use(serveStatic(__dirname + "/dist"));
app.listen(9090, function () {
        console.log("Running api server.")
    }
);
