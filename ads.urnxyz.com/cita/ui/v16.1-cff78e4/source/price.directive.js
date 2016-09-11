/**
 * @desc Directive to print product price
 * @example <price></price>
 */
angular
    .module('citaApp.directives')
    .directive('price', price);

function price() {

    return {
        restrict: 'EA',
        transclude: true,
        scope: {
            simple: '=?',
            footnote: '=?',
            prefix: '@',
            suffix: '@'
        },
        templateUrl: 'templates/price.html',
        controller: PriceController
    };
}

function PriceController($scope, $attrs, $filter, $q, sessionData, productService) {

    activate();

    ////////////

    function activate() {

        $scope.contentFormatted = contentFormatted;
        $scope.chargingCycle = chargingCycle;

        $q.all({
            product: productService.deferred.promise,
            session: sessionData.deferred.promise
        }).then(function() {
            $scope.productService = productService;
        });
    }

    function chargingCycle(cc) {
        if (cc) {
            if ($attrs.footnote) {
                return $filter('translate')("FootnoteChargingCycle", {'charging_cycle': parseChargingCycle(cc, true /* isDative */, false)});
            } else {
                return $filter('translate')("ChargingCyclePer") + " " + parseChargingCycle(cc, false, true /* isSingularShort */) + " " + $filter('translate')("ChargingCycleSubscription") + "<sup>1</sup>";
            }
        }
    }

    function contentFormatted() {
        if (!productService || !productService.price || !productService.price.contentFormatted) return "";
        return productService.price.contentFormatted.replace(/([0-9]{2})($|[^\d]+$)/, '<sup>$1</sup>$2');
        // expired: contentFormatted.replace(/([0-9].*[0-9])/, '<s>$1</s>');
    }

    function parseChargingCycle(input, isDative, isSingularShort) {
        if (input === undefined || input === null)
            return input;

        if (isDative === undefined || isDative === null) isDative = false;
        if (isSingularShort === undefined || isSingularShort === null) isSingularShort = false;

        var matches = input.match(/\d+\w/g);

        var cycles = [];
        for (var i in matches) {
            var factor = matches[i].match(/\d+/);
            var unit = matches[i].substr(-1, 1);

            switch (unit) { // Mwdhm
                case "M":
                    unit = "Month";
                    break;
                case "w":
                    unit = "Week";
                    break;
                case "d":
                    unit = "Day";
                    break;
                case "h":
                    unit = "Hour";
                    break;
                case "m":
                    unit = "Minute";
                    break;
                default:
                    continue;
            }

            if (factor != 1) {
                unit += "Plural";
                if (isDative) unit += "Dative";
            }

            if (isSingularShort && factor == 1 && matches.length == 1) {
                cycles.push($filter('translate')(unit));
            } else {
                cycles.push(factor + " " + $filter('translate')(unit));
            }
        }

        if (cycles.length) {
            return cycles.join(", ");
        }
        return "";
    }
}