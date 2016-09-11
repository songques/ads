angular.module('citaApp', [
    'ngRoute',
    'pascalprecht.translate',
    'ngSanitize',
    'ngAria',
    'citaApp.templates',
    'citaApp.services',
    'citaApp.directives',
    'citaApp.filters',
    'citaApp.controllers',
    'ui.bootstrap',
    'ngAnimate'
])
    .config(config)
    .run(appRun)
;


function config($routeProvider, $translateProvider) {
    $routeProvider.when('/', {templateUrl: 'templates/cita.html'});
    $routeProvider.when('/help', {templateUrl: 'templates/help.html'});
    $routeProvider.when('/error/:errorCode', {templateUrl: 'templates/error.html'});
    $routeProvider.otherwise({redirectTo: '/'});

    $translateProvider
        //.translations('de', translations)
        .useLoader('messagesService')
        .registerAvailableLanguageKeys(['en', 'de'], {
            'de_AT': 'de',
            'de_BE': 'de',
            'de_CH': 'de',
            'de_DE': 'de',
            'de_LI': 'de',
            'de_LU': 'de'
        })
        .useSanitizeValueStrategy('sanitizeParameters');
}

function appRun($q, $compile, initService, messagesService, $translate, sessionData, $window, $filter) {
    var lang = null; // later: retrieve lang from persistent cookie (if user made a language selection before)
    initService.setLanguage(lang);
    $q.all({
        init: initService.load(),
        messages: messagesService()
    }).then(function() {

        // add dynamic css
        var natcoName = initService.displaySettings.natcoName;
        var wpid = initService.displaySettings.wholesalePartnerId;
        var customCss = initService.displaySettings.customCss;
        if (natcoName && customCss) {
            angular.element(document.querySelector('head')).append($compile('<link rel="stylesheet" href="natco/' + natcoName + '/' + customCss + '" type="text/css">')({}));
            angular.element(document.querySelector('head')).append($compile('<link rel="shortcut icon" href="natco/' + natcoName + '/favicon-' + wpid + '.ico" type="image/x-icon">')({}));
        }

        $translate.use(initService.displaySettings.language).then(function() {
            $window.document.title = $filter('translate')(initService.displaySettings.isAnonymous ? 'PageTitleAnonymous' : 'PageTitle');
        });

        sessionData.deferred.resolve();

        // make body visible (with clickjacking protection)
        if (self === top) {
            angular.element(document.querySelector('#bodymain')).css('display', 'inherit');
        } else {
            top.location = self.location;
        }
    }, function() {
        $translate.use(initService.displaySettings.language);
    });
}
