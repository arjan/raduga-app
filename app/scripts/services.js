angular.module('app')
  .service('API', function API($http) {

    var baseUrl = 'http://raduga.miraclethings.nl/app';

    var userId = 

    var jsonGetter = function(path) {
      return function(args) {
        var qs = args ? "?" + $.param(args) : "";
        return $http.get(baseUrl + path + qs).then(function(r) {
          return r.data;
        });
      };
    };
    
    return {
      getRainbowCities: jsonGetter('/rainbow-cities'),
      getClosestCities: jsonGetter('/closest-cities'),
      getCloudsURL: function() {
        return baseUrl.replace('/app', '/latest/clouds.png');
      },
      updateUser: function(userId, data) {
        return $http.post(baseUrl + '/user/' + userId, data);
      }
    };
  })
;
