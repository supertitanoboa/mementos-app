(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignup', UserSignup);

    /* @ngInject */
    function UserSignup(dataservice, $state, CurrentUser) {
      vm = this;
      vm.credentials = {};
      vm.repeatPassword = '';
      vm.signup = signup;

      //////////////////////////////////////

      function signup(credentials) {
        return dataservice.signup(credentials)
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
