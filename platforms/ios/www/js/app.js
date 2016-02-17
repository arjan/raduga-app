angular.module('app', ['ionic', 'ng-mfb', 'ngCordova', 'ngTouch', 'templates'])

    .run(function(Locale, PushService, $rootScope, checkNetworkState, Dialogs) {

        Locale.init();
        moment.locale(Locale.language());
        $rootScope.lang = Locale.language();
        
        ionic.Platform.ready(function(){
            $("body").removeClass("cloak");

            PushService.init();

            checkNetworkState().then(function(){}, function(error) {
                Dialogs.showNoInternetDialog();
            });
        });

        // System events
        document.addEventListener("resume", function resume() {
            var div = document.getElementsByTagName('body')[0];
            var scope = angular.element(div).scope();
            var rootScope = scope.$root;
            rootScope.$apply(function() {
                console.log('resume!');
                checkNetworkState(true); // reset
                rootScope.$broadcast('onResumeCordova');
            });
        }, false);

    })
;

angular.module('app')
  .constant('Config', {
    baseUrl: 'http://raduga.miraclethings.nl',
    parseAppId: 'GgrCs3g29qpsqUdcO5hoieEtdtKzonD5p93bxn37',
    parseClientKey: 'PFLpIMgyjC0TjjrBmtV1wY3tPVXKCqDnNUaBW4th',
    instagramClientKey: '277a7d07d55849fab5abc0f2a91606ae',
    debug: false,
    userId: 'desktop'
  })
;

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
              $scope.takePicture();
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
            parsePlugin.subscribe('everybody', function() {});
            
            parsePlugin.getSubscriptions(function(subscriptions) {
              if (typeof subscriptions == 'string') {
                subscriptions = subscriptions.substr(1,subscriptions.length-2).split(", ");
              }
              if (subscriptions === null) {
                subscriptions = [];
              }

              console.log("Subscriptions: " + JSON.stringify(subscriptions));

              for (var i=0; i<subscriptions.length; i++) {
                if (subscriptions[i] == 'debug' || subscriptions[i] == 'everybody' || subscriptions[i].length == 0) continue;
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

    .factory('translate', function(Locale) {
        var strings = {
            en: {
                'rainbow_spotted_pre': 'Last spotted rainbow:',
                'rainbow_spotted_near': ' ',
                'rainbow_predicted_near': 'Rainbows predicted near',
                'no_rainbow_alerts': 'No rainbow alerts at the moment.',
                'you_are_near': 'You are near:',
                'you_are_too_far': 'You are too far from a Russian city to receive rainbow notifications.',

                'error': 'Error',
                'ok': 'OK',
                'settings': 'Settings',
                'no_internet_dialog': 'Raduga requires an internet connection',
                'gps_dialog': 'Switch on gps to use the camera',
                'cannot_use': 'Cannot use Raduga, no internet connection available.',

                'flag_heading': 'Flag photo because:',
                'flag_1': 'Copyright violation',
                'flag_2': 'Objectionable content',
                'cancel': 'Cancel',
                'thanks': 'Thank you for reporting. Our moderators have been notified.',

                'remove_image': 'Are you sure you want to remove this image from your stream?'
            },
            ru: {
                'rainbow_spotted_pre': 'Последняя обнаруженная радуга:',
                'rainbow_spotted_near': '',

                'rainbow_predicted_near': 'Радуги предсказаны вблизи',
                'no_rainbow_alerts': 'Нет радуги оповещения на данный момент.',
                'you_are_near': 'Вы рядом с:',
                'you_are_too_far': 'Вы находитесь слишком далеко от города, чтобы получать уведомления радуги.',

                'error': 'ошибка',
                'ok': 'ок',
                'settings': 'установки',
                'no_internet_dialog': 'Радуге требуется соединение с интернетом',
                'gps_dialog': 'Включите gps, чтобы пользоваться камерой',
                'cannot_use': 'Невозможно использовать Радугу. Невозможно соединение с интернетом',
                
                'flag_heading': 'Отметьте фотографию в связи с:',
                'flag_1': 'содержанием изображения',
                'flag_2': 'нарушением копирайт',
                'cancel': 'Отмена',
                'thanks': 'Спасибо',

                'remove_image': 'Вы действительно хотите удалить этот файл?'
            }
        };

        return function(str) {
            return strings[Locale.language()][str] || ("undefined string: " + str);;
        };
    })

    .filter('i18n', function(translate) {
        return translate;
    })

    .filter('cityName', function(Locale) {
        return function(c) {
            if (!c) return null;
            var k = 'name_' + Locale.language();
            return c[k];
        };
    })

    .factory('Dialogs', function($ionicPopup, translate) {
        return {
            showNoInternetDialog: function() {
                $ionicPopup.show({
                    title: translate('error'),
                    template: translate('no_internet_dialog'),
                    buttons: [
                        { text: translate('ok'), onTap: function() { }},
                        { text: translate('settings'), onTap: function() {
                            cordova.plugins.settings.openSetting('open');
                        }}
                    ]
                });
            },
            showGpsDialog: function() {
                $ionicPopup.show({
                    title: translate('error'),
                    template: translate('gps_dialog'),
                    buttons: [
                        { text: translate('ok'), onTap: function() { }},
                        { text: translate('settings'), onTap: function() {
                            cordova.plugins.settings.openSetting('open');
                        }}
                    ]
                });
            },
            showPhotoError: function(error) {
                $ionicPopup.alert({title: translate('error'),
                                   template: translate('cannot_use')});
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }                
        }
    })

    .factory('checkNetworkState', function(API, $q, $rootScope) {
        var online = null;
        return function(reset) {
            if (!navigator.connection) return $q.when(true);

            if (reset) {
                online = null;
            }
            
            if (online !== null) {
                $rootScope.$broadcast('online', online);
                return online ? $q.when(true) : $q.reject();
            }
            
            var networkState = navigator.connection.type;
            if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                online = false;
                $rootScope.$broadcast('online', online);
                return $q.reject();
            } else {
                // do online check
                return API.getRainbowCities().then(function() {
                    online = true;
                    $rootScope.$broadcast('online', online);
                }, function() {
                    online = false;
                    $rootScope.$broadcast('online', online);
                });
            }
        }
    })

;

angular.module('app')
  .directive('globe', function globe(API, $rootScope) {

    function fallback($elem, scope) {
      $elem.toggleClass('fallback', true);
      var earth = $("<div class='earth'>").appendTo($elem);
      var clouds = $("<div class='clouds'>").appendTo($elem);

      var earthWidth= 2 * earth.height();

      function lngToPx(lng) {
        lng = -lng;
        while (lng < 0) lng += 360;
        while (lng > 360) lng -= 360;
        var px = (lng / 360) * earthWidth + earthWidth/4;
        return Math.ceil(px)+'px';
      }

      var lastPos;
      function setPos(c) {
        if (!c) return;
        lastPos = c;
        earth.css({backgroundPositionX: lngToPx(c.longitude)});
        clouds.css({backgroundPositionX: lngToPx(c.longitude)});
      }
      navigator.geolocation.getCurrentPosition(function(position) {
        setPos(position.coords);
      });
      $rootScope.$on('geo', function(_, c) { setPos(c); });

      setPos({longitude: 5});

      $elem.on('touchend', function() {
        lastPos.longitude += 180;
        setPos({latitude: 0, longitude: lastPos.longitude});
      });
      
      function refresh () {
        clouds.css({backgroundImage: 'url(' + API.getCloudsURL() + ')'});
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

