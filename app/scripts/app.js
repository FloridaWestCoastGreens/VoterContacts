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
          'distGroupMgr': 'https://dev.it.usf.edu/~james/PHP_distGroupMgr/distgroupmgr.php',
          'listRuleSets': 'http://james.it.usf.edu:8080/RuleChains/ruleSet/',
          'testService3': 'http://192.168.1.147:8080/RuleChains/service/:handler',
          'testService2': 'http://192.168.1.147:8080/RuleChains/ruleSet/',
          'testService': 'http://james.it.usf.edu:8080/RuleChains/:root/',
          'ruleChainsHandlers2': 'http://192.168.1.147:8080/RuleChains/service/:handler',
          'ruleChainsHandlers': 'http://james.it.usf.edu:8080/RuleChains/service/:handler'
      }
    })
    .config(['$routeProvider','$httpProvider','voterAppConstant','GooglePlusProvider','$provide', function ($routeProvider,$httpProvider,voterAppConstant,GooglePlusProvider,$provide) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.headers.common.Accept = 'application/json';
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
          },
          /**
          * Retrieves a URL associated with a provided Application resource 'key'
          */
          getResourceUrl: function(appKey) {
            return voterAppConstant.applicationResources[appKey];
          },
          /**
          * Retrieves the Application resource 'key' from the UsfCAStokenAuthConstant using the URL as the matching value
          */
          getApplicationResourceKey: function(url) {
            var keepGoing = true;
            var appkey = '';
            angular.forEach(voterAppConstant.applicationResources,function(value, key) {
              if (keepGoing) {
                if (url === value) {
                  appkey = key;
                  keepGoing = false;
                }
              }
            });
            return appkey;
          },
          getStorage: function() {
            return $rootScope.voterContacts[voterAppConstant.applicationUniqueId];
          }
      
        };
      }]);
    }])
    .run(['voterAppConstant','$rootScope','$window','storage','voterContactsInit','ruleChains',function(voterAppConstant,$rootScope,$window,storage,voterContactsInit,ruleChains) {      
      voterContactsInit.initializeStorage();
//      ruleChains.testService().then(function(data){
//        $window.alert(JSON.stringify(data));
////          $scope.groups = data.groups;
//      },function(errorMessage) {
//        $window.alert(JSON.stringify(errorMessage));
////          $scope.error=errorMessage;
//      });
      ruleChains.listRuleSets().then(function(data){
        $window.alert(JSON.stringify(data));
//          $scope.groups = data.groups;
      },function(errorMessage) {
        $window.alert(JSON.stringify(errorMessage));
//          $scope.error=errorMessage;
      });
      
    }]);
})(window, window.angular);
