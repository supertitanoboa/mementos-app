describe('app.mementos', function() {
  var controller;

  beforeEach(function() {
    module('app');
    module('templates');

    inject(function(_$controller_, _dataservice_, _$q_, _$rootScope_, _$httpBackend_) {
      dataservice = _dataservice_;
      $controller = _$controller_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
    });

    sinon.stub(dataservice, 'getMementos', function() {
      var deferred = $q.defer();
      deferred.resolve(mockData.getMockMementos());
      return deferred.promise;
    });

    controller = $controller('Mementos');
    $rootScope.$apply();
  });

  afterEach(function() {
    dataservice.getMementos.restore(); // Unwraps stub
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Mementos controller', function() {
    it('should be created successfully', function() {
      expect(controller).toBeDefined();
    });

    describe('after activate', function() {
      it('should have title of Mementos', function() {
        expect(controller.title).toEqual('Mementos');
      });

      it('should have a mementos property', function() {
        expect(controller.mementos).not.toBe(null);
      });

      it('should have 1 received memento in mementos', function() {
        expect(controller.mementos.received.length).toEqual(1);
      });

      it('should have 3 received mementos in mementos', function() {
        // NOTE: this is 3 because the mementoSave test adds a memento
        expect(controller.mementos.created.length).toEqual(3);
      });
    });

  });

});