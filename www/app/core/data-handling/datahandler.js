(function() {

  angular
    .module('app.data')
    .factory('DataHandler', DataHandler);

  /* @ngInject */
  function DataHandler(dataservice, Models, Events) {

    var moment = angular.extend(Models.moment, {
      save            : saveMoment,
      saveModel       : saveMomentModel,
      saveContent     : saveMomentContent
    });

    var mementos = angular.extend(Models.mementos, {
      fetch        : fetchMementos,
      fetchMoments : fetchMoments
    });

    var memento = angular.extend(Models.memento, {
      save      : saveMemento,
      addMoment : addMoment
    });

    var user = angular.extend(Models.user, {
      signin    : signin,
      signup    : signup
    });

  	var dataHandler = {
      activate : activate,
      mementos : mementos,
      memento  : memento,
      moment   : moment,
      user     : user
  	};

  	return dataHandler;


    ///////////////////////////////////////////////////////////////////

    function activate() {

      Events.activate();
      
      Events.on('momentRelease', function(notification) {
        var user = Models.user.get();
        dataservice.getMemento(notification.mementoID, user.sessionID)
        .then(insertMemento);
      });

      Events.on('userLogin', function(userInfo) {
        var payload = { 
          userID: userInfo.userID 
        };        
        Events.emit('sendUser', payload);

        Models.user.set(userInfo);        
        
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
      var moment = Models.moment.get();
      var user   = Models.user.get(); 

      return dataservice.uploadItems(moment.content, user.sessionID)
      .then(function(updatedContent) {
        var moment = Models.moment.get();
        moment.content = updatedContent;        
        Models.moment.set(moment);
        return moment.ID;
      })
      .catch(function(err) {
        console.error('There was an error uploading Items to S3.');
        console.error(err);
        return err;
      });
    }

    function saveMomentModel() {
      var user   = Models.user.get();
      var moment = Models.moment.get();
      // TODO: Save to Local Storage first
      return dataservice.saveMoment(moment, user.sessionID);
    }

    function fetchMementos() {

      //////// Updating Flag on
      Models.mementos.isUpdating = true;

      var user = Models.user.get();
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
      var user           = Models.user.get();
      var toBeRetrieved  = mementos.created.length + mementos.received.length; 
      var retrievedSoFar = 0;
      var viewer         = null;

      if (toBeRetrieved === 0) {
        Models.mementos.isUpdating = false;
        console.log('There are no moments to be fetched.');
        Events.trigger('mementosUpdateComplete');
        return;
      }

      console.log('Fetching Mementos');
      console.log(toBeRetrieved + 'moments to be retrieved.');      
      var getMementoByViewer = function(memento, i, mementosByViewer) {              

        dataservice.getMemento(memento.ID, viewer, user.sessionID)
        .then(function(mementoWithMomentInfo) {
          mementosByViewer[i] = mementoWithMomentInfo.data;

          retrievedSoFar++;
          console.log(retrievedSoFar + ' mementos retrieved so far.');
          if (retrievedSoFar >= toBeRetrieved) {
            Models.mementos.set(mementos);
            Models.mementos.isUpdating = false;
            Events.trigger('mementosUpdateComplete');
            console.log('Succesfully Fetched All Mementos');
          }

        })
        .catch(function(err) {
          console.error('There was a problem fetching the mementos.');
          console.error('MementoID: ', memento.ID);
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
      var memento = Models.memento.get();
      var user = Models.user.get();
      return dataservice.saveMemento(memento, user.sessionID);
    }

    function addMoment(moment) {
      var user    = Models.user.get();
      var memento = Models.memento.get(); 
      Models.memento.add(moment);      

      console.log('Updated Memento Model');
      console.log(Models.memento.get());

      return dataservice.updateMemento(memento.ID, moment.ID, user.sessionID);
    }

    function signin(credentials) {
      return dataservice.signin(credentials)
      .then(function(res) {
        var userInfo = {
          sessionID: res.data.sessionID,
          userID: res.data.userID
        };

        dataHandler.activate();

        Events.trigger('userLogin', userInfo);
      });
    }

    function signup(credentials) {
      return dataservice.signup(credentials)
      .then(function(res) {
        var userInfo = {
          sessionID: res.data.sessionID,
          userID: res.data.userID
        };

        dataHandler.activate();

        Events.trigger('userLogin', userInfo);

      });
    }

    ////////////////////////////////////
    // Event Handling Methods
    ////////////////////////////////////

    function insertMemento(memento) {      
      var user = Models.user.get();
      var mementos = Models.mementos.get();
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
