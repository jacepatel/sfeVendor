angular.module('sfeVendorApp').directive('googleplace', function() {
    "use strict";
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country: 'au'}
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});
