(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignup', UserSignup);

    /* @ngInject */
    function UserSignup(DataHandler, $state, $ionicHistory, Alerts) {
      vm = this;
      vm.credentials = {};
      vm.repeatPassword = '';
      vm.passwordError = false;
      vm.signup = signup;
      vm.goBack = goBack;

      /////////////////////////////////////      

      function signup(credentials) {
        if(credentials.password !== vm.repeatPassword) {
          return vm.passwordError = true;
        }

        return DataHandler.user.signup(credentials)
        .then(function() {
          // reset credentials
          vm.credentials = {};
          vm.repeatPassword = '';
          
          $state.go('moment');
        })
        .catch(function(err) {
          console.error(err);
          Alerts.showUserExists();
        });
      }

      // NOTE: all this nav functionality are candidates for a nav service 
      function goBack() {
        return $ionicHistory.goBack()
      }
    }  
})();
