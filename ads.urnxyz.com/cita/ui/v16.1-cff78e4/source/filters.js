'use strict';

/* Filters */

angular.module('citaApp.filters', [])
/** the filter 'i18n' is just a short alias for the filter 'translate' from the angular-translate project */
    .filter('i18n', ['$filter', function ($filter) {
        return $filter('translate');
    }])
;


