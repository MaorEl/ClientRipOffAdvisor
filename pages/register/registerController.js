// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $rootScope) {
        var categoryList = [];
        var countryList = [];

        updateFields();

        $scope.signUp = function () {
            var _username = $scope.usernam;
            var _password = $scope.passwor;
            var _first_name = $scope.first_name;
            var _last_name = $scope.last_name;
            var _country = $scope.country;
            var _city = $scope.city;
            var _email = $scope.email;
            var _categories = $scope.selection;

            var req = {
                method: 'POST',
                url: $rootScope.host + 'register',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    usernam: _username,
                    passwor: _password,
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
                    alert("Hello " + _first_name + "\nRegister successful");
                    //todo after register redirect page without refresh
                    window.location.href = "#!";
                }, function myError(response) {
                    console.log(response.data)
                    alert("Problem with sign up \n" + response.data);
                })
        };


        function updateFields() {
            getCategory();
            getCountry();

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
                    for (i = 0; i < response.data.length; i++) {
                        categoryList.push(response.data[i].category_name);
                    }
                    setCategoryList();
                }, function myError(response) {
                    console.log("error");
                })
        };

        function getCountry() {
            var reqgetcountry = {
                method: 'Get',
                url: $rootScope.host + 'getAllCountries',
                headers: {
                    'content-type': 'application/json'
                },
            };
            $http(reqgetcountry)
                .then(function mySuccess(response) {
                    for (i = 0; i < response.data.length; i++) {
                        countryList.push(response.data[i].name);
                    }
                    setCountryList();
                }, function myError(response) {
                    console.log("error");
                })
        };

        function setCountryList() {
            var select = document.getElementById("selectCountry");
            for (var i = 0; i < countryList.length; i++) {
                var opt = countryList[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }

        function setCategoryList() {
            var select = document.getElementById("selectCategory");
            for (var i = 0; i < categoryList.length; i++) {
                var opt = categoryList[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
            $scope.category = categoryList.slice();
            $scope.selection = [];
            // Toggle selection for a given category by name
            $scope.toggleSelection = function toggleSelection(categoryName) {
                var idx = $scope.selection.indexOf(categoryName);
                // Is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }
                // Is newly selected
                else {
                    $scope.selection.push(categoryName);
                }
            };
        }

    })
;