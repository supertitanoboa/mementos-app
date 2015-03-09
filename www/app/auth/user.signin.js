(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignin', UserSignin);

    /* @ngInject */
    function UserSignin(DataHandler, $state, $ionicHistory, Alerts) {
      vm = this;
      vm.credentials = {};      
      vm.signin = signin;
      vm.goBack = goBack;

      /////////////////////////////////////      

      function signin(credentials) {
        return DataHandler.user.signin(credentials)
        .then(function() {
            $state.go('moment');
        })
        .catch(function(err) {
          console.error(err);
          if(err.data === 'Invalid username or password'){
            Alerts.showIncorrectPassword();
          } else {
            Alerts.showUserDoesNotExist();
          }
        });
      }

      // NOTE: all this nav functionality are candidates for a nav service 
      function goBack() {
        return $ionicHistory.goBack()
      }
    }  
})();
