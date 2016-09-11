angular
    .module('citaApp.services')
    .factory('errorService', errorService);

function errorService($routeParams) {

    var data = {
        code: null,
        pending: false,
        setError: setError,
        getCode: getCode,
        isRetry: isRetry
    };

    return data;

    ////////////

    function setError(code) {
        data.code = code;
    }

    function isRetry() {
        return /_RETRY$/.test(data.getCode());
    }

    function getCode() {
        return data.code ? data.code : (data.code = $routeParams.errorCode);
    }
}