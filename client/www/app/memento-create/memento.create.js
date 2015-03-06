(function() {
  'use strict';

  angular
    .module('app.memento.create')
    .controller('MementoCreate', MementoCreate);

  /* @ngInject */
  function MementoCreate($state, dataservice, CurrentMoment, $ionicHistory) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Create Memento';
    vm.currentMemento = new EmptyMemento();
    vm.momentID = {};
    vm.saveMemento = saveMemento;
    vm.addRecipient = addRecipient;
    vm.removeRecipient = removeRecipient;
    vm.recipient = '';
    vm.goBack = goBack;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      vm.momentID = CurrentMoment.get().momentID;
    }
    
    function saveMemento(currentMemento) {
      currentMemento.moments.push(vm.momentID);

      return dataservice.saveMemento(currentMemento)
        .then(function(mementoID) {
          console.log('Memento ' + mementoID.data + ' has been saved.');

          // NOTE: sets moment back to an empty object
          CurrentMoment.set({});

          $state.go('memento', {ID: mementoID.data});
        })
        .catch(function(err) {
          console.error('There was an error saving memento:', err);
        });
    }

    function addRecipient(recipient) {
      if(recipient !== '') {
        vm.currentMemento.recipients.push(recipient);
        vm.recipient = '';
      }
    }

    function removeRecipient(recipient) {
      var temp = [];
      var i;

      for(i = 0; i < vm.currentMemento.recipients.length; i++) {
        if(vm.currentMemento.recipients[i] !== recipient) {
          temp.push(vm.currentMemento.recipients[i]);
        }
      }
      
      vm.currentMemento.recipients = temp;
    }

    function EmptyMemento() {
      this.title = '';
      this.recipients = [];
      this.options = {
        'public'  : false,
        'releaseType' : 'default',
      };
      this.moments = [];
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function goBack() {
      return $ionicHistory.goBack()
    }

  }
})();
