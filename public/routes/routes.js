angular.module("myapp",['dndLists','ngRoute']);

angular.module("myapp").config(
    function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'routes/notes/notes.html',
                controller: 'NotesController'
        })
            .when('/section/:name',{
                templateUrl: 'routes/viewSection/viewSection.html',
                controller: 'ViewSectionController'
        })
            .when('/register',{
                templateUrl: 'routes/userForm/userForm.html',
                controller: 'UserFormController'
            })
            .when('/:section?',{
                templateUrl: 'routes/notes/notes.html',
                controller: 'NotesController'
            })
            .otherwise({
                redirectTo: '/'
        });
    }
);
