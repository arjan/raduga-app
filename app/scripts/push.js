angular.module('app')

  .factory('PushService', function PushService(API, Config, $rootScope) {

    return {
      init: function() {

        $rootScope.closestCity = false;

        if (!('parsePlugin' in window)) {
          console.log("Skipping push, no plugin");
          return;
        }
        
        parsePlugin.initialize(Config.parseAppId, Config.parseClientKey, function() {
          console.log("Parse initialized");

          parsePlugin.getInstallationId(function(userId) {
            console.log("Installation ID: " + userId);

            if (Config.debug) {
              parsePlugin.subscribe('debug', function() {});
            }
            
            parsePlugin.getSubscriptions(function(subscriptions) {
              subscriptions = subscriptions.substr(1,subscriptions.length-2).split(", ");
              console.log("Subscriptions: " + JSON.stringify(subscriptions));

              for (var i=0; i<subscriptions.length; i++) {
                if (subscriptions[i] == 'debug') continue;
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

                  var subs = [];
                  for (var i=0; i<r.cities.length; i++) {
                    var id = r.cities[i].id;
                    subs.push(id);
                    parsePlugin.subscribe(id, function() {
                    });
                  }

                  // update user account on startup
                  API.updateUser(userId, {closest: r.cities[0], subscriptions: subs});
                  
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
