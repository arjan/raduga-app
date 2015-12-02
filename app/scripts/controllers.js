angular.module('app')
  .controller('GlobeCtrl', function GlobeCtrl($scope, API, $ionicSlideBoxDelegate, Locale) {

    $scope.cities = [];
    API.getRainbowCities().then(function(l) {
      $scope.cities = l.cities;
    });

    $scope.$on('tracking', function(_sender, down) {
      $ionicSlideBoxDelegate.enableSlide(!down);
    });

  })

  .controller('PhotosCtrl', function PhotosCtrl($scope, $rootScope, $timeout, $ionicLoading, API, Config) {

    $scope.doRefresh = function() {
      $ionicLoading.show();
      API.getRainbowPhotos().then(function(p) {
        $scope.photos = p.photos;
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      });        
    };

      $scope.doRefresh();

      $scope.share = function() {
          console.log("share");
          alert("share");
      };

    $scope.takePicture = function() {

      $ionicLoading.show();
      
      navigator.camera.getPicture(
        function ok(fileURL) {
          console.log('Got picture: ' + fileURL);

          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
          options.mimeType = "text/plain";
          var c = {"name_en": "Amsterdam"};
          options.params = {meta: JSON.stringify($rootScope.closestCity ? $rootScope.closestCity : {})};
          options.params = {meta: JSON.stringify(c)}; // DEBUG

          var ft = new FileTransfer();
          var url = Config.baseUrl + '/app/user/' + Config.userId + '/photo';
          ft.upload(fileURL, url,
                    function (r) {
                      console.log("Code = " + r.responseCode);
                      console.log("Response = " + r.response);
                      console.log("Sent = " + r.bytesSent);
                      $scope.$apply(function() {
                        $scope.doRefresh();
                      });
                    }, 
                    function (error) {
                      alert("An error has occurred: Code = " + error.code);
                      console.log("upload error source " + error.source);
                      console.log("upload error target " + error.target);
                      $scope.$apply(function() {$ionicLoading.hide();});            
                    },
                    options);
        },
        
        function fail() {
          console.log('error getting picture');
          $scope.$apply(function() {$ionicLoading.hide();});            
        },
        {
          qualtiy: 85,
          destinationType: 1, // file URL
          allowEdit: false,
          targetWidth: 1200,
          targetHeight: 1200,
          correctOrientation: true
        });
    };
    
  })


  .directive('timeGradientBackground', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        
        var bg1 = $(elem).find('.background.bg1');
        var bg2 = $(elem).find('.background.bg2');

        function setGradient() {
          var H = moment().hour();
          var base = Math.ceil((H/24) * 3);
          var next = base % 3 + 1;

          var now = moment(); // moment("2014-11-24T01:29:00");
          var base = moment(now).add(-(now.minute() % 30), 'minute');

          bg1.attr('class', 'background bg1 t' + base.format("HHmm"));
          bg2.attr('class', 'background bg2 t' + base.add(30, 'minute').format("HHmm"));

          var d = 1 - (moment().minute() % 30) / 30;
          bg2.css('opacity', d);
        }

        setInterval(setGradient, 5000);
        setGradient();
        
      }
    };
  })


;
