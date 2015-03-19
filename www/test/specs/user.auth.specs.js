describe('User Authorization Process', function() {
  var signup;
  var login;
  var scope;
  var controller;
  var dataservice;

  beforeEach(function() {
    module('app', 'templates');

    inject(function(_dataservice_, _$rootScope_, _$controller_) {
      dataservice = _dataservice_;
      scope = _$rootScope_.$new();
      controller = _$controller_;
    });

    controller = controller('UserSignup', { $scope: scope });

  });

  it('has a credentials object', function() {
     expect(controller.credentials).toBeDefined();
  });

});
