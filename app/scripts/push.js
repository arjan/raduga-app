angular.module('app')

  .factory('PushService', function PushService(API, $rootScope) {

    return {
      init: function() {

        $rootScope.closestCity = false;

        if (!('parsePlugin' in window)) {
          console.log("Skipping push, no plugin");
          return;
        }
        
        var appId = 'GgrCs3g29qpsqUdcO5hoieEtdtKzonD5p93bxn37';
        var clientKey = 'PFLpIMgyjC0TjjrBmtV1wY3tPVXKCqDnNUaBW4th';

        parsePlugin.initialize(appId, clientKey, function() {
          console.log("Parse initialized");

          parsePlugin.getInstallationId(function(id) {
            console.log("Installation ID: " + id);

            parsePlugin.getSubscriptions(function(subscriptions) {
              subscriptions = subscriptions.substr(1,subscriptions.length-2).split(", ");
              console.log("Subscriptions: " + JSON.stringify(subscriptions));

              for (var i=0; i<subscriptions.length; i++) {
                console.log("Unsubscribe: '" + subscriptions[i] + "'");
                parsePlugin.subscribe(subscriptions[i], function() {});
              }

              // get the position
              navigator.geolocation.getCurrentPosition(function(position) {

                API.getClosestCities({lat: position.coords.latitude, lon: position.coords.longitude, limit: 1}).then(function(r) {
                  if (r.cities.length == 0) {
                    $rootScope.closestCity = false;
                    return;
                  }
                    
                  $rootScope.closestCity = r.cities[0];

                  for (var i=0; i<r.cities.length; i++) {
                    var id = r.cities[i].id;
                    parsePlugin.subscribe(id, function() {
                    });
                  }
                });
                
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
