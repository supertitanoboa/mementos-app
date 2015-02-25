(function() {
  'use strict';

  angular
    .module('app.media')
    .factory('Camera', Camera);

  /* @ngInject */
  function Camera($q, $cordovaCamera) {
    
    var service = {
      takePhoto: takePhoto      
    };

    return service;

    function takePhoto() {
      var q = $q.defer();

      // DOCs about Options
      // https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#cameraoptions   
      var cameraOptions = {
        destinationType : 0,
        sourceType : 1,
        encodingType: 0,
        allowEdit : true,
        quality: 100,
        targetWidth: 640,
        targetHeight: 640,
        correctOrientation: true,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(cameraOptions)
      .then(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
  }

})();
