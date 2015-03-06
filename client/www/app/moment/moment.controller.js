(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('Moment', Moment);

  /* @ngInject */
  function Moment($state, logout) {
    /*jshint validthis: true */
    var vm = this;
    vm.createMoment = createMoment;
    vm.goToMementos = goToMementos;
    vm.logoutUser = logoutUser;

    ////////////////////////////////

    function createMoment() {
      var plus = document.getElementsByClassName('plusSign')[0];

      // spins and fades out plus sign
      plus.className = plus.className.split(' fadein')[0] + ' fadeout spin';

      // removes spin class
      setTimeout(function() {
        var plus = document.getElementsByClassName('plusSign')[0];
        plus.className = plus.className.split(' spin')[0];
      }, 400);

      $state.go('momentCreate');
    }

    // NOTE: all this nav functionality are candidates for a nav service 
    function goToMementos () {
      $state.go('mementos')
    }

    function logoutUser() {
      logout.show()
    }

  }

})();
