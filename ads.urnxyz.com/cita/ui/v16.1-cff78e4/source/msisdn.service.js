angular
    .module('citaApp.services')
    .factory('msisdnService', msisdnService);

function msisdnService($q, $resource, $location) {

    var data = {
        closed: true,
        value: null,
        pending: false,
        valid: false,
        locked: false,
        error: false,
        errorMessage: null,
        init: init,
        isValid: isValid
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

        var res = $resource('../../citaservices/msisdn');

        res.save({
                msisdn: data.value,
                sessionId: $location.search().sessionId
            },
            function success() {
                data.error = false;
                data.valid = true;
                deferred.resolve(true);
            },
            function error(response) {
                if (response && response.data && response.data.code) {
                    switch (response.data.code) {
                        case 'MSISDN_FORMAT_ERROR':
                        case 'MSISDN_AREA_CODE_ERROR':
                            data.errorMessage = response.data.code;
                            data.error = true;
                            deferred.resolve(false);
                            return;
                        case 'TAN_RETRY':
                            data.error = false;
                            data.valid = true;
                            deferred.resolve(true);
                            throw {code: response.data.code}
                        //default:
                            //deferred.reject(response);
                    }
                    //throw {code: response.data.code}
                    throw {code: 'REDIRECT'};
                } else {
                    //deferred.reject(response);
                    //throw {code: 'UNKNOWN'}
                    throw {code: 'REDIRECT'};
                }
            }
        );

        return deferred.promise;
    }
}