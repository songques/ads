'use strict';

angular
    .module('citaApp.controllers')
    .controller('HelpController', HelpController);

function HelpController($scope, $resource, $location, $translate, initService) {

    activate();

    ////////////

    function activate() {

        var helpService = $resource('../../citaservices/help');

        helpService.save({
                sessionId: $location.search().sessionId
            },
            function success(response) {

                $scope.address = response.address;

                $('#help-address').show();
            },
            function error(response) {
            }
        );
    }

    $scope.isTranslated = function(key) {
        if (initService.isMessagesResolved == false) return false;
        return !(typeof initService.messagesMap[key] == 'undefined' || initService.messagesMap[key] == '');

    }
}
