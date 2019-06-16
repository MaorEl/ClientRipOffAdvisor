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
        .when('/interestPointsSaved', {
            templateUrl: 'pages/interestPointsSaved/interestPointsSaved.html',
            controller: 'interestPointsSavedController as interestPointsSavedCtrl'
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
        .when('/favorites', {
            templateUrl: 'pages/favorites/favorites.html',
            controller: 'favoritesController as favoritesCtrl'
        })
        // other
        .otherwise({redirectTo: '/'});

});

app.run(function($rootScope,$location) {
    //$rootScope.host = "http://localhost:5000/";
    $rootScope.host = "https://ripoffadvisorserver.azurewebsites.net:1337";
    $rootScope.home = "#!";
    $rootScope.poi = null;

    $rootScope.favorites_show = function() {
      $location.path( "/favorites");

    };
    $rootScope.logout = function () {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('nof');
        $rootScope.logged = false;
        $rootScope.not_logged = true;
        $rootScope.user = 'guest';
        $rootScope.myToken = null;
    };
        if (sessionStorage.getItem("token")!= null) {

            $rootScope.user = sessionStorage.getItem("username");
            $rootScope.myToken = sessionStorage.getItem("token");
            $rootScope.num_of_favorites = sessionStorage.getItem("nof");
            $rootScope.logged = true;
            $rootScope.not_logged = false;
            $rootScope.fav_icon = "images/fav_icons/w" + $rootScope.num_of_favorites +".png";
    } else {
        console.log("no user logged right now");
        $rootScope.user = 'guest';
        $rootScope.logged = false;
        $rootScope.not_logged = true;
        $rootScope.num_of_favorites = 0;


        }

});


