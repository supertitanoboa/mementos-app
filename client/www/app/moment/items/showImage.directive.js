(function() {
  
  angular
    .module('app.moment.items')
    .directive('showImage', showImage);

    /* @ngInject */      
    function showImage(download, $stateParams) {
        
      return {
        restrict: 'EA',          
        templateUrl: 'app/moment/items/showImage.directive.html',          
        replace: true,
        link: link
      };

      function link(scope, element, attrs) {
        var vm = scope;

        vm.activate   = activate;
        vm.getPayload = getPayload;
        vm.hasPayload = false; 

        activate();

        //////////////////////////////////////////

        function activate() {
          // NOTE: utilized $stateParams to access difference between moment and memento scope
          if ($stateParams.ID) {
            vm.getPayload(vm.item.url, vm.item.type)
            .then(function(payload) {
              vm.item.payload = payload;
              vm.hasPayload   = true;
            })
            .catch(function(err) {
              console.error('Error loading image item payload', err);
            });            
          } 
        }

        function getPayload (url, type) {
          return download.S3Download(url, type)
            .then(function(payload) {
              return payload.data;
            })
            .catch(function(err) {
              console.error('There was an error getting image item', err);
            })
        }

      }
    }

})();
