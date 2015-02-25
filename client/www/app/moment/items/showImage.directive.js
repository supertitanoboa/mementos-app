(function() {
  
  angular
    .module('app.moment.items')
    .directive('showImage', showImage);

    /* @ngInject */      
    function showImage() {
        
      var directive = {
        restrict: 'EA',          
        templateUrl: 'app/moment/items/showImage.directive.html',          
        replace: true
      };

      return directive;        
    }

})();
