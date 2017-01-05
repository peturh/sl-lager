var models = require('./models.js');
var uuid = require('uuid');
var SHA512 = require('crypto-js/sha512');
var crypto = require('crypto-js');

var userModel = models.getUserModel();


module.exports = {
    /**
     * Gets the user object with the specified username
     * @param username - The username of the user
     * @param callback - The user object
     */
    getUserByName: function (username, callback) {
        userModel.findOne({username: username}, {password: 0, salt: 0}).exec(function (error, user) {
            if (error) {
                callback(error)
            }
            else {
                callback(user);
            }
        })
    },

    /**
     * Logins the user, checks towards user db
     * @param username - The username of the user
     * @param password - The password of the user
     * @param done(error, userObject, errorMessage) - Callbacks done to passport
     *
     */

    login: function (username, password, done) {
        userModel.findOne({username: username}, function (error, user) {
            if (error) {
                console.log(error);
                return done(error);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== SHA512(user.salt + password).toString()) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            else {
                delete user.password;
                delete user.salt;
                return done(null, user);
            }
        });
    },
    /**
     * Registers the user
     * @param theUser - The user that should be registered
     * @param callback - Callbacks success if it
     */
    registerUser: function (theUser, callback) {
        console.log(theUser);
        userModel.findOne({'username': theUser.username}, null, function (error, data) {
            if (error) {
                callback(error);
            }
            else {
                if (data === null) {
                    var salt = crypto.lib.WordArray.random(128 / 8);
                    var user = new userModel({
                        username: theUser.username,
                        password: SHA512(salt + theUser.password),
                        salt: salt,
                        email: theUser.email,
                        id: uuid.v4()
                    });
                    user.save(function (error) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("Saved user: " + theUser.username + " to db.");
                        }
                    });
                    callback(true);
                }
                //A user with that name existed.
                else {
                    console.log("A user with name: " + theUser.username + " existed. Did not register user.");
                    callback(false);
                }
            }

        });

    },
    registerDepotOnUser: function (userId, screenId, callback) {
        //todo: remove old users screen
        screenModel.findOneAndUpdate({id: screenId}, {free: false}, function (error, screen) {
            if (error) {
                callback(error);
            }
            else {
                console.log("Screen",screen);
                console.log("Screen ID: ",screenId);
                userModel.findOneAndUpdate({id: userId}, {screen: screen},
                    function (error, updatedUser) {
                        if (error) {
                            console.log("Error", error);
                            callback(error);
                        }
                        else {
                            callback(updatedUser);
                        }
                    });
            }
        });
    },
    getUser: function (id, callback) {
        userModel.findOne({id: id}, {password: 0, salt: 0}, function (error, user) {
            if (error) {
                callback(error)
            }
            else {
                callback(user);
            }
        })
    },
    getUsers: function (callback) {
        userModel.find({}, {password: 0, salt: 0}).exec( function (error, users) {
            if (error) {
                callback(error);
            }
            else {
                callback(users);
            }
        });
    },
    changePassword: function (payload, callback) {
        //Find user with the desired id
        userModel.findOne({id: payload.id}, function (error, user) {
            if (error) {
                console.log("Error", error);
                callback(error);
            }
            //If password entered in user interface is correct, continue
            else if (user.password === SHA512(user.salt + payload.oldPassword).toString()) {
                var salt = user.salt;
                console.log(salt);
                console.log("unhashed", payload.newPassword);
                console.log("password", user.password);
                var newPassword = SHA512(salt + payload.newPassword).toString();
                console.log("new password", newPassword);
                //Get user and update new salt and password
                console.log("Same password!");
                userModel.findOneAndUpdate({id: payload.id}, {
                    password: newPassword
                }, function (error, user) {
                    if (error) {
                        console.log("Error", error);
                        callback(error);
                    }
                    else {
                        //Callback user object
                        console.log("updated password with user");
                        callback(true);
                    }
                });

            }
            else {
                //Just wrong
                callback(false);
            }

        });


    },

    changeEmail: function (payload, callback) {
        //Find user with the desired id
        userModel.findOne({id: payload.id}, function (error, user) {
            if (error) {
                callback(error);
            }
            //If password entered in user interface is correct, continue
            else {
                //Get user and update new salt and password
                userModel.findOneAndUpdate({id: payload.id}, {email: payload.newEmail}, function (error, user) {
                    if (error) {
                        callback(error);
                    }
                    else {
                        //Callback user object
                        callback(user);
                    }
                });
            }
        });


    }

};