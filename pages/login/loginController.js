// poi controller
angular.module("myApp")
    .controller("loginController", function ($scope,$http,$rootScope) {
        $scope.checkCardentioals = function () {
            var _username = $scope.username;
            var _password = $scope.password;

            console.log(_username , _password);

            var req = {
                method: 'POST',
                url: 'http://localhost:5000/login',
                headers: {
                    'content-type': 'application/json'
                },
                data: { username: _username,
                        password: _password }
            };
            $http(req,)
            .then(function mySuccess(response) {
                // console.log(response.data);
                $scope.x_auth_token = response.headers['x-auth-token'];
                $rootScope.user = _username;
                // console.log($scope);
            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
            })
        };
        $scope.restorePassword = function () {

        };
    });