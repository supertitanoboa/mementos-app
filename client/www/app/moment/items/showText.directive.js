(function() {
  
  angular
      .module('app.moment.items')
      .directive('showText', showText);

      /* @ngInject */      
      function showText() {
        
        var directive = {
          restrict: 'EA',          
          templateUrl: 'app/moment/items/showText.directive.html',          
          replace: true
        };

        return directive;        
      }

})();
