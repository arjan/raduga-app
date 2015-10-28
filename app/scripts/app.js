angular.module('app', ['ionic', 'ngCordova', 'ngTouch', 'templates'])

  .run(function(PushService) {

    ionic.Platform.ready(function(){
      $("body").removeClass("cloak");

      PushService.init();
    });    
  })
;
