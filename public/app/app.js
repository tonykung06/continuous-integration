angular.module('app', []);

angular.module('app').controller('testCtrl', function($scope) {
    $scope.jobs = [{
        title: 'Sales Person',
        description: 'description1'
    }, {
        title: 'Accountant',
        description: 'testing'
    }];
});