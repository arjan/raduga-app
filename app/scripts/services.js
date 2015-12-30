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
