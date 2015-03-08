(function() {
  'use strict';

  angular.module('app', [
    
    'ionic', 
    'app.core',
    'app.home',
    'app.moment',
    'app.mementos',
    'app.memento',
    'app.memento.create',
    'app.user.auth'
  ])

  .run(function($ionicPlatform, Notifications, DataHandler) {


    // FIX: THIS IS BROKEN FOR SOME REASON
    // IonicPlatform.ready is not firing!!!

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

      // Start to handle SOCKET.IO connections
      // Notifications.activate();
      // DataHandler.activate();

    });
  })
  
  .config(function($httpProvider) {

    // IMPORTANT
    // This will not work when testing in the browser. You will need
    // to comment this out if you'd like to test the app in Chrome.
    // Otherwise, it works great in the iOS simulator/built app.
    /*$httpProvider.defaults.withCredentials = true;*/
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  })

  .config(function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({
      lines: 11, // The number of lines to draw
      length: 21, // The length of each line
      width: 2, // The line thickness
      radius: 19, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 0.8, // Rounds per second
      trail: 48, // Afterglow percentage
      // shadow: true, // Whether to render a shadow    
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'Home as vm'
      })
      .state('moment', {
        url: '/moment',
        templateUrl: 'app/moment/moment.html',
        controller: 'Moment as vm'
      })
      .state('momentCreate', {
        url: '/momentcreate',
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
        url: '/mementocreate',
        templateUrl: 'app/memento-create/memento.create.html',
        controller: 'MementoCreate as vm'
      })
      
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
    $urlRouterProvider.otherwise('/home');
  });
  
})();

