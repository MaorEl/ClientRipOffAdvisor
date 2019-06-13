// about controller
angular.module("myApp")
    .controller("questionsController", function ($scope, $http,$rootScope) {

        var questions = {};
        var req = {
            method: 'GET',
            url: 'http://localhost:5000/getUserQuestion/' + $rootScope.usernameForRestore
        };

        $http(req)
            .then(function mySuccess(response) {
                let q1 = response.data[0];
                let q2 = response.data[1];

                $scope.allQuestions = [q1['question'], q2['question']];

                questions[q1['question']] = q1['id'];
                questions[q2['question']] = q2['id'];

            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
                console.log("error in questionsController");
            });
        $scope.restorePassword = function(){
            var ans = $scope.answer;
            var q_id = questions[$scope.selectedQuestion];

            req = {
                method: 'POST',
                url: 'http://localhost:5000/RestorePassword',
                headers: {
                    'content-type': 'application/json'
                },
                data: { username: $rootScope.usernameForRestore,
                        question: q_id,
                        answer: ans }
            };

            $http(req)
                .then(function mySuccess(response) {
                let pass = response.data[0]['password'];
                $scope.password = pass;
                $scope.valid = true;
            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
                console.log("error in questionsController restorePassword");
            });
        };
    });