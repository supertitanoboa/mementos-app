(function() {
  'use strict';

  angular
    .module('app.tools')
    .factory('DatePicker', DatePicker);

  /* @ngInject */
  function DatePicker($q, $cordovaDatePicker) {
    
    var service = {
      showDatePicker: showDatePicker,
      showTimePicker: showTimePicker
    };

    return service;

    function showDatePicker() {
      var q = $q.defer();

      // DOCs about Options
      // https://github.com/VitaliiBlagodir/cordova-plugin-datepicker
      var datePickerOptions = {
        date: new Date(),
        mode: 'date',
        allowOldDates: false
      };

      $cordovaDatePicker.show(datePickerOptions)
        .then(function(date){
          q.resolve(date);
          console.log(date);
        }, function(err) {
          q.reject(err);
        });

      return q.promise;
    }

    function showTimePicker(date) {
      var q = $q.defer();
      var currentDate = new Date();
      var currentDay = currentDate.getDay();
      var currentYear = currentDate.getYear();
      var allowOldDates;

      console.log(date);
      console.log(date.getDay());

      if (date.getDay() === currentDay && date.getYear() === currentYear) {
        allowOldDates = false;
      } else {
        allowOldDates = true;
      }

      var timePickerOptions = {
        date: new Date(),
        mode: 'time',
        allowOldDates: allowOldDates
      };

      $cordovaDatePicker.show(timePickerOptions)
        .then(function(time){
          q.resolve(time);
          console.log(time);
        }, function(err) {
          q.reject(err);
        });

      return q.promise;
    }
  }

})();

