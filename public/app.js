// Firebase setup - TODO extract into angular service

var url = "https://glaring-torch-3896.firebaseio.com";
var rootRef = new Firebase(url);

// Angular setup

var app = angular.module('madoff2mvp', []);

app.controller('loginController', function($scope, $rootScope) {
    if (rootRef.getAuth()) {
        $rootScope.loggedIn = true;
    }

    $scope.register = function() {
        rootRef.createUser({
            email    : $scope.email,
            password : $scope.password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $rootScope.loggedIn = true;
                $rootScope.$apply();
            }
        });
    };

    $scope.login = function() {
        rootRef.authWithPassword({
            email    : $scope.email,
            password : $scope.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $rootScope.loggedIn = true;
                $rootScope.$apply();
            }
        });
    };

    $scope.logout = function() {
        rootRef.unauth();
        $rootScope.loggedIn = false;
    };
});

app.controller('appController', function($scope) {

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
