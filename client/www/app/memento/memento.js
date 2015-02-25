(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */
  function Memento(dataservice, $stateParams, download) {
    /*jshint validthis: true */
    var vm = this;
    vm.memento = {};
    vm.mementoID = Number($stateParams.ID);
    vm.getMemento = getMemento;

    activate();
    
    ////////////////////////////////////////////////////////////

    function activate() {
      return getMemento(vm.mementoID)
        .then(function(data) {
          console.log('Successful activating memento')
        })
        .catch(function(err) {
          console.error('There was an error activating memento', err)
        });
    }
    
    function getMemento(ID) {
      return dataservice.getMemento(ID)
        .then(function(memento) {
          console.log('Successful getting memento');
          vm.memento = memento.data;
        })
        .catch(function(err) {
          console.error('There was an error getting memento', err);
        });
    }
    
  }
})();
