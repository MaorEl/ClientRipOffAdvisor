// interestPoints controller
angular.module("myApp")
    .controller("loginController", function ($scope, $http, $rootScope) {
        $scope.stepOneRestore = false;
        $scope.checkCardentioals = function () {
            var _username = $scope.username;
            var _password = $scope.password;

            console.log(_username, _password);

            var req = {
                method: 'POST',
                url: 'http://localhost:5000/login',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    username: _username,
                    password: _password
                }
            };
            $http(req)
                .then(function mySuccess(response) {
                    $rootScope.user = _username;
                    $rootScope.myToken = response.data;
                }, function myError(response) {
                    // $scope.myWelcome = response.statusText;
                    console.log("error in loginController.checkCardentioals");
                })
        };
        $scope.restorePassword = function () {
            // console.log($scope);
            var usernameForRestore = $scope.usernameForRestore;
            // console.log(usernameForRestore);
            $rootScope.usernameForRestore = usernameForRestore;
        };
    });