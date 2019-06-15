// about controller
angular.module("myApp")
    .controller("questionsController", function ($scope, $http, $rootScope) {

        var questions = {};
        var req = {
            method: 'GET',
            url: $rootScope.host + 'getUserQuestion/' + $rootScope.usernameForRestore
        };

        $http(req)
            .then(function mySuccess(response) {
                var q2;
                let q1 = response.data[0];
                if (response.data.length[1] != undefined) {
                    q2 = response.data[1];
                    $scope.allQuestions = [q1['question'], q2['question']];
                }
                else {
                    $scope.allQuestions = [q1['question']];

                }


                questions[q1['question']] = q1['id'];
                if (response.data.length[1] != undefined)
                    questions[q2['question']] = q2['id'];
            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
                console.log("error in questionsController");
            });
        $scope.restorePassword = function () {
            var ans = $scope.answer;
            var q_id = questions[$scope.selectedQuestion];

            req = {
                method: 'POST',
                url: $rootScope.host + 'RestorePassword',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    username: $rootScope.usernameForRestore,
                    question: q_id,
                    answer: ans
                }
            };

            $http(req)
                .then(function mySuccess(response) {
                    if (response.data.length!=0) {
                        let pass = response.data[0]['password'];
                        $scope.password = pass;
                        $scope.valid = true;
                    }
                    else {
                        $scope.valid = false;
                        alert("your answer is incorrect. please try again!")

                    }

                }, function myError(response) {
                    // $scope.myWelcome = response.statusText;
                    console.log("error in questionsController restorePassword");
                });
        };
    });