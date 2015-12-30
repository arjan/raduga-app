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
        $templateCache.put('app/templates/about_en.html', '<div>\n    <ion-content time-gradient-background>\n        <div class=\"background bg1\"></div>\n        <div class=\"background bg2\"></div>\n\n        <div class=\"container\">\n            <h1>About this app</h1>\n\n            <p>Raduga uses live weather data to predict the formation of rainbows, and sends you an alert when rainbows are likely to appear in your neighbourhood.</p>\n            <p>Introduced in 2013, as a reaction to the ban on displaying the rainbow in public space in Russia, Raduga enables the masses to spot and capture rainbows everywhere.</p>\n            <p>You can upload and share your own rainbows, to show that rainbows are here to stay.</p>\n\n            <h2>How to spot a rainbow:</h2>\n            <p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round, in order to refract the light so that a rainbow appears.</p>\n            <p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>\n\n            <h2>Photo upload notice</h2>\n            <p>All photos taken using this app will be freely available for other users to share and publish.</p>\n\n            <p>\n                <br/><br/>\n                © Pink Pony Express\n            </p>\n        </div>\n        \n    </ion-content>\n</div>\n');
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
        $templateCache.put('app/templates/about_ru.html', '<div>\n    <ion-content time-gradient-background>\n        <div class=\"background bg1\"></div>\n        <div class=\"background bg2\"></div>\n\n        <div class=\"container\">\n            <h1>About this app</h1>\n\n            <p>\n                Радуга использует текущие данные о погоде предсказать образование радуги , и посылает вам уведомление, когда радуги , скорее всего, появится в вашем районе.\n            </p>\n            \n            <p>\n                Введенный в 2013 году, в качестве реакции на запрет на отображение радугу в публичном пространстве в России , Радуга позволяет массы обнаружить и захватить радуги везде.\n            </p>\n\n            <p>Вы можете загрузить и поделиться своим собственным радуги , чтобы показать, что радуги здесь, чтобы остаться.</p>\n            \n            <h2>How to spot a rainbow:</h2>\n            <p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round, in order to refract the light so that a rainbow appears.</p>\n            <p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>\n\n            <h2>Photo upload notice</h2>\n            <p>All photos taken using this app will be freely available for other users to share and publish.</p>\n\n            <p>\n                <br/><br/>\n                © Pink Pony Express\n            </p>\n        </div>\n        \n    </ion-content>\n</div>\n');
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
        $templateCache.put('app/templates/globe.html', '<div ng-controller=\"GlobeCtrl\" time-gradient-background>\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n    <div class=\"container\">\n        <globe></globe>\n\n        <div class=\"last-photo\">\n            <div ng-show=\"last_photo\" class=\"cityitem\">\n                <span>{{ \'rainbow_spotted_pre\'|i18n }}</span>\n                <span>{{last_photo.date}}</span>\n                <span>{{ \'rainbow_spotted_near\'|i18n }}</span>\n                <span>{{last_photo.city}}</span>\n            </div>\n        </div>\n        \n        <div class=\"cities\">\n            <div ng-show=\"cities.length > 0\" class=\"cityitem\">\n                <span>{{ \'rainbow_predicted_near\'|i18n }}</span>\n                <span ng-repeat=\"c in cities\">{{ c|cityName }}{{$last ? \'\' : \', \'}}</span>\n            </div>\n        </div>\n\n        \n    </div>\n</div>\n');
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
        $templateCache.put('app/templates/photos.html', '<div ng-controller=\"PhotosCtrl\">\n    <ion-content class=\"photo-scroll\">\n\n        <ion-refresher\n            pulling-text=\"Pull to refresh...\"\n            on-refresh=\"doRefresh()\">\n        </ion-refresher>\n\n        <ion-list>\n            <div ng-repeat=\"photo in photos\" class=\"photo\">\n                <img ng-src=\"{{ photo|photoUrl }}\" />\n                <div class=\"meta\">\n                    {{ photo|photoMeta }}\n                </div>\n                <div class=\"share\">\n                    <i class=\"icon ion-trash-a\" ng-click=\"remove(photo)\"></i>\n                    <i class=\"icon ion-share\" ng-click=\"share(photo)\"></i>\n                </div>\n            </div>\n        </ion-list>\n\n    </ion-content>\n    \n    <button mfb-button icon=\"ion-camera\" ng-click=\"takePicture()\"></button>\n\n</div>\n');
    }]);
})();
