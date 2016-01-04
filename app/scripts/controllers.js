angular.module('app')

  .controller('GlobeCtrl', function GlobeCtrl($scope, API, $ionicSlideBoxDelegate, Locale, $rootScope, PhotoMetaCity) {

    $scope.cities = [];
    function refresh() {
      API.getRainbowCities().then(function(l) {
        $scope.cities = l.cities;
        var city = '';
        try { city = JSON.parse(l.last_photo.meta).name_en; } catch (e) {}

        $scope.last_photo = {
          city: PhotoMetaCity(l.last_photo),
          date: moment(l.last_photo.created).format('DD-MM-YYYY HH:mm')
        };
      });
    }
    refresh();

    $rootScope.$on('refresh', refresh);
    
    $scope.$on('tracking', function(_sender, down) {
      $ionicSlideBoxDelegate.enableSlide(!down);
    });

  })

  .controller('PhotosCtrl', function PhotosCtrl($scope, $rootScope, $timeout, $ionicPopup, $ionicLoading, API, Config) {

    $scope.doRefresh = function() {
      $ionicLoading.show();
      API.getRainbowPhotos().then(function(p) {
        $scope.photos = _.filter(p.photos, function(p) { return !API.isBlacklisted(p.id); });
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      });        
      $rootScope.$broadcast('refresh');
    };

    $scope.doRefresh();

    $scope.share = function(photo) {
      window.plugins.socialsharing.share(null, null, API.photoUrl(photo), null);
    };

    $scope.remove = function(p) {
      $ionicPopup.confirm({
        title: 'Remove image',
        template: 'Are you sure you want to remove this image from your stream?'
      }).then(function(res) {
        if (res) {
          API.removePhoto(p.id);
          $scope.photos = _.filter($scope.photos, function(p) { return !API.isBlacklisted(p.id); });
        }
      });
    };

    $scope.takePicture = function() {

      $ionicLoading.show();

      navigator.geolocation.getCurrentPosition(
        function(position) {
          
          navigator.camera.getPicture(
            function ok(fileURL) {
              console.log('Got picture: ' + fileURL);

              var options = new FileUploadOptions();
              options.fileKey = "file";
              options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
              options.mimeType = "text/plain";

              var meta = $rootScope.closestCity ? $.extend({}, $rootScope.closestCity) : {};
              meta.lat = position.coords.latitude;
              meta.lng = position.coords.longitude;
              options.params = {meta: JSON.stringify(meta)};

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
        },
        function onError() {
          alert("Cannot retrieve current location - are your location settings enabled?");
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

          var isDark = H >= 7 && H < 17;
          elem.toggleClass('text-dark', isDark);
          elem.toggleClass('text-light', !isDark);
        }

        setInterval(setGradient, 5000);
        setGradient();
        
      }
    };
  })


;
