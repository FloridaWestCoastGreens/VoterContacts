(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc function
   * @name voterContactsApp.controller:AuthCtrl
   * @description
   * # AuthCtrl
   * Controller of the voterContactsApp
   */
  angular.module('voterContactsApp')
    .controller('AuthCtrl',['$scope','GooglePlus','$window', function ($scope,GooglePlus,$window) {
      $scope.login = function () {
        GooglePlus.login().then(function (authResult) {
            $window.console.log(authResult);
  
            GooglePlus.getUser().then(function (user) {
                $window.console.log(user);
            });
        }, function (err) {
            $window.console.log(err);
        });
      };
    }]);
})(window, window.angular);
