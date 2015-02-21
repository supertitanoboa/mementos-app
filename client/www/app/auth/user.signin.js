(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignin', UserSignin);

    /* @ngInject */
    function UserSignin(dataservice, $state) {
      vm = this;
      vm.credentials = {};      
      vm.signin = signin;

      //////////////////////////////////////

      function signin(credentials) {
        return dataservice.signin(credentials)
          .then(function(result) {
            $state.go('moment');
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    }  
})();
