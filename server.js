const express = require('express');
const serveStatic = require('serve-static');
const request = require('request');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: "afsdnmoasdfnASDJKL",
    proxy: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(function (username, password, done) {
    userDb.login(username, password, function (error, user, message) {
        console.log(user);
        return done(error, user, message);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

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
