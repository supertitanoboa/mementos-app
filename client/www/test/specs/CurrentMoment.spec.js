describe('CurrentMoment', function() {
  var CurrentMoment;
  
  beforeEach(function() {
    module('app');

    inject(function(_CurrentMoment_, _$httpBackend_, _$rootScope_) {
      CurrentMoment = _CurrentMoment_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;  
    });
  });

  it('starts off as an empty object', function() {
    expect(CurrentMoment.get()).toEqual({});
  });

  it('does not return the same object, but a deep copy', function() {
    var obj = {a : true, b : true };
    CurrentMoment.set(obj);
    
    expect(CurrentMoment.get()).not.toBe(obj);
    expect(stringified).toEqual(JSON.stringify(obj));
  });

});