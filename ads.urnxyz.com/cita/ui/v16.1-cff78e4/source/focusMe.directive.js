/**
 * @desc Directive to focus input field when flag changes to true
 * @example <input focus-me></input>
 */
angular
    .module('citaApp.directives')
    .directive('focusMe', focusMe);

function focusMe($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            element.bind('blur', function () {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}