
(function () {
    var NotesService = function({
        this.smiles = [':)',':('];
    });
    NotesService.prototype = {
        getSmile = function() {
          return this.smiles[0];
        };
    };
    NotesService.$inject = [];
    angular.module('myapp').service('NotesService', NotesService);
}
)();