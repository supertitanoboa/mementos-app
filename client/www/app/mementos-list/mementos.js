(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(dataservice, CurrentMoment, $stateParams) {
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
        .then(function(data) {
          console.log('Successfull getting mementos');

          vm.mementos = data;
        })
        .catch(function(err) {
          console.error('There was an error getting mementos:', err);
        });
    }

    function addMoment(mementoID) {
      var momentID = CurrentMoment.get();

      return dataservice.addMoment(mementoID, momentID.momentID)
        .then(function(momentID) {
          console.log('Moment ' + momentID + ' has been added.');
          
          // NOTE: sets moment back to an empty object
          CurrentMoment.set({});
        })
        .catch(function(err) {
          console.error('There was an error adding the moment:', err);
        });
    }

  }
})();