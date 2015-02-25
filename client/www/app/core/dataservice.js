(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
  
  /*FIXME: makesure ngInject is working during minification*/
  
  /* @ngInject */ 
  function dataservice($q, $http, upload) {
    

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
      addMoment: addMoment,
      /*NOTE: temp until server is connected*/
      getMoment: getMoment,
      signup: signup,
      signin: signin
    };

    return service;
    
    // NOTE: server will only return mementos associated with user
    function getMementos() {
      // FIXME: url should point to mementos.io/api/1/mementos.  $http is promisified
      /*return $http.get('http://localhost:3000/api/1/mementos').
        success(function(data, status, headers, config) {
          console.log('Successful getting mementos');
        }).
        error(function(data, status, headers, config) {
          console.log('There was an error getting mementos');
        });*/

      return $q(function(resolve, reject) {
        resolve(mementos);
      });
    }

    function signup(userCredentials) {
      var req = {
        method: 'POST',
        url: 'http://mementos.ngrok.com/auth/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: userCredentials
      };

      return $http(req)
        .success(function(result){
          return result;
        })
        .error(function(error){
          console.error(error);
          throw error;
        });
    }
    
    function signin(userCredentials) {
      var req = {
        method: 'POST',
        url: 'http://mementos.ngrok.com/auth/login',
        headers: {
          'Content-Type': 'application/json',          
        },
        data: userCredentials
      };
      
      return $http(req)
        .success(function(result){
          return result;
        })
        .error(function(error){
          console.error(error);
          throw error;
        });    
    }
    
    // NOTE: memento ID will be supplied from getMementos call in list view
    function getMemento(ID) {
      var memento;
      var i;

      for (i = 0; i < mementosDetail.length; i++) {
        if (mementosDetail[i].ID === ID) {
          memento = mementosDetail[i];
        }
      }

      return $q(function(resolve, reject) {
        resolve(memento);
      });
    }
    
    // uploads moment content to S3, then saves moment to database
    function saveMoment(moment) {
      return uploadItems(moment.content)
        .then(function(momentContent) {
          // S3 urls added to moment content
          moment.content = momentContent

          return $http.post('http://mementos.ngrok.com/api/1/moments', moment)
            .success(function(momentID, status, headers, config) {
              console.log('Successful saving moment');
              return momentID;
            })
            .error(function(data, status, headers, config) {
              console.log('There was an error saving moment');
            });  
        })
        .catch(function(err) {
          console.log('There was an error retrieving all moment content');
        });
      
      /*NOTE: dummy data code to be removed*/
      /*obj.ID = momentsSize() + 1;
      
      moments.push(obj);

      return $q(function(resolve, reject) {
        resolve(obj.ID);
      });*/
    }
    
    // sends each moment item to uploadItem and notifies saveMoment when uploads are complete
    function uploadItems (items) {
      var unfinished = items.length;
      var running = 0;
      var deferred = $q.defer();
      var momentItems = [];
      var i;
      
      // NOTE: async implementation may not work 100% of time
      for (i = 0; i < items.length; i++) {
        (function(index) {
          running++;
          uploadItem(items[index])
            .then(function(S3Data) {
              momentItems.push({type: S3Data.config.url.split('type=')[1], url: S3Data.data.url});
              running--;
              unfinished--;

              if(running === 0 && unfinished === 0) {
                deferred.resolve(momentItems);
              }
            })
            .catch(function(err) {
              console.log('There was an error uploading to S3', err);
            });
        }(i));
      }
      
      // returns moment items after upload process is complete
      return deferred.promise;
    }
    
    // gets S3 signed-url path and uploads item to S3
    function uploadItem (item) {
      // request to server for S3 signed_url path
      return $http.get('http://mementos.ngrok.com/s3?s3_object_type=' + item.type)
        .success(function(data, status, headers, config) {
          console.log('Succesful getting S3 url');
          
          // utilizes upload service to upload moment item to S3
          return upload.S3Upload(item.payload, item.type, data.signed_request)
            .then(function(S3data) {
              return S3data;
            })
            .catch(function(err) {
              console.log('There was an error uploading moment item to S3', err);
            });
        })
        .error(function(data, status, headers, config) {
          console.log('There was an error getting S3 url');
        });
    }

    // NOTE: temp until server is connected
    function getMoment(ID) {
      var moment;
      var i;

      for (i = 0; i < moments.length; i++) {
        if(moments[i].ID === ID) {
          moment = moments[i];
        }
      }

      return $q(function(resolve, reject) {
        resolve(moment);
      });
    }
    
    // NOTE: addMoment happens concurrently with memento creation
    function saveMemento(obj) {
      obj.ID = mementosSize() + 1;

      // add to mementos detail
      mementosDetail.push(obj);
      
      // NOTE: adds to mementos.  Below is TEMPORARY as server will handle adjusting the memento object
      var mementosObj = {
        'ID': obj.ID,
        'title': obj.title,
        'authors' : obj.authors,
        'recipients'  : obj.recipients
      };

      if (obj.authors[0] === 'Wes' || obj.authors[0] === 'User1') {
        mementos.created.push(mementosObj);
      } else {
        mementos.received.push(mementosObj);
      }
      
      // FIXME: url should point to mementos.io/api/1/mementos.  $http is promisified
      /*return $http.post('http://localhost:3000/api/1/mementos', obj).
        success(function(data, status, headers, config) {
          console.log('Successful saving memento');
        }).
        error(function(data, status, headers, config) {
          console.log('There was an error saving memento');
        });*/
      
      // TEMP
      ///////////////////////////////////////////////////////////////////////////////////////////////////

      return $q(function(resolve, reject) {
        resolve(obj.ID);
      });
    }
    
    // NOTE: adds moment to selected memento
    function addMoment(mementoID, momentID) {
      var i;

      for (i = 0; i < mementosDetail.length; i++) {
        if (mementosDetail[i].ID === mementoID) {
          return getMoment(momentID)
            .then(function(data) {
              mementosDetail[i].moments.push(data);    
            })
            .catch(function(err) {
              console.error('There was an error getting the moment:', err);
            });
        }
      }

      return $q(function(resolve, reject) {
        resolve(momentID);
      });
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