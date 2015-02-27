(function() {

  angular
    .module('app.core')
    .factory('Notifications', Notifications);

  function Notifications() {
    var socket;

    // These keeps track of all the notification received by user
    // key -> mementoID, value -> Amount of Notifications
    var _received = {};

    var notifications = {
      onNew: null, 
      clear: clear,
      get: get,
      activate: activate,
      emit: emit,
      add: add
    };

    return notifications;

    //////////////////////////////////////////////////////////////////


    function activate() {
      if (!socket) {
        socket = io('https://mementosio.herokuapp.com');

        socket.on('connect', function() {
          console.log('Socket Connection Established');              
        });

        socket.on('releaseMoment', function(notification) {
          console.log('Notification received!')
          console.log(notification);          
          add(notification);
          if(notifications.onNew) notifications.onNew(notification);
        });

        socket.on('disconnect', function(){
          console.log('Socket Connection Lost');
        });          
      } else {
        console.error('Socket connection already established');
      }
    }

    function emit(eventName, payload) {
      if (!socket) {
        return console.error('Can\'t emit event. No socket connection established.');
      }
      var args = Array.prototype.slice.call(arguments, 1);
      socket.emit(eventName, payload);
    }

    function get() {
      return angular.copy(_received);
    }

    function clear(id) {      
      delete _received[id];      
    }

    function add(notification) {
      if(!_received.hasOwnProperty(notification.mementoID)) {
        _received[notification.mementoID] = 0;
      }
      return ++_received[notification.mementoID];
    }
  }  

})();
