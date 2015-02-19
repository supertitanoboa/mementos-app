
describe('dataservice', function() {
  var dataservice;

  beforeEach(function() {
    module('app');

    inject(function(_dataservice_, _$httpBackend_, _$rootScope_) {
      dataservice = _dataservice_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;  
    });

    sinon.stub(dataservice, 'getMementos', function() {
      return mockData.getMockMementos();
    });

    sinon.stub(dataservice, 'getMemento', function() {
      return mockData.getMockMemento(1);
    });

  });

  afterEach(function() {
    dataservice.getMementos.restore(); // Unwraps stub
    dataservice.getMemento.restore();
  });

  it('should be registered', function() {
    expect(dataservice).not.toBe(null);
  });

  describe('getMementos function', function() {
    it('should exist', function() {
      expect(dataservice.getMementos).not.toBe(null);
    });
    
    it('should get 1 received memento', function() {
      expect(dataservice.getMementos().received.length).toEqual(1);
    });

    it('should get 2 created mementos', function() {
      expect(dataservice.getMementos().created.length).toEqual(2);
    });
  });

  describe('getMemento function', function() {
    it('should exist', function() {
      expect(dataservice.getMemento).not.toBe(null);
    });

    it('should get 1 memento', function() {
      expect(dataservice.getMemento(1)).toEqual(jasmine.any(Object));
    });
  });

  describe('saveMoment function', function() {
    it('should exist', function() {
      expect(dataservice.saveMoment).not.toBe(null);
    });

    // add additional tests
  });

  describe('saveMemento function', function() {
    it('should exist', function() {
      expect(dataservice.saveMemento).not.toBe(null);
    });

    // NOTE: these tests are very similar to what is in each controller.
    // should be thinking about these in terms of http request
  });

  describe('addMoment function', function() {
    it('should exist', function() {
      expect(dataservice.addMoment).not.toBe(null);
    });

    // add additional tests
  });

});