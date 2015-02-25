(function() {
  
  angular
      .module('app.moment.items')
      .directive('newText', newText);

      /* @ngInject */      
      function newText() {
        
        return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'app/moment/items/newText.directive.html',          
          link: link         
        };

        function link (scope, element, attrs) {
          scope.saveText = saveText;
          scope.cancel = cancel;          

          //////////////////////////////////////////

          function saveText(text) {
            scope.insertIntoMoment('text/plain', text);
            element.val('');            
            scope.done();
          }
          
          function cancel() {
            element.val('');
            scope.done();
          }

        }
      }      
})();
