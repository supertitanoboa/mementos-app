/*NOTE: cosider putting all 'Current' into one service*/
(function() {

  angular
    .module('app.core')
    .factory('CurrentViewer', CurrentViewer);

  function CurrentViewer() {
    var viewer = {}

    return {
      set: function(obj) {
        viewer = angular.copy(obj);
      },
      get: function() {
        return angular.copy(viewer);
      }
    };
  }

})();
