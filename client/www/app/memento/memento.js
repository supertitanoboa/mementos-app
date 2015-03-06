(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */
  function Memento(dataservice, $stateParams, download, $state, $ionicLoading, $ionicHistory, CurrentViewer) {
    /*jshint validthis: true */
    var vm = this;
    vm.memento = {};
    vm.mementoID = Number($stateParams.ID);
    vm.viewer = CurrentViewer.get().viewer;
    vm.getMemento = getMemento;
    vm.goToMementos = goToMementos;
    vm.goToMomentCreate = goToMomentCreate;
    vm.showLoadProgress = showLoadProgress;
    vm.hideLoadProgress = hideLoadProgress;

    activate();
    
    ////////////////////////////////////////////////////////////

    function activate() {
      getMemento(vm.mementoID)
    }
    
    function getMemento(ID) {
      // opens load in progress window
      vm.showLoadProgress();
        
      return dataservice.getMemento(ID, vm.viewer)
        .then(function(memento) {
          console.log('Successful getting memento');

          // closes load in progress window
          vm.hideLoadProgress();
          
          vm.memento = memento.data;
        })
        .catch(function(err) {
          console.error('There was an error getting memento', err);

          // getMemento again
          vm.getMemento(vm.mementoID);
        });
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
    
    function goToMementos () {
      $state.go('mementos');
    }

    function goToMomentCreate () {
      $state.go('moment');
    }
    
  }
})();
