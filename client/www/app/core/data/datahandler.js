(function() {

  angular
    .module('app.data')
    .factory('DataHandler', DataHandler);

  /* @ngInject */
  function DataHandler(dataservice, UserModel, MomentModel, MementoModel, MementosModel, Events) {

    var moment = angular.extend(MomentModel, {
      save            : saveMoment,
      saveModel       : saveMomentModel,
      saveContent     : saveMomentContent
    });

    var mementos = angular.extend(MementosModel, {
      fetch        : fetchMementos,
      fetchMoments : fetchMoments      
    });

    var memento = angular.extend(MementoModel, {
      save      : saveMemento,
      addMoment : addMoment      
    });

  	var dataHandler = {
      activate : activate,
      mementos : mementos,
      memento  : memento,
      moment   : moment
  	};

  	return dataHandler;


    ///////////////////////////////////////////////////////////////////

    function activate() {
      // Update the mementos list
      
      Events.on('momentRelease', function(notification) {
        var user = UserModel.get();
        dataservice.getMemento(notification.mementoID, user.sessionID)
        .then(insertMemento);
      });

      Events.on('userLogin', function(userInfo) {
        var payload = { 
          userID: userInfo.userID 
        };        
        Events.emit('sendUser', payload);

        UserModel.set(userInfo);        
        
        mementos.fetch();
      });

    }

    // Moment extended methods

    function saveMoment() {
      return saveMomentContent()
      .then(saveMomentModel)      
      .catch(function(err) {
        // TODO: Make user click to retry!
        console.log('There was an error saving moment.');
        console.error(err);
      });
    }

    function saveMomentContent() {
      // Save to S3 directly
      var moment = MomentModel.get();
      var user   = UserModel.get(); 

      return dataservice.uploadItems(moment.content, user.sessionID)
      .then(function(updatedContent) {
        var moment = MomentModel.get();
        moment.content = updatedContent;        
        MomentModel.set(moment);
        return moment.ID;
      })
      .catch(function(err) {
        console.error('There was an error uploading Items to S3.');
        console.error(err);
        return err;
      });
    }

    function saveMomentModel() {
      var user   = UserModel.get();
      var moment = MomentModel.get();
      // TODO: Save to Local Storage first
      return dataservice.saveMoment(moment, user.sessionID);
    }

    function fetchMementos() {

      //////// Updating Flag on
      MementosModel.isUpdating = true;

      var user = UserModel.get();
      console.log('Fetching Mementos');
      return dataservice.getMementos(user.sessionID)
      .then(function(mementos) { 
        return fetchMoments(mementos.data);
      })
      .catch(function(err) {
        console.error(err);
        console.error('There was a problem fetching the Mementos from DB.');
      });
    }

    function fetchMoments(mementos) {      
      var user           = UserModel.get();
      var toBeRetrieved  = mementos.created.length + mementos.received.length; 
      var retrievedSoFar = 0;
      var viewer         = null;

      if (toBeRetrieved === 0) {
        MementosModel.isUpdating = false;
        console.log('There no moments to be fetched.');
        Events.trigger('mementosUpdateComplete');
        return;
      }

      console.log('Fetching Moments');
      console.log(toBeRetrieved + 'moments to be retrieved.');      
      var getMementoByViewer = function(memento, i, mementosByViewer) {
        
        console.log('Retrieving Memento With Moment Info:');
        console.log(memento);

        dataservice.getMemento(memento.ID, viewer, user.sessionID)
        .then(function(mementoWithMomentInfo) {
          mementosByViewer[i] = mementoWithMomentInfo.data;

          retrievedSoFar++;
          console.log(retrievedSoFar + 'moments retrieved so far.');
          if (retrievedSoFar >= toBeRetrieved) {
            MementosModel.set(mementos);
            MementosModel.isUpdating = false;
            Events.trigger('mementosUpdateComplete');
            console.log('Succesfully Fetched Moments');
          }

        })
        .catch(function(err) {
          console.error('There was a problem fetching the moments.');
          console.error('MementoID:', memento.ID);
          console.error(err);
        });
      };

      var getCreatedMemento = function(created) {
        viewer = 'author';
        created.forEach(getMementoByViewer);
      };

      var getReceivedMemento = function(received) {
        viewer = 'recipient';
        received.forEach(getMementoByViewer);
      };

      getCreatedMemento(mementos.created);
      getReceivedMemento(mementos.received);
    }

    function saveMemento() {
      var memento = MementoModel.get();
      var user = UserModel.get();
      return dataservice.saveMemento(memento, user.sessionID);
    }

    function addMoment(moment) {
      var user    = UserModel.get();
      var memento = MementoModel.get(); 
      MementoModel.add(moment);      

      console.log('Updated Memento Model');
      console.log(MementoModel.get());

      return dataservice.updateMemento(memento.ID, moment.ID, user.sessionID);
    }


    ////////////////////////////////////
    // Event Handling Methods
    ////////////////////////////////////

    function insertMemento(memento) {      
      var user = UserModel.get();
      var mementos = MementosModel.get();
      var isAuthor;
      var isRecipient;

      isAuthor = memento.authors.some(function(authorID) {
        return authorID === user.userID;
      });

      isRecipient = memento.recipients.some(function(recipientID) {
        return recipientID === user.userID;
      });

      if (isAuthor) {
        mementos.updateOrInsert(memento, 'created');
      }
      
      if (isRecipient) {
       mementos.updateOrInsert(memento, 'received');
      }
    }

  }

})();