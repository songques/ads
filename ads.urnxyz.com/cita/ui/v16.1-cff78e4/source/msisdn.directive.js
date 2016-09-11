/**
 * @desc Directive to display the msisdn step modal box
 * @example <msisdn></msisdn>
 */
angular
    .module('citaApp.directives')
    .directive('msisdn', msisdn);

function msisdn() {

    return {
        restrict: 'EA',
        templateUrl: 'templates/msisdn.html',
        controller: MsisdnController
    };
}

function MsisdnController($scope, $timeout, sessionData, msisdnService, tanService, confirmService) {

    $scope.msisdnService = msisdnService;

    activate();

    ////////////

    function activate() {
        sessionData.deferred.promise.then(function () {
            if (confirmService.closed) {
                $timeout(function () {
                    $('#msisdn').focus();
                });
            }
        });
    }

    $scope.changeMsisdn = function () {
        msisdnService.valid = false;
        tanService.closed = true;
        tanService.valid = false;
        tanService.value = null;
        tanService.errorMessage = null;
        tanService.error = false;
        confirmService.closed = true;
        $timeout(function () {
            $('#msisdn').focus();
        });
    };

    $scope.checkMsisdn = function (formMsisdn) {
        if (formMsisdn.$invalid) {
            msisdnService.error = true;
            return false;
        }
        msisdnService.value = msisdnService.value.replace(/ +/, "");

        if (msisdnService.pending) return false;
        msisdnService.pending = true;

        msisdnService.isValid().then(function (valid) {
            if (valid) {
                tanService.closed = false;
                $timeout(function () {
                    if (tanService.request) {
                        $('#request_button').focus();
                    } else {
                        $('#tan').focus();
                    }
                });
            } else {
                formMsisdn.$setPristine();
            }
            msisdnService.pending = false;
        });

        return false;
    };
}
