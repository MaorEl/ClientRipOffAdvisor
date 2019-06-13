// about controller
angular.module("myApp")
    .controller("questionsController", function ($scope, $http,$rootScope) {
        $scope.restorePassword = function(){
            var ans1 = $scope.answer1;
            var ans2 = $scope.answer2;

            console.log(ans1,ans2);
        };
    });