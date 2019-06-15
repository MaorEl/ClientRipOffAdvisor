// poi controller
angular.module("myApp")
    .controller("registerController", function ($scope, $http, $rootScope, $location) {

        //list for category, country, question from DB
        var categoryList = [];
        var countryList = [];
        var questionList = [];

        //run as soon as we enter register page
        updateFields();

        //when starting the register page, run this
        function updateFields() {
            getCategory();
            getCountry();
            getQuestion();
        }

        //sign up function
        $scope.signUp = function () {
            var _username = $scope.username;
            var _password = $scope.password;
            var _first_name = $scope.first_name;
            var _last_name = $scope.last_name;
            var _country = document.getElementById("selectCountry");
            _country = getSelectedCountry(_country);
            var _question = $scope.questionrestore;
            var _questionpick = document.getElementById("selectQuestion");
            _questionpick = getQuestionpick(_questionpick);
            var _city = $scope.city;
            var _email = $scope.email;
            var _categories = getCategories();

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
                    country: _country,
                    city: _city,
                    email: _email,
                    categories: _categories,
                }
            };

            var req2 = {
                method: 'POST',
                url: $rootScope.host + 'InsertAnswer',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    username: _username,
                    question_id: _questionpick,
                    answer: _question
                }
            };
            $http(req2)
                .then(function mySuccess() {
                }, function myError(response) {
                    console.log(response.data);
                    alert("Problem with sign up \n" + response.data);
                })
            $http(req)
                .then(function mySuccess() {
                    alert("Hello " + _first_name + "\nSuccessfuly registered! \nPlease log in with your details to use your account!");
                    //todo after register redirect page without refresh
                    $location.path("/login");
                }, function myError(response) {
                    console.log(response.data);
                    alert("Problem with sign up \n" + response.data);
                })

        };


        //###################################################################################################



        //get all categories from DB
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

        //get all question from DB
        function getQuestion() {
            var reqget = {
                method: 'Get',
                url: $rootScope.host + 'getAllQuestions',
                headers: {
                    'content-type': 'application/json'
                },
            };
            $http(reqget)
                .then(function mySuccess(response) {
                    for (i = 0; i < response.data.length; i++) {
                        questionList.push(response.data[i].question);
                    }
                    setQuestionList();
                }, function myError(response) {
                    console.log("error");
                })
        };

        //get all countries from DB
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

        //###################################################################################################

        //update country list in html page
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

        //update category list in html page
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

        //update question list in html page
        function setQuestionList() {
            var select = document.getElementById("selectQuestion");
            for (var i = 0; i < questionList.length; i++) {
                var opt = questionList[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }

        //###################################################################################################

        //get selected country
        function getSelectedCountry(_country) {
            for (i = 0; i < _country.length; i++) {
                if (_country[i].selected == true) {
                    return _country[i].label;
                }
            }
        }

        //get selected question
        function getQuestionpick(_questionpick) {
            for (i = 0; i < _questionpick.length; i++) {
                if (_questionpick[i].selected == true) {
                    return i;
                }
            }
        }

        //get selected category
        function getCategories() {
            var _categoriesBefore = $scope.selection;
            var _categories = "";
            if (_categoriesBefore.length > 0)
                for (i = 0; i < _categoriesBefore.length - 1; i++)
                    _categories += [i] + ",";
            _categories += [_categoriesBefore.length];
            return _categories;
        }


    })
;