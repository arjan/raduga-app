angular.module('app')
  .controller('GlobeCtrl', function GlobeCtrl($scope, API, $ionicSlideBoxDelegate) {

    API.getRainbowCities().then(function(l) {
      console.log('x',l);
    });

    $scope.$on('tracking', function(_sender, down) {
      $ionicSlideBoxDelegate.enableSlide(!down);
    });


  })
;
