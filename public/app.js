// Firebase setup - TODO extract into angular service

var url = "https://glaring-torch-3896.firebaseio.com";
var rootRef = new Firebase(url);

// Angular setup

var app = angular.module('madoff2mvp', [
        'ngRoute'
        ]);

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'loginView.html',
                controller: 'LoginController'
            }).when('/groups', {
                templateUrl: 'groupView.html',
                controller: 'GroupController'
            }).when('/expenses/new', {
                templateUrl: 'expenseCreateView.html',
                controller: 'ExpenseCreateController'
            }).when('/expenses/:id', {
                templateUrl: 'expenseView.html',
                controller: 'ExpenseController'
            }).otherwise({
                redirectTo: '/groups'
            });
        }]);

/*
app.run(function($rootScope, $location) {
    if (!rootRef.getAuth()) {
        $location.path("/login");
    }
});
*/

app.controller('LoginController', ['$scope', '$location', function($scope, $location) {
    $scope.register = function() {
        $scope.processing = true;
        rootRef.createUser({
            email    : $scope.email,
            password : $scope.password
        }, function(error, userData) {
            $scope.processing = false;
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $location.path("/groups");
                $scope.$apply();
            }
        });
    };

    $scope.login = function() {
        $scope.processing = true;
        rootRef.authWithPassword({
            email    : $scope.email,
            password : $scope.password
        }, function(error, authData) {
            $scope.processing = false;
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $location.path("/groups");
                $scope.$apply();
            }
        });
    };

    $scope.logout = function() {
        rootRef.unauth();
        $location.path("/login");
    };
}]);

app.controller('GroupController', function($scope) {
    $scope.hej = "hejsan";
});

// Jaja, inte jätteprio, men tanken är att alla user alerts skickas hit
app.factory('AlertService', function() {
    var alerts = [];
    
    return {
        getAlerts: function() {
            return alerts;
        }
    }
});
