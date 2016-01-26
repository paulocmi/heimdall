app.controller('TwoCardsController', function($scope, $location,$http) {
    $scope.message = 'TWO CARDS PAGE';
    
    console.log($location.path())
    $scope.runJmeterTest = function(){
        console.log("OKOKK!!")

        $http.get("/api/payments/TwoCards");
    };


});
