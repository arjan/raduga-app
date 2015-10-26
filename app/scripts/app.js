angular.module('app', ['ionic'])

  .run(function() {
    console.log('hi');

    ionic.Platform.ready(function(){
      console.log('ready');

    });    
  })
;
