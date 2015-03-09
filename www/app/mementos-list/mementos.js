(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(DataHandler, Events, $state, $ionicLoading) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'All Mementos';
    vm.mementos = {};
    vm.moment   = {};
    
    vm.setTitle         = setTitle;
    vm.addMoment        = addMoment;
    vm.refresh          = refresh;
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
          vm.refresh();
          vm.hideLoadProgress();
        });
      } else {
        vm.refresh();        
      }

      Events.on('newMemento', function() {
        console.log('newMement event triggered.')
        vm.refresh();
      });

      Events.on('newMoment', function() {
        console.log('newMoment event triggered.')
        vm.refresh();
      });

    }

    function refresh() {
      console.log('Refreshing the mementos view.')
      vm.mementos = DataHandler.mementos.getAll();
      vm.moment   = DataHandler.moment.get();
      vm.setTitle();
    }

    function addMoment(mementoID) {
      var memento = DataHandler.mementos.get(mementoID, 'created');
      vm.moment   = DataHandler.moment.get();

      if (vm.moment.hasOwnProperty('ID')) {
        DataHandler.memento.set(memento);      
        return DataHandler.memento.addMoment(vm.moment)
        .then(function(data) {
          console.log('Memento has been updated');

          var updatedMemento = DataHandler.memento.get(); 
          DataHandler.mementos.updateOrInsert(updatedMemento, 'created');
          vm.moment = DataHandler.moment.set({});

          Events.trigger('newMoment');
          
          vm.goToMemento(updatedMemento.ID, 'created');
        })
        .catch(function(err) {
          console.error('There was an error updating the memento:', err);
        });
      } else {
        vm.goToMemento(memento.ID, 'created');
      }
    }
    
    // FIXME: bug where 'Choose a Memento' shows immediately after a moment has been added
    function setTitle() {      
      if (vm.moment.hasOwnProperty('ID')) {
        vm.title = 'Choose a Memento';
      } else {
        vm.title = 'All Mementos';
      }
    }

    function goToMemento(mementoID, viewer) {
      $state.go('memento', {
        ID: mementoID,
        viewer: viewer
      });
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
