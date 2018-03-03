var module = angular.module("myapp",[]);


module.controller("NotesController", function($scope, $http) {
    $scope.notes = [];
    $scope.sections = [];
    var updateNotes = function () {
        $http.get("/notes")
            .success(function(notes){
                $scope.notes = notes;
            })
    };
    updateNotes();

    var updateSections = function () {
        $http.get("/sections")
            .success(function(sections){
                $scope.sections = sections;
            })
    };
    updateSections();
    // $scope.update = function(newText) {
    //     $scope.notes.push({text: newText});
    // };
    $scope.getName = function() {
        console.log('getName function starts...');
        // console.log($scope.name);
        if ($scope.name) {
            $http.get("/greeting",
                {params:
                    {name: $scope.name}
                })
                .success(function(res) {
                    $scope.greeting = res;
                    // console.log($scope.greeting);
                });
        }
    };
    $scope.add = function() {
        var note = {text: $scope.text};
        $http.post("/notes", note)
            .success(function() {
                $scope.text = "";
                updateNotes();
            });
    };
    $scope.remove = function(rid){
        console.log('remove function starts');
        $http.delete("/notes", {params: {id:rid}})
            .success(function() {
                console.log("$http.delete works fine...");
                updateNotes();
            });
    };

    //updateNotes.printName('Alex from service'); //test service
});
