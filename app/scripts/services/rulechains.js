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
    .factory('ruleChains',['voterContactsInit','$log','$resource', function (voterContactsInit,$log,$resource) {
      // Service logic
      // ...
      var ruleChainsResource = {
        'internal': $resource(voterContactsInit.getResourceUrl('ruleChainsHandlers'),{},{
          'testService2': {
            method: 'GET', params: {handler: 'testService'},responseType: 'json' 
          },    
          'testService': {
            method: 'GET', params: {},responseType: 'json',url: voterContactsInit.getResourceUrl('testService2')
          }    
        }),
        'handlers': $resource(voterContactsInit.getResourceUrl('ruleChainsHandlers'),{},{
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
        }) 
      };
      // Public API here
      return {
        testService: function () {
          return ruleChainsResource.internal.testService().$promise;
        },
        getFLCounties: function(callback) {
          return ruleChainsResource.handlers.getFLCounties({},callback);
        }
      };
    }]);
})(window, window.angular);
