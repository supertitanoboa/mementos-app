(function() {

  angular.module('app.core')
  .factory('CurrentMoment', CurrentMoment);

  function CurrentMoment() {
    var moment = {}

    return {
      set: function(obj) {
        moment = angular.copy(obj);
      },
      get: function(obj) {
        return angular.copy(moment);
      }
    };
  }

})();