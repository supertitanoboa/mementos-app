describe('app.memento', function() {
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

    sinon.stub(dataservice, 'getMemento', function() {
      var deferred = $q.defer();
      deferred.resolve(mockData.getMockMemento(1));
      return deferred.promise;
    });
    
    controller = $controller('Memento');
    $rootScope.$apply();
  });

  afterEach(function() {
    dataservice.getMemento.restore(); // Unwraps stub
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Memento controller', function() {
    it('should be created successfully', function() {
      expect(controller).toBeDefined();
    });

    describe('after activate', function() {

      describe('memento data', function() {
        it('memento should have title of "Mock Memento 1"', function() {
          expect(controller.memento.title).toEqual('Mock Memento 1');
        });

        it('memento should have ID of 1', function() {
          expect(controller.memento.ID).toEqual(1);
        });

        it('memento should have 1 moment', function() {
          expect(controller.memento.moments.length).toEqual(1);
        });
      });

    });

  });

});