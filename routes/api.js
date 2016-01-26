var express = require('express');
var fs = require('fs');
var Q = require('q');
var router = express.Router();
var apiController = require('../controllers/apiController.js');
const exec = require('child_process').exec;

var run = function(req, res, type) {
    apiController.runTest(type,req)
    .then(function(data) {
        res.status(200).send(data);
    }, function(error){
        res.status(500).send({ error:'Erro na execução do arquivo de teste'});
    });
}

router.post('/OneCard/Authorization', function(req, res) {run(req, res, '/OneCard/Authorization/') });

module.exports = router;
