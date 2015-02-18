describe('Moment Creation logic', function() {
  describe('Controller data binding and logic', function(){
      
    var $scope;
    var $controller;
    var $rootScope;
    var $state;
    var $httpBackend;
    var controller;
    var dataservice;
    var currentMoment;
    var stateStub;
    var CurrentMoment;
    
    beforeEach(function() {
      module('app');
      module('templates');

      inject(function(_$controller_, _dataservice_, _$rootScope_, _$state_, _$httpBackend_) {
        $controller   = _$controller_;
        $state        = _$state_;
        $rootScope    = _$rootScope_.$new();
        $httpBackend  = _$httpBackend_;
        CurrentMoment = CurrentMoment;

        dataservice   = _dataservice_;
      });
      
      $scope = {};
      controller = $controller('MomentCreate', { $scope: $scope });
      currentMoment = controller.currentMoment;
      dataservice.saveMoment = sinon.spy(dataservice, 'saveMoment');

      stateStub = sinon.stub($state, 'go');
    });

    afterEach(function() {
      stateStub.restore();
      dataservice.saveMoment.restore();
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function() {
      expect(currentMoment).toBeDefined();
    });

    it('should have a currentMoment object', function() {
      expect(typeof currentMoment).toEqual('object');
      expect(Array.isArray(currentMoment)).toBe(false);
    });
    
    it('should have properties that are not initialized', function() {      
      expect(currentMoment.title).toBeDefined();
      expect(currentMoment.content).toBeDefined();
      expect(currentMoment.releaseDate).toBeDefined();
      expect(currentMoment.meta).toBeDefined();      
    });

    it('should have a saveMoment function', function() {
      expect(controller.saveMoment).toBeDefined();
      expect(typeof controller.saveMoment).toEqual('function');
    });

    it('should send a saved momentID to the mementos state', function() {
      controller.saveMoment(currentMoment)
      .then(function() {        
        expect(stateStub.calledWith('mementos')).toBe(true);
        expect(dataservice.saveMoment.calledWith(currentMoment)).toBe(true);
      });

      $rootScope.$digest();
    });

  });
});