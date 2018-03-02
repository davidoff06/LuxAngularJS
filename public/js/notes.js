//lab3 js file
var module = angular.module("myapp",[]);

module.service ('updateNotes', function () {
    //test service func
    this.printName = function (text) {
        console.log(text);
    };

});

module.controller("NotesController", function($scope, $http) {
    $scope.notes = [
        {
            text:'element1'
        },
        {
            text:'element2'
        }
    ];
    // $scope.update = function(newText) {
    //     $scope.notes.push({text: newText});
    // };
    $scope.update = function() {
        console.log('update function starts...');
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
    }

    //updateNotes.printName('Alex from service'); //test service
});
