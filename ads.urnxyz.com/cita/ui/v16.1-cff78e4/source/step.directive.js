/**
 * @desc Directive to display step modal box
 * @example <step number="1" title="{{'title'|i18n}}" closed="true"></step>
 */
angular
    .module('citaApp.directives')
    .directive('step', step);

function step() {

    return {
        restrict: 'EA',
        transclude: true,
        scope: {
            number: '@',
            title: '@',
            closed: '=?'
        },
        templateUrl: 'templates/step.html'
    };
}