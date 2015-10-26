angular.module('app')
  .service('API', function API($http) {

    var baseUrl = 'http://raduga.miraclethings.nl/app';

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
      getCloudsURL: function() {
        return baseUrl.replace('/app', '/latest/clouds.png');
      }
    };
  })
;
