(function() {

  angular
    .module('app.data')
    .factory('MementosModel', MementosModel);

  function MementosModel() {
    // Mementos have 2 main properties.
    // created -> [{mementoID: } , .. , ]
    // received -> [, .. , ..]
    var mementos = {};
    
    var mementosModel = {
      add: add,
      get: get,
      set: set,
      getAll: getAll,
      findByViewer: findByViewer,
      isUpdating: true
    };

    return mementosModel;

    //////////////////////////////////////////

    function set(updatedMementos) {
      mementos = angular.copy(updatedMementos);
    }

    function add(memento, viewer) {      
      mementos[viewer].push(memento);
    }

    function getAll() {
      return angular.copy(mementos);
    }

    function updateOrInsert(memento, viewer) {
      var mementoListIndex = -1;
      for (i = 0; i < mementos[viewer].length; i++) {
        if (mementos[viewer][i].ID === memento.ID){
          mementoListIndex = i;
          break;
        }
      }

      if (mementoListIndex > 0) {
        mementos[viewer][mementoListIndex] = memento;
      } else {
        add(memento, viewer);
      }
    }

    function findByViewer(ID, viewer) {
      var memento;

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
