'use strict';

/* Services */

angular.module('citaApp.services', ['ngResource'])

    .service('sessionData', function ($q) {
        return {sessionId: null, deferred: $q.defer()};
    })

    .factory('missingTranslationHandler', function missingTranslationHandlerFactory($log, $translate) {
        return function (translationId) {
            return null;
        };
    })

    .factory('$exceptionHandler', function ($log, $injector, errorService) {
        var $location = null;

        return function (exception) {

            $log.error(exception);

            $location = $location || $injector.get('$location');

            // make body visible (in case it is not already visible)
            angular.element(document.querySelector('#bodymain')).css('display', 'inherit');

            var reason = 'UNEXPECTED';
            if (exception && exception.code) {
                reason = exception.code;
                errorService.setError(exception.code);
                $location.path( "/error/" + reason );
            } else {
                //return exception;
            }
        };
    })
;

