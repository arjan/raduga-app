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
        $templateCache.put('app/templates/about_en.html', '<div time-gradient-background class=\"about\">\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n    \n    <ion-content>\n\n        <div class=\"container\">\n            <h1>About this app:</h1>\n\n            <p>Raduga uses live weather data to predict the formation of rainbows, and sends you an alert when rainbows are likely to appear in your neighbourhood.</p>\n            <p>Introduced in 2013, as a reaction to the ban on displaying the rainbow in public space in Russia, Raduga enables the masses to spot and capture rainbows everywhere.</p>\n            <p>You can upload and share your own rainbows, to show that rainbows are here to stay.</p>\n\n            <h2>How to spot a rainbow:</h2>\n            <p>You can spot a rainbow when your back is facing the sun. In front of you, rain is falling. The droplets must be plump and round, in order to refract the light so that a rainbow appears.</p>\n            <p>The sun should be positioned low on the horizon. This is why most rainbows occur in the morning, and early evening.</p>\n\n            <h2>Photo upload notice</h2>\n            <p>All photos taken using this app will be freely available for other users to share and publish.</p>\n\n            <p>\n                <br/>\n                © Pink Pony Express\n            </p>\n\n            <p>\n                <br/>\n                Raduga is made possible with support from Creative Industries Fund NL, Wilhelmina E. Jansen Fund, and hundreds of donations from rainbow fans all over the world.\n            </p>\n            <br/><br/>\n            \n        </div>\n        \n    </ion-content>\n</div>\n');
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
        $templateCache.put('app/templates/about_ru.html', '<div time-gradient-background class=\"about\">\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n\n    <ion-content>\n\n        <div class=\"container\">\n            <h1>Об этом приложении:</h1>\n\n            <p>\n                “Радуга” использует текущую метеоинформацию, чтобы предсказать возможное образование радуг, и присылает вам уведомление, когда, по счастливому случаю, радуга оказывается рядом с Вами.\n            </p>\n            \n            <p>\n                Проект “Радуга” возник в 2013 году как реакция на запрет изображения радуги в публичных местах в России.\n            </p>\n\n            <p>\n                “Радуга” дает возможность широким массам определять, отслеживать и фиксировать появление радуг где бы то ни было.\n            </p>\n\n            <p>\n                <br/>\n                Загружайте и делитесь Вашими наблюдениями, чтобы показать, что радуги никуда не делись.\n            </p>\n            \n            <h2>Как увидеть радугу:</h2>\n\n            <p>Чтобы увидеть радугу повернитесь спиной к солнцу, по направлению к дождю. Для образования радуги, капли дождя должны быть толстыми и круглыми, так они смогут преломить свет.</p>\n\n            <p>Солнце должно быть низко над горизонтом. Именно поэтому, в большинстве случаев, радугу удается увидеть утром или ранним вечером.</p>\n\n            <h2>Сообщение о загрузке фотографий</h2>\n            <p>Все фотографии, снятые с использованием данного приложения, будут находиться в свободном доступе для других пользователей, чтобы они могли поделиться ими или их опубликовать.</p>\n\n            <p>\n                <br/>\n                © Пинк Пони Экспресс\n            </p>\n\n\n            <p>\n                <br/><br/>\n                Мы смогли воплотить Радугу в жизнь, благодаря поддержке Фонда Творческих Индустрий Нидерландов ,Фонда Вильгельмины Янсен и сотням донаций фанатов радуги со всего света. \n            </p>\n            <br/><br/>\n            \n        </div>\n        \n    </ion-content>\n</div>\n');
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
        $templateCache.put('app/templates/globe.html', '<div ng-controller=\"GlobeCtrl\" time-gradient-background class=\"globe\">\n    <div class=\"background bg1\"></div>\n    <div class=\"background bg2\"></div>\n    <div class=\"container\">\n        <div ng-show=\"online\">\n            <globe></globe>\n        </div>\n\n        <div class=\"center\" ng-show=\"!online\">{{ \'cannot_use\'|i18n }}</div>\n\n        <div class=\"last-photo\">\n            <div ng-show=\"last_photo\" class=\"cityitem\">\n                <span>{{ \'rainbow_spotted_pre\'|i18n }}</span>\n                <span>{{last_photo.date}}</span>\n                <span>{{ \'rainbow_spotted_near\'|i18n }}</span>\n                <span>{{last_photo.city}}</span>\n            </div>\n        </div>\n        \n        <div class=\"cities\">\n            <div ng-show=\"cities.length > 0\" class=\"cityitem\">\n                <span>{{ \'rainbow_predicted_near\'|i18n }}</span>\n                <span ng-repeat=\"c in cities\">{{ c|cityName }}{{$last ? \'\' : \', \'}}</span>\n            </div>\n        </div>\n\n        \n    </div>\n</div>\n');
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
        $templateCache.put('app/templates/photos.html', '<div ng-controller=\"PhotosCtrl\">\n    <ion-content class=\"photo-scroll\">\n\n        <ion-refresher\n            pulling-text=\"Pull to refresh...\"\n            on-refresh=\"doRefresh()\">\n        </ion-refresher>\n\n        <ion-list>\n            <div ng-repeat=\"photo in photos\" class=\"photo\">\n                <img ng-src=\"{{ photo|photoUrl }}\" />\n                <div class=\"meta\">\n                    {{ photo|photoMeta }}\n                </div>\n                <div class=\"share\">\n                    <i class=\"icon ion-trash-a\" ng-click=\"remove(photo)\"></i>\n                    <i class=\"icon ion-ios-flag\" ng-click=\"flag(photo)\"></i>\n                    <i class=\"icon ion-share\" ng-click=\"share(photo)\"></i>\n                </div>\n            </div>\n            <div class=\"spacer\"></div>\n        </ion-list>\n\n    </ion-content>\n    \n    <button mfb-button icon=\"ion-camera\" ng-click=\"takePicture()\"></button>\n\n</div>\n');
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
        $templateCache.put('app/templates/terms.html', '<ion-modal-view>\n    <ion-header-bar class=\"bar-calm\">\n        <h1 class=\"title\">Before you take pictures...</h1>\n    </ion-header-bar>\n    <ion-content class=\"padding\">\n\n        <h2>Raduga App End User License Agreement</h2>\n        \n        <p>This End User License Agreement (“Agreement”) is between you and Raduga and governs use of this app made available through the Apple App Store. By installing the Raduga App, you agree to be bound by this Agreement and understand that there is no tolerance for objectionable content. If you do not agree with the terms and conditions of this Agreement, you are not entitled to use the Raduga App.</p>\n        <p>In order to ensure Raduga provides the best experience possible for everyone, we strongly enforce a no tolerance policy for objectionable content. If you see inappropriate content, please use the “Report as offensive” feature found under each post.</p>\n        <p>1. Parties - This Agreement is between you and Raduga only, and not Apple, Inc. (“Apple”). Notwithstanding the foregoing, you acknowledge that Apple and its subsidiaries are third party beneficiaries of this Agreement and Apple has the right to enforce this Agreement against you. Raduga, not Apple, is solely responsible for the Raduga App and its content.</p>\n        <p>2. Privacy - Raduga may collect and use information about your usage of the Raduga App, including certain types of information from and about your device. Raduga may use this information, as long as it is in a form that does not personally identify you, to measure the use and performance of the Raduga App.</p>\n        <p>3. Limited License - Raduga grants you a limited, non-exclusive, non-transferable, revocable license to use the Raduga App for your personal, non-commercial purposes. You may only use the Raduga App on Apple devices that you own or control and as permitted by the App Store Terms of Service.</p>\n        <p>4. Age Restrictions - By using the Raduga App, you represent and warrant that (a) you are 17 years of age or older and you agree to be bound by this Agreement; (b) if you are under 17 years of age, you have obtained verifiable consent from a parent or legal guardian; and (c) your use of the Raduga App does not violate any applicable law or regulation. Your access to the Raduga App may be terminated without warning if Raduga believes, in its sole discretion, that you are under the age of 17 years and have not obtained verifiable consent from a parent or legal guardian. If you are a parent or legal guardian and you provide your consent to your child’s use of the Raduga App, you agree to be bound by this Agreement in respect to your child’s use of the Raduga App.</p>\n        <p>5. Objectionable Content Policy - Content may not be submitted to Raduga, who will moderate all content and ultimately decide whether or not to post a submission to the extent such content includes, is in conjunction with, or alongside any, Objectionable Content. Objectionable Content includes, but is not limited to: (i) sexually explicit materials; (ii) obscene, defamatory, libelous, slanderous, violent and/or unlawful content or profanity; (iii) content that infringes upon the rights of any third party, including copyright, trademark, privacy, publicity or other personal or proprietary right, or that is deceptive or fraudulent; (iv) content that promotes the use or sale of illegal or regulated substances, tobacco products, ammunition and/or firearms; and (v) gambling, including without limitation, any online casino, sports books, bingo or poker.</p>\n        <p>6. Warranty - Raduga disclaims all warranties about the Raduga App to the fullest extent permitted by law. To the extent any warranty exists under law that cannot be disclaimed, Raduga, not Apple, shall be solely responsible for such warranty.</p>\n        <p>7. Maintenance and Support - Raduga does provide minimal maintenance or support for it but not to the extent that any maintenance or support is required by applicable law, Raduga, not Apple, shall be obligated to furnish any such maintenance or support.</p>\n        <p>8. Product Claims - Raduga, not Apple, is responsible for addressing any claims by you relating to the Raduga App or use of it, including, but not limited to: (i) any product liability claim; (ii) any claim that the Raduga App fails to conform to any applicable legal or regulatory requirement; and (iii) any claim arising under consumer protection or similar legislation. Nothing in this Agreement shall be deemed an admission that you may have such claims.</p>\n        <p>9. Third Party Intellectual Property Claims - Raduga shall not be obligated to indemnify or defend you with respect to any third party claim arising out or relating to the Raduga App. To the extent Raduga is required to provide indemnification by applicable law, Raduga, not Apple, shall be solely responsible for the investigation, defense, settlement and discharge of any claim that the Raduga App or your use of it infringes any third party intellectual property right.</p>\n\n        <div class=\"button-bar\">\n            <button class=\"button button-block button-calm\" ng-click=\"agree()\">\n                Agree\n            </button>\n            <button class=\"button button-block button-default\" ng-click=\"disagree()\">\n                Disagree\n            </button>\n        </div>\n        \n    </ion-content>\n</ion-modal-view>\n');
    }]);
})();
