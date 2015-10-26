angular.module('app', ['ionic', 'ngTouch', 'templates'])

  .run(function() {

    ionic.Platform.ready(function(){
      $("body").removeClass("cloak");
    });    
  })
;
