angular.module('app')

  .controller('GlobeCtrl', function GlobeCtrl($scope, API, $ionicSlideBoxDelegate, Locale, $rootScope, PhotoMetaCity, checkNetworkState) {

    $scope.online = true;
    $rootScope.$on('online', function(_, o) {
      $scope.online = o;
    });

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

  .controller('PhotosCtrl', function PhotosCtrl($scope, $rootScope, $timeout, $ionicPopup, $ionicLoading, $ionicActionSheet, $ionicModal,
                                                API, Config, Dialogs, translate) {

    $rootScope.$on('online', function(_, o) {
      $scope.online = o;
    });
    
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

    function remove(photo) {
      API.removePhoto(photo.id);
      $scope.photos = _.filter($scope.photos, function(photo) { return !API.isBlacklisted(photo.id); });
    }

    $scope.remove = function(p) {
      $ionicPopup.confirm({
        template: translate('remove_image')
      }).then(function(res) {
        if (res) remove(p);
      });
    };

    $scope.flag = function(p) {
      var buttons = [{text: translate('flag_1')}, {text: translate('flag_2')}];
      $ionicActionSheet.show({
        buttons: buttons,
        titleText: translate('flag_heading'),
        cancelText: translate('cancel'),
        buttonClicked: function(index) {
          $ionicLoading.show();
          API.flagPhoto(p.id, buttons[index].text).then(function(r) {
            $ionicLoading.hide();
            remove(p);
            $ionicPopup.alert({
              title: translate('thanks')
            });
          });
          return true;
        }
      });
    };

    $scope.takePicture = function() {

      if (!localStorage.termsAccepted) {
        $ionicModal.fromTemplateUrl("app/templates/terms.html", {
          animation: 'slide-in-up',
          scope: $scope
        }).then(function(m) {
          $scope.agree = function() {
            localStorage.termsAccepted = 'yes';
            m.remove();
          };
          $scope.disagree = function() {
            m.remove();
          };
          m.show();
        });
        return;
      }

      if (!$scope.online) {
        Dialogs.showNoInternetDialog();
        return;
      }
      
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
                          $scope.$apply(function() {
                            Dialogs.showPhotoError(error);
                            $ionicLoading.hide();
                          });
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
          $ionicLoading.hide();
          Dialogs.showGpsDialog();
        },
        {
          timeout: 5000
        }
      );
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
          // bg2.attr('class', 'background bg2 t' + base.add(30, 'minute').format("HHmm"));

          // var d = (moment().minute() % 30) / 30;
          // bg2.css('opacity', d);

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
