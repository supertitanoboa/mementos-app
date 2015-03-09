(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */
  function Memento(DataHandler, $stateParams, $state, $ionicHistory, Events) {
    /*jshint validthis: true */
    var vm = this;
    vm.mementoID = Number($stateParams.ID);
    vm.viewer    = $stateParams.viewer;
    vm.memento   = {};
    
    vm.getMemento       = getMemento;
    vm.normalizeDate    = normalizeDate;
    vm.goToMementos     = goToMementos;
    vm.goToMomentCreate = goToMomentCreate;
    vm.showLoadProgress = showLoadProgress;
    vm.hideLoadProgress = hideLoadProgress;

    activate()

    ////////////////////////////////////////////////////////////

    function activate() {
      vm.getMemento();

      Events.on('newMoment', function() {
        vm.getMemento();
      });
    }

    function normalizeDate(moment) {
      return new Date(moment.releaseDate).getTime();
    }

    function getMemento() {
      vm.memento = DataHandler.mementos.get(vm.mementoID, vm.viewer);
    }

    function goToMementos () {
      $state.go('mementos');
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

      $state.go('moment');
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function showLoadProgress() {
      return $ionicLoading.show({
        template: 'Loading memento...'
      });
    }

    function hideLoadProgress() {
      return $ionicLoading.hide();
    }
    
  }
})();
