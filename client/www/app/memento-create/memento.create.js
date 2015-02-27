(function() {
  'use strict';

  angular
    .module('app.memento.create')
    .controller('MementoCreate', MementoCreate);

  /* @ngInject */
  function MementoCreate($state, DataHandler, $ionicHistory, Events) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Create Memento';
    vm.currentMemento = new DataHandler.memento.constructor();
    
    vm.saveMemento        = saveMemento;
    vm.routeToMemento     = routeToMemento;
    vm.addMomentToMemento = addMomentToMemento;
    vm.addRecipient       = addRecipient;
    vm.removeRecipient    = removeRecipient;
    vm.recipient          = '';
    vm.goBack             = goBack;

    ////////////////////////////////////////////////////////////
    
    function saveMemento(currentMemento) {
      var currentMoment = DataHandler.moment.get();

      DataHandler.memento.set(currentMemento);
      return DataHandler.memento.save()
      .then(function(mementoID) {
        var updatedMemento = angular.extend(currentMemento, {
          ID: mementoID.data
        })
        console.log('Memento ' + mementoID.data + ' has been created.');
        return updatedMemento;
      })
      .then(function(updatedMemento) {        

        DataHandler.memento.set(updatedMemento);

        if (currentMoment.hasOwnProperty('ID')) {          
          addMomentToMemento(currentMoment);
        } else {
          routeToMemento({
            data: updatedMemento.ID
          });
        } 
      })
      .catch(function(err) {
        console.error('Error creating memento');
        console.error(err);
      })

    }

    function routeToMemento() {
      DataHandler.moment.set({});
      var memento = DataHandler.memento.get();

      DataHandler.mementos.add(memento, 'created');      
      
      console.log('Memento with ID: ' + memento.ID + ' added to mementos list');

      Events.trigger('newMemento');
      vm.currentMemento = new DataHandler.memento.constructor();      
      $state.go('memento', { ID: memento.ID });
    }

    function addMomentToMemento(moment) {
      return DataHandler.memento.addMoment(moment)
      .then(routeToMemento)
      .catch(function(err) {
        // TODO: Connection errors, DB errors.
        // savingError(err);
        console.error('There was an error adding moment to Memento:', err);
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

    // NOTE: all this nav and progress functionality should become part of a service library
    function goBack() {
      return $ionicHistory.goBack()
    }

  }
})();
