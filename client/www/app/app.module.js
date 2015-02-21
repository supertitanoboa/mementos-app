(function() {
  'use strict';

  angular.module('app', [
    
    'ionic', 
    'app.core',
    'app.moment',
    'app.mementos',
    'app.memento',
    'app.memento.create'
    'app.user.auth'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  
  .config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('moment', {
        url: '/moment',
        templateUrl: 'app/moment/moment.create.html',
        controller: 'MomentCreate as vm'
      })
      .state('mementos', {
        url: '/mementos',
        templateUrl: 'app/mementos-list/mementos.html',
        controller: 'Mementos as vm'
      })
        // nested state
        .state('memento', {
          url: '/mementos/:ID',
          templateUrl: 'app/memento/memento.html',
          controller: 'Memento as vm'
        })

      .state('mementoCreate', {
        url: '/create',
        templateUrl: 'app/memento-create/memento.create.html',
        controller: 'MementoCreate as vm'
      });
      
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/user.signup.html',
      controller: 'UserSignup as vm'
    })

    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/user.signin.html',
      controller: 'UserSignin as vm'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signup');
  });
  
})();

