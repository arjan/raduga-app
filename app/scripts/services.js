angular.module('app')
  .service('API', function API($http, Config) {

    var jsonGetter = function(path) {
      return function(args) {
        var qs = args ? "?" + $.param(args) : "";
        return $http.get(Config.baseUrl + path + qs).then(function(r) {
          return r.data;
        });
      };
    };
    
    return {
      getRainbowCities: jsonGetter('/rainbow-cities'),
      getClosestCities: jsonGetter('/closest-cities'),
      getCloudsURL: function() {
        return Config.baseUrl.replace('/app', '/latest/clouds.png');
      },
      updateUser: function(userId, data) {
        return $http.post(Config.baseUrl + '/user/' + userId, data);
      }
    };
  })
;
