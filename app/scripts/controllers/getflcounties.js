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
    .controller('GetflcountiesCtrl',['$scope','$rootScope','$window','voterContactsInit', 'ruleChains', function ($scope,$rootScope,$window,voterContactsInit,ruleChains) {
      //ruleChains.getFLCounties(function(data) {
      //  $window.alert(JSON.stringify(data));
      //  voterContactsInit.getStorage().counties = data;
      //});
      ruleChains.getFLCounties().then(function(data) {
        //$window.alert(data);
        //$window.alert(JSON.stringify(data));
        voterContactsInit.getStorage().counties = data.counties;
        $scope.counties = voterContactsInit.getStorage().counties;
        //$window.alert(JSON.stringify($scope.counties));
      });
      $scope.changeCounty = function(code) {
        $window.alert(code);
      };
    }]);
})(window, window.angular);
