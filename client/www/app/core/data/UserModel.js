(function() {

  angular
    .module('app.data')
    .factory('UserModel', UserModel);

  function UserModel() {
    var user = {};

    var userModel = {
      set: set,
      get: get
    };

    return userModel;

    function set(newUser) {
      user = angular.copy(newUser);
    }
    
    function get() {
      return angular.copy(user);
    }
  }
  
})();
