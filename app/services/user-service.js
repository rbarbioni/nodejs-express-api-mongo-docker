
const request = require('request');
User = require("../models/user")

module.exports = {

    findAll: function (req, callback) {
        User.find({}, function(err, result) {
            if(callback)
                callback(err, result)
        });
    },

    findById: function (req, callback) {
        User.findById(req.params.id, function(err, result) {
            if(callback)
                callback(err, result)
        });
    },

    save: function (req, callback) {
        var user = new User(req.body);
        user.save(function(err) {
            if(callback)
                callback(err, user);
        });
    },

    findByIdAndUpdate: function (req, callback) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if(callback)
                callback(err, result);
        });
    },

    findByIdAndRemove: function (req, callback) {
        User.findByIdAndRemove(req.params.id, function(err, result) {
            if(callback)
                callback(err, result);
        });
    },
};