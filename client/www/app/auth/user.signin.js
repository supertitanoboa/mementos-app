(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignin', UserSignin);

    /* @ngInject */
    function UserSignin(Notifications, DataHandler, dataservice, $state, Events, $ionicHistory, Alerts) {
      vm = this;
      vm.credentials = {};      
      vm.signin = signin;
      vm.goBack = goBack;

      /////////////////////////////////////

      // FIX! Try to make these run when platform is ready!
      Notifications.activate();
      DataHandler.activate();
      //

      function signin(credentials) {
        return dataservice.signin(credentials)
          .then(function(res) {
            var userInfo = {
              sessionID: res.data.sessionID, 
              userID: res.data.userID
            };

            Events.trigger('userLogin', userInfo);

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
