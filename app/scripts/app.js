angular.module('app', ['ionic', 'ngTouch', 'templates'])

  .run(function(PushService) {

    ionic.Platform.ready(function(){
      $("body").removeClass("cloak");

      PushService.init();
    });    
  })
;
