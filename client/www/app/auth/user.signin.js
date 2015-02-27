(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignin', UserSignin);

    /* @ngInject */
    function UserSignin(dataservice, $state, CurrentUser) {
      vm = this;
      vm.credentials = {};      
      vm.signin = signin;

      //////////////////////////////////////

      function signin(credentials) {
        return dataservice.signin(credentials)
          .then(function(res) {
            CurrentUser.set({sessionID: res.data});
            $state.go('moment');
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }  
})();
