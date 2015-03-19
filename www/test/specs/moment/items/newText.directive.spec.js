describe('Items', function() {
  describe('newText directive', function() {
    var scope;
    var element;
    var $httpBackend;
    
    beforeEach(function() {
      module('app', 'templates');      

      inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
        $compile = _$compile_;        
        $httpBackend = _$httpBackend_;

        scope = _$rootScope_.$new();
      });

      element = $compile("<new-text></new-text>")(scope);
      scope.$digest();
      
      scope.done = sinon.stub();
      scope.insertIntoMoment = sinon.stub();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add a textarea, save and a cancel button', function() {
      var buttons;
      buttons = element.find('button');
      expect(element.find('textarea').length).toBe(1);
      expect(buttons.eq(0).hasClass('save')).toBe(true);
      expect(buttons.eq(1).hasClass('cancel')).toBe(true);
    });

    it('shoud add a saveText function to the scope', function() {
      expect(scope.saveText).toBeDefined();
      expect(typeof scope.saveText).toEqual('function');
    });
    
    it('shoud add a cancel function to the scope', function() {
      expect(scope.cancel).toBeDefined();
      expect(typeof scope.cancel).toEqual('function');
    });
    
    it('should insertIntoMoment when saveText is called', function() {
      scope.saveText('test');
      expect(scope.insertIntoMoment.firstCall.calledWith('text','test')).toBe(true);
    });
    

  });
});