var mockData = (function() {
  var mementos;
  var mementosDetail;

  mementos = {
    'received' : [{
      'ID': 1,
      'title': 'Mock Memento 1',
      'authors' : ['User2'],
      'recipients'  : ['User1']
    }],
    'created' : [{
      'ID': 2,
      'title': 'Mock Memento 2',
      'authors' : ['User1'],
      'recipients'  : ['User2']
    }, {
      'ID': 3,
      'title': 'Mock Memento 3',
      'authors' : ['User1'],
      'recipients'  : ['User2']
    }]
  };

  mementosDetail = [{
    'ID' : 1,
    'title' : 'Mock Memento 1',
    'owner' : 'User2',
    'authors' : ['User2'],
    'recipients'  : ['User1'],
    'options' : {
      'public'  : false,
      'releaseType' : 'default',
    },
    'latestReleasedIndex' : 1,
    'moments' : [{
      'ID' : 1,
      'title' : 'Mock Moment 1',
      'author' : ['User 2'],
      'releaseDate' : '01/01/2016',
      'meta' : {
        'creationDate' : '01/01/2015',
        'location' : {
          'latitude' : 0,
          'longitude' : 0,
          'place' : 'Mock place'
        }
      },
      content : [{
        'type' : 'text',
        'url' : 'Mock text'
      }]
    }]
  }];

  return {
    getMockMementos: getMockMementos,
    getMockMemento: getMockMemento,
    saveMockMemento: saveMockMemento
  };

  function getMockMementos() {
    return mementos;
  }

  function getMockMemento(ID) {
    var memento;
    var i;

    for (i = 0; i < mementosDetail.length; i++) {
      if (mementosDetail[i].ID === ID) {
        memento = mementosDetail[i];
      }
    }

    return memento;
  }

  function saveMockMemento(obj) {
    /*
    NOTE: unecessary for current testing setup
    // add to mementos detail
    mementosDetail.push(obj);
    */
    
    // add to mementos
    var mementosObj = {
      'ID': obj.ID,
      'title': obj.title,
      'authors' : obj.authors,
      'recipients'  : obj.recipients
    };

    mementos.created.push(mementosObj);
  }

})();