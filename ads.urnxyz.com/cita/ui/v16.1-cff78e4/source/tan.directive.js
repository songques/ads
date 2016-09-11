/**
 * @desc Directive to display the tan step modal box
 * @example <tan></tan>
 */
angular
    .module('citaApp.directives')
    .directive('tan', tan);

function tan() {

    return {
        restrict: 'EA',
        templateUrl: 'templates/tan.html',
        controller: TanController
    };
}

function TanController($scope, $timeout, sessionData, msisdnService, tanService, confirmService) {

    $scope.tanService = tanService;
    $scope.confirmService = confirmService;

    activate();

    ////////////

    function activate() {
        sessionData.deferred.promise.then(function () {
            if (tanService.request) {
                $timeout(function () {
                    $('#request_button').focus();
                });
            }
        });
    }

    $scope.requestNew = function (formTan) {
        if (tanService.pending) return;
        tanService.pending = true;

        tanService.requestNew().then(function () {
            tanService.pending = false;
            formTan.$setPristine();
        }, function() {
            tanService.pending = false;
        });
    };

    $scope.requestOtp = function () {
        if (tanService.pending) return;
        tanService.pending = true;
        tanService.requestNew().then(function () {
            confirmService.closed = false;
            confirmService.setFormPristine(); // I cannot access the formConfirm from here directly, so I link it from ng-change in confirm.html
            tanService.pending = false;

            $timeout(function () {
                $('#otp').focus();
            });
        }, function() {
            tanService.pending = false;
        });
    }

    $scope.checkTan = function (formTan) {
        if (formTan.$invalid) {
            tanService.error = true;
            return false;
        }
        tanService.value = tanService.value.replace(/ +/, "");

        if (tanService.pending) return false;
        tanService.pending = true;

        tanService.isValid().then(function (valid) {
            if (valid) {
                msisdnService.locked = true;
                formTan.$setPristine();
                confirmService.closed = false;
                $timeout(function () {
                    $('#captcha').focus();
                });
            } else {
                formTan.$setPristine();
            }
            tanService.pending = false;
        });

        return false;
    };
}
