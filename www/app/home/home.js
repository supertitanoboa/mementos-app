(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  /* @ngInject */
  function Home($state) {
    /*jshint validthis: true */
    var vm = this;
    vm.signUp = signUp;
    vm.login = login;

    activate()

    ////////////////////////////////
    
    function activate($state) {
      /*NOTE: where we can kick off api calls for data we would like to persist, i.e. mementos list*/
    }

    function signUp() {
      return $state.go('signup')
    }

    function login() {
      return $state.go('signin')
    }

  }
})();
