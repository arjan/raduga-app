angular.module('app', ['ionic', 'ng-mfb', 'ngCordova', 'ngTouch', 'templates'])

    .run(function(Locale, PushService, $rootScope) {

        Locale.init();
        moment.locale(Locale.language());
        $rootScope.lang = Locale.language();
        
        ionic.Platform.ready(function(){
            $("body").removeClass("cloak");
            PushService.init();
        });    
    })
;
