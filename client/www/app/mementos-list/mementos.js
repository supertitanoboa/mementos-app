(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(DataHandler, Events, $state, $ionicLoading) {
    /*jshint validthis: true */
    var vm = this;
    vm.title    = 'Mementos';
    vm.mementos = {};
    vm.moment   = DataHandler.moment.get();

    vm.addMoment        = addMoment;
    vm.getMementos      = getMementos;
    vm.goToMomentCreate = goToMomentCreate;
    vm.goToMemento      = goToMemento;
    vm.showLoadProgress = showLoadProgress;
    vm.hideLoadProgress = hideLoadProgress;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      // TODO: Don't get Mementos until mementos.isUpdating = false.
      if (DataHandler.mementos.isUpdating) {
        vm.showLoadProgress();
        Events.on('mementosUpdateComplete', function() {
          vm.getMementos();
          vm.hideLoadProgress();
        });
      } else {
        vm.getMementos();        
      }
    }

    function getMementos() {
      vm.mementos = DataHandler.mementos.getAll();
    }

    function addMoment(memento) {

      if (vm.moment.hasOwnProperty('ID')) {
        DataHandler.memento.set(memento);      
        return DataHandler.memento.addMoment(vm.moment)
        .then(function(data) {
          console.log('Memento has been updated');
          
          // NOTE: sets moment back to an empty object
          DataHandler.moment.set({});
          vm.goToMemento(memento.ID);          
        })
        .catch(function(err) {
          console.error('There was an error updating the memento:', err);
        })
      } else {
        vm.goToMemento(memento.ID);
      }
    }

    function goToMemento(mementoID) {      
      $state.go('memento', {ID: mementoID});
    }    
    
    function goToMomentCreate () {
      $state.go('moment')
    }
    
    function showLoadProgress() {
      return $ionicLoading.show({
        template: 'Loading mementos...'
      });
    }

    function hideLoadProgress() {
      return $ionicLoading.hide();
    }
  }
})();
