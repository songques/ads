/**
 * @desc Validation directive like Angular's ng-minlength, but which allows observable
 * expressions instead of static integers only.
 * @see http://stackoverflow.com/a/21133637/1601438
 * @example <step number="1" title="{{'title'|i18n}}" closed="true"></step>
 */
angular
    .module('citaApp.directives')
    .directive('validateMinlength', validateMinlength);

function validateMinlength() {

    return {
        require: 'ngModel',
        link: function (scope, elm, attr, ngModel) {
            var minlength = 0;

            var minLengthValidator = function (value) {
                var validity = ngModel.$isEmpty(value) || value.length >= minlength;
                ngModel.$setValidity('minlength', validity);
                return validity ? value : undefined;
            };

            attr.$observe('validateMinlength', function (val) {
                minlength = parseInt(val, 10);
                minLengthValidator(ngModel.$viewValue);
            });

            ngModel.$parsers.push(minLengthValidator);
            ngModel.$formatters.push(minLengthValidator);
        }
    };
}
