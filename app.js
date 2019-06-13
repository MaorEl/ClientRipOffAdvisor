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
        // other
        .otherwise({redirectTo: '/'});
});



