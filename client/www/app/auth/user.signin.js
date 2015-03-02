(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignin', UserSignin);

    /* @ngInject */
    function UserSignin(dataservice, $state, CurrentUser, Notifications) {
      vm = this;
      vm.credentials = {};      
      vm.signin = signin;

      //////////////////////////////////////

      function signin(credentials) {
        return dataservice.signin(credentials)
          .then(function(res) {            
            CurrentUser.set({
              sessionID: res.data.sessionID, 
              userID: res.data.userID
            });
            
            Notifications.emit('sendUser', { userID: res.data.userID });

            $state.go('moment');
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }  
})();
