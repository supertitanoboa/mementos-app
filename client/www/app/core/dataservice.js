(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);
  
  /*FIXME: makesure ngInject is working during minification*/
  /* @ngInject */ 
  function dataservice($http, $q, upload, CurrentUser) {
    var hostURL = 'https://40643827.ngrok.com';

    var service = {
      getMementos: getMementos,
      getMemento: getMemento,
      updateMemento: updateMemento,
      saveMoment: saveMoment,
      saveMemento: saveMemento,
      signup: signup,
      signin: signin
    };

    return service;
    
    ///////////////////////////////////////////////////////////////

    function getMementos() {
      // NOTE: this is manual, and could be set up as an httpInterceptor
      var sessionID = CurrentUser.get().sessionID;

      return $http({
        method: 'GET',
        url: hostURL + '/api/1/mementos',
        headers: {
          'Content-Type': 'application/json',
          'sessionID': sessionID
        }
      })
        .success(function(result){
          console.log('Successful getting mementos');
          return result;
        })
        .error(function(error){
          console.log('There was an error getting mementos');
          throw error;
        });
    }

    function signup(userCredentials) {
      var req = {
        method: 'POST',
        url: hostURL + '/auth/signup',
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
        url: hostURL + '/auth/login',
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
    
    function getMemento(ID, viewer) {
      // NOTE: this is manual, and could be set up as an httpInterceptor
      var sessionID = CurrentUser.get().sessionID;

      return $http({
        method: 'GET',
        url: hostURL + '/api/1/mementos/' + ID + '/' + viewer,
        headers: {
          'Content-Type': 'application/json',
          'sessionID': sessionID
        }
      })
        .success(function(result){
          console.log('Successful getting memento');
          return result;
        })
        .error(function(error){
          console.log('There was an error getting memento');
          throw error;
        });
    }
    
    function updateMemento(mementoID, momentID) {
      // NOTE: this is manual, and could be set up as an httpInterceptor
      var sessionID = CurrentUser.get().sessionID;

      return $http({
        method: 'PUT',
        url: hostURL + '/api/1/mementos/' + mementoID,
        headers: {
          'Content-Type': 'application/json',
          'sessionID': sessionID
        },
        data: momentID
      })
        .success(function(result){
          console.log('Successful updating memento');
          return result;
        })
        .error(function(error){
          console.log('There was an error updating memento');
          throw error;
        });
    }
    
    // uploads moment content to S3, then saves moment to database
    function saveMoment(moment) {
      return uploadItems(moment.content)
        .then(function(momentContent) {
          // NOTE: this is manual, and could be set up as an httpInterceptor
          var sessionID = CurrentUser.get().sessionID;

          // S3 urls added to moment content
          moment.content = momentContent
           
          return $http({
            method: 'POST',
            url: hostURL + '/api/1/moments',
            headers: {
              'Content-Type': 'application/json',
              'sessionID': sessionID
            },
            data: moment
          })
            .success(function(result){
              console.log('Successful saving moment');
              return result;
            })
            .error(function(error){
              console.error('There was an error saving moment');
              throw error;
            });
        })
        .catch(function(err) {
          console.log('There was an error retrieving all moment content');
        });
    }
    
    // sends each moment item to uploadItem and notifies saveMoment when uploads are complete
    function uploadItems(items) {
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
    function uploadItem(item) {
      // NOTE: this is manual, and could be set up as an httpInterceptor
      var sessionID = CurrentUser.get().sessionID;

      // request to server for S3 signed_url path
      return $http({
        method: 'GET',
        url: hostURL + '/s3?s3_object_type=' + item.type,
        headers: {
          'Content-Type': 'application/json',
          'sessionID': sessionID
        }
      })
        .success(function(result){
          console.log('Succesful getting S3 url');
          // utilizes upload service to upload moment item to S3
          return upload.S3Upload(item.payload, item.type, result.signed_request)
            .then(function(S3data) {
              return S3data;
            })
            .catch(function(err) {
              console.log('There was an error uploading moment item to S3', err);
            });
        })
        .error(function(error){
          console.log('There was an error getting S3 url');
          throw error;
        });
    }
    
    // NOTE: addMoment happens concurrently with memento creation
    function saveMemento(memento) {
      var sessionID = CurrentUser.get().sessionID;

      return $http({
        method: 'POST',
        url: hostURL + '/api/1/mementos',
        headers: {
          'Content-Type': 'application/json',
          'sessionID': sessionID
        },
        data: memento
      })
        .success(function(result){
          console.log('Successful saving memento');
          return result;
        })
        .error(function(error){
          console.error('There was an error saving memento');
          throw error;
        });
    }

  }
})();
