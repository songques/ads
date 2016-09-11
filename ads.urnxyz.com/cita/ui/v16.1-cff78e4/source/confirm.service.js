angular
    .module('citaApp.services')
    .factory('confirmService', confirmService);

function confirmService($q, $resource, $location, $window) {

    var data = {
        closed: true,
        number: 3,
        value: null,
        pending: false,
        error: false,
        valid: false,
        otp: null,
        xtc: null,
        captchaImage: null,
        csrf: null,
        limitReached: false,
        formLink: null,
        setFormPristine: setFormPristine,
        init: init,
        isValid: isValid,
        hasCaptcha: hasCaptcha,
        requestNewCaptcha: requestNewCaptcha
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
     * @param accept is true, if the customer agrees the booking
     * @returns {Boolean}
     */
    function isValid(accept) {

        if (accept !== false) accept = true; // default value is true (for retry. because retry is only available if accept was true)

        var deferred = $q.defer();

        var res = $resource('../../citaservices/confirm');

        res.save({
                value: data.value,
                accept: accept,
                sessionId: $location.search().sessionId,
                csrf: data.csrf
            },
            function success() {
                $window.location.href = "/cita/redirect/?sessionId="+ $location.search().sessionId +"&refurl=" + encodeURIComponent($location.search().refurl);
            },
            function error(response) {
                if (response && response.data && response.data.code) {
                    switch (response.data.code) {
                        case 'TAN_ERROR':
                        case 'CAPTCHA_ERROR':
                            data.value = null;
                            data.error = true;
                            deferred.reject(response);
                            return;
                        default:
                            deferred.reject(response);
                            throw {code: response.data.code}
                    }
                } else {
                    throw {code: 'REDIRECT'}
                }
            }
        );

        return deferred.promise;
    }

    /**
     * @name hasCaptcha
     * @desc wether a captcha is displayed or not
     * @returns {Boolean}
     */
    function hasCaptcha() {
        return data.captchaImage ? true : false;
    }

    /**
     * @name requestNewCaptcha
     * @desc request a new captcha from server
     * @returns {null}
     */
    function requestNewCaptcha() {

        var deferred = $q.defer();

        var newOtpService = $resource('../../citaservices/newcaptcha');

        newOtpService.save({
                sessionId: $location.search().sessionId
            },
            function success(response) {
                data.captchaImage = response.captchaImage;
                data.value = "";
                data.error = false;
                deferred.resolve();
            },
            function error(response) {
                throw {code: response && response.data && response.data.code || "UNKNOWN"}
            }
        );

        return deferred.promise;
    }

    function setFormPristine() {
        if (data.formLink != null) data.formLink.$setPristine();
    }
}