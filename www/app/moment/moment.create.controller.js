(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('MomentCreate', MomentCreate);

  /* @ngInject */
  function MomentCreate($state, DataHandler, DatePicker, Alerts, $ionicHistory, $ionicLoading, Events) {
    /*jshint validthis: true */
    var vm = this;
    vm.time = null;
    vm.date = null;
    vm.releaseDate;
    vm.currentMoment = new DataHandler.moment.constructor();
    vm.delay = false;

    vm.goBack = goBack;
    vm.saveMoment = saveMoment;
    vm.showSaveProgress = showSaveProgress;
    vm.hideSaveProgress = hideSaveProgress;
    vm.showDatePicker = showDatePicker;
    vm.showTimePicker = showTimePicker;
      
    //////////////////////////////////////////////////

    function saveMoment(currentMoment) {
      vm.showSaveProgress();
      currentMoment.releaseDate = vm.releaseDate;
      console.log('currentMoment.releaseDate', currentMoment.releaseDate);
      console.log('This is a new Date: ', new Date(currentMoment.releaseDate));
      DataHandler.moment.set(currentMoment);

      DataHandler.moment.save()      
      .then(function(momentID) {
        console.log('Moment ' + momentID.data + ' has been saved');
        currentMoment = angular.extend(DataHandler.moment.get(), {
          ID : momentID.data
        });

        DataHandler.moment.set(currentMoment);
        vm.hideSaveProgress();

        // NOTE: resets create moment data
        vm.time = null;
        vm.date = null;
        vm.currentMoment = new DataHandler.moment.constructor();
        
        // Events.trigger('newMoment');
        $state.go('mementos');
      })
      .catch(function(err) {
        vm.hideSaveProgress();
        Alerts.errorSavingMoment();
        console.error('There was an error saving moment:', err);
      });
    }
    
    function showDatePicker() {
      vm.date = null;
      vm.time = null;
      DatePicker.showDatePicker()
        .then(function(date) {
          // normalizes date
          var hours = date.getHours() * 60 * 60000;
          var minutes = date.getMinutes() * 60000;
          date = date - hours - minutes;

          vm.date = new Date(date);
        })
        .catch(function(err) {
          console.error(err)
        })
    }

    function showTimePicker(date) {
      vm.time = null;
      DatePicker.showTimePicker(date)
        .then(function(time) {
          vm.time = time;
          vm.releaseDate = vm.date.getTime() + (vm.time.getHours() * 60 * 60000) + (vm.time.getMinutes() * 60000);
        })
        .catch(function(err) {
          console.error(err)
        })
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function goBack() {
      var plus = document.getElementsByClassName('plusSign')[0];
      
      // fades in and antispins plus sign
      setTimeout(function() {
        plus.className = plus.className.split(' fadeout')[0] + ' fadein antispin';
      }, 100);

      // removes antispin class
      setTimeout(function() {
        var plus = document.getElementsByClassName('plusSign')[0];
        plus.className = plus.className.split(' antispin')[0];
      }, 400);

      return $ionicHistory.goBack()
    }

    function showSaveProgress() {
      return $ionicLoading.show({
        template: 'Saving moment...'
      });
    }

    function hideSaveProgress() {
      return $ionicLoading.hide();
    }

  }

})();

