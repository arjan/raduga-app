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

  .controller('PhotosCtrl', function PhotosCtrl($scope, $timeout, API) {

    $scope.doRefresh = function() {
      API.getRainbowPhotos().then(function(p) {
        $scope.photos = p.data;
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });        
    };

    $scope.doRefresh();

    $scope.takePicture = function() {

      Instagram.isInstalled(function (err, installed) {
        if (installed) {

          navigator.camera.getPicture(
            function ok(f) {
              console.log('Got picture');
              var dataUri = "data:image/jpeg;base64," + f;

              $timeout(function() {
                Instagram.share(dataUri, 'Raduga', function(err) {
                  console.log(err ? "Error!" : "Share OK!");
                });
              }, 1000);

            },
            function fail() {
            },
            {
              qualtiy: 85,
              destinationType: 0, // data url
              allowEdit: false,
              targetWidth: 600,
              targetHeight: 600,
              correctOrientation: true
            });

          
        } else {
          alert("You need to have Instagram installed to take pictures");
        }
      });
      
    };

  });


;
