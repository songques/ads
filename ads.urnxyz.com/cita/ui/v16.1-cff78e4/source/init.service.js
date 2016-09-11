angular
    .module('citaApp.services')
    .factory('initService', initService);

function initService($resource, $location, $q, productService, msisdnService, tanService, confirmService) {
    var data = {
        isMessagesResolved: false,
        messagesMap: null,
        product: null,
        displaySettings: {
            language: 'de',
            OTPLength: 1
        },
        load: load,
        retry: retry,
        setLanguage: setLanguage,
        getLanguage: getLanguage
    };

    return data;

    ////////////

    /**
     * Set the user prefered language. Will be overwritten by init response.
     * @param lang
     */
    function setLanguage(lang) {
        data.displaySettings.language = lang || data.displaySettings.language;
    }

    function getLanguage() {
        return data.displaySettings.language;
    }

    /**
     * @name initialize
     * @desc initializes data from server
     * @param response InitResponseData
     */
    function initialize(response) {
        data.displaySettings = response.displaySettings;

        productService.init(response.product);
        msisdnService.init(response.dialogues.msisdn);
        tanService.init(response.dialogues.tan);
        confirmService.init(response.dialogues.confirm);
    }

    function retry() {

        var deferred = $q.defer();

        var res = $resource('../../citaservices/initretry');

        res.save({
                sessionId: $location.search().sessionId
            },
            function success(response) {
                initialize(response);
                deferred.resolve();
            },
            function error(response) {
                deferred.reject(response);
            }
        );

        return deferred.promise;
    }

    /**
     * @name load
     * @desc load initial data from server
     * @returns {Promise}
     */
    function load() {

        var deferred = $q.defer();

        if ($location.path().substr(0,7) == '/error/') {
            deferred.resolve();
            return deferred.promise;
        }

        var res = $resource('../../citaservices/init');

        res.save({
                sessionId: $location.search().sessionId,
                lang: getLanguage()
            },
            function success(response) {
                initialize(response);
                deferred.resolve();
            },
            function error(response) {

                deferred.reject();

                if (response && response.data && response.data.code) {
                    throw {code: response.data.code}
                } else {
                    throw {code: 'UNKNOWN'}
                }
            }
        );

        return deferred.promise;
    }
}