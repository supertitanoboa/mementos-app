(function() {

  angular
    .module('app.models')
    .factory('MementoModel', MementoModel);

  function MementoModel() {
    var memento = {};

    var mementoModel = {
      constructor: constructor,
      set: set,
      reset: reset,
      get: get,
      add: add
    };

    return mementoModel;

    /////////////////////////////////////
    
    function set(newMemento) {
      memento = angular.copy(newMemento);
    }

    function reset() {
      memento = {};
    }

    function get() {
      return angular.copy(memento);
    }

    function add(moment) {
      memento.moments.push(angular.copy(moment));
    }

    function constructor() {
      this.title = '';
      this.recipients = [];
      this.options = {
        'public'  : false,
        'releaseType' : 'default',
      };
      this.moments = [];
    }
  }

})();
