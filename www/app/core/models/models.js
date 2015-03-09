(function() {

  angular
    .module('app.models')
    .factory('Models', Models);

    function Models(UserModel, MomentModel, MementoModel, MementosModel) {
      var models = {
        user: UserModel,
        moment: MomentModel,
        memento: MementoModel,
        mementos: MementosModel
      };

      return models;
    }

})();
