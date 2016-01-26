app.controller('OneCardController', function($scope, $location,$http,Data) {
    // var vm = this;
    $scope.message = 'ONE CARD PAGE';
    $scope.result = '';
    $scope.resultFails = '';
    $scope.resultPasses = '';
    $scope.currentView = 'form';
    $scope.userNameLabel = 'User Email';
    $scope.basicConfigLabel = 'Basic Config';
    $scope.cardConfigLabel = "Credit Card Info";
    $scope.basicConfigModel = {};
    $scope.creditCardModel = {};
    $scope.executionId = '';



    $scope.runJmeterTest = function(userName,basicConfig,cardConfig){
        $scope.executionId = $scope.generateExecId();
        postUrl = "/api/payments" + $location.url();
        $http.post(postUrl, { execId: $scope.executionId, userName: userName, basicConfig: basicConfig, cardConfig: cardConfig }).then(function(response){
            $scope.getFailedTests(response.data);
            console.log("Api returns Successfully...!!!");
        }, function (response) {
            console.log("Callback Error : ", response);
        });
    };

    $scope.checkResultExistence = function(){
        if(($scope.resultPasses != '')||($scope.resultFails != '')){
            return true;
        }
        return false;
    };

    $scope.getFailedTests= function(data){
        var contador = data.length;
        var fails = [];
        var passes = [];

        for (var indice = 0; indice < contador; indice++)
        {
            var item = data[indice];
            if(item.testResult === false){
                fails.push(data[indice]);
            }else
            {
                passes.push(data[indice]);
            }
        }
        if(fails.length == 0)
        {$scope.resultFails = '0'};
        if(passes.length == 0){$scope.resultPasses = '0'};

        $scope.resultFails = fails;
        $scope.resultPasses = passes;

    };

    $scope.generateExecId = function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    $scope.loadingData = Data.getInitialDataLoad().then(function(result) {
        $scope.userNameModel = result[0].userNameModel;
        $scope.basicConfigModel = result[0].basicConfigModel;
        $scope.creditCardModel = result[0].creditCardModel;
        $scope.userConfig = result[1];
        $scope.basicConfig = result[2];
        $scope.cardConfig = result[3];
    });
});

app.factory('Data', function($timeout, $q) {
    return {
        getUserName: getUserName,
        getBasicConfig: getBasicConfig,
        getCardConfig: getCardConfig,
        getInitialDataLoad: getInitialDataLoad
    };

    function getInitialDataLoad() {
        return $q.all([getInitialData(), getUserName(), getBasicConfig(), getCardConfig()]);
    }

    function getInitialData() {
        return $timeout(function() {
            return {
                "userNameModel": {
                    "userMail":"paulo.inacio@vtex.com.br"
                },
                "basicConfigModel": {
                    "gateway":"qamarketplace.vtexpayments.com.br",
                    "an":"qamarketplace",
                    "saleschannel":"1"
                },
                "creditCardModel": {
                    "paymentSystem":"2",
                    "group":"CreditCard",
                    "paymentSystemName":"Visa",
                    "cardHolder":"Card Holder Test User",
                    "cardNumber":"4111111111111111",
                    "cvv":"999",
                    "expireMonth":"09",
                    "expireYear":"16"
                }
            };
        }, 100);
    }

    function getUserName(){
        return $timeout((function() {
            return [
                {
                    className: "row",
                    fieldGroup: [
                        {
                            className: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                            key: "userMail",
                            type: "input",
                            templateOptions: {
                                label: "User Mail"
                            }
                        }
                    ]
                }
            ];
        }), 1500);
    };

    function getBasicConfig(){
        return $timeout((function() {
            return [
                {
                    className: "row",
                    fieldGroup: [
                        {
                            className: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                            key: "gateway",
                            type: "input",
                            templateOptions: {
                                label: "Gateway Environment"
                            }
                        }, {
                            className: "col-xs-6 col-sm-6 col-md-6 col-lg-6",
                            key: "an",
                            type: "input",
                            templateOptions: {
                                label: "An"
                            }
                        }, {
                            className: "col-xs-6 col-sm-6 col-md-6 col-lg-6",
                            key: "saleschannel",
                            type: "input",
                            templateOptions: {
                                label: "Sales Channel"
                            }
                        }
                    ]
                }
            ];
        }), 1500);
    };

    function getCardConfig(){
        return $timeout((function() {
            return [
                {
                    className: "row",
                    fieldGroup: [
                        {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "paymentSystem",
                            type: "input",
                            templateOptions: {
                                label: "Payment System"
                            }
                        }, {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "group",
                            type: "input",
                            templateOptions: {
                                label: "Group"
                            }
                        }, {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "paymentSystemName",
                            type: "input",
                            templateOptions: {
                                label: "System Name"
                            }
                        },  {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "cardNumber",
                            type: "input",
                            templateOptions: {
                                label: "cardNumber"
                            }
                        },  {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "cvv",
                            type: "input",
                            templateOptions: {
                                label: "CVV"
                            }

                        }, {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "cardHolder",
                            type: "input",
                            templateOptions: {
                                label: "Card Holder"
                            }
                        }, {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "expireMonth",
                            type: "input",
                            templateOptions: {
                                label: "Expire Month"
                            }
                        }, {
                            className: "col-xs-4 col-sm-4 col-md-4 col-lg-4",
                            key: "expireYear",
                            type: "input",
                            templateOptions: {
                                label: "Expire Year"
                            }
                        }
                    ]
                }
            ];
        }), 1500);
    };
});
