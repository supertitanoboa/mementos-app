(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('upload', upload);
  
  /* @ngInject */ 
  function upload($http) {

    var service = {
      S3Upload: S3Upload
    };

    return service;
    
    // sends moment item to S3
    function S3Upload(payload, type, signedURL) {

      return $http({
        method: 'PUT',
        url: signedURL,
        headers: {
          'Content-Type': type 
        },
        data: payload
      })
      .success(function(data, status, headers, config) {
        console.log('Succesful uploading moment item to S3');
      })
      .error(function(data, status, headers, config) {
        console.log('There was an error uploading moment item to S3');
      });

    }
  }

})();
