angular.module("myApp")
    .controller("interestPointDetailsController", function ($scope, $http,$rootScope) {

        var poi = $rootScope.poi;

        $scope.atraction_name = poi.name;
        $scope.atraction_image = poi.image;
        $scope.atraction_description = poi.description;
        $scope.atraction_views = poi.views;
        $scope.atraction_rank = poi.rank;

        req = {
            method: 'GET',
            url: $rootScope.host + 'getLastTwoReviews/' + poi.id
        };
        $http(req)
            .then(function mySuccess(response) {
                if (response.data !== undefined){
                    $scope.user1 = response.data[0]['username'];
                    $scope.review1 = response.data[0]['review'];
                    $scope.rate1 = response.data[0]['rating'];
                   // const parsed1 = JSON.parse(response.data[0]['addedOn']);
                    $scope.date1 = new Date(response.data[0]['addedOn']).toUTCString();
                    if (response.data.length > 1){
                        $scope.user2 = response.data[1]['username'];
                        $scope.review2 = response.data[1]['review'];
                        $scope.rate2 = response.data[1]['rating'];
                       // const parsed2 = JSON.parse(response.data[1]['addedOn']);
                        $scope.date2 =  new Date(response.data[1]['addedOn']).toUTCString();
                    }
                }
            });
    });