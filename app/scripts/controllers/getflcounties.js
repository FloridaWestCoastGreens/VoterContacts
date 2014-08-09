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
    .controller('GetflcountiesCtrl',['$scope','$rootScope','$window','$log','$filter','voterContactsInit', 'ruleChains', function ($scope,$rootScope,$window,$log,$filter,voterContactsInit,ruleChains) {
      ruleChains.getFLCounties().then(function(data) {
        voterContactsInit.getStorage().counties = data.counties;
        $scope.counties = voterContactsInit.getStorage().counties;
      });
      $scope.changeCounty = function(code) {
        // $window.alert(code);
      };
      $scope.hasSearchableParams = function(search) {
        var count = 0;
        angular.forEach(search,function(val,key) {
          if(angular.isString(val)?(val.trim().length > 0):false) {
            switch (key) {
              case 'first':
                count++;
                break;
              case 'last':
                count++;
                break;
              case 'middle':
                count++;
                break;
            }
          }
        });
        return (count > 0);
      };
      $scope.matchVoters = function(search) {
        $window.alert(JSON.stringify($filter('filter')(search, {'county': null }, true)));
      };
    }]);
})(window, window.angular);
