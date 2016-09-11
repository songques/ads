'use strict';

angular
    .module('citaApp.services')
    .factory('messagesService', messagesService);

function messagesService($q, $resource, initService) {

    return function() {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (initService.messagesMap) {
            deferred.resolve(initService.messagesMap);
        } else {
            var res = $resource('../../citaservices/messages');

            res.save({
                    wpid: null,
                    lang: initService.getLanguage()
                },
                function success(response) {
                    deferred.resolve(initService.messagesMap = response.messages);
                    initService.isMessagesResolved = true;

                },
                function error(response) {
                    deferred.reject(response);
                }
            );

        }

        return promise;
    }
}

