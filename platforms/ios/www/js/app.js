angular.module('app', ['ionic', 'ng-mfb', 'ngCordova', 'ngTouch', 'templates'])

    .run(function(Locale, PushService, $rootScope) {

        Locale.init();
        moment.locale(Locale.language());
        $rootScope.lang = Locale.language();
        
        ionic.Platform.ready(function(){
            $("body").removeClass("cloak");
            PushService.init();
        });    
    })
;

angular.module('app')
  .constant('Config', {
    baseUrl: 'http://raduga.miraclethings.nl',
    parseAppId: 'GgrCs3g29qpsqUdcO5hoieEtdtKzonD5p93bxn37',
    parseClientKey: 'PFLpIMgyjC0TjjrBmtV1wY3tPVXKCqDnNUaBW4th',
    instagramClientKey: '277a7d07d55849fab5abc0f2a91606ae',
    debug: true,
    userId: 'desktop'
  })
;

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

  .controller('PhotosCtrl', function PhotosCtrl($scope, $rootScope, $timeout, $ionicPopup, $ionicLoading, $ionicActionSheet, API, Config) {

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
        title: 'Remove image',
        template: 'Are you sure you want to remove this image from your stream?'
      }).then(function(res) {
        if (res) remove(p);
      });
    };

    $scope.flag = function(p) {
      var buttons = [{text: 'Graphic content'}, {text: 'Copyright violation'}, {text: 'Not relevant to this app'}];
      $ionicActionSheet.show({
        buttons: buttons,
        titleText: 'Flag photo because:',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          $ionicLoading.show();
          API.flagPhoto(p.id, buttons[index].text).then(function(r) {
            $ionicLoading.hide();
            console.log('ja', r);
            remove(p);
            $ionicPopup.alert({
              title: 'Thanks',
              template: 'The photo has been reported and removed from your stream.'
            });
          });
          return true;
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
                          $ionicPopup.alert({title: "Error", template: "An error has occurred: Code = " + error.code});
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
          $ionicLoading.hide();
          $ionicPopup.alert({title: "GPS issue", template: "Cannot access you current GPS position - please check that your location settings enabled."});
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

angular.module('app')

  .factory('PushService', function PushService(API, Config, Locale, $rootScope, GetCitiesNearGeoLocation) {

    return {
      init: function() {

        $rootScope.closestCity = false;

        if (!('parsePlugin' in window)) {
          console.log("Skipping push, no plugin");
          return;
        }

        var postFix = '-' + Locale.language();

        parsePlugin.initialize(Config.parseAppId, Config.parseClientKey, function() {
          console.log("Parse initialized");

          parsePlugin.getInstallationId(function(userId) {
            console.log("Installation ID: " + userId);
            Config.userId = userId;

            if (Config.debug) {
              parsePlugin.subscribe('debug', function() {});
            }
            
            parsePlugin.getSubscriptions(function(subscriptions) {
              if (typeof subscriptions == 'string') {
                subscriptions = subscriptions.substr(1,subscriptions.length-2).split(", ");
              }
              if (subscriptions === null) {
                subscriptions = [];
              }

              console.log("Subscriptions: " + JSON.stringify(subscriptions));

              for (var i=0; i<subscriptions.length; i++) {
                if (subscriptions[i] == 'debug' || subscriptions[i].length == 0) continue;
                console.log("Unsubscribe: '" + subscriptions[i] + "'");
                parsePlugin.subscribe(subscriptions[i], function() {});
              }

              GetCitiesNearGeoLocation().then(function(cities) {
                var subs = [];
                for (var i=0; i<cities.length; i++) {
                  var id = cities[i].id+postFix;
                  subs.push(id);
                  parsePlugin.subscribe(id, function() {
                  });
                }
              });
              
            });

            
          }, function(e) {
            alert('error');
          });

          
        });
      }
    };
  })
;

angular.module('app')
  .service('API', function API($http, Config) {

    var photoBlacklist = (window.localStorage.photoBlacklist || "").split(/,/);
    if (photoBlacklist[0] == "") photoBlacklist = [];

    var jsonGetter = function(path) {
      return function(args) {
        var qs = args ? "?" + $.param(args) : "";
        return $http.get(Config.baseUrl + path + qs).then(function(r) {
          return r.data;
        });
      };
    };
    
    return {
      getRainbowCities: jsonGetter('/app/rainbow-cities'),
      getClosestCities: jsonGetter('/app/closest-cities'),
      getCloudsURL: function() {
        return Config.baseUrl + "/latest/clouds.png";
      },
      updateUser: function(userId, data) {
        return $http.post(Config.baseUrl + '/app/user/' + userId, data);
      },
      getRainbowPhotos: jsonGetter('/app/photos'),

      removePhoto: function(id) {
        photoBlacklist.push(id);
        window.localStorage.photoBlacklist = photoBlacklist.join(",");

      },
      isBlacklisted: function(id) {
        return $.inArray(id, photoBlacklist) >= 0;
      },
      photoUrl: function(p, w) {
        w = w || 400;
        return Config.baseUrl + '/photos/' + p.variants[w+''];
      },
      flagPhoto: function(photoId, reason) {
        return $http.post(Config.baseUrl + '/app/report/' + photoId, {reason: reason});
      }
    };
  })

  .service('GetCitiesNearGeoLocation', function GetCityNearGeoLocation(API, Locale, Config, $rootScope, $q) {
    return function() {

      var d = $q.defer();
      
      // get the position
      navigator.geolocation.getCurrentPosition(function(position) {

        API.getClosestCities({lat: position.coords.latitude, lon: position.coords.longitude, limit: 1}).then(
          function(r) {
            if (r.cities.length > 0) {
              $rootScope.closestCity = r.cities[0];
            } else {
              $rootScope.closestCity = false;
            }

            console.log('cities: ' + JSON.stringify(r.cities));

            // update user account on startup
            API.updateUser(Config.userId, {closest: $rootScope.closestCity, language: Locale.language()});
            d.resolve(r.cities);
          },
          function(e) {
            console.log('error...' + JSON.stringify(e));
          }
        );
      });

      return d.promise;
    };
  })

  .filter('photoUrl', function(API) {
    return function(p, w) {
      return API.photoUrl(p, w);
    };
  })

  .factory('PhotoMetaCity', function(Locale) {
    return function(p) {
      var ts = '';
      if (p.meta) {
        try {
          var meta = JSON.parse(p.meta);
          var k = 'name_' + Locale.language();
          if (k in meta) {
            ts += " " + meta[k];
          } else if (meta.geocode) {
            for (var i=0; i<meta.geocode.address_components.length; i++) {
              var a = meta.geocode.address_components[i];
              if (a.types[0] == 'locality') {
                ts += " " + a.long_name;
                break;
              }
            }
          } else if (meta.name_en) {
            ts += " " + meta.name_en;
          }
        } catch (e) {
        };
      }
      return ts;
    };
  })

  .filter('photoMeta', function(Config, Locale, PhotoMetaCity) {
    return function(p) {
      var ts = moment(p.created).format('DD-MM-YYYY HH:mm');
      ts += PhotoMetaCity(p);
      return ts;
    };
  })

  .service('Locale', function() {
    // navigator.globalization ? navigator.globalization.getPreferredLanguage().substr(0,2) : 
    var lang = navigator.language.substr(0,2);
    lang = lang != 'ru' ? 'en' : 'ru';

    return {
      init: function() {
      },
      language: function() {
        //return 'ru';
        return lang;
      }
    };
  })

  .filter('i18n', function(Locale) {
    var strings = {
      en: {
        'rainbow_spotted_pre': 'Last spotted rainbow:',
        'rainbow_spotted_near': ' ',
        'rainbow_predicted_near': 'Rainbows predicted near',
        'no_rainbow_alerts': 'No rainbow alerts at the moment.',
        'you_are_near': 'You are near:',
        'you_are_too_far': 'You are too far from a Russian city to receive rainbow notifications.'
      },
      ru: {
        'rainbow_spotted_pre': 'Последняя обнаруженная радуга:',
        'rainbow_spotted_near': 'в',

        'rainbow_predicted_near': 'Радуги предсказаны вблизи',
        'no_rainbow_alerts': 'Нет радуги оповещения на данный момент.',
        'you_are_near': 'Вы рядом с:',
        'you_are_too_far': 'Вы находитесь слишком далеко от города, чтобы получать уведомления радуги.'
      }
    };

    return function(str) {
      return strings[Locale.language()][str] || ("undefined string: " + str);;
    };
  })

  .filter('cityName', function(Locale) {
    return function(c) {
      if (!c) return null;
      var k = 'name_' + Locale.language();
      return c[k];
    };
  })

;

angular.module('app')
  .directive('globe', function globe(API) {

    function fallback($elem, scope) {
      $elem.toggleClass('fallback', true);
      $elem.append("<div class='earth'>");
      var clouds = $("<div class='clouds'>").appendTo($elem);
      function refresh () {
        clouds.css({background: 'url(' + API.getCloudsURL() + ')'});
      }

      refresh();
      scope.$on('refresh', refresh);
    }
    
    return {
      restrict: 'E',
      template: '<div class="globe"></div>',
      replace: true,
      link: function(scope, elem) {

        $(elem).css('height', $(elem).width());

        var t = Math.floor(($(window).height() - $(elem).width())/2);
        $(elem).css({marginTop: t + 'px'});
        
        var width = $(elem).width();
        var height = $(elem).height();
        
        if (!Detector.webgl) {
          fallback($(elem), scope);
          return;
        }

        THREE.ImageUtils.crossOrigin = 'anonymous';

	    // Earth params
	    var radius   = 0.5,
		    segments = 48,
		    rotation = 6;  

	    var scene = new THREE.Scene();

	    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000);
	    camera.position.z = 1.6;

	    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            var r = window.devicePixelRatio;
	    renderer.setSize(r*width, r*height);
            renderer.domElement.style.width = width + 'px';
            renderer.domElement.style.height = height + 'px';

	    scene.add(new THREE.AmbientLight(0x222222));

            var sphere = createSphere(radius, segments);
	    sphere.rotation.y = rotation; 
	    scene.add(sphere);

	    var light = new THREE.DirectionalLight(0xffffff, 1);
	    light.position.set(-5,2,2);
	    camera.add(light);

        scene.add(camera);

        var clouds = createClouds(radius, segments);
	    clouds.rotation.y = rotation;
	    scene.add(clouds);
        
	    var controls = new THREE.TrackballControls(camera, elem[0]);
        controls.noZoom = true;
        controls.noPan = true;

	    elem[0].appendChild(renderer.domElement);
	    render();

	    function render() {
	      controls.update();
	      sphere.rotation.y += 0.0015;
	      clouds.rotation.y += 0.0015;		
	      requestAnimationFrame(render);
	      renderer.render(scene, camera);
	    }

	    function createSphere(radius, segments) {
	      return new THREE.Mesh(
		    new THREE.SphereGeometry(radius, segments, segments),
		    new THREE.MeshPhongMaterial({
		      map:         THREE.ImageUtils.loadTexture('images/earth.jpg'),
		      bumpMap:     THREE.ImageUtils.loadTexture('images/bump.jpg'),
		      bumpScale:   0.005
		      //specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
		      //specular:    new THREE.Color('grey')								
		    })
	      );
	    }

	    function createClouds(radius, segments) {
          var clouds = THREE.ImageUtils.loadTexture(API.getCloudsURL());
          clouds.minFilter = THREE.NearestFilter;
	      return new THREE.Mesh(
		    new THREE.SphereGeometry(radius + 0.003, segments, segments),			
		    new THREE.MeshPhongMaterial({
		      map:         clouds,
		      transparent: true,
              specular: 0xcccccc,
              shininess: 5
              
		    })
	      );		
	    }
      }
    };
  })

;

