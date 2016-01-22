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
