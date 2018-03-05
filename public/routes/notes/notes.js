
angular.module("myapp").controller("NotesController", function($scope, $http, $routeParams, $location) {
    $scope.notes = [];
    $scope.sections = [];
    $scope.activeSection = $routeParams.section;
    console.log($routeParams.section);
    //$scope.activeSection = [];

    var updateSections = function () {
        console.log("updateSections starts...");
        $http.get("/sections")
            .success(function(sections){
                console.log("updateSections ends successfully...");
                $scope.sections = sections;
                if ($scope.activeSection === undefined && $scope.sections.length>0) {
                    $scope.activeSection = $scope.sections[0].title;
                }
            });
    };
    updateSections();

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
        if (!$scope.text || $scope.text.length==0) return;
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
        console.log('showSection starts. Arg='+section.title);
        $location.path(section.title);
        $scope.activeSection = section.title;
        updateNotes();
    };
    $scope.addSection = function() {
        console.log("addSection starts");
        if($scope.newSection.length == 0) {return};
        //check for duplicates
        for (var i = 0;i < $scope.sections.length; i++) {
            if ($scope.sections[i].title == $scope.newSection) {
                return;
            }
        };
        var newSection = {section: $scope.newSection};
        $http.post("/sections", newSection)
            .success(function() {
                $scope.newSection = "";
                console.log("addSection ends successfully");
                updateSections();
            });
    };

});
