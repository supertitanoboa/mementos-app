/*NOTE: cosider putting all 'Current' into one service*/
(function() {

  angular
    .module('app.core')
    .factory('CurrentMoment', CurrentMoment);

  function CurrentMoment() {
    var moment = {}

    return {
      set: function(obj) {
        moment = angular.copy(obj);
      },
      get: function() {
        return angular.copy(moment);
      }
    };
  }

})();
