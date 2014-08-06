'use strict';

/**
 * @ngdoc service
 * @name voterContactsApp.ruleChains
 * @description
 * # ruleChains
 * Factory in the voterContactsApp.
 */
angular.module('voterContactsApp')
  .factory('ruleChains',['voterContactsInit','$resource', function (voterContactsInit,$resource) {
    // Service logic
    // ...
    var ruleChainsResource = {
      'internal': {
        'testService': $resource(voterContactsInit.getResourceUrl('testService'),{},{
          'testService': {
            method: 'GET', params: {handler: 'testService'},responseType: 'json' 
          }    
        })
      },
      'handlers': $resource(voterContactsInit.getResourceUrl('testService'),{},{
        'testService': {
          method: 'GET', params: {handler: 'testService'},responseType: 'json', headers: { 'Content-Type':'application/json' }
        }    
      }) 
    };
    // Public API here
    return {
      testService: function () {
        return ruleChainsResource.handlers.testService().$promise;
      }
    };
  }]);
