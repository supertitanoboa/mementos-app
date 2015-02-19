(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */
  function Memento(dataservice, $stateParams) {
    /*jshint validthis: true */
    var vm = this;
    vm.memento = {};
    vm.mementoID = Number($stateParams.ID);
    vm.getMemento = getMemento;

    activate();
    
    ////////////////////////////////////////////////////////////

    function activate() {
      return getMemento(vm.mementoID).then(function() {
        console.log('Activated memento view');
      });
    }

    function getMemento(ID) {
      return dataservice.getMemento(ID)
        .then(function(data) {
          console.log('Successfull getting memento');

          vm.memento = data;
        })
        .catch(function(err) {
          console.error('There was an error getting memento:', err);
        });
    }
    
  }
})();