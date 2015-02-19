describe('dataservice', function() {
  var dataservice;
  var mocks = {};

  beforeEach(function() {
    module('app');

    inject(function(_dataservice_, _$httpBackend_, _$rootScope_) {
      dataservice = _dataservice_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;  
    });

    /*mocks = mockData.getMockMementos();*/

  });

  it('should be registered', function() {
    expect(dataservice).not.toBe(null);
  });

  describe('getMementos function', function() {
    it('should exist', function() {
      expect(dataservice.getMementos).not.toBe(null);
    });
    
    // FIXME: come back to these tests... how to mock data for method calls?
    it('should get 3 mementos', function() {

      /*// use this when endpoints set up
      $httpBackend.when('GET', '/1/api/mementos').respond(200, mocks);
      dataservice.getMementos().then(function(data) {
        expect(data.length).toEqual(3);
        done();
      });
      $rootScope.$apply();
      $httpBackend.flush();*/
    });
  });

  describe('getMemento function', function() {
    it('should exist', function() {
      expect(dataservice.getMemento).not.toBe(null);
    });

    // add additional tests
  });

  describe('saveMoment function', function() {
    it('should exist', function() {
      expect(dataservice.saveMoment).not.toBe(null);
    });

    // add additional tests
  });

  describe('saveMementos function', function() {
    it('should exist', function() {
      expect(dataservice.saveMementos).not.toBe(null);
    });

    // add additional tests
  });

  describe('addMoment function', function() {
    it('should exist', function() {
      expect(dataservice.addMoment).not.toBe(null);
    });

    // add additional tests
  });

});