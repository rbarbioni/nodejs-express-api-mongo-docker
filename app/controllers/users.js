var express = require('express');
var router = express.Router();
var userService = require('../services/user-service')
const error404 = {status: '404', message: 'Resource not found'};

router.get('/', function(req, res) {

    userService.findAll(req, function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});

router.get('/:id', function(req, res) {

    userService.findById(req, function(err, result) {
        if (err) throw err;
        
        if(result == null){
            res.status(404).json(error404)
        }else{
            res.send(result);
        }        
    });
});

router.delete('/:id', function(req, res) {
    userService.findByIdAndRemove(req, function(err, result) {
        if (err) throw err;
        if(result == null){
            res.status(404).json(error404)
        }else{
            res.status(204).send();
        }
    });
});

router.put('/:id', function(req, res) {
    userService.findByIdAndUpdate(req, function(err, result) {
        if (err) throw err;

        if(result == null){
            res.status(404).json(error404)
        }else{
            res.status(204).send();
        }
    });
});

router.post('/', function(req, res) {
    userService.save(req, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;