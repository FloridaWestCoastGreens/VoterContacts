(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc function
   * @name voterContactsApp.controller:GetflcountiesCtrl
   * @description
   * # GetflcountiesCtrl
   * Controller of the voterContactsApp
   */
  angular.module('voterContactsApp')
    .controller('GetflcountiesCtrl',['$scope','$window','voterContactsInit', 'ruleChains', function ($scope,$window,voterContactsInit,ruleChains) {
      ruleChains.getFLCounties(function(data) {
        $window.alert(JSON.stringify(data));
        voterContactsInit.getStorage().counties = data;
      });
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    }]);
})(window, window.angular);
