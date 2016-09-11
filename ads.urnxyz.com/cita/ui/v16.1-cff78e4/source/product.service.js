angular
    .module('citaApp.services')
    .factory('productService', productService);

function productService($q) {

    var data = {
        partner: null,
        price: null,
        init: init,
        deferred: $q.defer()
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

        if (data.price.content) data.deferred.resolve();
    }
}