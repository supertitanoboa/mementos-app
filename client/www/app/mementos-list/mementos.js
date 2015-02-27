(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(dataservice, CurrentMoment) {
    /*jshint validthis: true */
    var vm = this;
    vm.mementos = {};
    vm.title = 'Mementos';
    vm.addMoment = addMoment;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      return getMementos().then(function() {
        console.log('Activated mementos view');
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
      var momentID = CurrentMoment.get();

      // update memento in database
      return dataservice.updateMemento(mementoID, momentID)
        .then(function(data) {
          console.log('Memento ' + mementoID + ' has been updated');
          
          // NOTE: sets moment back to an empty object
          CurrentMoment.set({});
        })
        .catch(function(err) {
          console.error('There was an error updating the memento:', err);
        })
    }

  }
})();
