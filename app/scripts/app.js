angular.module('app', ['ionic', 'ngCordova', 'ngTouch', 'templates'])

  .run(function(Locale, PushService) {

    ionic.Platform.ready(function(){
      $("body").removeClass("cloak");

      Locale.init();

      PushService.init();
    });    
  })
;
