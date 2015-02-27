(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignup', UserSignup);

    /* @ngInject */
    function UserSignup(Notifications, DataHandler, dataservice, $state, Events, $ionicHistory, Alerts) {
      vm = this;
      vm.credentials = {};
      vm.repeatPassword = '';
      vm.passwordError = false;
      vm.signup = signup;
      vm.goBack = goBack;

      /////////////////////////////////////

      // FIX! Try to make these run when platform is ready!
      Notifications.activate();
      DataHandler.activate();
      //

      function signup(credentials) {
        if(credentials.password !== vm.repeatPassword) {
          return vm.passwordError = true;
        }

        return dataservice.signup(credentials)
          .then(function(res) {            
            var userInfo = {
              sessionID: res.data.sessionID, 
              userID: res.data.userID
            };

            // reset credentials
            vm.credentials = {};
            vm.repeatPassword = '';
            
            Events.trigger('userLogin', userInfo);
            
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

