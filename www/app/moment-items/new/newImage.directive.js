(function() {
  
  angular
      .module('app.moment.items')
      .directive('newImage', newImage);

      /* @ngInject */      
      function newImage(Camera) {
        
        return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'app/moment-items/new/newImage.directive.html',          
          link: link         
        };

        function link (scope, element, attrs) {
          var vm = scope;

          vm.saveImage         = saveImage;
          vm.cancel            = cancel;
          
          vm.imageHasBeenTaken = false;
          vm.image             = null;

          activate();
          
          //////////////////////////////////////////

          function activate() {
            Camera.takePhoto()
            .then(function(image) {
              vm.image = image;
              vm.imageHasBeenTaken = true;              
            })
            .catch(function(err) {
              console.error(err);
            });
          }

          function saveImage(image) {
            vm.insertIntoMoment('image/jpeg', image);
            vm.imageHasBeenTaken = false;
            vm.done();
          }
          
          function cancel() {
            vm.imageHasBeenTaken = false;
            vm.image = null;            
            vm.done();
          }

        }
      }      
})();
