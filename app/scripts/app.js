angular.module('app', ['ionic', 'ngTouch', 'templates'])

  .run(function() {
    console.log('hi');

    ionic.Platform.ready(function(){
      console.log('ready');

      $("body").removeClass("cloak");
    });    
  })
;
