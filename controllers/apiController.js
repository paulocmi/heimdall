var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Q = require('q');
var router = express.Router();
var apiController = require('../controllers/apiController.js');
const exec = require('child_process').exec;
var path = "C://GatewayConnectorTest//Tests//OneCard//Config//";
var resultPath = "C://GatewayConnectorTest//Results//";
var apiConfig = require("./apiConfig.js");

var userIdent = '';

var apiController = module.exports = {};

apiController.runTest = function(testScenario,req){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> apiController.runTest")
    var deferred = Q.defer();

    console.log(req.body)
    userIdent = req.body.execId;
    userMail = req.body.userName.userMail;
    //command = command + userIdent
    var cmd = apiConfig.getTestCommand(testScenario, userMail, req.body.execId);

    apiController.setUserConfig(path,req).then(function(x,r) {
        apiController.execTest(cmd,req).then(function (data){
            deferred.resolve(data);
        },function(error){deferred.reject(error)});
    }, function(error){
        deferred.reject(error);
         res.status(500).send({ error:'Erro na execução do teste'});
    });
    return deferred.promise;
}

apiController.setUserConfig = function (path, req,err) {
    var deferred = Q.defer();
    if (err){deferred.reject(new Error(error))};

    var csvBasicConfig = apiController.parseJsonToCsv(req.body.basicConfig)
    var csvCreditCardConfig = apiController.parseJsonToCsv(req.body.cardConfig)
    var fullPath = path + req.body.userName.userMail;
    var a = apiController.setUserTestFile(fullPath , "basicConfig", csvBasicConfig );
    var b = apiController.setUserTestFile(fullPath , "credcards_1", csvCreditCardConfig);

    Q.all([a,b]).then(function(){
        deferred.resolve();
    })
    return deferred.promise;
}

apiController.setUserTestFile = function(path,file, req){

    var deferred = Q.defer();

    mkdirp(path, function (err) {
        if (err) deferred.reject(new Error(error));
        deferred.resolve(fs.writeFileSync(path + '//' + file + '.csv', req));
    })
    return deferred.promise;
}

apiController.execTest = function(command,req){
    var deferred = Q.defer();
    console.log(command);
    console.log("Api Running...")
    var ls = exec(command, function(err, stdout, stderr, code) {
        if (err) {
            deferred.reject(new Error(err));
        }
        apiController.readTestResult()
        .then(function(data) {
            deferred.resolve(data);
        }, function(error){
        });
    });
    return deferred.promise;
}

apiController.readTestResult = function(){
    var deferred = Q.defer();
    var pathResult = apiConfig.getTestResultPath() + '/' + userMail + '/' + userIdent + '/AUTHORIZE_CREDIT_CARD.json';

    fs.readFile(pathResult, 'utf8', function(err,data){
        if(err) {
            console.error("Could not open file: %s", err);
            deferred.reject(new Error(err));
        }
        //data = apiController.parseDataToJson(data)
        deferred.resolve(data);
    });
    return deferred.promise;
}

apiController.parseJsonToCsv = function(objArray) {
    var value = '';
    for(var key in objArray) {
        value += objArray[key] + ';';
    }
    return value;
}

apiController.parseDataToJson = function(data){
    data = data.replace(/}{/g, "},{")
    var json = '['+ data + ']';
    return json;
}

module.exports = apiController;
