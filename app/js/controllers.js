/*jslint browser: true*/
/*global alert*/
'use strict';

/* Controllers */

angular.module('kpi.controllers', [])
.controller('kpiController', ['$scope', '$http', function($scope, $http) {

    $http.get('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPILevindexAr').success(function(data) {
        $scope.years = data.variables[1].values;
        //Initialize the selcect elements to the first value
        $scope.toYear = $scope.years[0];
        $scope.fromYear = $scope.years[0];
    });

    $scope.calculate = function() {
        alert("Works!!");
    };
}]);
