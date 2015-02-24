(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignup', UserSignup);

    /* @ngInject */
    function UserSignup(dataservice, $state) {
      vm = this;
      vm.credentials = {};
      vm.repeatPassword = '';
      vm.signup = signup;

      //////////////////////////////////////

      function signup(credentials) {
        console.log('here out!', credentials);
        return dataservice.signup(credentials)
          .then(function(result) {
            console.log('here!')
            $state.go('moment');
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }  
})();
