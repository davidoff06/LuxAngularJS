(function()
{
    var UserFormController = function($scope, $http)
    {
        $scope.user = {};
        $scope.user.userName = '';
        $scope.user.password = '';
        $scope.user.password2 = '';
    };

    UserFormController.$inject = ['$scope','$http'];
    angular.module("myapp").controller("UserFormController",UserFormController);

    //directive is used for comparing password and repeat password
    angular.module("myapp").directive("matchTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherValue: "=matchTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.matchTo = function(modelValue) {
                    return modelValue == scope.otherValue;
                };

                scope.$watch("otherValue", function() {
                    ngModel.$validate();
                });
            }
        };
    });

    //custom directive to check uniqueness of user
    angular.module("myapp").directive('uniqueUser', function($http, $timeout) {
        var timer;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attr, ctrl) {
                scope.$watch(attr.ngModel, function(value) {
                    if (timer) $timeout.cancel(timer);
                    timer = $timeout(function(){
                        $http.get('/checkUser?user='+value)
                            .success(function(result) {
                                ctrl.$setValidity('unique', result);
                            });
                    }, 200);
                })
            }
        }
    });


}
) ();

