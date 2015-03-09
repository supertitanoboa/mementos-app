(function() {

  angular
    .module('app.models')
    .factory('UserModel', UserModel);

  function UserModel() {
    var user = {};

    var userModel = {
      set: set,
      reset: reset,
      get: get
    };

    return userModel;

    function set(newUser) {
      user = angular.copy(newUser);
    }

    function reset() {
      user = {};
    }
    
    function get() {
      return angular.copy(user);
    }
  }
  
})();
