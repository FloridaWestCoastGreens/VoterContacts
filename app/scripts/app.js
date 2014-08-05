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
      'angularLocalStorage'
    ])
    .constant('voterAppConstant',{
      'google': {
        'init': {
          clientId: 'CLIENT_ID',
          apiKey: 'API_KEY'
        },
        'oauthCallbackRoute': '/auth'
      },
      'applicationResources': {
          'distGroupMgr': 'https://dev.it.usf.edu/~james/PHP_distGroupMgr/distgroupmgr.php'
      },
    })
    .config(['$routeProvider','voterAppConstant','GooglePlusProvider',function ($routeProvider,voterAppConstant,GooglePlusProvider) {
      GooglePlusProvider.init(voterAppConstant.google.init);
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
    }]);
})(window, window.angular);
