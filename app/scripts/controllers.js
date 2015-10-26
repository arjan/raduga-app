angular.module('app')
  .controller('GlobeCtrl', function GlobeCtrl(API) {

    API.getRainbowCities().then(function(l) {
      console.log('x',l);
    });

  })
;
