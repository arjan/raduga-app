angular.module('app')
  .controller('GlobeCtrl', function GlobeCtrl($scope, API, $ionicSlideBoxDelegate) {

    $scope.cities = [];
    API.getRainbowCities().then(function(l) {
      $scope.cities = l.cities;
    });

    $scope.$on('tracking', function(_sender, down) {
      $ionicSlideBoxDelegate.enableSlide(!down);
    });

  })
;
