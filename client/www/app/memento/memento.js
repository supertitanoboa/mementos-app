(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */

  function Memento(DataHandler, $stateParams, $state, $ionicHistory) {
    /*jshint validthis: true */
    var vm = this;
    vm.mementoID = Number($stateParams.ID);
    vm.memento = DataHandler.mementos.get(vm.mementoID);

    vm.goToMementos = goToMementos;
    vm.goToMomentCreate = goToMomentCreate;

    function goToMementos () {
      $state.go('mementos');
    }

    function goToMomentCreate () {
      $state.go('moment');
    }
    
  }
})();
