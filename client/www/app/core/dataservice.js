(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
  
  /*TODO: $http, $q and other dependencies will be needed when connecting to server*/
  /*FIXME: makesure ngInject is working during minification*/
  
  /* @ngInject */ 
  function dataservice($q) {
    

    // MOCKED DATA
    // NOTE: These were uglified to provide better visibility to the funcitons below.
    // If you need to insert, retrieve something from them, copy and pasta them into: http://jsbeautifier.org/
    //
    // mementos table - NOTE: assumes that the user is 'Wes'
    var mementos={received:[{ID:3,title:"For wes",authors:["Mom"],recipients:["Wes"]}],created:[{ID:1,title:"For mom",authors:["Wes"],recipients:["Mom"]},{ID:2,title:"For my girlfriend",authors:["Wes"],recipients:["Girlfriend"]}]};
    // detailed mementos table - NOTE: assumes that the user is 'Wes'
    var mementosDetail=[{ID:1,title:"For mom",owner:"Wes",authors:["Wes"],recipients:["Mom"],options:{"public":!1,releaseType:"default"},latestReleasedIndex:1,moments:[{ID:1,title:"Hi mom!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my mom who is awesome.  Awesome bro!!"}]},{ID:2,title:"love youuuuuu mom!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy mom!!"}]}]},{ID:2,title:"For my girlfriend",owner:"Wes",authors:["Wes"],recipients:["Girlfriend"],options:{"public":!1,releaseType:"default"},latestReleasedIndex:1,moments:[{ID:3,title:"Hey girl!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my girlfriend who is awesome.  Awesome bro!!"}]},{ID:4,title:"love youuuuuu girl!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy girl!!"}]}]},{ID:3,title:"For Wes",owner:"Mom",authors:["Mom"],recipients:["Wes"],options:{"public":!1,releaseType:"default"},latestReleasedIndex:1,moments:[{ID:5,title:"Hey son!",author:["Mom"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my Wes who is awesome.  Awesome!!"}]},{ID:6,title:"love youuuuuu son!",author:["Mom"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy son!!"}]}]}];
    // moment table
    var moments=[{ID:1,title:"Hi mom!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my mom who is awesome.  Awesome bro!!"}]},{ID:2,title:"love youuuuuu mom!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy mom!!"}]},{ID:3,title:"Hey girl!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my girlfriend who is awesome.  Awesome bro!!"}]},{ID:4,title:"love youuuuuu girl!",author:["Wes"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy girl!!"}]},{ID:5,title:"Hey son!",author:["Mom"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my awesome note to my Wes who is awesome.  Awesome!!"}]},{ID:6,title:"love youuuuuu son!",author:["Mom"],releaseDate:"01/01/2016",meta:{creationDate:"01/01/2015",location:{latitude:0,longitude:0,place:"Someplace awesome"}},content:[{type:"text",url:"This is my looooooooooove noooote tooo mmyyy son!!"}]}];
    //
    // MOCKED DATA - END

    var service = {
      getMementos: getMementos,
      getMemento: getMemento,
      saveMoment: saveMoment,
      saveMemento: saveMemento,
      addMoment: addMoment
    };

    return service;
    
    // NOTE: server will only return mementos associated with user
    function getMementos() {
      return mementos;
    }
    
    // NOTE: memento ID will be supplied from getMementos call in list view
    function getMemento(ID) {
      var memento;
      var i;

      ID = ID || 1;

      for (i = 0; i < mementosDetail.length; i++) {
        if (mementosDetail[i].ID === ID) {
          memento = mementosDetail[i];
        }
      }

      return memento;
    }
    
    // NOTE: moment is saved to moments table first, then added to memento
    function saveMoment(obj) {
      obj = obj || {
        'ID' : null,
        'title' : 'fake moment',
        'author' : ['Wes'],
        'releaseDate' : '01/01/2016',
        'meta' : {
          'creationDate' : '01/01/2015',
          'location' : {
            'latitude' : 0,
            'longitude' : 0,
            'place' : 'Someplace fake'
          }
        },
        content : [{
          'type' : 'text',
          'url' : 'This is a fake moment' // using media instead of url pointing to it for time being
        }]
      };

      obj.ID = momentsSize() + 1;
      
      moments.push(obj);

      return $q(function(resolve, reject) {
        resolve(obj.ID);
      });
    }
    
    // NOTE: addMoment happens concurrently with memento creation
    function saveMemento(obj) {
      obj = obj || {
        'ID' : null,
        'title' : 'Fake memento',
        'owner' : 'Wes',
        'authors' : ['Wes'],
        'recipients'  : ['Mom'],
        'options' : {
        'public'  : false,
        'releaseType' : 'default',
        },
        'latestReleasedIndex' : 1, // associated with moments array.  latest moment released
        'moments' : []
      };

      obj.ID = mementosSize() + 1;

      // add to mementos detail
      mementosDetail.push(obj);
      
      // add to mementos
      var mementosObj = {
        'ID': obj.ID,
        'title': obj.title,
        'authors' : obj.authors,
        'recipients'  : obj.recipients
      };

      if (obj.authors[0] === 'Wes') {
        mementos.created.push(mementosObj);
      } else {
        mementos.received.push(mementosObj);
      }
    }
    
    // NOTE: adds moment to selected memento
    function addMoment(ID) {
      var i;

      ID = ID || 1;

      for (i = 0; i < mementosDetail.length; i++) {
        if (mementosDetail[i].ID === ID) {
          var moment = moments[momentsSize() - 1];
          mementosDetail[i].moments.push(moment);
        }
      }
    }
    
    // NOTE: temp method to keep track of moment ID.  
    function momentsSize() {
      return moments.length;
    }
    
    // NOTE: temp method to keep track of memento ID
    function mementosSize() {
      return mementosDetail.length;
    }

  }

})();

/*for testing

var mementosBefore = dataservice.getMementos();
console.log('Mementos Before', mementosBefore);

var mementoBefore = dataservice.getMemento();
console.log('Memento Before', mementoBefore);

dataservice.saveMoment();
dataservice.saveMemento();
dataservice.addMoment();

var mementosAfter = dataservice.getMementos();
console.log('Mementos After', mementosAfter);

var mementoAfter = dataservice.getMemento();
console.log('Memento After', mementoAfter);*/