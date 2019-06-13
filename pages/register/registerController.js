// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $rootScope) {

        $scope.signUp = function () {
            var _username = $scope.username;
            var _password = $scope.password;
            var _first_name = $scope.first_name;
            var _last_name = $scope.last_name;
            var _country = $scope.country;
            var _city = $scope.city;
            var _email = $scope.email;
            var _categories = $scope.categories;

            var req = {
                method: 'POST',
                url: 'http://localhost:5000/register',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    username: _username,
                    password: _password,
                    first_name: _first_name,
                    last_name: _last_name,
                    first_name: _country,
                    city: _city,
                    email: _email,
                    categories: _categories
                }
            };

            $http(req)
                .then(function mySuccess() {
                    console.log("ok");
                    alert("Hello " + _first_name + "\nRegister successful");
                    //todo after register redirect page without refresh
                    window.location.href = "#!";
                }, function myError(response) {
                    console.log(response.data)
                    alert("Problem with sign up \n" + response.data);
                })
        };


        //get list of categories
        $scope.testme = function () {
            var reqget = {
                method: 'Get',
                url: 'http://localhost:5000/getAllCategories',
                headers: {
                    'content-type': 'application/json'
                },
            };
            var allCategoryFromServer = [];
            $http(reqget)
                .then(function mySuccess(response) {
                    for (i = 0; i < response.data.length; i++) {
                        allCategoryFromServer.push(response.data[i].category_name);
                    }
                    console.log("ok");
                }, function myError(response) {
                    console.log("error");
                })
        };


        $scope.restorePassword = function ($rootScope, $scope) {
            $rootScope.usernameForRestore = $scope.usernameForRestore;

        };
    })
;