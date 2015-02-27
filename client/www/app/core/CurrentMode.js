/*NOTE: cosider putting all 'Current' into one service*/
(function() {

  angular
    .module('app.core')
    .factory('CurrentMode', CurrentMode);

  function CurrentMode() {
    var mode = {mode: false}

    return {
      set: function(obj) {
        mode = angular.copy(obj);
      },
      get: function() {
        return angular.copy(moment);
      }
    };
  }

})();
