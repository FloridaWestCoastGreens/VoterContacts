(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name voterContactsApp.ruleChains
   * @description
   * # ruleChains
   * Factory in the voterContactsApp.
   */
  angular.module('voterContactsApp')
    .factory('ruleChains',['voterContactsInit','$log','$resource','$http', function (voterContactsInit,$log,$resource,$http) {
      // Service logic
      // ...
      var ruleChainsResource = {
        'internal': $resource(voterContactsInit.getResourceUrl('ruleChainsHandlersHome'),{},{
          'testService2': {
            method: 'GET', params: {handler: 'testService'},responseType: 'json' 
          },    
          'testService': {
            method: 'GET', params: {root: 'ruleSet'},responseType: 'json',url: voterContactsInit.getResourceUrl('testService'), stripTrailingSlashes: false
          }    
        },{stripTrailingSlashes: false}),
        'internal2': {
          listRuleSets: function() { return $http({method: 'GET', params: {}, responseType: 'json', url: voterContactsInit.getResourceUrl('listRuleSets')}); }
        },
        'handlers': $resource(voterContactsInit.getResourceUrl('ruleChainsHandlersHome'),{},{
          'testService': {
            method: 'GET', params: {handler: 'testService'},responseType: 'json', headers: { 'Content-Type':'application/json' }
          },
          'getFLCounties': {
            method: 'GET', params: {handler: 'getFLCounties'}, responseType: 'json', headers: { 'Content-Type':'application/json' }, transformResponse: function(data, header) {
              $log.info(data);
              //header
              // $log.info(angular.fromJson(data));
              // return angular.fromJson(data);
              return data;
            }
          }
        },{stripTrailingSlashes: false}) 
      };
      // Public API here
      return {
        testService: function () {
          return ruleChainsResource.internal.testService().$promise;
        },
        listRuleSets: function() {
          return ruleChainsResource.internal2.listRuleSets();
        },
        getFLCounties: function() {
          return ruleChainsResource.handlers.getFLCounties().$promise;
        },
        getFLCounties2b: function(callback) {
          return ruleChainsResource.handlers.getFLCounties({},callback);
        }
      };
    }]);
})(window, window.angular);
