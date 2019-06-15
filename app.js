let myToken = null;
let app = angular.module('myApp', ["ngRoute"]);
// config routes
app.config(function ($routeProvider) {
    $routeProvider
    // homepage
        .when('/', {
            templateUrl: 'pages/explore/explore.html',
            controller: 'exploreController as expCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller: 'aboutController as abtCtrl'
        })
        // interestPoints
        .when('/interestPoints', {
            templateUrl: 'pages/interestPoints/interestPoints.html',
            controller: 'interestPointsController as interestPointsCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller: 'httpController as httpCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController as loginCtrl'
        })
        .when('/questions', {
            templateUrl: 'pages/questions/questions.html',
            controller: 'questionsController as questionsCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'registerController as registerCtrl'
        })
        .when('/home', {
            templateUrl: 'pages/home/home.html',
            controller: 'homeController as homeCtrl'
        })
        .when('/details', {
            templateUrl: 'pages/interestPointDetails/interestPointDetails.html',
            controller: 'interestPointDetailsController as interestPointDetailsCtrl'
        })
        // other
        .otherwise({redirectTo: '/'});

});

app.run(function($rootScope) {
    $rootScope.host = "http://localhost:5000/";
    $rootScope.home = "#!";
    $rootScope.poi = null;

    $rootScope.logout = function () {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        $rootScope.logged = false;
        $rootScope.not_logged = true;
        $rootScope.user = 'guest';
        $rootScope.myToken = null;
    };
        if (sessionStorage.getItem("token")!= null) {

            $rootScope.user = sessionStorage.getItem("username");
            $rootScope.myToken = sessionStorage.getItem("token");
            $rootScope.logged = true;
            $rootScope.not_logged = false;
    } else {
        console.log("no user logged right now");
        $rootScope.user = 'guest';
        $rootScope.logged = false;
        $rootScope.not_logged = true;

        }

});


