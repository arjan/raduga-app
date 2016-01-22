angular.module('app', ['ionic', 'ng-mfb', 'ngCordova', 'ngTouch', 'templates'])

    .run(function(Locale, PushService, $rootScope, checkNetworkState, Dialogs) {

        Locale.init();
        moment.locale(Locale.language());
        $rootScope.lang = Locale.language();
        
        ionic.Platform.ready(function(){
            $("body").removeClass("cloak");

            PushService.init();

            checkNetworkState().then(function(){}, function(error) {
                Dialogs.showNoInternetDialog();
            });
        });

        // System events
        document.addEventListener("resume", function resume() {
            var div = document.getElementsByTagName('body')[0];
            var scope = angular.element(div).scope();
            var rootScope = scope.$root;
            rootScope.$apply(function() {
                console.log('resume!');
                checkNetworkState(true); // reset
                rootScope.$broadcast('onResumeCordova');
            });
        }, false);

    })
;
