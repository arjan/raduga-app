(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('templates');
    } catch (error) {
        // Or create a new one
        module = angular.module('templates', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('app/templates/about.html', '<div>\n    <h1>About this app</h1>\n</div>\n');
    }]);
})();
(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('templates');
    } catch (error) {
        // Or create a new one
        module = angular.module('templates', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('app/templates/globe.html', '<div ng-controller=\"GlobeCtrl\" time-gradient-background>\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n    <div class=\"container\">\n        <globe></globe>\n\n        <div class=\"cities\">\n            <div ng-show=\"cities.length > 0\" class=\"cityitem\">\n                <i class=\"icon ion-ios-rainy\"></i>\n\n                <span>{{ \'rainbow_spotted_near\'|i18n }}</span>\n\n                <span ng-repeat=\"c in cities\">{{ c|cityName }}{{$last ? \'\' : \', \'}}</span>\n            </div>\n\n            <div ng-show=\"!cities.length\" class=\"cityitem\">\n                <i class=\"icon ion-alert-circled\"></i>\n                <span>{{ \'no_rainbow_alerts\'|i18n }}</span>\n            </div>\n\n            <div ng-show=\"closestCity\" class=\"cityitem status\">\n                <i class=\"icon ion-ios-location\"></i>\n                <span>{{ \'you_are_near\'|i18n }} {{ closestCity|cityName }}</span>\n            </div>\n\n            <div ng-show=\"!closestCity\" class=\"cityitem status\">\n                <i class=\"icon ion-ios-location\"></i>\n                <span>{{ \'you_are_too_far\'|i18n }}</span>\n            </div>\n            \n        </div>\n\n    </div>\n</div>\n');
    }]);
})();
(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('templates');
    } catch (error) {
        // Or create a new one
        module = angular.module('templates', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('app/templates/photos.html', '<div ng-controller=\"PhotosCtrl\">\n    <ion-content class=\"photo-scroll\">\n\n        <ion-refresher\n            pulling-text=\"Pull to refresh...\"\n            on-refresh=\"doRefresh()\">\n        </ion-refresher>\n\n        <ion-list>\n            <div ng-repeat=\"photo in photos\" class=\"photo\">\n                <img ng-src=\"{{ photo|photoUrl }}\" />\n                <div class=\"meta\">\n                    {{ photo|photoMeta }}\n                </div>\n            </div>\n        </ion-list>\n\n    </ion-content>\n    \n    <button class=\"camera\" ng-click=\"takePicture()\"><i class=\"icon ion-camera\"></i></button>\n\n</div>\n');
    }]);
})();
