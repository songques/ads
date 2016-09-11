angular
    .module('citaApp.services')
    .factory('tanService', tanService);

function tanService($q, $resource, $location, $window, productService, confirmService) {

    var data = {
        closed: true,
        value: null,
        visible: false,
        pending: false,
        error: false,
        request: false,
        resendLimitReached: false,
        errorMessage: null,
        valid: false,
        init: init,
        isValid: isValid,
        requestNew: requestNew,
        retry: retry
    };

    return data;

    ////////////

    /**
     * @name init
     * @desc maps given values to service.data
     * @param {Array} values that should be initialized
     * @returns {null}
     */
    function init(values) {
        for (var key in values) {
            data[key] = values[key];
        }
    }

    /**
     * @name isValid
     * @desc asks the server if the given parameter is valid
     */
    function isValid() {

        var deferred = $q.defer();

        var res = $resource('../../citaservices/tan');

        res.save({
                tan: data.value,
                sessionId: $location.search().sessionId
            },
            function success(response) {
                if (response.reload) return $window.location.reload();
                productService.price = response.price;
                productService.deferred.resolve();
                confirmService.captchaImage = response.captchaImage;
                data.error = false;
                data.valid = true;
                deferred.resolve(true);
            },
            function error(response) {
                if (response && response.data && response.data.code) {
                    switch (response.data.code) {
                        case 'TAN_RETRY':
                            deferred.reject(response);
                            throw {code: response.data.code};
                        case 'TAN_ERROR':
                            data.errorMessage = response.data.code;
                            data.error = true;
                            data.value = null;
                            deferred.resolve(false);
                            return;
                        case 'IDENTIFICATION_RETRY':
                            data.error = false;
                            data.valid = true;
                            deferred.resolve(true);
                            break;
                        default:
                            throw {code: 'REDIRECT'};
                            //deferred.reject(response);
                    }
                    throw {code: response.data.code}
                } else {
                    //deferred.reject(response);
                    //throw {code: 'UNKNOWN'}
                    throw {code: 'REDIRECT'};
                }
            }
        );

        return deferred.promise;
    }

    /**
     * @name retry
     * @desc continues the isValid request if failed after OTP validation
     */
    function retry() {

        var deferred = $q.defer();

        var res = $resource('../../citaservices/identification');

        res.save({
                sessionId: $location.search().sessionId
            },
            function success(response) {
                if (response.reload) return $window.location.reload();
                productService.price = response.price;
                productService.deferred.resolve();
                confirmService.captchaImage = response.captchaImage;
                data.error = false;
                data.valid = true;
                deferred.resolve(true);
            },
            function error(response) {
                deferred.reject(response);
                //throw {code: response && response.data && response.data.code || "UNKNOWN"}
            }
        );

        return deferred.promise;
    }

    /**
     * @name requestNew
     * @desc request a new tan from server
     */
    function requestNew() {

        var deferred = $q.defer();

        var res = $resource('../../citaservices/newtan');

        res.save({
                sessionId: $location.search().sessionId
            },
            function success() {
                data.value = "";
                confirmService.value = "";
                data.error = false;
                deferred.resolve();
            },
            function error(response) {
                if (response && response.data && response.data.code && (['TAN_RESEND_LIMIT_REACHED'].indexOf(response.data.code) != -1)) {
                    data.error = true;
                    data.errorMessage = response.data.code;
                    data.value = "";
                    confirmService.value = "";
                    data.resendLimitReached = true;
                    deferred.resolve();
                } else {
                    deferred.reject(response);
                    throw {code: response && response.data && response.data.code || "UNKNOWN"}
                }
            }
        );

        return deferred.promise;
    }
}