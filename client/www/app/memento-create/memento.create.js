(function() {
  'use strict';

  angular
    .module('app.memento.create')
    .controller('MementoCreate', MementoCreate);

  /* @ngInject */
  function MementoCreate($state, dataservice, CurrentMoment) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Create Memento';
    vm.currentMemento = new EmptyMemento();
    vm.saveMemento = saveMemento;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      var currentMoment = CurrentMoment.get().momentID;
      vm.currentMemento.moments.push(currentMoment);

      // NOTE: sets moment back to an empty object
      CurrentMoment.set({});
    }
    
    // pass sessionID
    function saveMemento(currentMemento) {
      return dataservice.saveMemento(currentMemento)
        .then(function(mementoID) {
          // NOTE: response is an object when received from server
          // FIXME: need to grab the mementoID properly from the server response
          console.log('Memento ' + mementoID.data + ' has been saved.');
          $state.go('memento', {ID: mementoID.data});
          
        })
        .catch(function(err) {
          // TODO: Connection errors, DB errors.
          // savingError(err);
          console.error('There was an error saving memento:', err);
        });
    }

    function EmptyMemento() {
      this.title = '';
      /*this.owner = 'User1'; */
      /*this.authors = [];*/
      this.recipients = [];
      this.options = {
        'public'  : false,
        'releaseType' : 'default',
      };
      this.moments = [];
    }
  }
})();
