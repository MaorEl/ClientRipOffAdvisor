// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $rootScope) {
        var allCategoryFromServer = []; //todo this holds the list of catagorys, need to add it to select list in html
        start();
        console.log("print list" + allCategoryFromServer);
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
        function setlist() {
            var select = document.getElementById("selectCountry");
            var options = ["1", "2", "3", "4", "5"];
            for (var i = 0; i < allCategoryFromServer.length; i++) {
                var opt = allCategoryFromServer[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }

        function start() {
            getCategory();
            console.log("catagory imported from sql");
            setlist();
            console.log("list create");
        }
        //get list of categories
        function getCategory() {
            var reqget = {
                method: 'Get',
                url: 'http://localhost:5000/getAllCategories',
                headers: {
                    'content-type': 'application/json'
                },
            };
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