// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $rootScope) {
        const allCategoryFromServer = getCategory(); //todo this holds the list of catagorys, need to add it to select list in html
        console.log(allCategoryFromServer)
        start();
        console.log(allCategoryFromServer)
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
                url: $rootScope.host + 'register',
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
                url: $rootScope.host + 'getAllCategories',
                headers: {
                    'content-type': 'application/json'
                },
            };
            $http(reqget)
                .then(function mySuccess(response) {
                    var allCategoryFromServer2 = [];
                    for (i = 0; i < response.data.length; i++) {
                        allCategoryFromServer2.push(response.data[i].category_name);
                    }
                    return allCategoryFromServer2;
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