angular.module('app', ['ionic', 'ng-mfb', 'ngCordova', 'ngTouch', 'templates'])

  .run(function(Locale, PushService) {

      console.log("Hello");
      
    ionic.Platform.ready(function(){
      $("body").removeClass("cloak");
        console.log("bla");
        
      Locale.init();

      PushService.init();
    });    
  })
;
