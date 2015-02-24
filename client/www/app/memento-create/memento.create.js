(function() {
  'use strict';

  angular
    .module('app.memento.create')
    .controller('MementoCreate', MementoCreate);

  /* @ngInject */
  function MementoCreate($state, dataservice, CurrentMoment , $stateParams) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Create Memento';
    vm.currentMemento = new EmptyMemento();
    vm.saveMemento = saveMemento;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      return addMoment();
    }

    function saveMemento(currentMemento) {
      return dataservice.saveMemento(currentMemento)
        .then(function(mementoID) {
          // NOTE: response is an object when received from server
          console.log('Memento ' + mementoID + ' has been saved.');
          $state.go('memento', {ID: mementoID});
          
        })
        .catch(function(err) {
          // TODO: Connection errors, DB errors.
          // savingError(err);
          console.error('There was an error saving memento:', err);
        });
    }

    function addMoment() {
      var momentID = CurrentMoment.get();
      
      // NOTE: adds entire moment to fit dummy data.  Will only add momentID when connected with server
      return dataservice.getMoment(momentID.momentID)
        .then(function(data) {
          console.log('Successfull getting moment');

          vm.currentMemento.moments.push(data);

          // NOTE: sets moment back to an empty object
          CurrentMoment.set({});
        })
        .catch(function(err) {
          console.error('There was an error getting moment:', err);
        });
    }

    function EmptyMemento() {
      this.title = '';
      this.owner = 'User1';
      this.authors = [this.owner];
      this.recipients = '';
      this.options = {
        'public'  : false,
        'releaseType' : 'default',
      };
      this.latestReleasedIndex = 1;
      this.moments = [];
    }
  }
})();