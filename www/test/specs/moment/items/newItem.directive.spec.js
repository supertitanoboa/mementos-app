describe('Items', function() {
  describe('newText directive', function() {
    var scope;
    var element;
    var $httpBackend;
    var isolateScope;

    var EmptyMoment = function() {
      var today = new Date();
      this.title = '';
      this.content = []; 
      this.releaseDate = today.setFullYear(today.getFullYear() + 1);
      this.meta = {
        location: {
          latitude: null,
          longitude: null,
          place: ''
        }
      };
    };
    
    beforeEach(function() {
      module('app', 'templates');      

      inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
        $compile = _$compile_;        
        $httpBackend = _$httpBackend_;

        scope = _$rootScope_.$new();
      });
      
      scope.emptyMoment = new EmptyMoment();
      element = $compile("<new-item moment='emptyMoment'></new-item>")(scope);
      scope.$digest();
      
      scope = element.isolateScope();
      scope.$digest();      
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should set scope.typeSelected to selectType\'s arg when called', function() {
      scope.selectType('dummy');
      expect(scope.typeSelected).toEqual('dummy');
    });
    
    it('should set scope.typeSelected to null when done is called', function() {
      scope.selectType('dummy');
      expect(scope.typeSelected).toEqual('dummy');
      scope.done();
      expect(scope.typeSelected).toEqual(null);
    });

    it('should insert am item into a moment', function() {
      var lastContentFromMoment; 
      scope.insertIntoMoment('here is the type','here is the url');
      lastContentFromMoment = scope.moment.content.pop();
      expect(lastContentFromMoment.type).toEqual('here is the type');
      expect(lastContentFromMoment.url).toEqual('here is the url');
    });
    

  });
});