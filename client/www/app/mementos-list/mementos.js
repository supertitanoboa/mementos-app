(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(dataservice, CurrentMoment, $state, $ionicLoading, CurrentViewer) {
    /*jshint validthis: true */
    var vm = this;
    vm.mementos = {};
    vm.title = 'Mementos';
    vm.addMoment = addMoment;
    vm.getMementos = getMementos;
    vm.setViewer = setViewer;
    vm.goToMomentCreate = goToMomentCreate;
    vm.goToMemento = goToMemento;
    vm.momentID = {};
    vm.showLoadProgress = showLoadProgress;
    vm.hideLoadProgress = hideLoadProgress;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      // opens load in progress window
      vm.showLoadProgress();

      vm.getMementos()
        .then(function() {
          console.log('Activated mementos view');

          // closes load in progress window
          vm.hideLoadProgress();
        })
        .catch(function(err) {
          console.error('There was an error getting mementos:', err);
        });
    }

    function getMementos() {

      return dataservice.getMementos()
        .then(function(mementos) {
          console.log('Successful getting mementos');
          vm.mementos = mementos.data;
        })
        .catch(function(err) {
          console.error('There was an error getting mementos:', err);
        });
    }

    function addMoment(mementoID) {
      // get current moment
      vm.momentID = CurrentMoment.get();

      // if moment exists, update memento
      if(vm.momentID.hasOwnProperty('momentID')) {
        // update memento in database
        return dataservice.updateMemento(mementoID, vm.momentID)
          .then(function(data) {
            console.log('Memento ' + mementoID + ' has been updated');
            
            // set current moment back to an empty object and go to update memento
            CurrentMoment.set({});
            vm.goToMemento(mementoID, 'author');
          })
          .catch(function(err) {
            console.error('There was an error updating the memento:', err);
          })
      } else {
        vm.goToMemento(mementoID, 'author');
      }

    }

    function goToMemento(mementoID, viewer) {
      if (viewer) {
        vm.setViewer(viewer);
      } else {
        vm.setViewer('recipient')
      }

      $state.go('memento', {ID: mementoID});
    }

    function setViewer(viewer) {
      CurrentViewer.set({viewer: viewer});
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function showLoadProgress() {
      return $ionicLoading.show({
        template: 'Loading mementos...'
      });
    }

    function hideLoadProgress() {
      return $ionicLoading.hide();
    }

    function goToMomentCreate () {
      $state.go('moment')
    }

  }
})();
