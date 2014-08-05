(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc overview
   * @name voterContactsApp
   * @description
   * # voterContactsApp
   *
   * Main module of the application.
   */
  angular
    .module('voterContactsApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'googleplus',
      'angularLocalStorage'
    ])
    .constant('voterAppConstant',{
      'google': {
        'init': {
          clientId: '1077659697569-6qo3seqa58mc157a42smhcbtcqghvn0c.apps.googleusercontent.com',
          apiKey: 'AIzaSyDmiCKba60XHcNMLTjpQIsEh7OIgPF-idk'
        },
        'oauthCallbackRoute': '/oauth2callback'
      },
      'applicationUniqueId': '84d1cd31ffe3fae8607dc7dc9dd1962d',
      'applicationResources': {
          'distGroupMgr': 'https://dev.it.usf.edu/~james/PHP_distGroupMgr/distgroupmgr.php'
      }
    })
    .config(['$routeProvider','voterAppConstant','GooglePlusProvider','$provide', function ($routeProvider,voterAppConstant,GooglePlusProvider,$provide) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      GooglePlusProvider.init(voterAppConstant.google.init);
      $provide.factory('voterContactsInit',['voterAppConstant','$rootScope','storage',function(voterAppConstant,$rootScope,storage) {
        return {
          initializeStorage: function() {
            var defaultValue = {};
            defaultValue[voterAppConstant.applicationUniqueId] = {buffer: [], applicationResources: {}};
            storage.bind($rootScope,'voterContacts',{defaultValue: defaultValue});
            if (!(voterAppConstant.applicationUniqueId in $rootScope.voterContacts)) {
              // Add the key in case another instance of the plugin already has a different applicationUniqueID in local storage (prevent an 'undefined' error)
              $rootScope.voterContacts[voterAppConstant.applicationUniqueId] = defaultValue[voterAppConstant.applicationUniqueId];
            }
            angular.forEach(voterAppConstant.applicationResources,function(value, key) {
              if (!(key in $rootScope.voterContacts[voterAppConstant.applicationUniqueId].applicationResources)) {
                $rootScope.voterContacts[voterAppConstant.applicationUniqueId].applicationResources[key] = {
                  url: value
                };
              }
            });        
          }
        };
      }]);
    }])
    .run(['voterAppConstant','$rootScope','storage','voterContactsInit',function(voterAppConstant,$rootScope,storage,voterContactsInit) {      
      voterContactsInit.initializeStorage();
      
      
      
    }]);
})(window, window.angular);
