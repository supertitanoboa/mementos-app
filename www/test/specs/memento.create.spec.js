describe('app.memento.create', function() {
  var controller;
  var mockMemento;

  beforeEach(function() {
    module('app');

    inject(function(_$controller_, _dataservice_) {
      dataservice = _dataservice_;
      $controller = _$controller_;
    });

    sinon.stub(dataservice, 'saveMemento', function() {
      mockMemento = {
        'ID' : null,
        'title' : 'Fake memento',
        'owner' : 'User1',
        'authors' : ['User1'],
        'recipients'  : ['User2'],
        'options' : {
        'public'  : false,
        'releaseType' : 'default',
        },
        'latestReleasedIndex' : 1,
        'moments' : []
      };

      return mockData.saveMockMemento(mockMemento);
    });

    controller = $controller('MementoCreate');
  });

  afterEach(function() {
    dataservice.saveMemento.restore(); // Unwraps stub
    
  });

  describe('MementoCreate controller', function() {
    it('should be created successfully', function() {
      expect(controller).toBeDefined();
    });

    it('should have a currentMemento property', function() {
      expect(controller.currentMemento).not.toBe(null);
    });

    describe('currentMemento property', function() {
      it('should have a title property', function() {
        expect(controller.currentMemento.title).toEqual('');
      });

      it('should have a recipient property', function() {
        expect(controller.currentMemento.recipients).toEqual('');
      });
    });

    it('should have a saveMemento method', function() {
      expect(controller.saveMemento).not.toBe(null);
    });

    describe('saveMemento method', function() {
      it('should add mementos to database', function() {
        expect(mockData.getMockMementos().created.length).toEqual(2);
        dataservice.saveMemento({});
        expect(mockData.getMockMementos().created.length).toEqual(3);
      });
    });

  });

});