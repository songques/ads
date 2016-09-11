'use strict';

angular
    .module('citaApp.controllers')
    .controller('MasterController', MasterController);

function MasterController($scope, $window, $translate, sessionData, productService, $location, initService) {

    $scope.$location = $location;
    $scope.sessionId = $location.search().sessionId;
    $scope.refurl = $location.search().refurl;
    $scope.initService = initService;

    $scope.cancel = function () {
        $window.location.href = "/cita/redirect/?sessionId="+ $location.search().sessionId +"&refurl=" + encodeURIComponent($location.search().refurl);
    };

    activate();

    ////////////

    function activate() {

        sessionData.deferred.promise.then(function () {
            $scope.productService = productService;
        });
    }

}