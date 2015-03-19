(function() {

  angular
    .module('app.data')
    .factory('Events', Events);

    function Events(Notifications) {
      var events = {};

      var service = {
        on: on,
        off: off,
        emit: emit,
        trigger: trigger,
        activate: activate
      };

      return service;

      /////////////////////////////////////////

      function activate() {
        Notifications.activate();
        Notifications.onNew = function(notification) {        
          trigger('momentRelease', notification);          
        };
      }

      function emit(event, payload) {
        Notifications.emit(event, payload);        
      }

      /////////////////////////////////////////
      // Service Methods //

      function on(event, action, context) {
        var eventID;

        context = context || this;

        if (!events.hasOwnProperty(event)) {
          events[event] = {
            _idCounter: 0,
            actions: {}
          };
        }

        eventID = events[event]._idCounter++;

        events[event].actions[eventID] = function() {
          var args = Array.prototype.slice.call(arguments);          
          action.apply(context, args);
        };

        return eventID;
      }

      function off(event, eventID) {
        delete events[event].actions[eventID];
      }

      function trigger(event) {
        var args;
        var action;
        var actions;

        if (!events.hasOwnProperty(event)) return;

        args = Array.prototype.slice.call(arguments, 1);
        actions = events[event].actions;        

        for (action in actions) {
          actions[action].apply(this, args);
        }
      }
    }

})();
