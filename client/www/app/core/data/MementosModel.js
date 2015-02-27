(function() {

  angular
    .module('app.data')
    .factory('MementosModel', MementosModel);

  function MementosModel() {
    // Mementos have 2 main properties.
    // created -> [{mementoID: } , .. , ]
    // received -> [, .. , ..]
    var mementos = {
      created: [],
      received: []
    };
    
    var mementosModel = {
      add: add,
      get: get,
      set: set,
      reset: reset,
      getAll: getAll,
      findByViewer: findByViewer,
      updateOrInsert: updateOrInsert,
      isUpdating: true
    };

    return mementosModel;

    //////////////////////////////////////////

    function set(updatedMementos) {
      mementos = angular.copy(updatedMementos);
    }

    function reset() {
      mementos = {
        created: [],
        received: []
      };
    }

    function add(memento, viewer) {
      mementos[viewer].push(angular.copy(memento));
    }

    function getAll() {
      return angular.copy(mementos);
    }

    function updateOrInsert(memento, viewer) {
      var mementoListIndex = -1;
      memento = angular.copy(memento);
      var i;

      for (i = 0; i < mementos[viewer].length; i++) {
        if (mementos[viewer][i].ID === memento.ID){
          mementoListIndex = i;
          break;
        }
      }

      if (mementoListIndex >= 0) {
        console.log('Mememto ID: ' + memento.ID + 'has been updated.');
        mementos[viewer][mementoListIndex] = memento;
      } else {
        console.log('Memento ID: ' + memento.ID + 'has been added to mementos list.');
        add(memento, viewer);
      }
    }

    function findByViewer(ID, viewer) {
      var memento;
      var i;

      for (i = 0; i < mementos[viewer].length; i++) {
        memento = mementos[viewer][i];
        if (Number(memento.ID) === ID){
          return memento;
        }
      }
      return null;
    }

    function get(ID) {      
      var mementoInCreated = findByViewer(ID, 'created');
      return  mementoInCreated ? mementoInCreated : findByViewer(ID, 'received');
    }
  }

})();
