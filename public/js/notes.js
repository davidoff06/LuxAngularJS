var module = angular.module("myapp",[]);


module.controller("NotesController", function($scope, $http) {
    $scope.notes = [];
    $scope.sections = [];
    $scope.activeSection = null;

    var updateSections = function () {
        console.log("updateSections starts...");
        $http.get("/sections")
            .success(function(sections){
                console.log("updateSections ends successfully...");
                $scope.sections = sections;
                if ($scope.activeSection == null && $scope.sections.length>0) {
                    $scope.activeSection = $scope.sections[0].title;
                }
            });
    };
    updateSections();

    //$scope.addSection = function(){};

    var updateNotes = function () {
        console.log("updateNotes starts...");
        var params = {params:{section:$scope.activeSection}};
        $http.get("/notes",params)
            .success(function(notes){
                console.log("updateNotes ends successfully.");
                $scope.notes = notes;
            })
    };
    updateNotes();

    $scope.add = function() {
        var note = {text: $scope.text, section: $scope.activeSection};
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
    $scope.showSection = function(section){
        $scope.activeSection = section.title;
        updateNotes();
    };

});
