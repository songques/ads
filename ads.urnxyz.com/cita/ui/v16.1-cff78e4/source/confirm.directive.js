/**
 * @desc Directive to display the confirm step modal box
 * @example <confirm></confirm>
 */
angular
    .module('citaApp.directives')
    .directive('confirm', confirm);

function confirm() {

    return {
        restrict: 'EA',
        templateUrl: 'templates/confirm.html',
        controller: ConfirmController
    };
}

function ConfirmController($scope, $timeout, sessionData, initService, tanService, confirmService, productService, $filter) {

    $scope.initService = initService;
    $scope.tanService = tanService;
    $scope.confirmService = confirmService;
    $scope.productService = productService;

    activate();

    ////////////

    function activate() {
        sessionData.deferred.promise.then(function () {
            confirmService.number = tanService.visible ? 3 : 2;

            if (confirmService.closed == false && confirmService.hasCaptcha()) {
                $timeout(function () {
                    $('#captcha').focus();
                });
            }
            if (confirmService.closed == false && confirmService.xtc == 1) {
                $timeout(function () {
                    $('#otp').focus();
                });
            }
        });
    }

    $scope.getType = function () {
        if (confirmService.hasCaptcha()) return 'ConfirmCaptcha';

        if (confirmService.otp) {
            if (confirmService.xtc) return 'ConfirmXtcOtp';
            return 'ConfirmOtp';
        }

        return 'Confirm';
    };

    $scope.requestNewCaptcha = function (formConfirm) {

        if (confirmService.pending) return;
        confirmService.pending = true;

        confirmService.requestNewCaptcha().then(function () {
            $timeout(function () {
                $('#captcha').focus();
            });
            confirmService.pending = false;
            if (formConfirm != null) formConfirm.$setPristine();
        });
    };

    $scope.checkConfirm = function (formConfirm, accept) {

        if (accept && formConfirm.$invalid) {
            tanService.error = false;
            confirmService.error = true;
            return false;
        }

        if (confirmService.pending) return false;
        confirmService.pending = true;

        confirmService.isValid(accept).then(function () {
            // not possible
        }, function (response) {
            confirmService.pending = false;
            if (response && response.data && response.data.code && response.data.code == 'CAPTCHA_ERROR') {
                $scope.requestNewCaptcha();
            }
        });

        return false;
    };

    $scope.assignForm = function (formConfirm) {
        confirmService.formLink = formConfirm;
    }
}
