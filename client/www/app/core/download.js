/*NOTE: may be able to use Amazon SDK*/
(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('download', download);
  
  /* @ngInject */ 
  function download($http) {

    var service = {
      S3Download: S3Download
    };

    return service;
    
    // sends moment item to S3
    function S3Download(url, type) {

      return $http({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': type
        }
      })
      .success(function(data, status, headers, config) {
        console.log('Succesful downloading moment item from S3');
        return data;
      })
      .error(function(data, status, headers, config) {
        console.log('There was an error downloading moment item from S3');
      });

    }
  }

})();
