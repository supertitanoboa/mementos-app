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
    vm.showLoadProgress = showLoadProgress;
    vm.hideLoadProgress = hideLoadProgress;

    function goToMementos () {
      $state.go('mementos');
    }

    function goToMomentCreate () {
      $state.go('moment');
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function showLoadProgress() {
      return $ionicLoading.show({
        template: 'Loading memento...'
      });
    }

    function hideLoadProgress() {
      return $ionicLoading.hide();
    }
    
  }
})();

