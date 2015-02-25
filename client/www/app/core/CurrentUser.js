(function() {

  angular
    .module('app.core')
    .factory('CurrentUser', CurrentUser);

  function CurrentUser() {
    var user = {}

    return {
      set: function(obj) {
        user = angular.copy(obj);
      },
      get: function() {
        return angular.copy(user);
      }
    };
  }

})();
