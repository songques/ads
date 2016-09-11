'use strict';

angular
    .module('citaApp.controllers')
    .controller('ErrorController', ErrorController);

function ErrorController($scope, $location, errorService, initService, tanService, confirmService) {

    $scope.errorService = errorService;
    $scope.refurlExists = $location.search().refurl ? true : false;

    $scope.retry = function () {
        if (errorService.pending) return;
        errorService.pending = true;

        switch (errorService.getCode()) {
            case 'INIT_RETRY':
                handleRetry(errorService.getCode(), initService.retry);
                break;
            case 'TAN_RETRY':
                handleRetry(errorService.getCode(), tanService.requestNew);
                break;
            case 'IDENTIFICATION_RETRY':
                handleRetry(errorService.getCode(), tanService.retry);
                break;
            case 'CONFIRM_RETRY':
                handleRetry(errorService.getCode(), confirmService.isValid, ['TAN_ERROR']);
                break;
        }
    };

    activate();

    ////////////

    function activate() {
        if (errorService.getCode() == 'REDIRECT') $scope.cancel();
    }

    function handleRetry(lastErrorCode, callback, positiveErrorCodes) {
        callback().then(function () {
            errorService.pending = false;
            $location.url("/?sessionId=" + $location.search().sessionId + '&refurl=' + encodeURIComponent($location.search().refurl));
        }, function (response) {
            errorService.pending = false;
            if (response && response.data && response.data.code && response.data.code == lastErrorCode) {
                // everything is fine!
            } else if (response && response.data && response.data.code && positiveErrorCodes != null && positiveErrorCodes.indexOf(response.data.code) >= 0) {
                $location.url("/?sessionId=" + $location.search().sessionId + '&refurl=' + encodeURIComponent($location.search().refurl));
            } else {
                $scope.cancel();
            }
        });
    }
}
