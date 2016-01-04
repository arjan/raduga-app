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
        $templateCache.put('app/templates/about_en.html', '<div time-gradient-background>\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n    \n    <ion-content>\n\n        <div class=\"container\">\n            <h1>About this app:</h1>\n\n            <p>Raduga uses live weather data to predict the formation of rainbows, and sends you an alert when rainbows are likely to appear in your neighbourhood.</p>\n            <p>Introduced in 2013, as a reaction to the ban on displaying the rainbow in public space in Russia, Raduga enables the masses to spot and capture rainbows everywhere.</p>\n            <p>You can upload and share your own rainbows, to show that rainbows are here to stay.</p>\n\n            <h2>How to spot a rainbow:</h2>\n            <p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round, in order to refract the light so that a rainbow appears.</p>\n            <p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>\n\n            <h2>Photo upload notice</h2>\n            <p>All photos taken using this app will be freely available for other users to share and publish.</p>\n\n            <p>\n                <br/><br/>\n                © Pink Pony Express\n            </p>\n\n            <p>\n                <br/>\n                Raduga is made possible with support from Creative Industries Fund NL, Wilhelmina E. jansen Fund, and hundreds of donations from rainbow fans all over the world.\n            </p>\n            <br/><br/>\n            \n        </div>\n        \n    </ion-content>\n</div>\n');
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
        $templateCache.put('app/templates/about_ru.html', '<div time-gradient-background>\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n\n    <ion-content>\n\n        <div class=\"container\">\n            <h1>Об этом приложении:</h1>\n\n            <p>\n                “Радуга” использует текущую метеоинформацию, чтобы предсказать возможное образование радуг, и присылает вам уведомление, когда, по счастливому случаю, радуга оказывается рядом с Вами.\n            </p>\n            \n            <p>\n                Проект “Радуга” возник в 2013 году как реакция на запрет изображения радуги в публичных местах (je kunt ook zeggen в публичном простпанстве) в России.\n            </p>\n\n            <p>\n                “Радуга” дает возможность широким массам определять, отслеживать и фиксировать появление радуг где бы то ни было.\n            </p>\n\n            <p>\n                <br/>\n                Загружайте и делитесь Вашими наблюдениями, чтобы показать, что радуги никуда не делись.\n            </p>\n            \n            <h2>Как увидеть радугу:</h2>\n\n            <p>Чтобы увидеть радугу повернитесь спиной к солнцу, по направлению к дождю. Для образования радуги, капли дождя должны быть толстыми и круглыми, так они смогут преломить свет.</p>\n\n            <p>Солнце должно быть низко над горизонтом. Именно поэтому, в большинстве случаев, радугу удается увидеть утром или ранним вечером.</p>\n\n            <h2>Сообщение о загрузке фотографий</h2>\n            <p>Все фотографии, снятые с использованием данного приложения, будут находиться в свободном доступе для других пользователей, чтобы они могли поделиться ими или их опубликовать.</p>\n\n            <p>\n                <br/><br/>\n                © Пинк Пони Экспресс\n            </p>\n\n\n            <p>\n                <br/><br/>\n                Мы смогли воплотить Радугу в жизнь, благодаря поддержке Фонда Творческих Индустрий Нидерландов ,Фонда Вильгельмины Янсен и сотням донаций фанатов радуги со всего света. \n            </p>\n            <br/><br/>\n            \n        </div>\n        \n    </ion-content>\n</div>\n');
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
