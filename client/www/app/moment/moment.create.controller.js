(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('MomentCreate', MomentCreate);

  /* @ngInject */
  function MomentCreate($state, dataservice, CurrentMoment) {
    
    /*jshint validthis: true */
    var vm = this;    
    vm.saveMoment = saveMoment;
    vm.currentMoment = new EmptyMoment();
      

    //////////////////////////////////////////////////
  

    function saveMoment(currentMoment) {
      // TODO: Show loading screen when the moment is saving;
      // savingInProgress();

      dataservice.saveMoment(currentMoment)
        .then(function(res) {
          console.log('Moment ' + res.data.momentID + ' has been saved');
          CurrentMoment.set({momentID: res.data.momentID});
          $state.go('mementos');
        })
        .catch(function(err) {
          // TODO: Connection errors, DB errors.
          // savingError(err);
          console.error('There was an error saving moment:', err);
        });
      
    }

    function EmptyMoment() {
      var today = new Date();
      this.title = '';
      this.content = []; 
      this.releaseDate = today.setFullYear(today.getFullYear() + 1);
      this.meta = {
        location: {
          latitude: null,
          longitude: null,
          place: ''
        }
      };
    }

  }

})();
