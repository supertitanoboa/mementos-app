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

      Events.on('newMemento', function() {
        vm.getMementos();
      })


    }

    function getMementos() {
      vm.mementos = DataHandler.mementos.getAll();
    }

    function addMoment(memento) {
      vm.moment = DataHandler.moment.get();

      if (vm.moment.hasOwnProperty('ID')) {
        DataHandler.memento.set(memento);      
        return DataHandler.memento.addMoment(vm.moment)
        .then(function(data) {
          console.log('Memento has been updated');
          var updatedMemento = DataHandler.memento.get(); 
          // NOTE: sets moment back to an empty object
          DataHandler.mementos.updateOrInsert(updatedMemento, 'created');
          
          // NOTE: reset moment back to an empty object
          vm.moment = DataHandler.moment.set({});

          vm.goToMemento(updatedMemento.ID);
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

      var plus = document.getElementsByClassName('plusSign')[0];
      
      // fades in and antispins plus sign
      setTimeout(function() {
        plus.className = plus.className.split(' fadeout')[0] + ' fadein antispin';
      }, 100);

      // removes antispin class
      setTimeout(function() {
        var plus = document.getElementsByClassName('plusSign')[0];
        plus.className = plus.className.split(' antispin')[0];
      }, 400);

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

